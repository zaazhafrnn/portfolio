"use client";
import { Spinner } from "@/components/ui/spinner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useMemo, useState } from "react";

export default function SystemInfoApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const version = useMemo(() => {
    const birthDate = new Date(2007, 5, 18);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return `${years}.${months}.${days}`;
  }, []);

  useEffect(() => {
    const checkVideo = async () => {
      try {
        const response = await fetch("/photos/video-3.mp4", { method: "HEAD" });
        if (response.ok) {
          setIsLoading(false);
        } else {
          throw new Error("Video not found");
        }
      } catch (err) {
        setError("Unable to load system information");
        setIsLoading(false);
      }
    };

    checkVideo();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-neutral-50 w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-50 w-full h-full flex items-center justify-center">
        <div className="text-center p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Oops! Sorry, Unable to load system information
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 w-full h-full flex flex-col">
      <div className="grid grid-cols-3 p-8">
        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-[180px] rounded-full flex items-center justify-center overflow-hidden border-4 border-gray-400">
            <video
              src={"/photos/video-3.mp4"}
              className="w-full h-full scale-120 right-0 object-cover rounded-full"
              playsInline
              autoPlay
              loop
              muted
            />
          </div>
        </div>

        <div className="col-span-2 space-y-3 pl-8">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">
              Achmad Zhafran Alysyam
            </h1>
            <p className="text-xs">
              Version{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span>{version}</span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="px-2 py-1 text-white text-xs rounded"
                  >
                    day. old.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{" "}
              Centennials
            </p>
          </div>

          <div className="space-y-0.5 text-xs">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoRow label="MacBook Pro" value="(M1 Pro, 14-inch)" />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="px-2 py-1 text-white text-xs rounded"
                >
                  MAMAA MAU INII! 🥺
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <InfoRow
              label="Work Experience"
              value="10+ months – more or less"
            />
            <InfoRow
              label="Expertise"
              value="So Far Most Likely in Frontend Development"
            />
            <InfoRow
              label="Collage"
              value="Politeknik Perkapalan Negeri Surabaya"
            />
            <InfoRow label="Major" value="Automation Engineering" />
            <InfoRow label="Cohort" value="2025 (1st Year)" />
            <InfoRow label="Location" value="Surabaya, Indonesia" />
            <InfoRow
              label="Contact"
              value={
                <span>
                  <span
                    onClick={() =>
                      window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=zaazhafrnn@gmail.com&su=Hai! From your portfolio!`,
                        "_blank",
                      )
                    }
                    className="select-text cursor-pointer hover:text-blue-500 hover:underline transition-colors"
                  >
                    zaazhafrnn@gmail.com
                  </span>
                  <span className="select-none"> or DM </span>
                  <span
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/zaazhafrnn",
                        "_blank",
                      )
                    }
                    className="select-text cursor-pointer hover:text-blue-500 hover:underline transition-colors"
                  >
                    @zaazhafrnn
                  </span>
                </span>
              }
            />
          </div>

          <div className="space-x-3 pt-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="px-2 h-5 bg-neutral-50 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors border border-gray-300 cursor-pointer"
                    onClick={() => window.open("/folder/Resume.pdf", "_blank")}
                  >
                    View Resume...
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="px-2 py-1 text-white text-xs rounded"
                >
                  Open resume in new tab
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="px-2 h-5 bg-neutral-50 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors border border-gray-300 cursor-pointer"
                    onClick={() =>
                      window.open("https://github.com/zaazhafrnn", "_blank")
                    }
                  >
                    Simply Lovely...
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="px-2 py-1 text-white text-xs rounded"
                >
                  View GitHub profile
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">
        ™ and © 2025 Achmad Zhafran Alysyam. All Rights Reserved. Portfolio
        License Agreement
      </p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <span className="text-gray-900 font-medium w-28">{label}</span>
      <span className="pl-2 text-gray-600">{value}</span>
    </div>
  );
}
