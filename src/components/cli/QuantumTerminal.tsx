import React, { useRef, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CornerDownLeft, Sparkles, RefreshCw, Cpu, Layers, Maximize2, Minus, X, HelpCircle } from 'lucide-react';
import { CLIOutputItem, COMMAND_REGISTRY, LazyProjectsGrid, LazySkillsRadar, LazyContactForm, LazyAboutBio } from '@/lib/commandRegistry';

interface QuantumTerminalProps {
  history: CLIOutputItem[];
  inputBuffer: string;
  setInputBuffer: (val: string) => void;
  onExecuteCommand: (cmd: string) => void;
  onAutoType: (cmd: string) => void;
  onTabCompletion: () => void;
  onNavigateHistory: (dir: 'up' | 'down') => void;
  activeWindowCount: number;
}

const InlineModuleFallback = () => (
  <div className="p-4 bg-slate-900/60 rounded-lg border border-cyan-500/20 text-xs font-mono text-cyan-400 flex items-center gap-2">
    <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
    <span>Loading dynamic component module...</span>
  </div>
);

export const QuantumTerminal: React.FC<QuantumTerminalProps> = ({
  history,
  inputBuffer,
  setInputBuffer,
  onExecuteCommand,
  onAutoType,
  onTabCompletion,
  onNavigateHistory,
  activeWindowCount,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll output history buffer to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onExecuteCommand(inputBuffer);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      onTabCompletion();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onNavigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onNavigateHistory('down');
    }
  };

  const quickActionChips = [
    { label: 'show projects', icon: '🚀' },
    { label: 'skills', icon: '⚡' },
    { label: 'about', icon: '👨‍💻' },
    { label: 'contact', icon: '✉️' },
    { label: 'neofetch', icon: '🖥️' },
    { label: 'matrix', icon: '🟢' },
    { label: 'clear', icon: '🧹' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col pointer-events-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Titlebar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-200 tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            abdallah@quantum-cli: ~/portfolio
          </span>
        </div>

        <div className="flex items-center gap-3">
          {activeWindowCount > 0 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {activeWindowCount} WINDOWS ACTIVE
            </span>
          )}
          <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            ONLINE
          </span>
        </div>
      </div>

      {/* Terminal Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs custom-scrollbar">
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            {/* Command Header Line */}
            {item.command && (
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-cyan-400 font-bold">abdallah@quantum-cli:~$</span>
                <span className="text-white font-bold">{item.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
              </div>
            )}

            {/* Output Display */}
            {item.type === 'text' && (
              <div className="pl-4 text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
                {item.content}
              </div>
            )}

            {item.type === 'system' && (
              <div className="pl-4 text-cyan-300/90 leading-relaxed whitespace-pre-wrap bg-cyan-950/30 p-3 rounded-lg border border-cyan-500/20">
                {item.content}
              </div>
            )}

            {item.type === 'error' && (
              <div className="pl-4 text-rose-400 leading-relaxed whitespace-pre-wrap bg-rose-950/30 p-3 rounded-lg border border-rose-500/30">
                {item.content}
              </div>
            )}

            {item.type === 'success' && (
              <div className="pl-4 text-emerald-300 leading-relaxed whitespace-pre-wrap bg-emerald-950/30 p-3 rounded-lg border border-emerald-500/30">
                {item.content}
              </div>
            )}

            {item.type === 'component' && (
              <div className="pl-4 space-y-2">
                <div className="text-emerald-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{item.content}</span>
                </div>
                {/* Embedded Inline Lazy Component */}
                <div className="rounded-xl border border-cyan-500/20 bg-slate-900/60 overflow-hidden">
                  <Suspense fallback={<InlineModuleFallback />}>
                    {item.componentName === 'ProjectsGrid' && <LazyProjectsGrid />}
                    {item.componentName === 'SkillsRadar' && <LazySkillsRadar />}
                    {item.componentName === 'AboutBio' && <LazyAboutBio />}
                    {item.componentName === 'ContactForm' && <LazyContactForm />}
                  </Suspense>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-4 py-2 bg-slate-900/70 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Suggestions:
        </span>
        {quickActionChips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onAutoType(chip.label)}
            className="shrink-0 px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800/80 text-cyan-300 border border-slate-700/60 hover:border-cyan-400 hover:bg-cyan-950/60 transition-all flex items-center gap-1.5"
          >
            <span>{chip.icon}</span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Input Prompt Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3">
        <span className="text-cyan-400 font-mono font-bold shrink-0">abdallah@quantum-cli:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputBuffer}
          onChange={(e) => setInputBuffer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command ('help', 'show projects', 'skills')..."
          className="flex-1 bg-transparent text-xs font-mono text-white placeholder-slate-500 outline-none"
          autoFocus
          spellCheck={false}
        />
        <button
          onClick={() => onExecuteCommand(inputBuffer)}
          className="px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900 text-xs font-mono flex items-center gap-1 transition-all"
        >
          <span>RUN</span>
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};
