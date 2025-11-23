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
  const [error, setError] = useState<string | null>(null);
  const [lastModified, setLastModified] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });

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
        const response = await fetch(resumePhotoPath, { method: "HEAD" });
        if (response.ok) {
          const lastMod = response.headers.get("last-modified");
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
          throw new Error("PDF not found");
        }
      } catch (err) {
        setError(
          "Unable to load Resume.",
        );
        setIsLoading(false);
      }
    };

    checkPdfFile();
  }, []);

  return (
    <div
      className={`h-full flex flex-col bg-white ${className}`}
      ref={containerRef}
    >
      <div className="flex-1 relative overflow-hidden bg-gray-100">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Spinner />
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
                <Image
                  src="/folder/resume@3x.jpg"
                  alt="Resume"
                  width={2000}
                  height={2000}
                  className="shadow-2xl rounded-lg w-[600px] h-auto"
                />
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
