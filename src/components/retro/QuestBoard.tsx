import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scroll, ExternalLink, Github, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

interface Quest {
  id: string;
  title: string;
  category: string;
  status: "COMPLETED" | "IN_PROGRESS";
  levelReq: number;
  xpReward: number;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const QUEST_LIST: Quest[] = [
  {
    id: "spatial-nodes",
    title: "Infinite Spatial Canvas Engine",
    category: "Canvas Architecture",
    status: "COMPLETED",
    levelReq: 95,
    xpReward: 12500,
    description: "Architected a high-performance Figma/Miro style infinite node canvas portfolio with glassmorphic section nodes, interactive SVG connection lines, pan and zoom controls, and mini-map navigation.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "SVG Matrix"],
    demoUrl: "https://github.com/abdallahedreeso",
    githubUrl: "https://github.com/abdallahedreeso"
  },
  {
    id: "rpg-pause-menu",
    title: "16-Bit Quest Log Portfolio Architecture",
    category: "Retro UI / Custom CSS Engine",
    status: "COMPLETED",
    levelReq: 99,
    xpReward: 15000,
    description: "Constructed a 16-bit RPG Pause Menu UI using pure CSS box-shadow pixel borders, CRT scanline overlay layers, Framer Motion cursor state engines, and zero heavy image payload optimizations.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "CSS Shadow Art"],
    demoUrl: "https://github.com/abdallahedreeso",
    githubUrl: "https://github.com/abdallahedreeso"
  },
  {
    id: "spatial-keynote",
    title: "Keynote Spatial Slider Redesign",
    category: "Full-Viewport Motion Architecture",
    status: "COMPLETED",
    levelReq: 92,
    xpReward: 10000,
    description: "Engineered a 100vh spatial keynote slider with lazy-loaded slide components, multi-modal navigation listeners (wheel, arrow keys, touch gestures), and Framer Motion transitions.",
    technologies: ["React", "TypeScript", "Framer Motion", "Vite Code-Splitting"],
    demoUrl: "https://github.com/abdallahedreeso",
    githubUrl: "https://github.com/abdallahedreeso"
  },
  {
    id: "story-dashboard",
    title: "Story Progression Interactive Dashboard",
    category: "Micro-Frontend Dashboard",
    status: "COMPLETED",
    levelReq: 90,
    xpReward: 9500,
    description: "Designed a Instagram/Story-inspired desktop portfolio layout featuring segmented progress bars, auto-advancing slides, glitch transitions, and sub-100kB payload optimization.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Lucide React"],
    demoUrl: "https://github.com/abdallahedreeso",
    githubUrl: "https://github.com/abdallahedreeso"
  }
];

export const QuestBoard: React.FC = () => {
  const [selectedQuest, setSelectedQuest] = useState<Quest>(QUEST_LIST[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;
    const fullText = selectedQuest.description;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [selectedQuest]);

  return (
    <section id="quests" className="py-12 px-4 max-w-6xl mx-auto">
      <div className="pixel-box-cyan p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Scroll className="w-6 h-6 text-sky-400" />
          <h2 className="font-pixel text-lg sm:text-xl text-sky-400 pixel-text-shadow">
            QUEST BOARD [PROJECT ARCHIVE]
          </h2>
        </div>
        <span className="font-dialogue text-lg text-emerald-400">
          QUESTS CLEARED: {QUEST_LIST.length} / {QUEST_LIST.length}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List: Quests */}
        <div className="lg:col-span-5 pixel-box p-4 space-y-3">
          <p className="font-pixel text-xs text-slate-400 pb-2 border-b border-slate-800 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> SELECT QUEST FOR DETAILS
          </p>

          <div className="space-y-2">
            {QUEST_LIST.map((quest) => {
              const isSelected = selectedQuest.id === quest.id;

              return (
                <div
                  key={quest.id}
                  onClick={() => setSelectedQuest(quest)}
                  onMouseEnter={() => setSelectedQuest(quest)}
                  className={`relative cursor-pointer p-3 transition-colors ${
                    isSelected
                      ? "pixel-box-gold bg-amber-950/40 text-amber-300"
                      : "pixel-box bg-slate-950/60 hover:bg-slate-900 text-slate-300"
                  }`}
                >
                  {/* Framer Motion Selection Cursor Arrow */}
                  {isSelected && (
                    <motion.div
                      layoutId="quest-selection-cursor"
                      className="absolute -left-3 top-1/2 -translate-y-1/2 text-amber-400 font-pixel text-sm flex items-center"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      ➔
                    </motion.div>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-dialogue text-sm text-slate-400 block">
                        LVL {quest.levelReq} • {quest.category}
                      </span>
                      <h3 className="font-pixel text-xs sm:text-sm text-slate-100 mt-1">
                        {quest.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-400 font-pixel text-[10px] shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Details: RPG Typewriter Dialogue Box */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="pixel-box-gold p-6 space-y-4 flex-1 flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-3">
                <span className="font-pixel text-xs text-amber-400 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-amber-400 animate-pulse" />
                  QUEST: {selectedQuest.title}
                </span>
                <span className="font-pixel text-xs text-emerald-400 bg-emerald-950/80 px-2 py-1 border border-emerald-500/40">
                  + {selectedQuest.xpReward} XP
                </span>
              </div>

              {/* Typewriter Text Window */}
              <div className="min-h-[120px] bg-slate-950 p-4 border-2 border-amber-900/60 text-amber-100 font-dialogue text-xl leading-relaxed tracking-wide">
                <p>
                  {displayedText}
                  {isTyping && <span className="inline-block w-2 h-5 bg-amber-400 ml-1 animate-blink" />}
                </p>
              </div>
            </div>

            {/* Tech Stack & Action Links */}
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-4">
              <div>
                <p className="font-pixel text-[10px] text-slate-400 mb-2">REQUIRED ITEM STACK:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedQuest.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-pixel text-[10px] bg-slate-900 text-sky-300 px-2 py-1 border border-sky-600/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {selectedQuest.demoUrl && (
                  <a
                    href={selectedQuest.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-box-cyan px-4 py-2 font-pixel text-xs text-sky-300 hover:text-white flex items-center gap-2 transition-transform hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" /> LAUNCH DEMO
                  </a>
                )}
                {selectedQuest.githubUrl && (
                  <a
                    href={selectedQuest.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-box px-4 py-2 font-pixel text-xs text-slate-300 hover:text-white flex items-center gap-2 transition-transform hover:scale-105"
                  >
                    <Github className="w-4 h-4" /> VIEW CODE
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
