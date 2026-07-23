import React from 'react';
import { BentoAssemblyCard } from './BentoAssemblyCard';
import { Sparkles, Terminal, Code2, ExternalLink, Github, Mail, Cpu, Layers, Zap, CheckCircle2 } from 'lucide-react';
import { useTimelineStore } from '@/store/useTimelineStore';

export const BentoAssemblyGrid: React.FC = () => {
  const jumpToSection = useTimelineStore((state) => state.jumpToSection);

  return (
    <div className="relative w-full h-full pointer-events-none z-10">
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: OVERVIEW / HERO (Keyframes 0.00 -> 0.22)            */}
      {/* ------------------------------------------------------------- */}
      <BentoAssemblyCard
        sectionId="hero"
        startKeyframe={0.0}
        endKeyframe={0.22}
        title="ABDALLAH EDREES"
        subtitle="LEAD FRONTEND ARCHITECT // SPATIAL & PERFORMANCE SYSTEMS"
        badge="TIMELINE PHASE 01"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Architecting High-Performance Web Applications & 3D Spatial Interfaces
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Specialized in low-latency WebGL/React Three Fiber rendering, sub-100kB JS bundle optimization, micro-frontend orchestration, and cutting-edge interactive Web Applications.
            </p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {['WebGL / R3F', 'TypeScript', 'React 18', 'State Optimization', 'Next.js'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-xs rounded bg-slate-800/80 border border-slate-700 text-slate-300 font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <button
                onClick={() => jumpToSection('projects')}
                className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center space-x-2 transition-transform active:scale-95 shadow-lg shadow-cyan-500/25 pointer-events-auto"
              >
                <span>EXPLORE PROJECTS</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => jumpToSection('contact')}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono text-xs flex items-center space-x-2 transition-colors pointer-events-auto"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>INITIATE CONTACT</span>
              </button>
            </div>
          </div>

          {/* Right Terminal Metric Window */}
          <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-4 font-mono text-xs space-y-2">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>system_diag.sh</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <p><span className="text-cyan-400">➜</span> status: <span className="text-emerald-400">ONLINE</span></p>
              <p><span className="text-cyan-400">➜</span> initial_bundle: <span className="text-cyan-300">~98.4 kB</span></p>
              <p><span className="text-cyan-400">➜</span> frame_rate: <span className="text-cyan-300">120.0 FPS</span></p>
              <p><span className="text-cyan-400">➜</span> build_time: <span className="text-emerald-400">3.12s</span></p>
              <p><span className="text-cyan-400">➜</span> architecture: <span className="text-indigo-400">Cinematic Scrubber</span></p>
            </div>
          </div>
        </div>
      </BentoAssemblyCard>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: FEATURED PROJECTS (Keyframes 0.20 -> 0.52)          */}
      {/* ------------------------------------------------------------- */}
      <BentoAssemblyCard
        sectionId="projects"
        startKeyframe={0.20}
        endKeyframe={0.52}
        title="FEATURED PROJECTS"
        subtitle="PRODUCTION SPATIAL SYSTEM PORTFOLIO"
        badge="TIMELINE PHASE 02"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Project 1 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3 group hover:border-cyan-500/50 transition-colors pointer-events-auto">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-slate-100 font-mono text-sm group-hover:text-cyan-400 transition-colors">
                Orbital 3D Spatial Canvas
              </h4>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Continuous WebGL camera trajectory engine sync'd with zero-re-render Zustand state channels.
            </p>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
              <span>Three.js / R3F / Vite</span>
              <a href="#" className="flex items-center space-x-1 text-cyan-400 hover:underline">
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3 group hover:border-indigo-500/50 transition-colors pointer-events-auto">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-slate-100 font-mono text-sm group-hover:text-indigo-400 transition-colors">
                Autonomous AI Assistant
              </h4>
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              High-throughput LLM streaming agent platform with multi-tool execution and real-time canvas overlays.
            </p>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
              <span>React / TypeScript / Supabase</span>
              <a href="#" className="flex items-center space-x-1 text-indigo-400 hover:underline">
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3 group hover:border-purple-500/50 transition-colors pointer-events-auto">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-slate-100 font-mono text-sm group-hover:text-purple-400 transition-colors">
                Infinite Spatial Canvas Engine
              </h4>
              <Cpu className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Figma/Miro style pan-and-zoom node graph with interactive SVG connectors and viewport culling.
            </p>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
              <span>Canvas2D / Framer Motion</span>
              <a href="#" className="flex items-center space-x-1 text-purple-400 hover:underline">
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </BentoAssemblyCard>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: TECH MATRIX / SKILLS (Keyframes 0.48 -> 0.78)      */}
      {/* ------------------------------------------------------------- */}
      <BentoAssemblyCard
        sectionId="skills"
        startKeyframe={0.48}
        endKeyframe={0.78}
        title="TECHNICAL MATRIX"
        subtitle="CORE COMPETENCIES & ARCHITECTURAL STACK"
        badge="TIMELINE PHASE 03"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'React / Next.js', level: '98%', icon: Code2, color: 'text-cyan-400' },
            { name: 'TypeScript', level: '95%', icon: Terminal, color: 'text-blue-400' },
            { name: 'Three.js / WebGL', level: '92%', icon: Layers, color: 'text-indigo-400' },
            { name: 'Framer Motion', level: '96%', icon: Sparkles, color: 'text-purple-400' },
            { name: 'Tailwind CSS', level: '99%', icon: Cpu, color: 'text-teal-400' },
            { name: 'Zustand / Redux', level: '94%', icon: Zap, color: 'text-amber-400' },
            { name: 'Vite / Webpack', level: '91%', icon: CheckCircle2, color: 'text-emerald-400' },
            { name: 'Node.js / Supabase', level: '89%', icon: Mail, color: 'text-rose-400' },
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.name}
                className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl space-y-2 hover:border-slate-700 transition-colors pointer-events-auto"
              >
                <div className="flex items-center justify-between">
                  <IconComponent className={`w-4 h-4 ${item.color}`} />
                  <span className="font-mono text-[11px] text-slate-400">{item.level}</span>
                </div>
                <h5 className="font-mono text-xs text-slate-200 font-semibold">{item.name}</h5>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                    style={{ width: item.level }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </BentoAssemblyCard>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: INITIATE CONTACT (Keyframes 0.75 -> 1.00)           */}
      {/* ------------------------------------------------------------- */}
      <BentoAssemblyCard
        sectionId="contact"
        startKeyframe={0.75}
        endKeyframe={1.00}
        title="INITIATE CONTACT"
        subtitle="COLLABORATE ON HIGH-IMPACT SPATIAL PORTFOLIOS & APPS"
        badge="TIMELINE PHASE 04"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-mono text-slate-100">
              Ready to elevate your frontend platform?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Available for senior frontend architectural consulting, full-stack spatial WebGL apps, and performance overhaul initiatives.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>abdallahedrees@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Github className="w-4 h-4 text-indigo-400" />
                <span>github.com/abdallahedreeso</span>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Message transmitted successfully via Cinematic Timeline Pipeline!');
            }}
            className="space-y-3 pointer-events-auto"
          >
            <div>
              <input
                type="text"
                required
                placeholder="Your Name / Organization"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Your Direct Email"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <textarea
                required
                rows={3}
                placeholder="Project Scope / Inquiry Details"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold font-mono text-xs transition-transform active:scale-98 shadow-lg shadow-cyan-500/20"
            >
              TRANSMIT MESSAGE
            </button>
          </form>
        </div>
      </BentoAssemblyCard>
    </div>
  );
};
