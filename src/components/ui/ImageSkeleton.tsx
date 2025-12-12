"use client";

interface ImageSkeletonProps {
  width: number;
  height: number;
  className?: string;
}

export default function ImageSkeleton({ width, height, className = "" }: ImageSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded-xl ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400 text-xs">Loading...</div>
      </div>
    </div>
  );
}

export function ImageSkeletonCard({ width, height, className = "" }: ImageSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center space-y-2 p-4">
      </div>
    </div>
  );
}