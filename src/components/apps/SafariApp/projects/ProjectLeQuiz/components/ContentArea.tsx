"use client";

import { useRef } from "react";
import type { ActivePage, OverviewPage } from "../types";
import { IntroductionPage } from "../pages/IntroductionPage";
import { TechStackPage } from "../pages/TechStackPage";
import { JoinClassPage } from "../pages/JoinClassPage";
import { SubjectsPage } from "../pages/SubjectsPage";
import { AssignmentsPage } from "../pages/AssignmentsPage";
import { ClassManagementPage } from "../pages/ClassManagementPage";
import { SubjectManagementPage } from "../pages/SubjectManagementPage";
import { AssignmentCreationPage } from "../pages/AssignmentCreationPage";

interface ContentAreaProps {
    activePage: ActivePage;
    onOverviewPageClick: (page: OverviewPage) => void;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ activePage, onOverviewPageClick }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const targetScrollRef = useRef<number>(0);
    const currentScrollRef = useRef<number>(0);

    const smoothScroll = () => {
        if (!scrollRef.current) return;

        const diff = targetScrollRef.current - currentScrollRef.current;
        const step = diff * 0.15;

        if (Math.abs(diff) > 0.5) {
            currentScrollRef.current += step;
            scrollRef.current.scrollTop = currentScrollRef.current;
            animationFrameRef.current = requestAnimationFrame(smoothScroll);
        } else {
            currentScrollRef.current = targetScrollRef.current;
            scrollRef.current.scrollTop = currentScrollRef.current;
            animationFrameRef.current = null;
        }
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;

        e.stopPropagation();
        targetScrollRef.current = Math.max(
            0,
            Math.min(
                scrollRef.current.scrollHeight - scrollRef.current.clientHeight,
                targetScrollRef.current + e.deltaY
            )
        );

        if (!animationFrameRef.current) {
            currentScrollRef.current = scrollRef.current.scrollTop;
            animationFrameRef.current = requestAnimationFrame(smoothScroll);
        }
    };

    const handleScroll = () => {
        if (scrollRef.current && !animationFrameRef.current) {
            currentScrollRef.current = scrollRef.current.scrollTop;
            targetScrollRef.current = scrollRef.current.scrollTop;
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case "introduction":
                return <IntroductionPage onTechStackClick={() => onOverviewPageClick("tech-stack")} />;
            case "tech-stack":
                return <TechStackPage />;
            case "join-class":
                return <JoinClassPage />;
            case "subjects":
                return <SubjectsPage />;
            case "assignments":
                return <AssignmentsPage />;
            case "class-management":
                return <ClassManagementPage />;
            case "subject-management":
                return <SubjectManagementPage />;
            case "assignment-creation":
                return <AssignmentCreationPage />;
            default:
                return <IntroductionPage onTechStackClick={() => onOverviewPageClick("tech-stack")} />;
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full">
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-scroll overflow-x-hidden"
                style={{
                    scrollBehavior: 'auto',
                }}
                onWheel={handleWheel}
                onScroll={handleScroll}
            >
                <div className="mx-auto max-w-4xl px-8 py-12">{renderPage()}</div>
            </div>
        </div>
    );
};