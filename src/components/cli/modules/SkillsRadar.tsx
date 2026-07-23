import React from 'react';
import { Cpu, Terminal, Shield, Zap, Layout, Server, Database, Cloud } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: any;
  skills: { name: string; level: number; tag: string }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Architecture & Frameworks',
    icon: Layout,
    skills: [
      { name: 'React 18 / Next.js', level: 98, tag: 'Core Stack' },
      { name: 'TypeScript / Enterprise JS', level: 96, tag: 'Strict Typing' },
      { name: 'State Management (Zustand, Query)', level: 94, tag: 'Data Flow' },
      { name: 'TailwindCSS / Design Systems', level: 98, tag: 'UI Engineering' },
    ],
  },
  {
    title: 'WebGL, 3D & Framer Motion Physics',
    icon: Cpu,
    skills: [
      { name: 'HTML5 Canvas & WebGL Shaders', level: 90, tag: 'Graphics Engine' },
      { name: 'Framer Motion Spring Physics', level: 95, tag: 'Animation Engine' },
      { name: 'Three.js / React Three Fiber', level: 88, tag: '3D Viewport' },
      { name: 'Performance Optimization (<100kB)', level: 97, tag: 'Bundle Budgeting' },
    ],
  },
  {
    title: 'Backend, APIs & Cloud Architecture',
    icon: Server,
    skills: [
      { name: 'Node.js / Express / REST APIs', level: 92, tag: 'Backend Runtime' },
      { name: 'Supabase / PostgreSQL / ORM', level: 90, tag: 'Database Schema' },
      { name: 'Docker / CI/CD Pipelines / Vercel', level: 88, tag: 'DevOps & Deploy' },
      { name: 'Security & Web Accessibility (a11y)', level: 94, tag: 'Standards' },
    ],
  },
];

export const SkillsRadar: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-100 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h2 className="text-xl font-bold tracking-wide text-white">Technical Skills Radar</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quantified proficiency matrix & core technical capabilities
          </p>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
          SYS_VERIFIED: 100%
        </span>
      </div>

      {/* Skill Categories */}
      <div className="grid grid-cols-1 gap-5">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="rounded-xl p-5 bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">{cat.title}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.skills.map((s, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-200">{s.name}</span>
                      <span className="font-mono text-cyan-400 font-bold">{s.level}%</span>
                    </div>
                    <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 inline-block pt-1">
                      🏷️ {s.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsRadar;
