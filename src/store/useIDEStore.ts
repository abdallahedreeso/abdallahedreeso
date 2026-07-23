import { useState, useEffect } from "react";

export interface FileItem {
  id: string;
  name: string;
  path: string;
  iconName: string;
  language: string;
  extension: "tsx" | "md" | "json" | "env" | "draw";
  size: string;
  description: string;
  isModified?: boolean;
}

export const WORKSPACE_FILES: FileItem[] = [
  {
    id: "projects.tsx",
    name: "Projects.tsx",
    path: "src/views/Projects.tsx",
    iconName: "FileCode2",
    language: "typescript",
    extension: "tsx",
    size: "4.2 kB",
    description: "Interactive Bento Grid showcasing production applications & 3D WebGL experiences.",
  },
  {
    id: "about.md",
    name: "About.md",
    path: "src/views/About.md",
    iconName: "FileText",
    language: "markdown",
    extension: "md",
    size: "2.8 kB",
    description: "Lead Frontend Architect manifesto, experience timeline, & design philosophy.",
  },
  {
    id: "skills.json",
    name: "Skills.json",
    path: "src/views/Skills.json",
    iconName: "FileJson",
    language: "json",
    extension: "json",
    size: "1.9 kB",
    description: "Structured technical competencies, frontend engineering radar, & framework mastery.",
  },
  {
    id: "contact.env",
    name: "Contact.env",
    path: "src/views/Contact.env",
    iconName: "FileKey",
    language: "bash",
    extension: "env",
    size: "0.8 kB",
    description: "Environment credentials, direct communication channels, & message dispatcher.",
  },
  {
    id: "architecture.draw",
    name: "Architecture.draw",
    path: "src/views/Architecture.draw",
    iconName: "Boxes",
    language: "plaintext",
    extension: "draw",
    size: "3.1 kB",
    description: "Interactive system design breakdown & client execution blueprints.",
  },
];

interface IDEState {
  files: FileItem[];
  openTabIds: string[];
  activeTabId: string | null;
  isSidebarOpen: boolean;
  activeSidebarView: "explorer" | "search" | "git" | "settings";
  searchQuery: string;
  commandPaletteOpen: boolean;
  editorMode: "render" | "code" | "split";
  soundEnabled: boolean;
}

// Initial state
let state: IDEState = {
  files: WORKSPACE_FILES,
  openTabIds: ["projects.tsx", "about.md", "skills.json"],
  activeTabId: "projects.tsx",
  isSidebarOpen: true,
  activeSidebarView: "explorer",
  searchQuery: "",
  commandPaletteOpen: false,
  editorMode: "render",
  soundEnabled: false,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export const ideStore = {
  getState: () => state,
  
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  openFile: (fileId: string) => {
    if (!state.openTabIds.includes(fileId)) {
      state = {
        ...state,
        openTabIds: [...state.openTabIds, fileId],
        activeTabId: fileId,
      };
    } else {
      state = {
        ...state,
        activeTabId: fileId,
      };
    }
    notify();
  },

  closeTab: (fileId: string) => {
    const newOpenTabs = state.openTabIds.filter((id) => id !== fileId);
    let newActiveTab = state.activeTabId;

    if (state.activeTabId === fileId) {
      if (newOpenTabs.length > 0) {
        const closedIndex = state.openTabIds.indexOf(fileId);
        const nextIndex = Math.max(0, closedIndex - 1);
        newActiveTab = newOpenTabs[nextIndex] || newOpenTabs[0];
      } else {
        newActiveTab = null;
      }
    }

    state = {
      ...state,
      openTabIds: newOpenTabs,
      activeTabId: newActiveTab,
    };
    notify();
  },

  setActiveTab: (fileId: string) => {
    if (state.activeTabId !== fileId) {
      state = { ...state, activeTabId: fileId };
      notify();
    }
  },

  toggleSidebar: () => {
    state = { ...state, isSidebarOpen: !state.isSidebarOpen };
    notify();
  },

  setSidebarView: (view: IDEState["activeSidebarView"]) => {
    state = {
      ...state,
      activeSidebarView: view,
      isSidebarOpen: state.activeSidebarView === view ? !state.isSidebarOpen : true,
    };
    notify();
  },

  setSearchQuery: (query: string) => {
    state = { ...state, searchQuery: query };
    notify();
  },

  setCommandPaletteOpen: (open: boolean) => {
    state = { ...state, commandPaletteOpen: open };
    notify();
  },

  setEditorMode: (mode: IDEState["editorMode"]) => {
    state = { ...state, editorMode: mode };
    notify();
  },

  toggleSound: () => {
    state = { ...state, soundEnabled: !state.soundEnabled };
    notify();
  },

  closeAllTabs: () => {
    state = { ...state, openTabIds: [], activeTabId: null };
    notify();
  },

  reorderTabs: (newOrder: string[]) => {
    state = { ...state, openTabIds: newOrder };
    notify();
  },
};

export function useIDEStore<T>(selector: (state: IDEState) => T): T {
  const [selectedState, setSelectedState] = useState(() => selector(state));

  useEffect(() => {
    const handleStoreChange = () => {
      setSelectedState(selector(state));
    };
    return ideStore.subscribe(handleStoreChange);
  }, [selector]);

  return selectedState;
}
