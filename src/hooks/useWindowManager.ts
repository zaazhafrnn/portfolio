"use client";
import type { DragState, MouseEventHandler, WindowData } from "@/types";
import { isTouchDevice, getDeviceType, getResponsiveWindowSizes } from "@/lib/device-utils";
import { useCallback, useState, useMemo } from "react";

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [nextWindowId, setNextWindowId] = useState<number>(1);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    offset: { x: 0, y: 0 },
  });

  const reindexWindows = (winList: WindowData[]) => {
    return winList.map((w, i) => ({ ...w, zIndex: i + 1 }));
  };

  const stopBouncingForApp = useCallback((appId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.appId === appId ? { ...w, isBouncing: false } : w
      )
    );
  }, []);

  const bringToFront = useCallback(
    (windowId: number) => {
      const target = windows.find((w) => w.id === windowId);
      if (!target) return;

      const others = windows.filter((w) => w.id !== windowId);
      const reordered = [...others, { ...target, isBouncing: false }];
      setWindows(reindexWindows(reordered));
    },
    [windows],
  );

  const minimizeWindow = useCallback((windowId: number) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? { ...w, isMinimized: !w.isMinimized, isBouncing: false } // Stop bouncing
          : w
      ),
    );
  }, []);

  const getInitialPosition = useCallback(() => {
    const deviceType = getDeviceType();
    const baseOffset = windows.length * 30;
    
    if (deviceType === "ipad" || deviceType === "tablet") {
      const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 768;
      
      return {
        x: Math.max(20, (viewportWidth * 0.1) + baseOffset),
        y: Math.max(60, (viewportHeight * 0.1) + baseOffset),
      };
    } else if (deviceType === "mobile") {
      return {
        x: 10 + baseOffset,
        y: 50 + baseOffset,
      };
    }
    
    return {
      x: 100 + baseOffset,
      y: 100 + baseOffset,
    };
  }, [windows.length]);

  const openWindow = useCallback(
    (appId: string, title: string) => {
      const existingWindow = windows.find((w) => w.appId === appId);

      if (existingWindow) {
        bringToFront(existingWindow.id);
        if (existingWindow.isMinimized) {
          minimizeWindow(existingWindow.id);
        }
        return;
      }

      const defaultSize = getResponsiveWindowSizes(600, 400);

      const newWindow: WindowData = {
        id: nextWindowId,
        appId,
        title,
        position: getInitialPosition(),
        size: defaultSize,
        isMinimized: false,
        isBouncing: true,
        zIndex: 0,
      };

      const updated = [...windows, newWindow];
      setWindows(reindexWindows(updated));
      setNextWindowId((prev) => prev + 1);
    },
    [windows, nextWindowId, bringToFront, minimizeWindow, getInitialPosition],
  );

  const closeWindow = useCallback(
    (windowId: number) => {
      const updated = windows.filter((w) => w.id !== windowId);
      setWindows(reindexWindows(updated));
    },
    [windows],
  );

  const handleMouseDown = useCallback(
    (e: any, windowId: number) => {
      const window = windows.find((w) => w.id === windowId);
      if (!window) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      setDragState({
        isDragging: windowId,
        offset: {
          x: clientX - window.position.x,
          y: clientY - window.position.y,
        },
      });

      stopBouncingForApp(window.appId);
      bringToFront(windowId);
    },
    [windows, bringToFront, stopBouncingForApp],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<Element> | React.TouchEvent<Element>) => {
      if (dragState.isDragging === false) return;
      const window = windows.find((w) => w.id === dragState.isDragging);
      if (!window) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const viewportWidth = typeof window !== "undefined" ? globalThis.window.innerWidth : 1024;
      const viewportHeight = typeof window !== "undefined" ? globalThis.window.innerHeight : 768;
      const windowWidth = window.size.width;
      const windowHeight = window.size.height;
      
      const newX = Math.max(0, Math.min(viewportWidth - windowWidth, clientX - dragState.offset.x));
      const newY = Math.max(0, Math.min(viewportHeight - windowHeight, clientY - dragState.offset.y));

      setWindows((prev) =>
        prev.map((w) =>
          w.id === dragState.isDragging
            ? { ...w, position: { x: newX, y: newY } }
            : w
        ),
      );
    },
    [dragState, windows],
  );

  const handleMouseUp = useCallback(() => {
    setDragState({ isDragging: false, offset: { x: 0, y: 0 } });
  }, []);

  const closeAllWindows = () => {
    setWindows([]);
  };

  const reloadWindow = useCallback(
    (windowId: number, appId: string, title: string) => {
      const updated = windows.filter((w) => w.id !== windowId);
      const remainingWindows = reindexWindows(updated);

      const newWindow: WindowData = {
        id: nextWindowId,
        appId,
        title,
        position: {
          x: 100 + remainingWindows.length * 30,
          y: 100 + remainingWindows.length * 30,
        },
        size: { width: 600, height: 400 },
        isMinimized: false,
        isBouncing: true,
        zIndex: 0,
      };

      const finalWindows = [...remainingWindows, newWindow];
      setWindows(reindexWindows(finalWindows));
      setNextWindowId((prev) => prev + 1);
    },
    [windows, nextWindowId],
  );

  const bouncingApps = useMemo(
    () => windows.filter((w) => w.isBouncing).map((w) => w.appId),
    [windows]
  );

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    closeAllWindows,
    reloadWindow,
    bringToFront,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    bouncingApps,
    stopBouncingForApp,
  };
};
