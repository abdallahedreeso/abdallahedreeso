import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { CRTScreenOverlay } from "@/components/retro/CRTScreenOverlay";
import { RPGHeaderNav } from "@/components/retro/RPGHeaderNav";
import { retroAudio } from "@/utils/retroAudio";

// Lazy-loaded section components for payload optimization (~101.21 kB ceiling)
const PlayerStatusHero = lazy(() => import("@/components/retro/PlayerStatusHero"));
const QuestBoard = lazy(() => import("@/components/retro/QuestBoard"));
const InventoryGrid = lazy(() => import("@/components/retro/InventoryGrid"));
const RPGContactForm = lazy(() => import("@/components/retro/RPGContactForm"));

const SECTION_KEYS = ["status", "quests", "inventory", "contact"] as const;
type SectionKey = typeof SECTION_KEYS[number];

// Retro Pixel Section Loader
const RetroSectionLoader: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center space-y-3 font-pixel text-amber-400">
    <div className="w-8 h-8 pixel-box-gold animate-spin bg-amber-950 flex items-center justify-center">
      ❖
    </div>
    <p className="text-xs animate-pulse tracking-widest">LOADING SELECTION...</p>
  </div>
);

const Index: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("status");
  const [direction, setDirection] = useState<number>(1);

  const handleSectionChange = (newSection: string) => {
    if (newSection === activeSection) return;
    const currentIndex = SECTION_KEYS.indexOf(activeSection);
    const newIndex = SECTION_KEYS.indexOf(newSection as SectionKey);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveSection(newSection as SectionKey);
  };

  // Keyboard navigation listener (Arrow Left/Right, A/D, Q/E)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent key shortcuts if user is typing in form inputs
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const currentIndex = SECTION_KEYS.indexOf(activeSection);

      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D" || e.key === "e" || e.key === "E") {
        const nextIndex = (currentIndex + 1) % SECTION_KEYS.length;
        setDirection(1);
        setActiveSection(SECTION_KEYS[nextIndex]);
        retroAudio.playSelectSound();
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A" || e.key === "q" || e.key === "Q") {
        const prevIndex = (currentIndex - 1 + SECTION_KEYS.length) % SECTION_KEYS.length;
        setDirection(-1);
        setActiveSection(SECTION_KEYS[prevIndex]);
        retroAudio.playSelectSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case "status":
        return <PlayerStatusHero />;
      case "quests":
        return <QuestBoard />;
      case "inventory":
        return <InventoryGrid />;
      case "contact":
        return <RPGContactForm />;
      default:
        return <PlayerStatusHero />;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      {/* Viewport locked wrapper: 100dvh & overflow hidden */}
      <div className="h-screen h-[100dvh] w-screen overflow-hidden bg-[#090b10] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans relative flex flex-col justify-between">
        {/* CRT Scanline Overlay */}
        <CRTScreenOverlay />

        {/* Top RPG Tab Switcher Navigation Bar */}
        <RPGHeaderNav activeSection={activeSection} onSelectSection={handleSectionChange} />

        {/* Main 100dvh Viewport Canvas Container */}
        <main className="relative z-10 flex-1 pt-16 pb-10 px-2 sm:px-4 h-[calc(100dvh-4rem)] w-full overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSection}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -direction * 50, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <Suspense fallback={<RetroSectionLoader />}>
                {renderSection()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Retro RPG Footer Bar */}
        <footer className="relative z-20 h-10 border-t-2 border-amber-500/40 bg-slate-950/95 px-4 flex items-center justify-between font-pixel text-[10px] text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">NAVIGATE:</span>
            <span className="bg-slate-900 px-1.5 py-0.5 border border-slate-700 text-slate-300">◄ ARROWS ►</span>
            <span className="hidden sm:inline text-slate-500">OR TAB KEYS</span>
          </div>
          <div className="text-amber-400/80 tracking-wider">
            ABDALLAH EDREES • 16-BIT QUEST LOG
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
