"use client";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AppleHelloEnglishEffect } from "./apple-hello-effect";
import { WritingText } from "./writing-text";

export default function SplashScreen({
  onFinish,
  helloDuration = 4500,
  typingDuration = 4800,
  swapDelay = 1700,
  disclaimerDelay = 1600,
  exitDelay = 10000,
}: {
  onFinish: () => void;
  helloDuration?: number;
  typingDuration?: number;
  swapDelay?: number;
  disclaimerDelay?: number;
  exitDelay?: number;
}) {
  const [phase, setPhase] = useState<
    "hello" | "typing" | "macos" | "apple-inc" | "logo" | "disclaimer"
  >("hello");
  const [progress, setProgress] = useState(0);
  const [showPortfolioWebsite, setShowPortfolioWebsite] = useState(false);
  const [logoTransform, setLogoTransform] = useState(false);
  const [hideProgress, setHideProgress] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), helloDuration);
    return () => clearTimeout(t);
  }, [helloDuration]);

  useEffect(() => {
    if (phase === "typing") {
      const t = setTimeout(() => setPhase("macos"), typingDuration);
      return () => clearTimeout(t);
    }
  }, [phase, typingDuration]);

  useEffect(() => {
    if (phase === "macos") {
      const t = setTimeout(() => setPhase("apple-inc"), swapDelay);
      return () => clearTimeout(t);
    }
  }, [phase, swapDelay]);

  useEffect(() => {
    if (phase === "apple-inc") {
      const t = setTimeout(() => setPhase("logo"), swapDelay);
      return () => clearTimeout(t);
    }
  }, [phase, swapDelay]);

  useEffect(() => {
    if (phase === "logo") {
      const t = setTimeout(() => setPhase("disclaimer"), disclaimerDelay);
      return () => clearTimeout(t);
    }
  }, [phase, disclaimerDelay]);

  useEffect(() => {
    if (phase === "disclaimer") {
      const t = setTimeout(() => onFinish(), exitDelay);
      const logoAppear = setTimeout(
        () => setShowPortfolioWebsite(true),
        exitDelay / 2,
      );
      const logoTransformStart = setTimeout(() => {
        setLogoTransform(true);
        setHideProgress(true);
      }, exitDelay * 0.75);

      return () => {
        clearTimeout(t);
        clearTimeout(logoAppear);
        clearTimeout(logoTransformStart);
      };
    }
  }, [phase, exitDelay, onFinish]);

  useEffect(() => {
    if (phase === "disclaimer") {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          const increment = 100 / (exitDelay / 50);
          return Math.min(prev + increment, 100);
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [phase, exitDelay]);

  return (
    <div className="fixed inset-0 flex flex-col select-none items-center justify-center bg-gray-100 z-[9999]">
      <div
        className={`transition-transform duration-700 ${
          phase !== "hello" ? "-translate-y-5" : "translate-y-10"
        }`}
      >
        {phase === "disclaimer" ? (
          <div className="relative mt-10 w-[200px] h-[20px] flex items-center justify-center">
            <div
              className={`absolute transition-all duration-500 ${
                showPortfolioWebsite ? "opacity-0" : "opacity-100"
              }`}
            >
              <h1 className="text-4xl whitespace-nowrap font-sf">
                Meticulously Designed
              </h1>
              <p className="text-xl whitespace-nowrap font-sf text-gray-700 text-center">
                for every. single. detail.
              </p>
            </div>

            <div
              className={`absolute transition-all duration-1000 ${
                showPortfolioWebsite ? "opacity-100" : "opacity-0"
              } ${logoTransform ? "scale-150" : "scale-100"}`}
              style={{
                transform: logoTransform ? "scale(1.5)" : "scale(1)",
              }}
            >
              <Image
                src="/icons/apple-logo-black.svg"
                alt="Apple logo"
                width={73}
                height={73}
                className="inline-block align-text-bottom"
              />
            </div>
          </div>
        ) : (
          <AppleHelloEnglishEffect speed={1.1} />
        )}
      </div>

      <div className="mt-3 text-center flex items-center justify-center text-2xl font-sf text-gray-800 min-h-[32px]">
        {phase !== "hello" && phase !== "disclaimer" && (
          <>
            <WritingText
              className="text-2xl font-sf text-gray-800"
              text="this portfolio was built, inspired, & dedicated to"
              spacing={9}
            />
            <span className="mb-1 relative inline-block w-[80px] h-[28px]">
              <span
                className={`absolute inset-0 transition-opacity font-semibold duration-500 ${
                  phase === "macos" ? "opacity-100" : "opacity-0"
                }`}
              >
                macOS
              </span>
              <span
                className={`absolute inset-0 transition-opacity font-semibold whitespace-nowrap duration-500 ${
                  phase === "apple-inc" ? "opacity-100" : "opacity-0"
                }`}
              >
                Apple Inc.
              </span>
              <span
                className={`absolute inset-0 flex items-center -translate-x-7 translate-y-0.5 justify-center transition-opacity duration-500 ${
                  phase === "logo" ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src="/icons/apple-logo-black.svg"
                  alt="Apple logo"
                  width={24}
                  height={24}
                  className="inline-block align-text-bottom"
                />
              </span>
            </span>
          </>
        )}
      </div>

      {phase === "disclaimer" && (
        <>
          <div
            className={`w-[26%] max-w-md transition-opacity duration-500 ${
              hideProgress ? "opacity-0" : "opacity-100"
            }`}
          >
            <Progress value={progress} className="h-1" />
          </div>

          <div className="absolute bottom-6 text-sm text-gray-500 text-center px-6">
            Note: This portfolio features rich animations that may impact
            performance on some devices. For the best experience, press F11 for
            fullscreen mode. Enjoy surfing!
          </div>
        </>
      )}
    </div>
  );
}
