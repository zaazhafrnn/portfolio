"use client";
import React, { useState } from "react";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

const ProjectA: React.FC = () => {
  const [page, setPage] = useState<"page1" | "page2">("page1");

  return (
    <div className="h-full flex flex-col">
      <nav className="flex gap-2 p-2 border-b bg-gray-50">
        <button
          className={`px-3 py-1 rounded ${page === "page1" ? "bg-gray-200" : "hover:bg-gray-100"}`}
          onClick={() => setPage("page1")}
        >
          Page 1
        </button>
        <button
          className={`px-3 py-1 rounded ${page === "page2" ? "bg-gray-200" : "hover:bg-gray-100"}`}
          onClick={() => setPage("page2")}
        >
          Page 2
        </button>
      </nav>
      <div className="flex-1 overflow-auto">
        {page === "page1" ? <Page1 /> : <Page2 />}
      </div>
    </div>
  );
};

export default ProjectA;
