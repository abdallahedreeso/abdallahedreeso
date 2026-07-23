import React from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import { Button } from "@/components/ui/button";

export function SpatialNavControls() {
  const { currentSlideIndex, totalSlides, nextSlide, prevSlide, slides } =
    usePortfolioStore();

  const currentSlide = slides[currentSlideIndex];

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 p-1.5 rounded-full bg-background/50 backdrop-blur-xl border border-primary/20 shadow-2xl"
      aria-label="Spatial Viewport Navigation Controls"
    >
      {/* Slide Counter & Label */}
      <div className="px-3 py-1 flex items-center gap-2 border-r border-primary/15 font-mono text-xs select-none">
        <span className="text-primary font-bold">
          0{currentSlideIndex + 1}
        </span>
        <span className="text-muted-foreground/60">/</span>
        <span className="text-muted-foreground">0{totalSlides}</span>
        <span className="hidden sm:inline-block ml-1 text-[11px] font-sans font-medium text-foreground/80 max-w-[80px] truncate">
          {currentSlide?.label}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none relative group"
          title="Previous Slide (Arrow Up / Left)"
          aria-label="Previous Slide"
        >
          <ChevronUp className="h-4 w-4" />
          <span className="sr-only">Previous Slide</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlideIndex === totalSlides - 1}
          className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none relative group"
          title="Next Slide (Arrow Down / Right / Space)"
          aria-label="Next Slide"
        >
          <ChevronDown className="h-4 w-4" />
          <span className="sr-only">Next Slide</span>
        </Button>
      </div>

      {/* Keyboard Shortcut Hint Badge */}
      <div className="hidden lg:flex items-center gap-1 pr-2 text-[10px] text-muted-foreground/80 font-mono">
        <kbd className="px-1.5 py-0.5 rounded bg-muted/60 border border-primary/20 text-muted-foreground">
          ↑/↓
        </kbd>
      </div>
    </div>
  );
}
