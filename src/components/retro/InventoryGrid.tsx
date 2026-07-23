import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Sparkles, Layers, Cpu, Code2, Database, Shield, Zap, Wrench, Globe, Terminal, Feather } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: "Frontend" | "Language" | "Backend/Tools" | "Architecture";
  rarity: "LEGENDARY" | "EPIC" | "RARE";
  icon: React.ReactNode;
  quantity: string;
  statBonus: string;
  description: string;
}

const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "react",
    name: "React 18 Arcane Orb",
    category: "Frontend",
    rarity: "LEGENDARY",
    icon: <Cpu className="w-6 h-6 text-sky-400" />,
    quantity: "x99",
    statBonus: "+99 Component Speed",
    description: "Mastery of Concurrent Mode, Hooks, Fiber Architecture, and high-frequency Virtual DOM recalculations."
  },
  {
    id: "typescript",
    name: "TypeScript Mythic Armor",
    category: "Language",
    rarity: "LEGENDARY",
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    quantity: "MAX",
    statBonus: "+100 Type Immunity",
    description: "Impenetrable strict type checking, generic inferencing, and compile-time bug elimination."
  },
  {
    id: "vue",
    name: "Vue / Nuxt Swift Elixir",
    category: "Frontend",
    rarity: "EPIC",
    icon: <Zap className="w-6 h-6 text-emerald-400" />,
    quantity: "x85",
    statBonus: "+90 Reactive Agility",
    description: "Fluid Composition API, pinia store orchestration, and Nuxt 3 server-side rendering."
  },
  {
    id: "tailwind",
    name: "Tailwind CSS Prism Shader",
    category: "Frontend",
    rarity: "EPIC",
    icon: <Layers className="w-6 h-6 text-cyan-400" />,
    quantity: "MAX",
    statBonus: "+95 Styling Velocity",
    description: "Zero-runtime overhead utility layout engine with bespoke pixel border box shadows."
  },
  {
    id: "nextjs",
    name: "Next.js Spatial Tome",
    category: "Architecture",
    rarity: "LEGENDARY",
    icon: <Globe className="w-6 h-6 text-slate-200" />,
    quantity: "x90",
    statBonus: "+98 SSR / Edge Power",
    description: "App Router streaming, React Server Components (RSC), and edge network optimizations."
  },
  {
    id: "framer",
    name: "Framer Kinetic Ring",
    category: "Frontend",
    rarity: "EPIC",
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    quantity: "x88",
    statBonus: "+92 Motion Smoothness",
    description: "Complex physics animations, shared layout ID morphing, and gestures."
  },
  {
    id: "supabase",
    name: "Supabase Crystal Core",
    category: "Backend/Tools",
    rarity: "RARE",
    icon: <Database className="w-6 h-6 text-emerald-300" />,
    quantity: "x75",
    statBonus: "+85 Relational Mana",
    description: "Realtime PostgreSQL database triggers, Row Level Security (RLS), and authentication."
  },
  {
    id: "vite",
    name: "Vite Lightning Boots",
    category: "Backend/Tools",
    rarity: "RARE",
    icon: <Code2 className="w-6 h-6 text-amber-400" />,
    quantity: "MAX",
    statBonus: "+100 Build Speed",
    description: "Instant HMR development server setup and Rollup production bundler optimization."
  }
];

export const InventoryGrid: React.FC = () => {
  const [activeItem, setActiveItem] = useState<InventoryItem>(INVENTORY_ITEMS[0]);

  return (
    <section id="inventory" className="py-12 px-4 max-w-6xl mx-auto">
      <div className="pixel-box-emerald p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Box className="w-6 h-6 text-emerald-400" />
          <h2 className="font-pixel text-lg sm:text-xl text-emerald-400 pixel-text-shadow">
            INVENTORY SLOTS [TECH STACK ARSENAL]
          </h2>
        </div>
        <span className="font-dialogue text-lg text-slate-300">
          SLOTS: 8 / 8 FILLED
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4x2 Grid of Pixel Slots */}
        <div className="lg:col-span-6 pixel-box p-4 space-y-4">
          <p className="font-pixel text-xs text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 text-emerald-400" /> TAP AN ITEM TO EXAMINE STATS
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INVENTORY_ITEMS.map((item) => {
              const isSelected = activeItem.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  onMouseEnter={() => setActiveItem(item)}
                  className={`relative cursor-pointer aspect-square p-2 flex flex-col items-center justify-between transition-transform ${
                    isSelected
                      ? "pixel-box-gold bg-amber-950/60 scale-105"
                      : "pixel-box bg-slate-950/80 hover:bg-slate-900 hover:scale-102"
                  }`}
                >
                  <span className="self-end font-pixel text-[9px] text-slate-400">
                    {item.quantity}
                  </span>

                  <div className="p-2 bg-slate-900/90 rounded border border-slate-800">
                    {item.icon}
                  </div>

                  <span className="font-dialogue text-sm text-center text-slate-200 line-clamp-1">
                    {item.name.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Details Panel for Selected Inventory Item */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="pixel-box-gold p-6 space-y-4 h-full flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 pixel-box bg-slate-950">
                      {activeItem.icon}
                    </div>
                    <div>
                      <span className="font-pixel text-[10px] text-amber-400 block">
                        {activeItem.rarity} ITEM
                      </span>
                      <h3 className="font-pixel text-sm text-slate-100">
                        {activeItem.name}
                      </h3>
                    </div>
                  </div>

                  <span className="font-pixel text-xs text-emerald-400 bg-emerald-950/80 px-2 py-1 border border-emerald-500/40">
                    {activeItem.quantity}
                  </span>
                </div>

                {/* Stat Bonus Badge */}
                <div className="pixel-box bg-slate-950 p-3 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-pixel text-xs text-amber-300">
                    EFFECT: {activeItem.statBonus}
                  </span>
                </div>

                {/* Lore / Description */}
                <div className="bg-slate-950 p-4 border-2 border-amber-900/60 font-dialogue text-xl text-slate-200 leading-relaxed">
                  {activeItem.description}
                </div>
              </div>

              {/* Item Metadata Footer */}
              <div className="pt-4 border-t border-slate-800 flex justify-between font-pixel text-[10px] text-slate-400">
                <span>CATEGORY: {activeItem.category}</span>
                <span>STATUS: READY FOR DEPLOYMENT</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
