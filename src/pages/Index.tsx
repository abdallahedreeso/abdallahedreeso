import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { CRTScreenOverlay } from "@/components/retro/CRTScreenOverlay";
import { RPGHeaderNav } from "@/components/retro/RPGHeaderNav";
import { PlayerStatusHero } from "@/components/retro/PlayerStatusHero";
import { QuestBoard } from "@/components/retro/QuestBoard";
import { InventoryGrid } from "@/components/retro/InventoryGrid";
import { RPGContactForm } from "@/components/retro/RPGContactForm";

const Index: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="min-h-screen bg-[#090b10] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans relative overflow-x-hidden">
        {/* CRT Scanlines Overlay */}
        <CRTScreenOverlay />

        {/* Retro Header Menu */}
        <RPGHeaderNav />

        {/* Main Content Sections */}
        <main className="relative z-10 space-y-8">
          <PlayerStatusHero />
          <QuestBoard />
          <InventoryGrid />
          <RPGContactForm />
        </main>

        {/* Retro Footer */}
        <footer className="relative z-10 border-t-4 border-amber-500/40 bg-slate-950 py-8 px-4 text-center font-pixel text-xs text-slate-400">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-amber-400/80">
              &copy; 2026 ABDALLAH EDREES • THE 16-BIT QUEST LOG
            </p>
            <p className="text-slate-400 font-dialogue text-lg">
              BUILT WITH REACT, TAILWIND CSS & FRAMER MOTION
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
