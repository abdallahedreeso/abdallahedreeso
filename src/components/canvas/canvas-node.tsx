import React from "react";
import { motion } from "framer-motion";
import { CanvasNodeConfig, useCanvas } from "./canvas-context";
import { Maximize2, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface CanvasNodeProps {
  config: CanvasNodeConfig;
  children: React.ReactNode;
}

export const CanvasNode: React.FC<CanvasNodeProps> = ({ config, children }) => {
  const { activeNodeId, panToNode } = useCanvas();
  const isActive = activeNodeId === config.id;

  return (
    <div
      id={`canvas-node-${config.id}`}
      style={{
        position: "absolute",
        left: `calc(50% + ${config.x}px - ${config.width / 2}px)`,
        top: `calc(50% + ${config.y}px - ${config.height / 2}px)`,
        width: `${config.width}px`,
      }}
      className="group transition-all duration-300"
    >
      {/* Port connection dots */}
      {config.ports.top && (
        <div
          id={`port-${config.id}-top`}
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary shadow-glow flex items-center justify-center z-20 cursor-pointer"
          title={`${config.title} (Top Port)`}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      )}
      {config.ports.bottom && (
        <div
          id={`port-${config.id}-bottom`}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary shadow-glow flex items-center justify-center z-20 cursor-pointer"
          title={`${config.title} (Bottom Port)`}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      )}
      {config.ports.left && (
        <div
          id={`port-${config.id}-left`}
          className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary shadow-glow flex items-center justify-center z-20 cursor-pointer"
          title={`${config.title} (Left Port)`}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      )}
      {config.ports.right && (
        <div
          id={`port-${config.id}-right`}
          className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary shadow-glow flex items-center justify-center z-20 cursor-pointer"
          title={`${config.title} (Right Port)`}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      )}

      {/* Node Main Container Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "rounded-3xl border backdrop-blur-xl bg-card/90 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col",
          isActive
            ? "border-primary ring-2 ring-primary/40 shadow-glow"
            : "border-border/70 hover:border-primary/50"
        )}
      >
        {/* Node Header Bar */}
        <div
          onClick={() => panToNode(config.id)}
          className="px-6 py-4 bg-muted/40 border-b border-border/50 flex items-center justify-between cursor-pointer select-none group-hover:bg-muted/70 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="h-4 w-px bg-border mx-1" />
            <Cpu className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs font-semibold tracking-wider text-foreground">
              {config.title}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-primary/10 text-primary border border-primary/20">
              {config.badge}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-muted-foreground font-mono">
            <span className="hidden sm:inline-block opacity-70">
              X:{config.x} Y:{config.y}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                panToNode(config.id);
              }}
              className="p-1 rounded-md hover:bg-background/80 text-muted-foreground hover:text-foreground transition-colors"
              title="Focus Node"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Node Content Area */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[780px] custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
