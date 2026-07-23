import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Code2, Layers, Cpu } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: string;
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Quantum Engine 3D Portfolio',
    category: 'WebGL / Frontend Architecture',
    description: 'High-performance zero-scroll web application powered by custom shaders, terminal engine, and Framer Motion spring physics.',
    tags: ['React 18', 'TypeScript', 'Canvas WebGL', 'Framer Motion', 'TailwindCSS'],
    metrics: '< 101.21 kB Initial Bundle',
    githubUrl: 'https://github.com/abdallahedreeso/quantum-cli',
    liveUrl: 'https://abdallahedreeso.dev',
    featured: true,
  },
  {
    id: '2',
    title: 'Enterprise AI Agent Studio',
    category: 'Fullstack / LLM Orchestration',
    description: 'Multi-agent orchestration platform featuring realtime graph execution, streaming log visualizers, and state persistence.',
    tags: ['Next.js 14', 'Python / FastApi', 'Tailwind', 'Zustand', 'WebSockets'],
    metrics: '99.8% Uptime | 40ms Latency',
    githubUrl: 'https://github.com/abdallahedreeso/ai-agent-studio',
    liveUrl: 'https://agent-studio.dev',
    featured: true,
  },
  {
    id: '3',
    title: 'SaaS Analytics Dashboard & Data Grid',
    category: 'Data Visualization',
    description: 'Real-time financial analytics dashboard handling 100k+ rows with canvas grid rendering and customized charts.',
    tags: ['React', 'Recharts', 'TanStack Query', 'Shadcn UI', 'Tailwind'],
    metrics: '60 FPS Smooth Scroll',
    githubUrl: 'https://github.com/abdallahedreeso/saas-dashboard',
    liveUrl: 'https://saas-grid-demo.dev',
    featured: false,
  },
  {
    id: '4',
    title: 'Spatial Canvas Whiteboard',
    category: 'Interactive Web',
    description: 'Collaborative infinite node whiteboard supporting real-time web socket syncing, smooth pan/zoom, and vector drawing.',
    tags: ['TypeScript', 'HTML5 Canvas', 'WebRTC', 'Tailwind'],
    metrics: 'Infinite Canvas Stack',
    githubUrl: 'https://github.com/abdallahedreeso/spatial-whiteboard',
    liveUrl: 'https://spatial-canvas.dev',
    featured: false,
  },
];

export const ProjectsGrid: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()));
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-100 font-sans">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h2 className="text-xl font-bold tracking-wide text-white">Bento Grid Portfolio</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Displaying {filteredProjects.length} architected projects
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {['all', 'React', 'TypeScript', 'WebGL', 'Next.js'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                filter === f
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`group relative rounded-xl p-5 border transition-all duration-300 backdrop-blur-md ${
              project.featured
                ? 'bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-cyan-950/40 border-cyan-500/30 hover:border-cyan-400 shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] md:col-span-2'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-600 hover:bg-slate-900/95'
            }`}
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-2">
                  {project.title}
                </h3>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                  title="View Source Code"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 hover:bg-cyan-900 transition-all border border-cyan-500/30"
                  title="Open Live App"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">{project.description}</p>

            {/* Metrics & Tags */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-mono text-cyan-400/90 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-500/20 whitespace-nowrap">
                ⚡ {project.metrics}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
