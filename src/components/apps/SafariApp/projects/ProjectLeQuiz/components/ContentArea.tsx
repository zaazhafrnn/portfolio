"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { ActivePage } from "../types";
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
}

export const ContentArea: React.FC<ContentAreaProps> = ({ activePage }) => {
    const renderPage = () => {
        switch (activePage) {
            case "introduction":
                return <IntroductionPage />;
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
                return <IntroductionPage />;
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <ScrollArea className="h-full">
                <div className="mx-auto max-w-4xl px-8 py-12">{renderPage()}</div>
            </ScrollArea>
        </div>
    );
};

