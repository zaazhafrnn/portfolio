"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Position } from "@/types";
import { getResponsiveWindowSizes, isTouchDevice } from "@/lib/device-utils";
import { Minus, X } from "lucide-react";
import React, { FC, useEffect, useState } from "react";

interface WindowProps {
  id: number;
  title: string;
  position: Position;
  zIndex: number;
  isFocused: boolean;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  onMouseDown: (e: React.MouseEvent<Element>, id: number) => void;
  onBringToFront: (id: number) => void;
  children: React.ReactNode;
  customToolbarLeft?: React.ReactNode;
  customToolbarRight?: React.ReactNode;
  showDefaultButtons?: boolean;
  width?: number;
  height?: number;
  toolbarVariant?: "default" | "transparent" | "hidden";
}

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

const TrafficLights: FC<{
  id: number;
  isFocused: boolean;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
}> = ({ id, isFocused, onClose, onMinimize }) => (
  <div
    className={`flex gap-1 group ${isFocused ? "" : "opacity-60 pointer-events-none"
      }`}
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            className="py-1 px-0.25 cursor-pointer"
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${isFocused
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              <X
                className={`text-red-900 transition-opacity duration-300 ${isFocused ? "group-hover:opacity-100 opacity-0" : "opacity-0"
                  }`}
                size={8}
                strokeWidth={4}
              />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="px-2 py-1 text-white text-xs rounded"
        >
          Close
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
            className="py-1 px-0.25 cursor-pointer"
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${isFocused
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-300 hover:bg-gray-400"
              }`}>
              <Minus
                className={`text-yellow-900 transition-opacity duration-300 ${isFocused ? "group-hover:opacity-100 opacity-0" : "opacity-0"
                  }`}
                size={8}
                strokeWidth={4}
              />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="px-2 py-1 text-white text-xs rounded"
        >
          Minimize
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <div className="py-1 px-0.25">
      <div className="w-3 h-3 bg-gray-300 rounded-full" />
    </div>
  </div>
);

const Window: FC<WindowProps> = ({
  id,
  title,
  position,
  zIndex,
  isFocused,
  onClose,
  onMinimize,
  onMouseDown,
  onBringToFront,
  children,
  customToolbarLeft,
  customToolbarRight,
  showDefaultButtons = true,
  width,
  height,
  toolbarVariant = "default",
}) => {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  const baseWidth = width ?? DEFAULT_WIDTH;
  const baseHeight = height ?? DEFAULT_HEIGHT;
  const { width: w, height: h } = getResponsiveWindowSizes(baseWidth, baseHeight);

  return (
    <div
      className="absolute bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: w,
        height: h,
        zIndex,
      }}
      onClick={() => onBringToFront(id)}
    >
      {toolbarVariant === "default" && (
        <div
          className={`h-8 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 ${isTouch ? 'cursor-grab touch-none' : 'cursor-grabbing'}`}
          onMouseDown={(e) => onMouseDown(e, id)}
          onTouchStart={(e) => onMouseDown(e as any, id)}
        >
          <div className="flex items-center gap-2">
            {showDefaultButtons && (
              <TrafficLights
                id={id}
                isFocused={isFocused}
                onClose={onClose}
                onMinimize={onMinimize}
              />
            )}
            {customToolbarLeft && (
              <div className="flex items-center gap-1 ml-2">
                {customToolbarLeft}
              </div>
            )}
          </div>

          <span className="text-sm font-medium text-gray-700 absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
            {title}
          </span>

          <div className="flex items-center gap-1">{customToolbarRight}</div>
        </div>
      )}

      {toolbarVariant === "transparent" && (
        <div
          className={`absolute top-0.5 left-0 right-0 h-8 flex items-center px-3 ${isTouch ? 'cursor-grab touch-none' : 'cursor-grabbing'} bg-transparent z-10`}
          onMouseDown={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, a, [role="button"]')) {
              return;
            }
            onMouseDown(e, id);
          }}
          onTouchStart={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, a, [role="button"]')) {
              return;
            }
            onMouseDown(e as any, id);
          }}
        >
          <div className="flex items-center gap-2">
            {showDefaultButtons && (
              <TrafficLights
                id={id}
                isFocused={isFocused}
                onClose={onClose}
                onMinimize={onMinimize}
              />
            )}
            {customToolbarLeft && (
              <div className="flex items-center gap-1 ml-2" onClick={(e) => e.stopPropagation()}>
                {customToolbarLeft}
              </div>
            )}
          </div>
          {customToolbarRight && (
            <div className="flex items-center gap-1 ml-auto" onClick={(e) => e.stopPropagation()}>
              {customToolbarRight}
            </div>
          )}
        </div>
      )}

      {toolbarVariant === "hidden" && (
        <div
          className={`absolute top-0 left-0 right-0 h-6 ${isTouch ? 'cursor-grab touch-none' : 'cursor-grab active:cursor-grabbing'}`}
          onMouseDown={(e) => onMouseDown(e, id)}
          onTouchStart={(e) => onMouseDown(e as any, id)}
        />
      )}

      <div
        className={`${toolbarVariant === "default" ? "h-[calc(100%-2rem)]" : "h-full"
          } overflow-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;
