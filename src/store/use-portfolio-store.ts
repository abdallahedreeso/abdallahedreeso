import { useSyncExternalStore } from "react";

export type WindowId = "about" | "projects" | "skills" | "contact" | "hero";

export interface WindowState {
  id: WindowId;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

interface PortfolioState {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  highestZIndex: number;
}

const INITIAL_STATE: PortfolioState = {
  activeWindowId: "hero",
  highestZIndex: 20,
  windows: {
    hero: {
      id: "hero",
      title: "Terminal / Overview",
      iconName: "Terminal",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 20,
      defaultPosition: { x: 30, y: 30 },
      defaultSize: { width: 800, height: 520 },
    },
    about: {
      id: "about",
      title: "About Me",
      iconName: "User",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      defaultPosition: { x: 60, y: 40 },
      defaultSize: { width: 860, height: 580 },
    },
    projects: {
      id: "projects",
      title: "Selected Projects",
      iconName: "FolderGit2",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      defaultPosition: { x: 90, y: 50 },
      defaultSize: { width: 920, height: 600 },
    },
    skills: {
      id: "skills",
      title: "Technical Skills",
      iconName: "Cpu",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      defaultPosition: { x: 120, y: 60 },
      defaultSize: { width: 840, height: 550 },
    },
    contact: {
      id: "contact",
      title: "Get In Touch",
      iconName: "Mail",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      defaultPosition: { x: 150, y: 70 },
      defaultSize: { width: 760, height: 530 },
    },
  },
};

let currentState: PortfolioState = INITIAL_STATE;
const listeners = new Set<() => void>();

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const BASELINE_Z_INDEX = 10;
const MAX_Z_INDEX_THRESHOLD = 100;

function calculateNextZState(
  state: PortfolioState,
  targetId: WindowId
): { windows: Record<WindowId, WindowState>; highestZIndex: number } {
  const nextZ = state.highestZIndex + 1;

  if (nextZ <= MAX_Z_INDEX_THRESHOLD) {
    return {
      windows: {
        ...state.windows,
        [targetId]: {
          ...state.windows[targetId],
          zIndex: nextZ,
        },
      },
      highestZIndex: nextZ,
    };
  }

  // Normalize z-indexes back to baseline starting from 10 while strictly preserving relative stacking order
  const otherWindows = Object.values(state.windows)
    .filter((w) => w.id !== targetId)
    .sort((a, b) => a.zIndex - b.zIndex);

  const updatedWindows = { ...state.windows };
  otherWindows.forEach((win, index) => {
    updatedWindows[win.id] = {
      ...win,
      zIndex: BASELINE_Z_INDEX + index,
    };
  });

  const topZ = BASELINE_Z_INDEX + otherWindows.length;
  updatedWindows[targetId] = {
    ...state.windows[targetId],
    zIndex: topZ,
  };

  return {
    windows: updatedWindows,
    highestZIndex: topZ,
  };
}

function findNextActiveWindowId(
  windows: Record<WindowId, WindowState>,
  excludeId: WindowId
): WindowId | null {
  const eligibleWindows = Object.values(windows).filter(
    (w) => w.id !== excludeId && w.isOpen && !w.isMinimized
  );

  if (eligibleWindows.length === 0) return null;

  eligibleWindows.sort((a, b) => b.zIndex - a.zIndex);
  return eligibleWindows[0].id;
}

export const portfolioStoreActions = {
  getState: () => currentState,

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  openWindow: (id: WindowId) => {
    const { windows, highestZIndex } = calculateNextZState(currentState, id);
    currentState = {
      ...currentState,
      highestZIndex,
      activeWindowId: id,
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isOpen: true,
          isMinimized: false,
        },
      },
    };
    emitChange();
  },

  closeWindow: (id: WindowId) => {
    const isCurrentActive = currentState.activeWindowId === id;
    const updatedWindows = {
      ...currentState.windows,
      [id]: {
        ...currentState.windows[id],
        isOpen: false,
        isMinimized: false,
      },
    };

    let nextActiveId = currentState.activeWindowId;
    if (isCurrentActive) {
      nextActiveId = findNextActiveWindowId(updatedWindows, id);
    }

    currentState = {
      ...currentState,
      activeWindowId: nextActiveId,
      windows: updatedWindows,
    };
    emitChange();
  },

  minimizeWindow: (id: WindowId) => {
    const isCurrentActive = currentState.activeWindowId === id;
    const updatedWindows = {
      ...currentState.windows,
      [id]: {
        ...currentState.windows[id],
        isMinimized: true,
      },
    };

    let nextActiveId = currentState.activeWindowId;
    if (isCurrentActive) {
      nextActiveId = findNextActiveWindowId(updatedWindows, id);
    }

    currentState = {
      ...currentState,
      activeWindowId: nextActiveId,
      windows: updatedWindows,
    };
    emitChange();
  },

  toggleMaximizeWindow: (id: WindowId) => {
    currentState = {
      ...currentState,
      windows: {
        ...currentState.windows,
        [id]: {
          ...currentState.windows[id],
          isMaximized: !currentState.windows[id].isMaximized,
        },
      },
    };
    emitChange();
  },

  focusWindow: (id: WindowId) => {
    if (currentState.activeWindowId === id && !currentState.windows[id].isMinimized) {
      return;
    }
    const { windows, highestZIndex } = calculateNextZState(currentState, id);
    currentState = {
      ...currentState,
      highestZIndex,
      activeWindowId: id,
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMinimized: false,
        },
      },
    };
    emitChange();
  },

  toggleWindow: (id: WindowId) => {
    const win = currentState.windows[id];
    if (!win.isOpen) {
      portfolioStoreActions.openWindow(id);
    } else if (win.isMinimized) {
      portfolioStoreActions.focusWindow(id);
    } else if (currentState.activeWindowId === id) {
      portfolioStoreActions.minimizeWindow(id);
    } else {
      portfolioStoreActions.focusWindow(id);
    }
  },
};

