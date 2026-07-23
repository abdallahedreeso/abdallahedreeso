import React, { lazy, Suspense } from "react";
import { useIDEStore, ideStore } from "@/store/useIDEStore";
import { IDESkeletonLoader } from "./IDESkeletonLoader";

// Dynamic Imports with Suspense chunking for initial payload protection (<101.21 kB)
const ProjectsView = lazy(() => import("./views/ProjectsView"));
const AboutView = lazy(() => import("./views/AboutView"));
const SkillsView = lazy(() => import("./views/SkillsView"));
const ContactView = lazy(() => import("./views/ContactView"));
const ArchitectureView = lazy(() => import("./views/ArchitectureView"));

export const IDEEditor: React.FC = () => {
  const activeTabId = useIDEStore((state) => state.activeTabId);
  const openTabIds = useIDEStore((state) => state.openTabIds);
  const files = useIDEStore((state) => state.files);
  const editorMode = useIDEStore((state) => state.editorMode);

  const activeFile = files.find((f) => f.id === activeTabId);

  const renderActiveView = () => {
    switch (activeTabId) {
      case "projects.tsx":
        return <ProjectsView />;
      case "about.md":
        return <AboutView />;
      case "skills.json":
        return <SkillsView />;
      case "contact.env":
        return <ContactView />;
      case "architecture.draw":
        return <ArchitectureView />;
      default:
        return null;
    }
  };

  // Welcome Screen when no tabs are open
  if (openTabIds.length === 0 || !activeFile) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center select-none font-mono z-10">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-2xl mb-4 shadow-xl shadow-cyan-500/20">
          IDE
        </div>
        <h2 className="text-xl font-extrabold text-slate-100 mb-2">
          The Architect's IDE Studio
        </h2>
        <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
          Select a file from the explorer sidebar or trigger the Command Palette to navigate.
        </p>

        <div className="space-y-2 text-xs">
          <button
            onClick={() => ideStore.setCommandPaletteOpen(true)}
            className="px-4 py-2 bg-slate-900 border border-cyan-500/30 rounded-lg text-cyan-300 hover:border-cyan-400 transition-all font-semibold shadow-md"
          >
            Open Command Palette (Ctrl+K)
          </button>
          <div className="flex items-center justify-center space-x-3 text-[11px] text-slate-500 pt-2">
            <span
              onClick={() => ideStore.openFile("projects.tsx")}
              className="hover:text-cyan-400 cursor-pointer underline"
            >
              Projects.tsx
            </span>
            <span>•</span>
            <span
              onClick={() => ideStore.openFile("about.md")}
              className="hover:text-emerald-400 cursor-pointer underline"
            >
              About.md
            </span>
            <span>•</span>
            <span
              onClick={() => ideStore.openFile("skills.json")}
              className="hover:text-amber-400 cursor-pointer underline"
            >
              Skills.json
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex overflow-hidden z-10">
      {/* Code Gutter (Line Numbers) */}
      <div className="hidden sm:flex flex-col py-6 px-3 bg-slate-950/60 border-r border-slate-800/80 text-right text-slate-600 font-mono text-xs select-none space-y-3 shrink-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="leading-relaxed">
            {i + 1}
          </span>
        ))}
      </div>

      {/* Editor Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
        {editorMode === "code" ? (
          /* Raw Source Preview Mode */
          <div className="p-6 bg-slate-950/90 border border-cyan-500/30 rounded-xl font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto shadow-2xl">
            <div className="text-cyan-400 font-bold border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
              <span>// Source Code: {activeFile.path}</span>
              <span className="text-slate-500">Size: {activeFile.size}</span>
            </div>
            <pre className="text-cyan-200/90">
              {`/**
 * File: ${activeFile.name}
 * Description: ${activeFile.description}
 * Technology: ${activeFile.language.toUpperCase()}
 */

export const ${activeFile.name.replace(/\.[^/.]+$/, "")} = () => {
  return (
    <ViewStageComponent 
      payloadBudget="< 101.21 kB" 
      lazyLoaded={true}
    />
  );
};`}
            </pre>
          </div>
        ) : (
          /* Interactive Render View Stage with Suspense */
          <Suspense fallback={<IDESkeletonLoader />}>
            {renderActiveView()}
          </Suspense>
        )}
      </div>
    </div>
  );
};
