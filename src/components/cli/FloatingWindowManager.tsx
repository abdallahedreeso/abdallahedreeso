import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Terminal, Loader2 } from 'lucide-react';
import { FloatingWindow } from '@/hooks/useQuantumCLI';
import {
  LazyProjectsGrid,
  LazySkillsRadar,
  LazyContactForm,
  LazyAboutBio,
} from '@/lib/commandRegistry';

interface FloatingWindowManagerProps {
  windows: FloatingWindow[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
}

const ModuleFallback = () => (
  <div className="p-12 flex flex-col items-center justify-center space-y-3 font-mono text-cyan-400 text-xs">
    <Loader2 className="w-8 h-8 animate-spin" />
    <span>[FETCHING LAZY CHUNK...]</span>
  </div>
);

export const FloatingWindowManager: React.FC<FloatingWindowManagerProps> = ({
  windows,
  onClose,
  onMinimize,
  onFocus,
}) => {
  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case 'ProjectsGrid':
        return <LazyProjectsGrid />;
      case 'SkillsRadar':
        return <LazySkillsRadar />;
      case 'AboutBio':
        return <LazyAboutBio />;
      case 'ContactForm':
        return <LazyContactForm />;
      default:
        return <div className="p-4 text-slate-400">Unknown component module</div>;
    }
  };

  return (
    <AnimatePresence>
      {windows.map((win) => {
        if (win.isMinimized) return null;

        return (
          <motion.div
            key={win.id}
            initial={{ opacity: 0, scale: 0.85, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            drag
            dragMomentum={false}
            onMouseDown={() => onFocus(win.id)}
            style={{ zIndex: win.zIndex }}
            className="fixed top-12 left-4 sm:left-auto right-4 sm:right-12 w-[calc(100vw-32px)] sm:w-[680px] max-h-[80vh] rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Title bar - Drag Handle */}
            <div className="cursor-grab active:cursor-grabbing px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onClose(win.id)}
                    className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors flex items-center justify-center group"
                  >
                    <X className="w-2 h-2 text-slate-950 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={() => onMinimize(win.id)}
                    className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors flex items-center justify-center group"
                  >
                    <Minus className="w-2 h-2 text-slate-950 opacity-0 group-hover:opacity-100" />
                  </button>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono font-bold text-cyan-300 ml-2 tracking-wide flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" /> {win.title}
                </span>
              </div>

              <div className="text-[10px] font-mono text-slate-500">
                [DRAGGABLE WINDOW]
              </div>
            </div>

            {/* Window Content Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
              <Suspense fallback={<ModuleFallback />}>
                {renderComponent(win.componentName)}
              </Suspense>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
