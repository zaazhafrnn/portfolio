"use client";

import { useEffect, useState } from "react";

interface ImagePreloaderProps {
  images: string[];
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}

export default function ImagePreloader({ 
  images, 
  onProgress, 
  onComplete 
}: ImagePreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let completed = 0;
    const total = images.length;

    if (total === 0) {
      onComplete?.();
      return;
    }

    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          completed += 1;
          setLoadedCount(completed);
          onProgress?.(completed, total);
          if (completed === total) {
            onComplete?.();
          }
          resolve();
        };
        img.onerror = () => {
          completed += 1;
          setLoadedCount(completed);
          onProgress?.(completed, total);
          if (completed === total) {
            onComplete?.();
          }
          resolve();
        };
        img.src = src;
      });
    };

    const priorityImages = images.slice(0, 3);
    const remainingImages = images.slice(3);

    Promise.all(priorityImages.map(loadImage)).then(() => {
      remainingImages.forEach((src, index) => {
        setTimeout(() => loadImage(src), index * 100);
      });
    });

  }, [images, onProgress, onComplete]);

  return null;
}

export function useImagePreloader(images: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    let loaded = 0;
    const total = images.length;

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded += 1;
          setProgress((loaded / total) * 100);
          if (loaded === total) {
            setIsLoading(false);
          }
          resolve();
        };
        img.src = src;
      });
    };

    const priorityImages = images.slice(0, 3);
    const otherImages = images.slice(3);

    Promise.all(priorityImages.map(preloadImage)).then(() => {
      otherImages.forEach((src, index) => {
        setTimeout(() => preloadImage(src), index * 50);
      });
    });

  }, [images]);

  return { isLoading, progress };
}