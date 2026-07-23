import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useCanvas, CANVAS_NODES, CANVAS_CONNECTIONS } from "./canvas-context";
import { CanvasNode } from "./canvas-node";

interface NodeCanvasProps {
  nodesMap: Record<string, React.ReactNode>;
}

export const NodeCanvas: React.FC<NodeCanvasProps> = ({ nodesMap }) => {
  const { pan, zoom, setPan, setZoom } = useCanvas();
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  // Motion values for smooth animated pan transitions when jumping between nodes
  const motionX = useMotionValue(pan.x);
  const motionY = useMotionValue(pan.y);

  // Sync pan state to motion values when pan changes from nav click
  useEffect(() => {
    const controlsX = animate(motionX, pan.x, { type: "spring", stiffness: 200, damping: 25 });
    const controlsY = animate(motionY, pan.y, { type: "spring", stiffness: 200, damping: 25 });
    return () => {
      controlsX.stop();
      controlsY.stop();
    };
  }, [pan.x, pan.y, motionX, motionY]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag if left click on canvas background (not interactive UI)
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input") || target.closest("a") || target.closest(".custom-scrollbar")) {
      return;
    }
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = (e.clientX - dragStart.current.x) / zoom;
    const dy = (e.clientY - dragStart.current.y) / zoom;
    setPan({
      x: panStart.current.x + dx,
      y: panStart.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Mouse wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.92 : 1.08;
    setZoom((prevZoom) => Math.min(Math.max(prevZoom * zoomFactor, 0.35), 1.5));
  };

  // Calculate SVG port coordinates
  const getPortCoords = (nodeId: string, port: "top" | "bottom" | "left" | "right") => {
    const node = CANVAS_NODES[nodeId];
    if (!node) return { x: 0, y: 0 };
    switch (port) {
      case "top":
        return { x: node.x, y: node.y - node.height / 2 };
      case "bottom":
        return { x: node.x, y: node.y + node.height / 2 };
      case "left":
        return { x: node.x - node.width / 2, y: node.y };
      case "right":
        return { x: node.x + node.width / 2, y: node.y };
    }
  };

  return (
    <div
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-background select-none cursor-grab active:cursor-grabbing"
    >
      {/* Background Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(var(--primary-rgb, 120 120 255), 0.25) 1.5px, transparent 1.5px),
            linear-gradient(to right, rgba(120, 120, 120, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120, 120, 120, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: `${40 * zoom}px ${40 * zoom}px, ${200 * zoom}px ${200 * zoom}px, ${200 * zoom}px ${200 * zoom}px`,
          backgroundPosition: `calc(50% + ${pan.x * zoom}px) calc(50% + ${pan.y * zoom}px)`,
        }}
      />

      {/* Main Transform World Surface */}
      <motion.div
        style={{
          x: motionX,
          y: motionY,
          scale: zoom,
          transformOrigin: "center center",
        }}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      >
        {/* SVG Inter-Node Mind Map Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
          style={{ transform: "translate(50%, 50%)" }}
        >
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(var(--accent-foreground, 200 100% 50%))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {CANVAS_CONNECTIONS.map((conn, idx) => {
            const p1 = getPortCoords(conn.from, conn.fromPort);
            const p2 = getPortCoords(conn.to, conn.toPort);

            // Compute bezier control points based on orientation
            const dx = Math.abs(p2.x - p1.x) * 0.5;
            const dy = Math.abs(p2.y - p1.y) * 0.5;
            const cx1 = conn.fromPort === "left" ? p1.x - dx : conn.fromPort === "right" ? p1.x + dx : p1.x;
            const cy1 = conn.fromPort === "top" ? p1.y - dy : conn.fromPort === "bottom" ? p1.y + dy : p1.y;
            const cx2 = conn.toPort === "left" ? p2.x - dx : conn.toPort === "right" ? p2.x + dx : p2.x;
            const cy2 = conn.toPort === "top" ? p2.y - dy : conn.toPort === "bottom" ? p2.y + dy : p2.y;

            const pathD = `M ${p1.x} ${p1.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`;
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            return (
              <g key={`${conn.from}-${conn.to}-${idx}`}>
                {/* Glow outline path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  strokeOpacity="0.25"
                  filter="url(#glow)"
                />
                {/* Main dynamic path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  className="animate-dash"
                />
                {/* Signal Connection Pill Label */}
                {conn.label && (
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-38"
                      y="-11"
                      width="76"
                      height="22"
                      rx="11"
                      fill="hsl(var(--card))"
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      className="opacity-90"
                    />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fill="hsl(var(--muted-foreground))"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {conn.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer */}
        {Object.values(CANVAS_NODES).map((nodeConfig) => {
          const NodeContent = nodesMap[nodeConfig.id];
          return (
            <CanvasNode key={nodeConfig.id} config={nodeConfig}>
              {NodeContent}
            </CanvasNode>
          );
        })}
      </motion.div>
    </div>
  );
};
