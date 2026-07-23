import React from 'react';
import { User, ShieldCheck, Terminal, Award, Compass, HeartHandshake } from 'lucide-react';

export const AboutBio: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-100 font-sans">
      {/* Header Profile Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-900/90 p-5 rounded-xl border border-cyan-500/30 backdrop-blur-md">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-mono font-extrabold text-2xl text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] shrink-0">
          AE
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Abdallah Edrees</h2>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
              VERIFIED ARCHITECT
            </span>
          </div>
          <p className="text-xs text-cyan-400 font-mono">Lead Frontend Architect & UI Engineer</p>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            Specializing in high-performance WebGL interfaces, micro-frontend architectures, and pixel-perfect design systems with strict bundle budgeting.
          </p>
        </div>
      </div>

      {/* Engineering Philosophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Compass className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Performance-First Engineering</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every kilobyte matters. I engineer applications that initial load in milliseconds using dynamic chunk splitting, sub-100kB asset targets, and tree-shaken dependencies.
          </p>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Award className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Visual Excellence</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Crafting memorable user experiences that combine dynamic 3D shaders, glassmorphism, and responsive spring physics with zero compromises on accessibility.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider flex items-center gap-2">
          <Terminal className="w-4 h-4" /> Experience Timeline
        </h3>
        <div className="space-y-4 border-l-2 border-cyan-500/30 pl-4 ml-1">
          <div className="relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-cyan-950" />
            <span className="text-[10px] font-mono text-cyan-400">2023 - PRESENT</span>
            <h4 className="text-sm font-bold text-white">Lead Frontend Architect</h4>
            <p className="text-xs text-slate-400 mt-1">
              Architecting enterprise WebGL dashboards, zero-scroll spatial platforms, and component libraries.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span className="text-[10px] font-mono text-slate-400">2021 - 2023</span>
            <h4 className="text-sm font-bold text-white">Senior UI/UX & React Engineer</h4>
            <p className="text-xs text-slate-400 mt-1">
              Engineered high-concurrency SaaS applications, Framer Motion design tokens, and real-time canvas tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBio;
