import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Shield, Scroll, Box, Mail, Volume2, VolumeX } from "lucide-react";
import { retroAudio } from "@/utils/retroAudio";

interface NavTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const TABS: NavTab[] = [
  { id: "status", label: "STATUS", icon: <Shield className="w-4 h-4" /> },
  { id: "quests", label: "QUEST LOG", icon: <Scroll className="w-4 h-4" /> },
  { id: "inventory", label: "INVENTORY", icon: <Box className="w-4 h-4" /> },
  { id: "contact", label: "CONTACT", icon: <Mail className="w-4 h-4" /> },
];

export const RPGHeaderNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState("status");
  const [soundOn, setSoundOn] = useState(false);

  const toggleMusic = () => {
    const isPlayingNow = retroAudio.toggleBgm();
    setSoundOn(isPlayingNow);
    if (isPlayingNow) {
      retroAudio.playSelectSound();
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    retroAudio.playSelectSound();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b-4 border-amber-500/60 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Retro Logo Badge */}
        <div className="flex items-center gap-2 font-pixel text-xs text-amber-400">
          <div className="w-8 h-8 pixel-box-gold flex items-center justify-center bg-amber-950">
            <Gamepad2 className="w-4 h-4 text-amber-400" />
          </div>
          <span className="hidden sm:inline text-amber-400 font-pixel text-sm tracking-widest pixel-text-shadow">
            QUEST LOG v1.0
          </span>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex items-center gap-1 sm:gap-3">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                onMouseEnter={() => retroAudio.playHoverSound()}
                className={`relative px-2 sm:px-4 py-1.5 font-pixel text-[10px] sm:text-xs flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? "text-amber-400 bg-amber-950/80 border-2 border-amber-400"
                    : "text-slate-400 hover:text-slate-200 border-2 border-transparent"
                }`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="active-nav-tab"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-amber-400 text-xs"
                  >
                    ▲
                  </motion.div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sound Toggle */}
        <button
          onClick={toggleMusic}
          onMouseEnter={() => retroAudio.playHoverSound()}
          className={`pixel-box p-1.5 transition-colors flex items-center gap-2 font-pixel text-[10px] ${
            soundOn ? "text-amber-400 bg-amber-950/80 border-amber-400" : "text-slate-400 hover:text-amber-400"
          }`}
          title={soundOn ? "Mute 8-Bit Chiptune Music" : "Play 8-Bit Chiptune Music"}
        >
          {soundOn ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          <span className="hidden md:inline">{soundOn ? "BGM: ON" : "BGM: OFF"}</span>
        </button>
      </div>
    </header>
  );
};
