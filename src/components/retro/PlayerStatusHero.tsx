import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Flame, Award, Sword, Sparkles, User, Heart, Compass } from "lucide-react";

export const PlayerStatusHero: React.FC = () => {
  return (
    <section id="status" className="pt-24 pb-12 px-4 max-w-6xl mx-auto">
      {/* Top Section Header */}
      <div className="pixel-box-gold p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 pixel-box-cyan flex items-center justify-center bg-sky-950 text-sky-400">
            <User className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-pixel text-lg sm:text-2xl text-amber-400 pixel-text-shadow tracking-wider">
              ABDALLAH EDREES
            </h1>
            <p className="font-dialogue text-xl text-slate-300 tracking-wide">
              CLASS: <span className="text-sky-400">LEAD FRONTEND ARCHITECT</span> | RANK: <span className="text-emerald-400">SENIOR S-CLASS</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-pixel text-xs bg-slate-900/90 px-3 py-2 border-2 border-amber-500/50">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-amber-300">LEVEL 99</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Player Resource Bars & Attributes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Bars Card */}
          <div className="pixel-box p-6 space-y-5">
            <h2 className="font-pixel text-sm text-sky-400 flex items-center gap-2 border-b-2 border-slate-800 pb-3">
              <Heart className="w-4 h-4 text-emerald-400" /> PLAYER VITAL GAUGES
            </h2>

            {/* HP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-pixel text-xs">
                <span className="text-emerald-400">HP (React & TS Core)</span>
                <span className="text-emerald-300">999 / 999</span>
              </div>
              <div className="h-5 pixel-box bg-slate-950 p-0.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 border-r-2 border-emerald-200"
                />
              </div>
            </div>

            {/* MP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-pixel text-xs">
                <span className="text-sky-400">MP (System Architecture)</span>
                <span className="text-sky-300">850 / 850</span>
              </div>
              <div className="h-5 pixel-box bg-slate-950 p-0.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-sky-600 via-sky-400 to-indigo-400 border-r-2 border-sky-200"
                />
              </div>
            </div>

            {/* STAMINA Bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-pixel text-xs">
                <span className="text-amber-400">SP (UI/UX Engineering)</span>
                <span className="text-amber-300">920 / 920</span>
              </div>
              <div className="h-5 pixel-box bg-slate-950 p-0.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 border-r-2 border-amber-200"
                />
              </div>
            </div>
          </div>

          {/* Character Attribute Matrix */}
          <div className="pixel-box p-6">
            <h2 className="font-pixel text-sm text-amber-400 flex items-center gap-2 border-b-2 border-slate-800 pb-3 mb-4">
              <Zap className="w-4 h-4 text-amber-400" /> ATTRIBUTE MATRIX
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="pixel-box bg-slate-950 p-3 text-center space-y-1">
                <p className="font-pixel text-[10px] text-slate-400">STR (CODE)</p>
                <p className="font-pixel text-lg text-emerald-400">99</p>
                <p className="font-dialogue text-base text-slate-300">Clean Tech</p>
              </div>

              <div className="pixel-box bg-slate-950 p-3 text-center space-y-1">
                <p className="font-pixel text-[10px] text-slate-400">INT (DESIGN)</p>
                <p className="font-pixel text-lg text-sky-400">97</p>
                <p className="font-dialogue text-base text-slate-300">Systems</p>
              </div>

              <div className="pixel-box bg-slate-950 p-3 text-center space-y-1">
                <p className="font-pixel text-[10px] text-slate-400">DEX (SPEED)</p>
                <p className="font-pixel text-lg text-purple-400">95</p>
                <p className="font-dialogue text-base text-slate-300">Vite Build</p>
              </div>

              <div className="pixel-box bg-slate-950 p-3 text-center space-y-1">
                <p className="font-pixel text-[10px] text-slate-400">AGI (UI/UX)</p>
                <p className="font-pixel text-lg text-amber-400">98</p>
                <p className="font-dialogue text-base text-slate-300">Fluid Motion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Equipped Gear */}
        <div className="pixel-box p-6 space-y-4">
          <h2 className="font-pixel text-sm text-emerald-400 flex items-center gap-2 border-b-2 border-slate-800 pb-3">
            <Shield className="w-4 h-4 text-emerald-400" /> EQUIPPED ARSENAL
          </h2>

          <div className="space-y-3">
            {/* Main Hand */}
            <div className="pixel-box-gold p-3 flex items-center gap-3">
              <div className="w-8 h-8 pixel-box bg-amber-950 flex items-center justify-center text-amber-400 font-pixel text-xs">
                <Sword className="w-4 h-4" />
              </div>
              <div>
                <p className="font-pixel text-[10px] text-amber-400">MAIN HAND</p>
                <p className="font-dialogue text-lg text-slate-200">React.js & Next.js Blade</p>
              </div>
            </div>

            {/* Off Hand */}
            <div className="pixel-box-cyan p-3 flex items-center gap-3">
              <div className="w-8 h-8 pixel-box bg-sky-950 flex items-center justify-center text-sky-400 font-pixel text-xs">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="font-pixel text-[10px] text-sky-400">OFF HAND</p>
                <p className="font-dialogue text-lg text-slate-200">Tailwind CSS Shield</p>
              </div>
            </div>

            {/* Armor */}
            <div className="pixel-box-emerald p-3 flex items-center gap-3">
              <div className="w-8 h-8 pixel-box bg-emerald-950 flex items-center justify-center text-emerald-400 font-pixel text-xs">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="font-pixel text-[10px] text-emerald-400">EQUIPPED ARMOR</p>
                <p className="font-dialogue text-lg text-slate-200">TypeScript Strict Mail</p>
              </div>
            </div>

            {/* Accessory */}
            <div className="pixel-box p-3 flex items-center gap-3 border-purple-500/50">
              <div className="w-8 h-8 pixel-box bg-purple-950 flex items-center justify-center text-purple-400 font-pixel text-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-pixel text-[10px] text-purple-400">ACCESSORY</p>
                <p className="font-dialogue text-lg text-slate-200">Framer Motion Ring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
