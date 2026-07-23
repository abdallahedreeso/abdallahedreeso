import React from "react";
import { motion } from "framer-motion";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SpatialDotIndicator() {
  const { currentSlideIndex, slides, goToSlide } = usePortfolioStore();

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-5 p-3 rounded-full bg-background/30 backdrop-blur-md border border-primary/15 shadow-2xl"
        aria-label="Spatial Slide Navigation"
      >
        {/* Subtle connecting vertical line */}
        <div className="absolute top-4 bottom-4 w-[2px] bg-primary/15 rounded-full -z-10" />

        {slides.map((slide, index) => {
          const isActive = currentSlideIndex === index;

          return (
            <Tooltip key={slide.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => goToSlide(index)}
                  className="relative group p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full transition-transform"
                  aria-label={`Navigate to slide ${index + 1}: ${slide.label}`}
                >
                  {/* Outer active pulse/glow ring */}
                  {isActive && (
                    <motion.span
                      layoutId="spatial-dot-active-glow"
                      className="absolute inset-0 rounded-full bg-primary/30 blur-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Main dot circle */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.35 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 relative z-10 border ${
                      isActive
                        ? "bg-primary border-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                        : "bg-muted/80 border-muted-foreground/30 group-hover:bg-primary/70 group-hover:border-primary/50"
                    }`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="bg-card/95 backdrop-blur-md border-primary/20 text-foreground font-medium shadow-xl px-3 py-1.5 text-xs flex flex-col gap-0.5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono text-[10px]">
                    0{index + 1}
                  </span>
                  <span className="font-semibold text-primary/90">
                    {slide.label}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {slide.subtitle}
                </span>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </aside>
    </TooltipProvider>
  );
}
