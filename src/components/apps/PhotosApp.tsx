"use client";
import { Spinner } from "@/components/ui/spinner";
import { ImageSkeletonCard } from "@/components/ui/ImageSkeleton";
import { useImagePreloader } from "@/components/ui/ImagePreloader";
import Image from "next/image";
import {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePhotosStore } from "@/stores/photosStore";
import { isTouchDevice, getDeviceType } from "@/lib/device-utils";

export default function PhotosApp() {
  const {
    rotation,
    isDragging,
    startX,
    currentRotation,
    isLoading,
    errorItems,
    hasAnimated,
    setRotation,
    setIsDragging,
    setStartX,
    setCurrentRotation,
    setIsLoading,
    addLoadedItem,
    addErrorItem,
    setHasAnimated,
  } = usePhotosStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedItems, setLoadedItems] = useState<Set<number>>(new Set());
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, 'loading' | 'loaded' | 'error'>>({});

  const getResponsiveDimensions = useCallback(() => {
    if (typeof window === "undefined") return { size: 400, cardWidth: 192, cardHeight: 256 };
    
    const deviceType = getDeviceType();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (deviceType === "ipad" || deviceType === "tablet") {
      const maxSize = Math.min(viewportWidth * 0.6, viewportHeight * 0.6, 450);
      return {
        size: maxSize,
        cardWidth: Math.max(160, maxSize * 0.4),
        cardHeight: Math.max(200, maxSize * 0.55)
      };
    } else if (deviceType === "mobile") {
      const maxSize = Math.min(viewportWidth * 0.8, viewportHeight * 0.5, 320);
      return {
        size: maxSize,
        cardWidth: Math.max(120, maxSize * 0.4),
        cardHeight: Math.max(160, maxSize * 0.55)
      };
    }
    
    return { size: 400, cardWidth: 192, cardHeight: 256 };
  }, []);

  const [dimensions, setDimensions] = useState(() => getResponsiveDimensions());
  const { size, cardWidth, cardHeight } = dimensions;

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getResponsiveDimensions());
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [getResponsiveDimensions]);

  const mediaItems = useMemo(
    () => [
      { type: "image", src: "/photos/image-1.png" },
      { type: "video", src: "/photos/video-1.mp4" },
      { type: "image", src: "/photos/image-2.png" },
      { type: "image", src: "/photos/image-8.jpg" },
      { type: "video", src: "/photos/video-4.mp4" },
      { type: "image", src: "/photos/image-5.png" },
      { type: "image", src: "/photos/image-9.png" },
      { type: "video", src: "/photos/video-5.mp4" },
      { type: "image", src: "/photos/image-10.png" },
      { type: "image", src: "/photos/image-11.png" },
      { type: "image", src: "/photos/image-7.jpg" },
      { type: "image", src: "/photos/image-6.png" },
    ],
    [],
  );

  const imageUrls = useMemo(
    () => mediaItems.filter(item => item.type === "image").map(item => item.src),
    [mediaItems]
  );

  const { isLoading: isPreloading, progress: preloadProgress } = useImagePreloader(imageUrls);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    if (!isLoading && !hasAnimated && rotation === 165) {
      const animationTimer = setTimeout(() => {
        setRotation(rotation - 179);
        setHasAnimated(true);
      }, 80);
      return () => clearTimeout(animationTimer);
    } else if (!isLoading && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isLoading, hasAnimated, rotation, setRotation, setHasAnimated]);

  const handleMediaLoad = useCallback(
    (index: number) => {
      addLoadedItem(index);
      setLoadedItems(prev => new Set([...prev, index]));
      setImageLoadingStates(prev => ({ ...prev, [index]: 'loaded' }));
    },
    [addLoadedItem]
  );

  const handleMediaError = useCallback(
    (index: number) => {
      addErrorItem(index);
      setImageLoadingStates(prev => ({ ...prev, [index]: 'error' }));
    },
    [addErrorItem]
  );

  const handleImageLoadStart = useCallback((index: number) => {
    setImageLoadingStates(prev => ({ ...prev, [index]: 'loading' }));
  }, []);

  const allItemsErrored = errorItems.size === mediaItems.length;

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setStartX(e.clientX);
      setCurrentRotation(rotation);
    },
    [rotation, setIsDragging, setStartX, setCurrentRotation]
  );

  const handleTouchStart = useCallback(
    (e: ReactTouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setCurrentRotation(rotation);
    },
    [rotation, setIsDragging, setStartX, setCurrentRotation]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const rotationDelta = deltaX * 0.5;
      setRotation(currentRotation + rotationDelta);
    },
    [isDragging, startX, currentRotation, setRotation],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const deltaX = e.touches[0].clientX - startX;
      const rotationDelta = deltaX * 0.5;
      setRotation(currentRotation + rotationDelta);
    },
    [isDragging, startX, currentRotation, setRotation],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleWheel = useCallback(
    (e: ReactWheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const targetRotation = rotation - delta * 0.5;
      setRotation(targetRotation);
    },
    [rotation, setRotation]
  );

  useEffect(() => {
    const videos = containerRef.current?.querySelectorAll("video");
    const ensureVideoPlay = (video: HTMLVideoElement) => {
      const playVideo = () => {
        video.play().catch(() => { });
      };
      video.addEventListener("pause", playVideo);
      video.addEventListener("loadeddata", playVideo);
      playVideo();
      return () => {
        video.removeEventListener("pause", playVideo);
        video.removeEventListener("loadeddata", playVideo);
      };
    };

    const cleanupFunctions: (() => void)[] = [];
    videos?.forEach((video) => {
      const cleanup = ensureVideoPlay(video as HTMLVideoElement);
      if (cleanup) cleanupFunctions.push(cleanup);
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [mediaItems, isLoading]);

  useEffect(() => {
    if (!isDragging) return;
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    const preventNavigation = (e: WheelEvent) => {
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventNavigation, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventNavigation);
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 relative overflow-hidden bg-gray-100">
        {isLoading || isPreloading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <Spinner />
              <div className="mt-4 text-sm text-gray-500 flex items-center justify-center">
                {isPreloading ? (
                  <>Loading photos...</>
                ) : (
                  "Preparing gallery..."
                )}
              </div>
            </div>
          </div>
        ) : allItemsErrored ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Oops! Sorry, Unable to load photos
              </h3>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-6">
            <div
              ref={containerRef}
              className="cursor-grab active:cursor-grabbing touch-none"
              style={{ 
                perspective: "1200px", 
                width: `${size}px`, 
                height: `${size}px`,
                touchAction: "none"
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onWheel={handleWheel}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotation}deg)`,
                  transformOrigin: "50% 50%",
                  transition: isDragging
                    ? "none"
                    : "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                {mediaItems.map((item, index) => {
                  const angle = (360 / mediaItems.length) * index;
                  const translateZ = Math.max(115, size * 0.28);
                  return (
                    <div
                      key={index}
                      className="absolute rounded-xl overflow-hidden"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${translateZ}px) rotateY(270deg)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {item.type === "image" ? (
                        <div className="relative w-full h-full">
                          {imageLoadingStates[index] !== 'loaded' && (
                            <ImageSkeletonCard
                              width={cardWidth}
                              height={cardHeight}
                              className="absolute inset-0"
                            />
                          )}
                          <Image
                            src={item.src}
                            alt={`Media ${index + 1}`}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${
                              imageLoadingStates[index] === 'loaded' ? 'opacity-100' : 'opacity-0'
                            }`}
                            draggable={false}
                            width={cardWidth}
                            height={cardHeight}
                            priority={index < 3}
                            loading={index < 3 ? "eager" : "lazy"}
                            onLoadStart={() => handleImageLoadStart(index)}
                            onLoad={() => handleMediaLoad(index)}
                            onError={() => handleMediaError(index)}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+eq/wDVMwP0W4E8Rh7lEu/RWcNF4E0v/2Q=="
                          />
                          {imageLoadingStates[index] === 'error' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
                              Failed to load
                            </div>
                          )}
                        </div>
                      ) : (
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          playsInline
                          autoPlay
                          loop
                          muted
                          onCanPlay={() => handleMediaLoad(index)}
                          onError={() => handleMediaError(index)}
                        />
                      )}
                      <div
                        className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl"
                        style={{
                          transform: "rotateY(180deg)",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <div className="flex items-center justify-center h-full">
                          <div className="text-white/40 text-sm font-mono">
                            {item.type === "image" ? "Photo" : "Video"}{" "}
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span>
            {mediaItems.filter((item) => item.type === "image").length} Photos
          </span>
          <span>
            {mediaItems.filter((item) => item.type === "video").length} Live
            Photos
          </span>
        </div>
        <span>{isTouchDevice() ? "Touch and drag to explore the carousel" : "Drag or scroll to explore the carousel"}</span>
      </div>
    </div>
  );
}
