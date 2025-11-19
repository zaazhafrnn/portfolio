"use client";
import { Safari } from "@/components/ui/safari";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import SafariApp, {
  SAFARI_PROJECTS,
  SafariProjectKey,
} from "./index";

const SafariLauncher: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    React.useState<SafariProjectKey | null>(null);

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <motion.div
            key={`project-${selectedProject}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="size-full"
          >
            <SafariApp
              project={selectedProject}
              onBack={() => setSelectedProject(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="safari-home"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="size-full"
          >
            <Safari url="github.com/zaazhafrnn" className="size-full">
              <div className="flex h-full flex-col bg-[#f5f5f7] text-[#0d0d0d] dark:bg-[#050505] dark:text-white">
                <header className="border-b border-black/5 bg-white/70 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                  <p className="text-sm uppercase tracking-[0.4em] text-black/50 dark:text-white/50">
                    Featured work
                  </p>
                  <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h1 className="text-3xl font-semibold sm:text-4xl">
                        Choose a story to dive into
                      </h1>
                      <p className="mt-2 max-w-3xl text-base text-black/60 dark:text-white/60">
                        This Safari window mirrors the real demo flows. Click a card
                        to immerse into the live walkthrough inside the same frame.
                      </p>
                    </div>
                    <div className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/70 shadow-sm dark:border-white/10 dark:text-white/70">
                      Live inside Safari
                    </div>
                  </div>
                </header>
                <div className="flex-1 overflow-auto p-6">
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {(
                      Object.entries(SAFARI_PROJECTS) as [
                        SafariProjectKey,
                        (typeof SAFARI_PROJECTS)[SafariProjectKey]
                      ][]
                    ).map(([key, meta]) => {
                      const disabled = meta.status !== "ready";
                      return (
                        <motion.button
                          key={key}
                          disabled={disabled}
                          whileHover={disabled ? undefined : { translateY: -6 }}
                          whileTap={disabled ? undefined : { scale: 0.98 }}
                          onClick={() => {
                            if (!disabled) {
                              setSelectedProject(key);
                            }
                          }}
                          className={[
                            "group flex h-full flex-col rounded-3xl border border-black/5 bg-white/90 p-6 text-left shadow-lg ring-1 ring-black/5 transition dark:border-white/5 dark:bg-white/5 dark:ring-white/5",
                            disabled ? "opacity-60 cursor-not-allowed" : "hover:ring-black/10 dark:hover:ring-white/20",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                            <span>{meta.subtitle}</span>
                            <span
                              className={`rounded-full px-3 py-1 text-[10px] tracking-tight ${
                                disabled
                                  ? "bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/60"
                                  : "bg-black text-white dark:bg-white dark:text-black"
                              }`}
                            >
                              {disabled ? "Soon" : "Live"}
                            </span>
                          </div>
                          <h3 className="mt-5 text-2xl font-semibold text-black dark:text-white">
                            {meta.name}
                          </h3>
                          <p className="mt-3 text-sm text-black/60 dark:text-white/70">
                            {meta.summary}
                          </p>
                          <div className="mt-6 flex flex-1 items-end justify-between pt-4 text-sm">
                            <div className="flex flex-col text-xs text-black/50 dark:text-white/60">
                              <span>Hosted preview</span>
                              <span className="font-medium text-black/80 dark:text-white/80">
                                {meta.url.replace("https://", "")}
                              </span>
                            </div>
                            <div
                              className={[
                                "rounded-full px-4 py-2 text-sm font-medium transition",
                                disabled
                                  ? "bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/60"
                                  : "bg-black text-white group-hover:bg-black/90 dark:bg-white dark:text-black dark:group-hover:bg-white/90",
                              ].join(" ")}
                            >
                              {disabled ? "Stay tuned" : "Immerse"}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Safari>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SafariLauncher;
