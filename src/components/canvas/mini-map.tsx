import React, { useState } from "react";
import { CANVAS_NODES, useCanvas } from "./canvas-context";
import { MapPin, Navigation2, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MiniMap: React.FC = () => {
  const { pan, zoom, activeNodeId, panToNode, setPan } = useCanvas();
  const [isMinimized, setIsMinimized] = useState(false);

  // Mini-map scaling calculations
  // Map domain: X range [-1600, 1600], Y range [-1000, 1200]
  const MINI_MAP_WIDTH = 220;
  const MINI_MAP_HEIGHT = 150;
  const WORLD_WIDTH = 3200;
  const WORLD_HEIGHT = 2200;

  const worldToMap = (x: number, y: number) => {
    const mapX = ((x + WORLD_WIDTH / 2) / WORLD_WIDTH) * MINI_MAP_WIDTH;
    const mapY = ((y + WORLD_HEIGHT / 2) / WORLD_HEIGHT) * MINI_MAP_HEIGHT;
    return { mapX, mapY };
  };

  const mapToWorld = (mapX: number, mapY: number) => {
    const worldX = (mapX / MINI_MAP_WIDTH) * WORLD_WIDTH - WORLD_WIDTH / 2;
    const worldY = (mapY / MINI_MAP_HEIGHT) * WORLD_HEIGHT - WORLD_HEIGHT / 2;
    return { worldX, worldY };
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const { worldX, worldY } = mapToWorld(clickX, clickY);

    setPan({
      x: -worldX,
      y: -worldY
    });
  };

  // Viewport rectangle calculation
  const vpWidth = (typeof window !== "undefined" ? window.innerWidth : 1200) / zoom;
  const vpHeight = (typeof window !== "undefined" ? window.innerHeight : 800) / zoom;
  const currentWorldCenterX = -pan.x;
  const currentWorldCenterY = -pan.y;

  const vpTopLeft = worldToMap(currentWorldCenterX - vpWidth / 2, currentWorldCenterY - vpHeight / 2);
  const vpRectWidth = (vpWidth / WORLD_WIDTH) * MINI_MAP_WIDTH;
  const vpRectHeight = (vpHeight / WORLD_HEIGHT) * MINI_MAP_HEIGHT;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isMinimized ? (
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsMinimized(false)}
          className="rounded-full shadow-2xl backdrop-blur-xl bg-card/90 border-border hover:border-primary text-primary"
          title="Open Mini-map"
        >
          <Navigation2 className="w-4 h-4" />
        </Button>
      ) : (
        <div className="w-[240px] rounded-2xl border border-border/80 backdrop-blur-xl bg-card/90 shadow-2xl overflow-hidden p-3 flex flex-col space-y-2">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>MINI_MAP</span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Map Box */}
          <div
            onClick={handleMapClick}
            className="relative w-full h-[150px] bg-background/80 rounded-xl border border-border/60 overflow-hidden cursor-crosshair group"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(120, 120, 120, 0.15) 1px, transparent 1px)",
              backgroundSize: "12px 12px"
            }}
          >
            {/* Viewport rectangle indicator */}
            <div
              className="absolute border-2 border-primary bg-primary/10 rounded-md transition-all duration-75 pointer-events-none"
              style={{
                left: `${Math.max(0, Math.min(MINI_MAP_WIDTH - vpRectWidth, vpTopLeft.mapX))}px`,
                top: `${Math.max(0, Math.min(MINI_MAP_HEIGHT - vpRectHeight, vpTopLeft.mapY))}px`,
                width: `${Math.max(20, Math.min(MINI_MAP_WIDTH, vpRectWidth))}px`,
                height: `${Math.max(16, Math.min(MINI_MAP_HEIGHT, vpRectHeight))}px`
              }}
            />

            {/* Nodes representation */}
            {Object.values(CANVAS_NODES).map((node) => {
              const { mapX, mapY } = worldToMap(node.x, node.y);
              const isSelected = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    panToNode(node.id);
                  }}
                  style={{
                    left: `${mapX - 18}px`,
                    top: `${mapY - 12}px`
                  }}
                  className={`absolute w-9 h-6 rounded-md border flex items-center justify-center font-mono text-[9px] font-bold transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-glow scale-110 z-10"
                      : "bg-card/90 text-muted-foreground border-border hover:border-primary hover:text-foreground"
                  }`}
                  title={`${node.title} (${node.category})`}
                >
                  {node.id.substring(0, 3).toUpperCase()}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground px-1">
            <span>Click map to pan</span>
            <span>Zoom: {Math.round(zoom * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};
