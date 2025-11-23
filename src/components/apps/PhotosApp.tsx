"use client";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import {
  MouseEvent as ReactMouseEvent,
  WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { usePhotosStore } from "@/stores/photosStore";

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
    },
    [addLoadedItem]
  );

  const handleMediaError = useCallback(
    (index: number) => {
      addErrorItem(index);
    },
    [addErrorItem]
  );

  const allItemsErrored = errorItems.size === mediaItems.length;

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setStartX(e.clientX);
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

  const handleMouseUp = useCallback(() => {
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
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Spinner />
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
              className="cursor-grab active:cursor-grabbing"
              style={{ perspective: "1200px", width: "400px", height: "400px" }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
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
                  const translateZ = 115;
                  return (
                    <div
                      key={index}
                      className="absolute w-48 h-64 rounded-xl overflow-hidden"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${translateZ}px) rotateY(270deg)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {item.type === "image" ? (
                        <Image
                          src={item.src}
                          alt={`Media ${index + 1}`}
                          className="w-full h-full object-cover"
                          draggable={false}
                          width={208}
                          height={208}
                          onLoad={() => handleMediaLoad(index)}
                          onError={() => handleMediaError(index)}
                        />
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
        <span>Drag or scroll to explore the carousel</span>
      </div>
    </div>
  );
}
