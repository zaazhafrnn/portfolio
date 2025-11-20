"use client";
import { Safari } from "@/components/ui/safari";
import { motion } from "framer-motion";
import React from "react";
import ProjectBankingApp from "./projects/ProjectBankingApp";
// import ProjectB from "./projects/ProjectB";

export type SafariProjectKey = "projectBankingApp" | "projectB";

export const SAFARI_PROJECTS: Record<
  SafariProjectKey,
  {
    name: string;
    subtitle: string;
    url: string;
    status: "ready" | "coming-soon";
    summary: string;
  }
> = {
  projectBankingApp: {
    name: "Project Banking System",
    subtitle: "School Project",
    url: "https://github.com/zaazhafrnn/ATM-System.git",
    status: "ready",
    summary:
      "Written in Java, PHP, with MySQL for database. Integrating between 2 platform Java GUI (Desktop) & Web.",
  },
  projectB: {
    name: "AI Workflow Studio",
    subtitle: "Production assistant for creators",
    url: "https://start.zaazhafrnn.dev/ai-studio",
    status: "coming-soon",
    summary: "The walkthrough is in progress. Ping me if you want a preview!",
  },
};

interface SafariAppProps {
  project: SafariProjectKey;
  onBack?: () => void;
}

const SafariApp: React.FC<SafariAppProps> = ({ project, onBack }) => {
  const meta = SAFARI_PROJECTS[project];

  const renderProject = () => {
    switch (project) {
      case "projectBankingApp":
        return <ProjectBankingApp />;
      case "projectB":
        return (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <span className="text-lg font-semibold">
              {meta?.name ?? "Project in progress"}
            </span>
            <p className="text-sm text-muted-foreground max-w-md text-center">
              {meta?.summary}
            </p>
          </div>
        );
      default:
        return (
          <div className="p-4 text-sm text-muted-foreground">
            Project not found.
          </div>
        );
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#fdfdfd] text-[#050505] dark:bg-[#050505] dark:text-white">
      <header className="flex flex-col gap-4 border-b border-black/5 p-6 backdrop-blur-sm dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm uppercase tracking-[0.3em] text-black/60 dark:text-white/60">
            Case study
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              {meta?.name}
            </h1>
            <span className="text-sm text-black/60 dark:text-white/60">
              {meta?.subtitle}
            </span>
          </div>
          <p className="text-sm text-black/60 dark:text-white/60 sm:max-w-2xl">
            {meta?.summary}
          </p>
        </div>
        <div className="flex gap-2">
          {onBack ? (
            <motion.button
              whileHover={{ translateY: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBack}
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black/70 shadow-sm transition hover:bg-black hover:text-white dark:border-white/10 dark:text-white/80 dark:hover:bg-white/10"
            >
              Back to gallery
            </motion.button>
          ) : null}
          <a
            href={meta?.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
          >
            Open in browser
          </a>
        </div>
      </header>
      <div className="flex-1 overflow-auto bg-white p-6 dark:bg-[#0a0a0a]">
        <div className="h-full w-full rounded-3xl border border-black/5 bg-gradient-to-br from-white to-slate-50 shadow-xl ring-1 ring-black/5 dark:border-white/5 dark:from-[#111] dark:to-black dark:ring-white/5">
          {renderProject()}
        </div>
      </div>
    </div>
  );
};

export default SafariApp;
