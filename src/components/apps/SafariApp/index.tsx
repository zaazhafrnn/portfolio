"use client";
import { Safari } from "@/components/ui/safari";
import { motion } from "framer-motion";
import React from "react";
import ProjectBankingApp from "./projects/ProjectBankingApp";
import ProjectLeQuiz from "./projects/ProjectLeQuiz";

export type SafariProjectKey = "projectBankingApp" | "projectLeQuiz" | "projectB";

export const SAFARI_PROJECTS: Record<
  SafariProjectKey,
  {
    name: string;
    subtitle: string;
    url: string;
    status: "ready" | "coming-soon";
    summary: string;
    documentationStyle?: boolean;
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
  projectLeQuiz: {
    name: "Le Quiz",
    subtitle: "Interactive Quiz Platform",
    url: "https://github.com/zaazhafrnn/lms-desktop.git",
    status: "ready",
    summary:
      "An interactive quiz platform similar to a Learning Management System, designed for seamless cross-device experiences between mobile and web.",
    documentationStyle: true,
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
      case "projectLeQuiz":
        return <ProjectLeQuiz />;
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

  const isDocumentationStyle = meta?.documentationStyle ?? false;

  return (
    <div className="flex h-full flex-col bg-[#fdfdfd] text-[#050505]">
      {!isDocumentationStyle && (
        <header className="flex flex-col gap-4 border-b border-black/5 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-sm uppercase tracking-[0.3em] text-black/60">
              Case study
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <h1 className="text-2xl font-semibold sm:text-3xl">
                {meta?.name}
              </h1>
              <span className="text-sm text-black/60">
                {meta?.subtitle}
              </span>
            </div>
            <p className="text-sm text-black/60 sm:max-w-2xl">
              {meta?.summary}
            </p>
          </div>
          <div className="flex gap-2">
            {onBack ? (
              <motion.button
                whileHover={{ translateY: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBack}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black/70 shadow-sm transition hover:bg-black hover:text-white"
              >
                Back to gallery
              </motion.button>
            ) : null}
            <a
              href={meta?.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/80"
            >
              Open in browser
            </a>
          </div>
        </header>
      )}
      <div className="flex-1 overflow-auto bg-white">
        {isDocumentationStyle ? (
          renderProject()
        ) : (
          <div className="h-full w-full p-6">
            <div className="h-full w-full rounded-3xl border border-black/5 bg-gradient-to-br from-white to-slate-50 shadow-xl ring-1 ring-black/5">
              {renderProject()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafariApp;
