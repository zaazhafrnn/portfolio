"use client";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Eye, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ResumeAppProps {
  className?: string;
  onToolbarLeftChange?: (content: React.ReactNode) => void;
  onToolbarRightChange?: (content: React.ReactNode) => void;
}

export default function ResumeApp({
  className = "",
  onToolbarLeftChange,
  onToolbarRightChange,
}: ResumeAppProps) {
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastModified, setLastModified] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  const resumePath = "/folder/Resume.pdf";
  const resumePhotoPath = "/folder/resume@3x.jpg";
  const disabled = !!error || isLoading;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const resetZoom = () => {
    setZoom(100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setScrollStart({
      x: scrollContainerRef.current.scrollLeft,
      y: scrollContainerRef.current.scrollTop,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    scrollContainerRef.current.scrollLeft = scrollStart.x - deltaX;
    scrollContainerRef.current.scrollTop = scrollStart.y - deltaY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const toolbarLeft = (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleZoomOut}
              disabled={disabled || zoom <= 50}
              className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-default transition-colors cursor-pointer disabled:pointer-events-none"
            >
              <ZoomOut size={12} strokeWidth={1.7} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="px-2 py-1 text-white text-xs rounded cursor-pointer"
          >
            Zoom Out
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={resetZoom}
              disabled={disabled}
              className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded transition-colors min-w-[40px] cursor-pointer disabled:pointer-events-none"
            >
              {zoom}%
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="px-2 py-1 text-white text-xs rounded cursor-pointer"
          >
            Reset Zoom
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleZoomIn}
              disabled={disabled || zoom >= 200}
              className="p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer disabled:pointer-events-none"
            >
              <ZoomIn size={12} strokeWidth={1.7} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="px-2 py-1 text-white text-xs rounded cursor-pointer"
          >
            Zoom In
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const toolbarRight = (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => window.open(resumePath, "_blank")}
              disabled={disabled}
              className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-default transition-colors cursor-pointer disabled:pointer-events-none"
            >
              <Eye size={12} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="px-2 py-1 text-white text-xs rounded"
          >
            View PDF in New Tab
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={async () => {
                try {
                  const res = await fetch(resumePath);
                  const url = URL.createObjectURL(await res.blob());
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "Achmad Zhafran's Resume.pdf";
                  a.click();
                  URL.revokeObjectURL(url);
                } catch {
                  window.open(resumePath, "_blank");
                }
              }}
              disabled={disabled}
              className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-default transition-colors cursor-pointer disabled:pointer-events-none"
            >
              <Download size={12} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="px-2 py-1 text-white text-xs rounded"
          >
            Download PDF
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  useEffect(() => {
    onToolbarLeftChange?.(toolbarLeft);
    onToolbarRightChange?.(toolbarRight);
  }, [zoom, error, isLoading]);

  useEffect(() => {
    return () => {
      onToolbarLeftChange?.(null);
      onToolbarRightChange?.(null);
    };
  }, []);

  useEffect(() => {
    const checkPdfFile = async () => {
      try {
        // Check both PDF and image availability
        const [pdfResponse, imageResponse] = await Promise.all([
          fetch(resumePath, { method: "HEAD" }),
          fetch(resumePhotoPath, { method: "HEAD" })
        ]);
        
        if (pdfResponse.ok && imageResponse.ok) {
          const lastMod = pdfResponse.headers.get("last-modified") || imageResponse.headers.get("last-modified");
          if (lastMod) {
            const date = new Date(lastMod);
            const now = new Date();
            const isCurrentYear = date.getFullYear() === now.getFullYear();

            setLastModified(
              date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                ...(isCurrentYear ? {} : { year: "numeric" }),
              }),
            );
          } else {
            const today = new Date();
            setLastModified(
              today.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
            );
          }

          setIsLoading(false);
        } else {
          throw new Error("Resume files not found");
        }
      } catch (err) {
        setError("Unable to load Resume.");
        setIsLoading(false);
      }
    };

    checkPdfFile();
  }, []);

  useEffect(() => {
    if (!isLoading && imageLoading) {
      const timeout = setTimeout(() => {
        setImageLoading(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading, imageLoading]);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div
      className={`h-full flex flex-col bg-white ${className}`}
      ref={containerRef}
    >
      <div className="flex-1 relative overflow-hidden bg-gray-100">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <Spinner />
              <div className="text-gray-500 text-sm">Initializing resume viewer...</div>
            </div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Oops! Sorry, Unable to load resume
              </h3>
            </div>
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="h-full overflow-auto"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div className="w-max h-max p-4">
              <div
                style={{
                  transform: `scale(${zoom / 98})`,
                  transformOrigin: "top left",
                  transition: "transform 0.2s ease-out",
                  pointerEvents: 'none',
                }}
              >
                <div className="relative w-[600px] h-auto">
                  {imageLoading && !imageError && (
                    <div className="w-[600px] h-[800px] shadow-2xl rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                      <div className="flex flex-col items-center space-y-4">
                        <Spinner />
                        <div className="text-gray-500 text-sm font-medium">Loading resume...</div>
                      </div>
                    </div>
                  )}
                  {imageError ? (
                    <div className="w-[600px] h-[800px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg shadow-2xl flex flex-col items-center justify-center">
                      <div className="text-gray-500 text-center p-8">
                        <div className="text-4xl mb-4">📄</div>
                        <h3 className="text-lg font-medium mb-2">Resume Preview Unavailable</h3>
                        <p className="text-sm text-gray-400 mb-4">The image couldn't load, but you can still view or download the PDF.</p>
                        <button
                          onClick={() => window.open(resumePath, "_blank")}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Open PDF Instead
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src="/folder/resume@3x.jpg"
                      alt="Resume"
                      width={600}
                      height={800}
                      className={`shadow-2xl rounded-lg transition-opacity duration-500 ${
                        imageLoading ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{ width: '600px', height: 'auto' }}
                      priority
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+eq/wDVMwP0W4E8Rh7lEu/RWcNF4E0v/2Q=="
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span>Page 1 of 1</span>
          <span>.pdf</span>
        </div>
        {/*<span>
          💡 Pro tip: Drag the image wherever you need, or hit the eye icon to
          unleash full PDF experience!
        </span>*/}
        <div className="flex items-center gap-4">
          <span>
            {lastModified
              ? `Last Modified on ${lastModified}`
              : "No file loaded"}
          </span>
          <span>{zoom}%</span>
        </div>
      </div>
    </div>
  );
}