// Cached referentially-stable snapshots for array / computed selectors
let cachedOpenWindowIds: WindowId[] = (Object.keys(INITIAL_STATE.windows) as WindowId[]).filter(
  (id) => INITIAL_STATE.windows[id].isOpen
);
let cachedWindowsRef: Record<WindowId, WindowState> | null = INITIAL_STATE.windows;

function getOpenWindowIdsSnapshot(): WindowId[] {
  if (currentState.windows !== cachedWindowsRef) {
    cachedWindowsRef = currentState.windows;
    const nextOpenWindowIds = (Object.keys(currentState.windows) as WindowId[]).filter(
      (id) => currentState.windows[id].isOpen
    );
    if (
      nextOpenWindowIds.length !== cachedOpenWindowIds.length ||
      nextOpenWindowIds.some((id, idx) => id !== cachedOpenWindowIds[idx])
    ) {
      cachedOpenWindowIds = nextOpenWindowIds;
    }
  }
  return cachedOpenWindowIds;
}

// Granular Hooks
export function useWindow(id: WindowId): WindowState {
  return useSyncExternalStore(
    portfolioStoreActions.subscribe,
    () => currentState.windows[id],
    () => currentState.windows[id]
  );
}

export function useActiveWindowId(): WindowId | null {
  return useSyncExternalStore(
    portfolioStoreActions.subscribe,
    () => currentState.activeWindowId,
    () => currentState.activeWindowId
  );
}

export function useOpenWindowIds(): WindowId[] {
  return useSyncExternalStore(
    portfolioStoreActions.subscribe,
    getOpenWindowIdsSnapshot,
    getOpenWindowIdsSnapshot
  );
}

export function useActiveWindowTitle(): string | null {
  return useSyncExternalStore(
    portfolioStoreActions.subscribe,
    () => {
      const activeId = currentState.activeWindowId;
      return activeId ? currentState.windows[activeId]?.title ?? null : null;
    },
    () => {
      const activeId = currentState.activeWindowId;
      return activeId ? currentState.windows[activeId]?.title ?? null : null;
    }
  );
}

export function usePortfolioActions() {
  return portfolioStoreActions;
}

export function usePortfolioStore(): PortfolioState & typeof portfolioStoreActions {
  const state = useSyncExternalStore(
    portfolioStoreActions.subscribe,
    portfolioStoreActions.getState,
    portfolioStoreActions.getState
  );

  return {
    ...state,
    ...portfolioStoreActions,
  };
}
