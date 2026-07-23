import React, { useState } from "react";

interface Project {
  id: string;
  title: string;
  category: "3D & WebGL" | "Frontend Architecture" | "AI & Cloud";
  description: string;
  metrics: string;
  tech: string[];
  stars: number;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "architect-ide",
    title: "The Architect's IDE Portfolio",
    category: "Frontend Architecture",
    description: "Quantum cyber portfolio modeled after VS Code with lazy-loaded Suspense chunks, custom reactive store, and continuous 3D canvas backdrop.",
    metrics: "Initial JS Payload < 101 kB • 60 FPS WebGL",
    tech: ["React 18", "TypeScript", "Tailwind CSS", "Canvas WebGL"],
    stars: 128,
    featured: true,
  },
  {
    id: "orbital-hub",
    title: "Orbital 3D Spatial Hub",
    category: "3D & WebGL",
    description: "Spatial portfolio engine with three-dimensional orbital mechanics, camera interpolation curves, and DOM event raycasting.",
    metrics: "3.27s Build Time • Custom Shaders",
    tech: ["Three.js", "React Three Fiber", "GLSL Shaders", "Framer Motion"],
    stars: 94,
    featured: true,
  },
  {
    id: "ai-copilot",
    title: "Antigravity Agentic IDE Studio",
    category: "AI & Cloud",
    description: "Autonomous software development workspace integrating multi-agent task execution, system logs, and intelligent refactoring.",
    metrics: "10x Dev Productivity • Realtime Socket Engine",
    tech: ["TypeScript", "Supabase", "TanStack Query", "Node.js"],
    stars: 310,
    featured: true,
  },
  {
    id: "infinite-canvas",
    title: "Infinite Node Visual Engine",
    category: "Frontend Architecture",
    description: "High-performance vector node canvas supporting infinite pan/zoom, dynamic connection lines, and mini-map spatial navigation.",
    metrics: "10,000+ Synchronous SVG Nodes",
    tech: ["React", "HTML5 Canvas", "Tailwind CSS", "Zustand"],
    stars: 87,
  },
];

export const ProjectsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Frontend Architecture", "3D & WebGL", "AI & Cloud"];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full space-y-6 font-sans">
      {/* View Header */}
      <div className="p-6 bg-slate-900/80 border border-cyan-500/30 rounded-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-cyan-950/70 border border-cyan-500/40 rounded-full text-cyan-300 font-mono text-xs mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>EXPORT CLASS ProjectsBentoGrid</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Featured Systems & Architectural Builds
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl font-mono">
              Production-grade applications, 3D WebGL experiences, and high-throughput frontend systems engineered under strict performance budgets.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="text-slate-400">Filter:</span>
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedCategory === cat
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`group relative p-6 bg-slate-900/70 border rounded-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between ${
              project.featured
                ? "border-cyan-500/40 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-cyan-950/20"
                : "border-slate-800/90 hover:border-cyan-500/30"
            }`}
          >
            {project.featured && (
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-cyan-950 border border-cyan-400/50 rounded text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                FEATURED
              </div>
            )}

            <div>
              <div className="text-xs font-mono text-cyan-400 font-semibold mb-2">
                {project.category}
              </div>
              <h2 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mt-6 space-y-4 pt-4 border-t border-slate-800/80">
              <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                ⚡ {project.metrics}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-slate-800/90 border border-slate-700 text-[10px] font-mono text-slate-300 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-2">
                <span className="text-slate-400 flex items-center space-x-1">
                  <span>★</span>
                  <span>{project.stars} stars</span>
                </span>

                <button className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-semibold group-hover:underline">
                  <span>Inspect Code</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
