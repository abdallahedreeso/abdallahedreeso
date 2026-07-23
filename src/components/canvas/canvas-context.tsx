import React, { createContext, useContext, useState, useCallback } from "react";

export interface CanvasNodeConfig {
  id: string;
  title: string;
  category: string;
  badge: string;
  x: number;
  y: number;
  width: number;
  height: number;
  ports: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
}

export const CANVAS_NODES: Record<string, CanvasNodeConfig> = {
  hero: {
    id: "hero",
    title: "HERO_CORE",
    category: "Main Engine",
    badge: "v2.5 LIVE",
    x: 0,
    y: 0,
    width: 780,
    height: 600,
    ports: { right: true, left: true, bottom: true }
  },
  about: {
    id: "about",
    title: "ABOUT_SYSTEM",
    category: "Developer Profile",
    badge: "NODE_02",
    x: 1050,
    y: -300,
    width: 800,
    height: 750,
    ports: { left: true, bottom: true }
  },
  projects: {
    id: "projects",
    title: "PROJECTS_REGISTRY",
    category: "Showcase & Demos",
    badge: "NODE_03",
    x: 1050,
    y: 550,
    width: 850,
    height: 850,
    ports: { top: true, left: true }
  },
  skills: {
    id: "skills",
    title: "TECH_STACK_MATRIX",
    category: "Capabilities",
    badge: "NODE_04",
    x: -1050,
    y: -300,
    width: 800,
    height: 700,
    ports: { right: true, bottom: true }
  },
  contact: {
    id: "contact",
    title: "COMMUNICATIONS_GATEWAY",
    category: "Get In Touch",
    badge: "NODE_05",
    x: -1050,
    y: 550,
    width: 750,
    height: 650,
    ports: { top: true, right: true }
  }
};

export interface CanvasConnection {
  from: string;
  to: string;
  fromPort: "top" | "bottom" | "left" | "right";
  toPort: "top" | "bottom" | "left" | "right";
  label?: string;
}

export const CANVAS_CONNECTIONS: CanvasConnection[] = [
  { from: "hero", to: "about", fromPort: "right", toPort: "left", label: "profile.data" },
  { from: "hero", to: "skills", fromPort: "left", toPort: "right", label: "stack.config" },
  { from: "about", to: "projects", fromPort: "bottom", toPort: "top", label: "builds.rel" },
  { from: "skills", to: "contact", fromPort: "bottom", toPort: "top", label: "ping.wire" },
  { from: "projects", to: "contact", fromPort: "left", toPort: "right", label: "dispatch.api" }
];

interface CanvasContextType {
  pan: { x: number; y: number };
  zoom: number;
  activeNodeId: string;
  setPan: (pan: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  setZoom: (zoom: number | ((prev: number) => number)) => void;
  panToNode: (nodeId: string) => void;
  resetView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoomState] = useState(0.85);
  const [activeNodeId, setActiveNodeId] = useState<string>("hero");

  const setZoom = useCallback((newZoom: number | ((prev: number) => number)) => {
    setZoomState((prev) => {
      const val = typeof newZoom === "function" ? newZoom(prev) : newZoom;
      return Math.min(Math.max(val, 0.35), 1.5);
    });
  }, []);

  const panToNode = useCallback((nodeId: string) => {
    const node = CANVAS_NODES[nodeId];
    if (!node) return;
    setActiveNodeId(nodeId);
    setPan({
      x: -node.x,
      y: -node.y
    });
    setZoomState(0.9);
  }, []);

  const resetView = useCallback(() => {
    setPan({ x: 0, y: 0 });
    setZoomState(0.85);
    setActiveNodeId("hero");
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((z) => z + 0.15);
  }, [setZoom]);

  const zoomOut = useCallback(() => {
    setZoom((z) => z - 0.15);
  }, [setZoom]);

  return (
    <CanvasContext.Provider
      value={{
        pan,
        zoom,
        activeNodeId,
        setPan,
        setZoom,
        panToNode,
        resetView,
        zoomIn,
        zoomOut
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};
