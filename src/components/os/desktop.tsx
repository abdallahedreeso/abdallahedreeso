import React, { lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOpenWindowIds, usePortfolioActions, WindowId } from "@/store/use-portfolio-store";
import { TopBar } from "@/components/os/top-bar";
import { OSDock } from "@/components/os/dock";
import { OSWindowFrame } from "@/components/os/window-frame";
import { Terminal, User, FolderGit2, Cpu, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy-loaded section components for optimal bundle payload (~101 kB initial load)
const AboutSection = lazy(() =>
  import("@/components/about-section").then((m) => ({ default: m.AboutSection }))
);
const ProjectsSection = lazy(() =>
  import("@/components/projects-section").then((m) => ({ default: m.ProjectsSection }))
);
const SkillsSection = lazy(() =>
  import("@/components/skills-section").then((m) => ({ default: m.SkillsSection }))
);
const ContactSection = lazy(() =>
  import("@/components/contact-section").then((m) => ({ default: m.ContactSection }))
);
const HeroSection = lazy(() =>
  import("@/components/hero-section").then((m) => ({ default: m.HeroSection }))
);

const WINDOW_TITLES: Record<WindowId, string> = {
  hero: "Terminal / Overview",
  about: "About Me",
  projects: "Selected Projects",
  skills: "Technical Skills",
  contact: "Get In Touch",
};

// Cyber-Minimalist Loader Fallback
function WindowLoader({ title }: { title: string }) {
  return (
    <div className="h-64 flex flex-col items-center justify-center gap-4 text-cyan-400">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
        <Sparkles className="w-5 h-5 absolute text-cyan-300 animate-pulse" />
      </div>
      <div className="text-xs font-mono tracking-widest text-zinc-400">
        LOADING {title.toUpperCase()}...
      </div>
    </div>
  );
}

const DesktopBioCard = React.memo(function DesktopBioCard({
  onOpenWindow,
}: {
  onOpenWindow: (id: WindowId) => void;
}) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-20 flex items-center justify-center p-4 sm:p-6 z-0 pointer-events-none overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-auto max-w-2xl w-full p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-2xl text-center space-y-4 sm:space-y-5 md:space-y-6 transition-colors duration-300 my-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
          PORTFOLIO DESKTOP ENVIRONMENT
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Abdallah <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-500 bg-clip-text text-transparent">Edrees</span>
        </h1>

        <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Frontend Engineer with 2+ years of experience building enterprise ERP & SaaS applications (Vue.js, Nuxt.js, React.js, TypeScript). 
          Click any Dock icon below or quick launchers to explore modules.
        </p>

        {/* Quick Launcher Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <Button
            onClick={() => onOpenWindow("hero")}
            className="bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-xs gap-2 shadow-sm"
          >
            <Terminal className="w-4 h-4" />
            Terminal
          </Button>
          <Button
            onClick={() => onOpenWindow("about")}
            className="bg-slate-200/60 hover:bg-slate-200/90 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300/60 dark:border-white/15 text-slate-700 dark:text-zinc-200 text-xs gap-2"
          >
            <User className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            About
          </Button>
          <Button
            onClick={() => onOpenWindow("skills")}
            className="bg-slate-200/60 hover:bg-slate-200/90 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300/60 dark:border-white/15 text-slate-700 dark:text-zinc-200 text-xs gap-2"
          >
            <Cpu className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            Skills
          </Button>
          <Button
            onClick={() => onOpenWindow("contact")}
            className="bg-slate-200/60 hover:bg-slate-200/90 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300/60 dark:border-white/15 text-slate-700 dark:text-zinc-200 text-xs gap-2"
          >
            <Mail className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            Contact
          </Button>
        </div>
      </motion.div>
    </div>
  );
});

export function DesktopWorkspace() {
  const openWindowIds = useOpenWindowIds();
  const { openWindow } = usePortfolioActions();

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-slate-100/90 dark:bg-[#030712] text-slate-800 dark:text-zinc-100 flex flex-col select-none transition-colors duration-300">
      {/* OS Ambient Lighting & Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e140_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e140_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Bar Header */}
      <TopBar />

      {/* Main Desktop Canvas */}
      <main className="flex-1 relative overflow-hidden w-full h-full">
        {/* Desktop Ambient Background Widget / Bio Card */}
        <DesktopBioCard onOpenWindow={openWindow} />

        {/* Windows Rendering Area */}
        <AnimatePresence>
          {openWindowIds.map((id) => (
            <OSWindowFrame key={id} id={id}>
              <Suspense fallback={<WindowLoader title={WINDOW_TITLES[id]} />}>
                {id === "hero" && <HeroSection />}
                {id === "about" && <AboutSection />}
                {id === "projects" && <ProjectsSection />}
                {id === "skills" && <SkillsSection />}
                {id === "contact" && <ContactSection />}
              </Suspense>
            </OSWindowFrame>
          ))}
        </AnimatePresence>
      </main>

      {/* Glassmorphic Dock */}
      <OSDock />
    </div>
  );
}
