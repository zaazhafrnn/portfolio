"use client";
import { useEffect, useState } from "react";

export default function MobilePreventionScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] p-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <img
            src="/icons/finder.png"
            alt="Finder Icon"
            width={70}
            height={70}
            className="mx-auto mb-6"
            draggable={false}
          />
        </div>

        <h1 className="text-2xl font-semibold text-white mb-4">
          Desktop Experience Required
        </h1>

        <p className="text-gray-300 leading-relaxed mb-6">
          This portfolio is designed exclusively for desktop viewing.
          Please open this site on your desktop or laptop for the optimal experience.
        </p>

        <div className="flex items-center justify-center space-x-6 text-gray-500 mb-8">
          <div className="flex flex-col items-center">
            <img
              src="/icons/safari.png"
              alt="Safari Icon"
              width={32}
              height={32}
              className="mb-2 opacity-50"
              draggable={false}
            />
            <span className="text-xs">Safari</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/icons/docs.png"
              alt="Docs Icon"
              width={32}
              height={32}
              className="mb-2 opacity-50"
              draggable={false}
            />
            <span className="text-xs">Resume</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/icons/folder.png"
              alt="Portfolio Icon"
              width={32}
              height={32}
              className="mb-2 opacity-50"
              draggable={false}
            />
            <span className="text-xs">Portfolio</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Waiting for desktop display...</span>
          </div>

          <p className="text-gray-500 text-sm">
            <span
              onClick={() => window.open("https://github.com/zaazhafrnn", "_blank")}
              className="text-blue-400 hover:text-blue-300 cursor-pointer underline decoration-dotted underline-offset-2 transition-colors"
            >
              @zaazhafrnn
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}