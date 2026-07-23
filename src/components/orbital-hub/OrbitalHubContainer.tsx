import React, { useState, lazy, Suspense } from 'react';
import { SectionId, ORBITAL_NODES_CONFIG } from './orbital-types';
import { OrbitalCanvas } from './OrbitalCanvas';
import { ArrowLeft, Orbit, FolderGit2, Cpu, UserCheck, Terminal, Maximize2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Lazy load overlay content to maintain initial payload budget < 101.21 kB
const AboutSection = lazy(() =>
  import('@/components/about-section').then((m) => ({ default: m.AboutSection }))
);
const ProjectsSection = lazy(() =>
  import('@/components/projects-section').then((m) => ({ default: m.ProjectsSection }))
);
const SkillsSection = lazy(() =>
  import('@/components/skills-section').then((m) => ({ default: m.SkillsSection }))
);
const ContactSection = lazy(() =>
  import('@/components/contact-section').then((m) => ({ default: m.ContactSection }))
);

const SectionOverlayLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    <span className="text-sm font-mono text-muted-foreground animate-pulse">
      Initializing Spatial Overlay Node...
    </span>
  </div>
);

export const OrbitalHubContainer: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<SectionId | null>(null);

  const handleSelectNode = (id: SectionId | null) => {
    setActiveNodeId(id);
  };

  const activeConfig = ORBITAL_NODES_CONFIG.find((n) => n.id === activeNodeId);

  const renderActiveSectionContent = () => {
    switch (activeNodeId) {
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 text-slate-100 select-none">
      {/* Background 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <OrbitalCanvas activeNodeId={activeNodeId} onSelectNode={handleSelectNode} />
      </div>

      {/* Top HUD Header Navigation */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-slate-950/90 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto cursor-pointer" onClick={() => handleSelectNode(null)}>
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/30 text-primary shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Orbit className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider font-mono text-slate-100">
              ORBITAL 3D HUB
            </h1>
            <p className="text-xs font-mono text-primary/80">Spatial Node Portfolio Architecture</p>
          </div>
        </div>

        {/* Status / Active Mode Indicator */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {activeNodeId ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectNode(null)}
              className="gap-2 font-mono text-xs border-primary/40 bg-background/60 hover:bg-primary/20 hover:border-primary text-slate-100 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <ArrowLeft className="w-4 h-4 text-primary" />
              Reset Camera Orbit
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-slate-900/60 backdrop-blur-md text-xs font-mono text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Select any orbiting node to navigate</span>
            </div>
          )}
        </div>
      </header>

      {/* Bottom HUD Orbit Selector Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <nav className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <Button
            variant={activeNodeId === null ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleSelectNode(null)}
            className={`font-mono text-xs gap-1.5 rounded-xl transition-all ${
              activeNodeId === null
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Orbit className="w-4 h-4" />
            <span className="hidden md:inline">Orbit Mode</span>
          </Button>

          <div className="w-px h-5 bg-slate-800 my-auto" />

          {ORBITAL_NODES_CONFIG.map((node) => {
            const isActive = activeNodeId === node.id;
            return (
              <Button
                key={`hud-${node.id}`}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleSelectNode(node.id)}
                className={`font-mono text-xs gap-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-slate-950 font-bold shadow-lg'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
                style={{
                  backgroundColor: isActive ? node.color : undefined,
                  boxShadow: isActive ? `0 0 15px ${node.glowColor}` : undefined,
                }}
              >
                <span>{node.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* HTML Glassmorphic Overlay Layer */}
      {activeNodeId && (
        <div className="absolute inset-0 z-10 pt-20 pb-24 overflow-y-auto pointer-events-auto bg-slate-950/75 backdrop-blur-xl transition-all duration-500 animate-in fade-in zoom-in-95">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Overlay Header Banner */}
            <div className="flex items-center justify-between p-4 mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: activeConfig?.color }}
                />
                <div>
                  <h2 className="text-lg font-bold font-mono text-slate-100">
                    {activeConfig?.label}
                  </h2>
                  <p className="text-xs font-mono text-slate-400">
                    {activeConfig?.subtitle}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSelectNode(null)}
                className="text-slate-400 hover:text-slate-100 font-mono text-xs gap-1"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Close Node
              </Button>
            </div>

            {/* Rendered Lazy Content */}
            <Suspense fallback={<SectionOverlayLoader />}>
              {renderActiveSectionContent()}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};
