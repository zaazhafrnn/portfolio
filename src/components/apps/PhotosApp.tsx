"use client";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import {
    MouseEvent as ReactMouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

export default function PhotosApp() {
  const [rotation, setRotation] = useState(-19.9);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState<Set<number>>(new Set());
  const [errorItems, setErrorItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const mediaItems = useMemo(
    () => [
      { type: "image", src: "/photos/image-1.png" },
      { type: "video", src: "/photos/video-1.mp4" },
      { type: "image", src: "/photos/image-2.png" },
      { type: "image", src: "/photos/image-8.jpg" },
      { type: "image", src: "/photos/image-4.png" },
      { type: "video", src: "/photos/video-4.mp4" },
      { type: "image", src: "/photos/image-5.png" },
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
  }, []);

  const handleMediaLoad = useCallback((index: number) => {
    setLoadedItems((prev) => new Set([...prev, index]));
  }, []);

  const handleMediaError = useCallback((index: number) => {
    setErrorItems((prev) => new Set([...prev, index]));
  }, []);

  const allItemsErrored = errorItems.size === mediaItems.length;

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentRotation(rotation);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const rotationDelta = deltaX * 0.5;
      setRotation(currentRotation + rotationDelta);
    },
    [isDragging, startX, currentRotation],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const videos = containerRef.current?.querySelectorAll("video");

    const ensureVideoPlay = (video: HTMLVideoElement) => {
      const playVideo = () => {
        video.play().catch(() => {});
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
            >
              <div
                className="relative w-full h-full transition-transform duration-100"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotation}deg)`,
                  transformOrigin: "50% 50%",
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
        <span>Drag and scroll to explore the carousel</span>
      </div>
    </div>
  );
}
