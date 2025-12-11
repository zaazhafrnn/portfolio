"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [now, setNow] = useState<Date | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(new Date());
    updateNow();

    const interval = setInterval(updateNow, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const dateStr = now
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .replace(",", "");

  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleRestart = () => {
    sessionStorage.removeItem("hasSeenSplash");
    sessionStorage.removeItem("hasSeenFullscreenPrompt");
    window.location.reload();
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-8.5 bg-black/2 backdrop-blur-sm border-b border-black/20 z-50">
      <div className="flex items-center justify-between h-full px-4 text-black text-base">
        <div className="flex items-center gap-4 translate-y-0.5">
          <Image
            src="/icons/apple-logo-black.svg"
            className="mb-1"
            alt="My Icon"
            width={18}
            height={18}
          />
          <span className="font-semibold -ml-2">{`Achmad Zhafran's Portfolio`}</span>
          <span>File</span>
          <span>Edit</span>

          {/* View Menu */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("view")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <span className="hover:bg-black/10 px-1 rounded cursor-default">
              View
            </span>
            {openMenu === "view" && (
              <div className="absolute left-0 w-fit bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <button
                  className="w-full text-left px-3 py-2 text-xs whitespace-nowrap hover:bg-gray-100"
                  onClick={handleRestart}
                >
                  Reload & Show Splash Screen
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span>{dateStr}</span>
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
