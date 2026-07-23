import { create } from 'zustand';

export interface RectBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type AppTheme = 'dark' | 'light';

interface PortfolioState {
  // Scroll progress from 0 (Hero) to 1 (Bottom/Contact)
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Active Bento card hover state for 3D particle bridge
  hoveredCardId: string | null;
  hoveredCardBounds: RectBounds | null;
  setHoveredCard: (id: string | null, bounds?: RectBounds | null) => void;

  // Global mouse coordinates (-1 to 1 normalized)
  mousePos: { x: number; y: number };
  setMousePos: (x: number, y: number) => void;

  // Active application theme sync for WebGL
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;

  // WebGL performance toggle (low power mode fallback)
  isLowPower: boolean;
  setIsLowPower: (lowPower: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

  hoveredCardId: null,
  hoveredCardBounds: null,
  setHoveredCard: (hoveredCardId, hoveredCardBounds = null) =>
    set({ hoveredCardId, hoveredCardBounds }),

  mousePos: { x: 0, y: 0 },
  setMousePos: (x, y) => set({ mousePos: { x, y } }),

  theme: 'dark',
  setTheme: (theme) => set({ theme }),

  isLowPower: false,
  setIsLowPower: (isLowPower) => set({ isLowPower }),
}));
