"use client";

import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ContentArea } from "./components/ContentArea";
import type {
    OverviewPage,
    StudentFeature,
    TeacherFeature,
    ActivePage,
} from "./types";

const ProjectLeQuiz: React.FC = () => {
    const [activeSection, setActiveSection] = useState<"overview" | "features">(
        "overview"
    );
    const [activePage, setActivePage] = useState<ActivePage>("introduction");

    const handleOverviewPageClick = (page: OverviewPage) => {
        setActiveSection("overview");
        setActivePage(page);
    };

    const handleStudentFeatureClick = (feature: StudentFeature) => {
        setActiveSection("features");
        setActivePage(feature);
    };

    const handleTeacherFeatureClick = (feature: TeacherFeature) => {
        setActiveSection("features");
        setActivePage(feature);
    };

    return (
        <div className="flex h-full w-full bg-white">
            <Sidebar
                activeSection={activeSection}
                activePage={activePage}
                onOverviewPageClick={handleOverviewPageClick}
                onStudentFeatureClick={handleStudentFeatureClick}
                onTeacherFeatureClick={handleTeacherFeatureClick}
            />
            <ContentArea activePage={activePage} />
        </div>
    );
};

export default ProjectLeQuiz;
