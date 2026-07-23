import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { QuantumBackgroundCanvas } from '@/components/cli/QuantumBackgroundCanvas';
import { QuantumTerminal } from '@/components/cli/QuantumTerminal';
import { FloatingWindowManager } from '@/components/cli/FloatingWindowManager';
import { useQuantumCLI } from '@/hooks/useQuantumCLI';
import { Sparkles, Terminal as TerminalIcon, Github, Linkedin, Mail, Cpu, Layers } from 'lucide-react';

const Index = () => {
  const {
    history,
    inputBuffer,
    setInputBuffer,
    executeCommand,
    autoTypeAndExecute,
    handleTabCompletion,
    navigateHistory,
    activeWindows,
    bringToFront,
    closeWindow,
    toggleMinimizeWindow,
  } = useQuantumCLI();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="quantum-theme">
      {/* Fixed 100vh viewport container with zero scroll */}
      <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
        {/* 3D WebGL Background Canvas */}
        <QuantumBackgroundCanvas />

        {/* Top Floating Glass Navigation Header */}
        <header className="relative z-20 px-6 py-3 border-b border-cyan-500/20 bg-slate-950/60 backdrop-blur-md flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-mono font-bold text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              AE
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                Abdallah Edrees
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  QUANTUM CLI ARCHITECTURE
                </span>
              </h1>
              <p className="text-[11px] font-mono text-slate-400">Lead Frontend Architect</p>
            </div>
          </div>

          {/* Social Links & Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => autoTypeAndExecute('show projects')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> PROJECTS
            </button>
            <button
              onClick={() => autoTypeAndExecute('contact')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 text-slate-300 border border-slate-700 hover:text-white transition-all"
            >
              <Mail className="w-3.5 h-3.5" /> CONTACT
            </button>

            <div className="w-px h-5 bg-slate-800 hidden sm:block" />

            <a
              href="https://github.com/abdallahedreeso"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </header>

        {/* Main Content Area - Center Floating Terminal */}
        <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <QuantumTerminal
            history={history}
            inputBuffer={inputBuffer}
            setInputBuffer={setInputBuffer}
            onExecuteCommand={executeCommand}
            onAutoType={autoTypeAndExecute}
            onTabCompletion={handleTabCompletion}
            onNavigateHistory={navigateHistory}
            activeWindowCount={activeWindows.length}
          />
        </main>

        {/* Floating Windows Manager Container */}
        <div className="relative z-30 pointer-events-none">
          <FloatingWindowManager
            windows={activeWindows}
            onClose={closeWindow}
            onMinimize={toggleMinimizeWindow}
            onFocus={bringToFront}
          />
        </div>

        {/* Bottom Status Bar */}
        <footer className="relative z-20 px-6 py-2 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex items-center justify-between text-[11px] font-mono text-slate-400 pointer-events-auto">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              STATUS: READY
            </span>
            <span className="hidden sm:inline-block">BUNDLE BUDGET: &le; 101.21 kB</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block">PRESS [TAB] FOR AUTO-COMPLETE</span>
            <span>&copy; 2025 ABDALLAH EDREES</span>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
