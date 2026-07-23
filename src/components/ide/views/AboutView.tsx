import React from "react";

export const AboutView: React.FC = () => {
  return (
    <div className="w-full max-w-4xl space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900/80 border border-cyan-500/30 rounded-xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-1 shrink-0 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-mono font-bold text-2xl text-cyan-400">
              AE
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-cyan-950 border border-cyan-500/40 rounded text-cyan-300 font-mono text-xs">
              <span>STATUS: Lead Frontend Architect</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
              Abdallah Edrees
            </h1>
            <p className="text-sm font-mono text-slate-400">
              Specializing in High-Performance WebGL Interfaces, React 18 System Architecture & Quantum IDE UIs.
            </p>
          </div>
        </div>
      </div>

      {/* Markdown Document Content */}
      <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-xl backdrop-blur-md space-y-6 text-slate-300 leading-relaxed font-sans">
        {/* Section 1: Manifesto */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-cyan-300 font-mono flex items-center space-x-2">
            <span className="text-slate-500">#</span>
            <span>Architectural Philosophy</span>
          </h2>
          <p className="text-sm text-slate-300">
            I build web applications that blur the boundary between software tools and cinematic digital art. Every pixel, layout transition, and code bundle is optimized for speed, clarity, and visual impact.
          </p>
          <blockquote className="p-4 bg-cyan-950/40 border-l-4 border-cyan-400 text-cyan-200 text-sm font-mono italic rounded-r-lg">
            "Great frontend engineering is invisible in its latency, and unforgettable in its aesthetics."
          </blockquote>
        </section>

        <hr className="border-slate-800" />

        {/* Section 2: Core Engineering Pillars */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-cyan-300 font-mono flex items-center space-x-2">
            <span className="text-slate-500">##</span>
            <span>Core Technical Pillars</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
              <h3 className="font-mono text-sm font-bold text-emerald-400">
                1. Micro-Bundle Budget Enforcement
              </h3>
              <p className="text-xs text-slate-400">
                Strict initial JS payloads kept under ~101 kB via dynamic React.Suspense code splitting and zero-dependency state architectures.
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
              <h3 className="font-mono text-sm font-bold text-purple-400">
                2. Continuous WebGL Stacking
              </h3>
              <p className="text-xs text-slate-400">
                Decoupled GPU render passes sitting behind glassmorphic DOM layouts, providing rich spatial depth without UI re-paint lag.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-800" />

        {/* Section 3: Career Timeline */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-cyan-300 font-mono flex items-center space-x-2">
            <span className="text-slate-500">###</span>
            <span>Experience Timeline</span>
          </h2>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-950/80 border border-cyan-500/20 rounded-lg space-y-1">
              <div className="flex justify-between text-cyan-400 font-bold">
                <span>LEAD FRONTEND ARCHITECT & CONSULTANT</span>
                <span>2023 — PRESENT</span>
              </div>
              <p className="text-slate-300">
                Architecting high-scale frontend systems, WebGL interactive showcases, and developer tools for global enterprise clients.
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-lg space-y-1">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>SENIOR WEBGL & UI ENGINEER</span>
                <span>2021 — 2023</span>
              </div>
              <p className="text-slate-400">
                Pioneered spatial 3D web applications, R3F shaders, and custom reactive micro-frameworks.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutView;
