"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Kbd } from "@/components/ui/kbd";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface FullscreenPromptProps {
  onDismiss: () => void;
  onEnterFullscreen: () => void;
}

export default function FullscreenPrompt({ onDismiss, onEnterFullscreen }: FullscreenPromptProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAlreadyFullscreen, setIsAlreadyFullscreen] = useState(false);

  useEffect(() => {
    const checkFullscreen = () => {
      setIsAlreadyFullscreen(!!document.fullscreenElement);
    };
    checkFullscreen();
    document.addEventListener('fullscreenchange', checkFullscreen);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', checkFullscreen);
    };
  }, []);

  useEffect(() => {
    if (isAlreadyFullscreen) {
      handleDismiss();
    }
  }, [isAlreadyFullscreen]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  const handleEnterFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      handleDismiss();
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
      handleDismiss();
    }
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-[10px] cursor-default select-none bg-black/10 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`w-[360px] transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} relative`}>
        <div className="rounded-xl overflow-hidden bg-[#eceff4]/95 shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.12)] border border-gray-300">
          <div className="absolute top-4 right-4 z-[10000]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="w-4 h-4 scale-110 rounded-full bg-gray-300 border border-gray-300 shadow-sm flex items-center justify-center text-gray-800 text-sm font-semibold transition-colors"
                    aria-label="Information about fullscreen mode"
                  >
                    ?
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-[10001]">
                  <p className="text-xs leading-relaxed">
                    GO FULLSCREEN!!!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="px-5 pt-6 pb-5 text-center">
            <div className="flex justify-center mb-4">
              <Image src="/icons/finder.png" alt="Finder" width={84} height={84} />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-2 leading-tight px-3">
              Press <Kbd className="pointer-events-none border border-gray-400 select-none items-center font-medium text-gray-800 bg-white">F11</Kbd> to enter fullscreen
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed px-1 mb-1">
              To get immersive experience, we recommend entering fullscreen mode. You can enter fullscreen mode by pressing F11, or by clicking button in the bellow.
            </p>
          </div>

          <div className="px-4 pb-4">
            <button
              onClick={handleEnterFullscreen}
              className="w-full py-2 text-sm cursor-pointer font-medium text-white rounded-lg transition-all duration-150 opacity-90 hover:opacity-100 active:scale-[0.98] bg-gradient-to-b from-[#007AFF] to-[#0051D5] shadow-[0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]"
            >
              Enter Fullscreen <Kbd className="pointer-events-none h-4 select-none items-center bg-gray-200 font-medium text-gray-800">F11</Kbd>
            </button>
            <button
              onClick={handleDismiss}
              className="w-full mt-1.5 py-2 text-sm cursor-pointer font-medium text-gray-700 rounded-lg transition-all duration-150 hover:brightness-90 active:scale-[0.98] bg-[#d0d0d0] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]"
            >
              Understand, I'll enter fullscreen later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}