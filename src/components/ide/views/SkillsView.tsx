import React from "react";

interface SkillGroup {
  category: string;
  items: { name: string; level: number; tag: string }[];
}

const SKILL_DATA: SkillGroup[] = [
  {
    category: "Frontend Core & Frameworks",
    items: [
      { name: "React 18 / Next.js", level: 98, tag: "EXPERT" },
      { name: "TypeScript 5.x", level: 96, tag: "EXPERT" },
      { name: "Tailwind CSS & Glassmorphism", level: 95, tag: "EXPERT" },
      { name: "State Architecture (Zustand/Redux)", level: 92, tag: "ADVANCED" },
    ],
  },
  {
    category: "3D Graphics & Animation",
    items: [
      { name: "WebGL / HTML5 Canvas Shaders", level: 90, tag: "ADVANCED" },
      { name: "Three.js / React Three Fiber", level: 88, tag: "ADVANCED" },
      { name: "Framer Motion Kinetic Physics", level: 94, tag: "EXPERT" },
    ],
  },
  {
    category: "Architecture & Tooling",
    items: [
      { name: "Vite Code-Splitting & Bundling", level: 95, tag: "EXPERT" },
      { name: "Micro-Frontends & Module Federation", level: 86, tag: "ADVANCED" },
      { name: "Web Performance & Lighthouse Auditing", level: 98, tag: "EXPERT" },
    ],
  },
];

export const SkillsView: React.FC = () => {
  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="p-6 bg-slate-900/80 border border-cyan-500/30 rounded-xl backdrop-blur-md">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-amber-950/70 border border-amber-500/40 rounded-full text-amber-300 font-mono text-xs mb-2">
          <span>JSON SCHEMAVALIDATED SkillsMatrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Technical Competencies & Engineering Radar
        </h1>
        <p className="text-sm font-mono text-slate-400 mt-1">
          Quantitative proficiency metrics across frontend core, 3D graphics, state management, and build optimization.
        </p>
      </div>

      {/* Grid: Visual Radar & JSON Code Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Skills Matrix */}
        <div className="space-y-6">
          {SKILL_DATA.map((group) => (
            <div
              key={group.category}
              className="p-5 bg-slate-900/70 border border-slate-800 rounded-xl backdrop-blur-md space-y-4"
            >
              <h2 className="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wide">
                {group.category}
              </h2>

              <div className="space-y-3">
                {group.items.map((skill) => (
                  <div key={skill.name} className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                          {skill.tag}
                        </span>
                        <span className="text-slate-400">{skill.level}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* JSON Source Editor Mock */}
        <div className="p-5 bg-slate-950/90 border border-amber-500/30 rounded-xl font-mono text-xs overflow-x-auto shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-500">
            <span>Skills.json</span>
            <span className="text-amber-400 font-bold">Valid Schema</span>
          </div>

          <pre className="text-slate-300 leading-relaxed">
            {`{
  "developer": "Abdallah Edrees",
  "role": "Lead Frontend Architect",
  "competencies": {
    "frontend": [
      { "name": "React 18", "score": 98, "status": "active" },
      { "name": "TypeScript", "score": 96, "status": "active" },
      { "name": "Tailwind CSS", "score": 95, "status": "active" }
    ],
    "webgl": [
      { "name": "Shaders", "score": 90, "status": "active" },
      { "name": "Three.js", "score": 88, "status": "active" }
    ],
    "optimization": [
      { "targetPayload": "< 101.21 kB", "status": "PASSED" },
      { "targetBuildTime": "< 3.27s", "status": "PASSED" }
    ]
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SkillsView;
