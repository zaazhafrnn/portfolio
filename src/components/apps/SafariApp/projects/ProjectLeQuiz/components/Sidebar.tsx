"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type {
    OverviewPage,
    StudentFeature,
    TeacherFeature,
    ActivePage,
} from "../types";

interface SidebarProps {
    activeSection: "overview" | "features";
    activePage: ActivePage;
    onOverviewPageClick: (page: OverviewPage) => void;
    onStudentFeatureClick: (feature: StudentFeature) => void;
    onTeacherFeatureClick: (feature: TeacherFeature) => void;
}

const SidebarButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ isActive, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
        >
            {children}
        </button>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({
    activeSection,
    activePage,
    onOverviewPageClick,
    onStudentFeatureClick,
    onTeacherFeatureClick,
}) => {
    const isStudentActive =
        activeSection === "features" &&
        (activePage === "join-class" ||
            activePage === "subjects" ||
            activePage === "assignments");

    const isTeacherActive =
        activeSection === "features" &&
        (activePage === "class-management" ||
            activePage === "subject-management" ||
            activePage === "assignment-creation");

    return (
        <div className="w-64 shrink-0 border-r border-border bg-muted/30 flex flex-col">
            <ScrollArea className="flex-1">
                <div className="p-4">
                    <div className="mb-8 border-b border-border pb-4">
                        <h1 className="mb-2 text-2xl font-bold tracking-tight">Le Quiz</h1>
                        <p className="text-sm text-muted-foreground">
                            Interactive Quiz Platform
                        </p>
                    </div>

                    <nav className="space-y-6">
                        <div>
                            <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Overview
                            </h3>
                            <div className="space-y-1">
                                <SidebarButton
                                    isActive={
                                        activeSection === "overview" && activePage === "introduction"
                                    }
                                    onClick={() => onOverviewPageClick("introduction")}
                                >
                                    Introduction
                                </SidebarButton>
                                <SidebarButton
                                    isActive={
                                        activeSection === "overview" && activePage === "tech-stack"
                                    }
                                    onClick={() => onOverviewPageClick("tech-stack")}
                                >
                                    Tech Stack
                                </SidebarButton>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Features
                            </h3>
                            <Accordion type="multiple" defaultValue={["student","teacher"]} className="w-full">
                                <AccordionItem value="student" className="border-0">
                                    <AccordionTrigger
                                        className={cn(
                                            "px-3 py-2 text-sm font-medium hover:no-underline rounded-md",
                                            isStudentActive
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        )}
                                    >
                                        Student
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-2">
                                        <div className="ml-4 space-y-1 border-l border-border pl-4">
                                            <SidebarButton
                                                isActive={activePage === "join-class"}
                                                onClick={() => onStudentFeatureClick("join-class")}
                                            >
                                                Join Class
                                            </SidebarButton>
                                            <SidebarButton
                                                isActive={activePage === "subjects"}
                                                onClick={() => onStudentFeatureClick("subjects")}
                                            >
                                                Subjects
                                            </SidebarButton>
                                            <SidebarButton
                                                isActive={activePage === "assignments"}
                                                onClick={() => onStudentFeatureClick("assignments")}
                                            >
                                                Assignments
                                            </SidebarButton>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="teacher" className="border-0">
                                    <AccordionTrigger
                                        className={cn(
                                            "px-3 py-2 text-sm font-medium hover:no-underline rounded-md",
                                            isTeacherActive
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        )}
                                    >
                                        Teacher
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-2">
                                        <div className="ml-4 space-y-1 border-l border-border pl-4">
                                            <SidebarButton
                                                isActive={activePage === "class-management"}
                                                onClick={() => onTeacherFeatureClick("class-management")}
                                            >
                                                Class Management
                                            </SidebarButton>
                                            <SidebarButton
                                                isActive={activePage === "subject-management"}
                                                onClick={() => onTeacherFeatureClick("subject-management")}
                                            >
                                                Subject Management
                                            </SidebarButton>
                                            <SidebarButton
                                                isActive={activePage === "assignment-creation"}
                                                onClick={() => onTeacherFeatureClick("assignment-creation")}
                                            >
                                                Assignment Creation
                                            </SidebarButton>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </nav>
                </div>
            </ScrollArea>
        </div>
    );
};

