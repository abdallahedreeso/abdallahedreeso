import React from "react";
import { useCanvas, CANVAS_NODES } from "./canvas-context";
import { ZoomIn, ZoomOut, RotateCcw, Compass, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const CanvasNavigation: React.FC = () => {
  const { activeNodeId, zoom, panToNode, resetView, zoomIn, zoomOut } = useCanvas();

  const navItems = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center space-y-2 pointer-events-none">
      {/* Main Dock Pills Bar */}
      <div className="pointer-events-auto flex items-center space-x-1.5 p-1.5 rounded-full border border-border/80 backdrop-blur-xl bg-card/90 shadow-2xl">
        <div className="flex items-center px-3 py-1 space-x-2 text-xs font-mono font-semibold border-r border-border/60 text-primary">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span className="hidden md:inline">CANVAS_NAV</span>
        </div>

        {/* Node Jump Buttons */}
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeNodeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => panToNode(item.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-glow scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="h-4 w-px bg-border/60 mx-1" />

        {/* Zoom & Recenter Controls */}
        <div className="flex items-center space-x-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={zoomOut}
            className="w-7 h-7 rounded-full text-muted-foreground hover:text-foreground"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>

          <span className="font-mono text-[11px] font-semibold px-1 min-w-[36px] text-center text-foreground">
            {Math.round(zoom * 100)}%
          </span>

          <Button
            size="icon"
            variant="ghost"
            onClick={zoomIn}
            className="w-7 h-7 rounded-full text-muted-foreground hover:text-foreground"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={resetView}
            className="w-7 h-7 rounded-full ml-1 text-primary border-primary/30 hover:bg-primary/10"
            title="Recenter Canvas View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Micro Legend Badge */}
      <div className="pointer-events-none hidden sm:flex items-center space-x-2 text-[10px] font-mono text-muted-foreground/80 bg-background/60 backdrop-blur-md px-3 py-0.5 rounded-full border border-border/40 shadow-sm">
        <MousePointer className="w-3 h-3 text-primary" />
        <span>Drag to pan canvas &bull; Scroll wheel to zoom &bull; Click node to focus</span>
      </div>
    </div>
  );
};
