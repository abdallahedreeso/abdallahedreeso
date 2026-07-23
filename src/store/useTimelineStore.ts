import { create } from 'zustand';

interface KeyframeSection {
  id: string;
  label: string;
  start: number; // 0.0 - 1.0
  end: number;   // 0.0 - 1.0
  color: string;
}

export const TIMELINE_SECTIONS: KeyframeSection[] = [
  { id: 'hero', label: '01 // OVERVIEW', start: 0.0, end: 0.22, color: 'from-cyan-500 to-blue-600' },
  { id: 'projects', label: '02 // FEATURED PROJECTS', start: 0.20, end: 0.52, color: 'from-blue-600 to-indigo-600' },
  { id: 'skills', label: '03 // TECH MATRIX', start: 0.48, end: 0.78, color: 'from-indigo-600 to-purple-600' },
  { id: 'contact', label: '04 // INITIATE CONTACT', start: 0.75, end: 1.00, color: 'from-purple-600 to-pink-600' },
];

interface TimelineStore {
  progress: number; // 0.0 to 1.0
  isPlaying: boolean;
  playbackSpeed: number;
  activeSectionId: string;
  
  // Actions
  setProgress: (progress: number | ((prev: number) => number)) => void;
  setIsPlaying: (isPlaying: boolean | ((prev: boolean) => boolean)) => void;
  togglePlaying: () => void;
  setPlaybackSpeed: (speed: number) => void;
  jumpToSection: (sectionId: string) => void;
  
  // Transient Subscribers for R3F and Framer Motion
  listeners: Set<(progress: number) => void>;
  subscribeProgress: (fn: (progress: number) => void) => () => void;
}

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  progress: 0,
  isPlaying: false,
  playbackSpeed: 1,
  activeSectionId: 'hero',
  listeners: new Set(),

  setProgress: (val) => {
    const nextProgress = Math.max(0, Math.min(1, typeof val === 'function' ? val(get().progress) : val));
    
    // Determine active section
    const currentSection = TIMELINE_SECTIONS.find(
      (s) => nextProgress >= s.start && nextProgress <= s.end
    ) || TIMELINE_SECTIONS[0];

    // Notify transient non-react listeners directly
    get().listeners.forEach((fn) => fn(nextProgress));

    set({
      progress: nextProgress,
      activeSectionId: currentSection.id,
    });
  },

  setIsPlaying: (val) => {
    set({ isPlaying: typeof val === 'function' ? val(get().isPlaying) : val });
  },

  togglePlaying: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setPlaybackSpeed: (speed) => {
    set({ playbackSpeed: speed });
  },

  jumpToSection: (sectionId) => {
    const section = TIMELINE_SECTIONS.find((s) => s.id === sectionId);
    if (section) {
      get().setProgress(section.start + (section.end - section.start) * 0.1);
    }
  },

  subscribeProgress: (fn) => {
    const listeners = get().listeners;
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
}));

// Helper to format float progress (0..1) to Premiere-style SMPTE Timecode (00:00:24:12)
export function formatSMPTETimecode(progress: number, totalSeconds: number = 60): string {
  const currentSec = progress * totalSeconds;
  const mins = Math.floor(currentSec / 60);
  const secs = Math.floor(currentSec % 60);
  const ms = Math.floor((currentSec % 1) * 100);

  const pad = (n: number, z = 2) => ('00' + n).slice(-z);
  return `${pad(mins)}:${pad(secs)}.${pad(ms, 2)}`;
}
