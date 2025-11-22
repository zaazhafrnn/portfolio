"use client";
import {
  ATMApp,
  PhotosApp,
  ResumeApp,
  SafariLauncher,
  SystemInfoApp,
} from "@/components/apps";
import { useSafariStore } from "@/stores/safariStore";
import DesktopBackground from "@/components/mac/DesktopBackground";
import TopBar from "@/components/mac/TopBar";
import WindowInstances from "@/components/mac/WindowInstances";
import SplashScreen from "@/components/ui/SplashScreen";
import { useWindowManager } from "@/hooks/useWindowManager";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const MacOSDock = dynamic(
  () => import("@/components/ui/mac-os-dock").then((mod) => mod.MacOSDock),
  { ssr: false },
);

const apps = [
  { id: "finder", name: "Finder", icon: "/icons/finder.png" },
  { id: "photos", name: "Photo Dumps", icon: "/icons/photos.png" },
  { id: "resume", name: "Resume.pdf", icon: "/icons/docs.png" },
  { id: "systemInfo", name: "System Information", icon: "/icons/settings.png" },
  {
    id: "safari",
    name: "Safari",
    icon: "/icons/safari.png",
  },
  {
    id: "atmProject",
    name: "Portfolio (ATM Simulator)",
    icon: "/icons/folder.png",
  },
  { id: "folder", name: "Documents", icon: "/icons/weather.png" },
];

const WINDOW_SIZES: Record<string, { width: number; height: number }> = {
  // default = { width: 600, height: 400 };
  resume: { width: 660, height: 530 },
  systemInfo: { width: 660, height: 368 },
  atmProject: { width: 600, height: 500 },
  mBankingProject: { width: 750, height: 470 },
  safari: { width: 880, height: 570 }
};

export default function MacOSDesktopWrapper() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem("hasSeenSplash", "true");
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return <MacOSDesktop />;
}

function MacOSDesktop() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    closeAllWindows,
    reloadWindow: reloadWindowFromManager,
    bringToFront,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    bouncingApps,
    stopBouncingForApp,
  } = useWindowManager();

  const [windowToolbarContent, setWindowToolbarContent] = useState<{
    [windowId: number]: {
      left?: React.ReactNode;
      right?: React.ReactNode;
    };
  }>({});

  const cleanupSafariStates = useSafariStore((state) => state.cleanupClosedWindows);
  useEffect(() => {
    const openWindowIds = windows.map((w) => w.id);
    cleanupSafariStates(openWindowIds);
  }, [windows, cleanupSafariStates]);

  const handleToolbarLeftChange = useCallback((
    windowId: number,
    content: React.ReactNode,
  ) => {
    setWindowToolbarContent((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], left: content },
    }));
  }, []);

  const handleToolbarRightChange = useCallback((
    windowId: number,
    content: React.ReactNode,
  ) => {
    setWindowToolbarContent((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], right: content },
    }));
  }, []);

  const createToolbarCallback = useCallback((windowId: number) => {
    return (content: React.ReactNode) => {
      handleToolbarLeftChange(windowId, content);
    };
  }, [handleToolbarLeftChange]);

  const getWindowContent = useCallback((appId: string, windowId: number) => {
    switch (appId) {
      case "photos":
        return <PhotosApp />;
      case "resume":
        return (
          <ResumeApp
            onToolbarLeftChange={(content) =>
              handleToolbarLeftChange(windowId, content)
            }
            onToolbarRightChange={(content) =>
              handleToolbarRightChange(windowId, content)
            }
          />
        );
      case "systemInfo":
        return <SystemInfoApp />;
      case "safari":
        return (
          <SafariLauncher
            windowId={windowId}
            onToolbarLeftChange={createToolbarCallback(windowId)}
          />
        );
      case "atmProject":
        return <ATMApp />;
      default:
        return (
          <div className="p-6 h-full flex items-center justify-center">
            <p className="text-gray-500">Content for {appId}</p>
          </div>
        );
    }
  }, [handleToolbarLeftChange, handleToolbarRightChange, createToolbarCallback]);

  const openAppIds = windows.map((w) => w.appId);

  const handleAppClick = (appId: string) => {
    const app = apps.find((a) => a.id === appId);
    if (!app) return;
    openWindow(app.id, app.name);
  };

  const handleCloseAllWindows = () => {
    closeAllWindows();
  };

  const minimizeAllWindows = () => {
    windows.forEach((w) => !w.isMinimized && minimizeWindow(w.id));
  };

  const reloadWindow = useCallback((windowId: number) => {
    const window = windows.find((w) => w.id === windowId);
    if (!window) return;

    const { appId, title } = window;

    if (appId === "safari") {
      const clearSafariState = useSafariStore.getState().clearState;
      clearSafariState(windowId);
    }

    reloadWindowFromManager(windowId, appId, title);
  }, [windows, reloadWindowFromManager]);

  return (
    <div
      className="h-screen w-screen bg-gray-50 relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <DesktopBackground
        windows={windows}
        handleCloseAllWindows={handleCloseAllWindows}
        minimizeAllWindows={minimizeAllWindows}
      />

      <WindowInstances
        windows={windows}
        closeWindow={closeWindow}
        minimizeWindow={minimizeWindow}
        handleMouseDown={handleMouseDown}
        bringToFront={bringToFront}
        stopBouncingForApp={stopBouncingForApp}
        getWindowContent={getWindowContent}
        windowToolbarContent={windowToolbarContent}
        WINDOW_SIZES={WINDOW_SIZES}
        reloadWindow={reloadWindow}
      />

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex justify-center">
          <MacOSDock
            apps={apps}
            onAppClick={handleAppClick}
            openApps={openAppIds}
            bouncingApps={bouncingApps}
            stopBounce={stopBouncingForApp}
            windows={windows}
            closeApp={closeWindow}
            minimizeApp={minimizeWindow}
          />
        </div>
      </div>

      <TopBar />
    </div>
  );
}
