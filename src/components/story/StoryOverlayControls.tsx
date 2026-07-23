import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryOverlayControlsProps {
  onNext: () => void;
  onPrev: () => void;
  onPause: () => void;
  onResume: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export function StoryOverlayControls({
  onNext,
  onPrev,
  onPause,
  onResume,
  canPrev,
  canNext,
}: StoryOverlayControlsProps) {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex">
      {/* Left 30% Tap/Click Zone (Back) */}
      <div
        className="w-[30%] h-full pointer-events-auto cursor-pointer relative group flex items-center justify-start pl-4"
        onMouseEnter={() => setHoverSide("left")}
        onMouseLeave={() => setHoverSide(null)}
        onMouseDown={onPause}
        onMouseUp={onResume}
        onTouchStart={onPause}
        onTouchEnd={onResume}
        onClick={(e) => {
          // Avoid triggering click if user interacts with nested interactive elements like buttons/links
          const target = e.target as HTMLElement;
          if (target.closest("button, a, input, textarea, [data-interactive='true']")) return;
          if (canPrev) onPrev();
        }}
      >
        <AnimatePresence>
          {hoverSide === "left" && canPrev && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center space-x-1 bg-background/80 backdrop-blur-md border border-border/60 text-foreground px-3 py-2 rounded-full shadow-lg pointer-events-none text-xs font-mono font-medium"
            >
              <ChevronLeft size={16} />
              <span>PREVIOUS STORY</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right 70% Tap/Click Zone (Next) */}
      <div
        className="w-[70%] h-full pointer-events-auto cursor-pointer relative group flex items-center justify-end pr-6"
        onMouseEnter={() => setHoverSide("right")}
        onMouseLeave={() => setHoverSide(null)}
        onMouseDown={onPause}
        onMouseUp={onResume}
        onTouchStart={onPause}
        onTouchEnd={onResume}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("button, a, input, textarea, [data-interactive='true']")) return;
          if (canNext) onNext();
        }}
      >
        <AnimatePresence>
          {hoverSide === "right" && canNext && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center space-x-1 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-xl pointer-events-none text-xs font-mono font-medium tracking-wide"
            >
              <span>NEXT STORY</span>
              <ChevronRight size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
