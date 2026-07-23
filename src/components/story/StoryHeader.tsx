import { motion } from "framer-motion";
import { STORIES } from "@/hooks/useStoryController";
import { ThemeToggle } from "@/components/theme-toggle";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryHeaderProps {
  activeIndex: number;
  progress: number;
  isPaused: boolean;
  onGoToStory: (index: number) => void;
  onTogglePause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StoryHeader({
  activeIndex,
  progress,
  isPaused,
  onGoToStory,
  onTogglePause,
  onNext,
  onPrev,
}: StoryHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40 px-4 lg:px-8 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-2">
        {/* Top Progress Bar Segment Row */}
        <div className="flex items-center space-x-1.5 w-full">
          {STORIES.map((story, index) => {
            let widthPercentage = 0;
            if (index < activeIndex) widthPercentage = 100;
            else if (index === activeIndex) widthPercentage = progress;
            else widthPercentage = 0;

            return (
              <button
                key={story.id}
                onClick={() => onGoToStory(index)}
                className="group relative flex-1 h-2 rounded-full bg-muted/60 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all py-1.5 -my-1.5"
                title={`${story.label} (Press ${index + 1})`}
              >
                {/* Track background */}
                <div className="w-full h-1.5 rounded-full bg-muted/80 group-hover:bg-muted transition-colors relative overflow-hidden">
                  {/* Fill Progress Bar */}
                  <div
                    className="h-full bg-primary rounded-full transition-all ease-linear duration-75"
                    style={{ width: `${widthPercentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Header HUD Navigation Row */}
        <div className="flex items-center justify-between pt-1">
          {/* Logo & Active Story Name */}
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent cursor-pointer"
              onClick={() => onGoToStory(0)}
            >
              AE
            </motion.div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                Story {activeIndex + 1}/{STORIES.length}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs font-medium text-foreground">
                {STORIES[activeIndex].shortName}
              </span>
            </div>
          </div>

          {/* Center Story Selector Pills for Quick Jump */}
          <div className="hidden md:flex items-center space-x-1 bg-muted/40 p-1 rounded-full border border-border/40">
            {STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => onGoToStory(idx)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                  idx === activeIndex
                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {story.shortName}
              </button>
            ))}
          </div>

          {/* Right Controls: Play/Pause, Prev/Next, Theme Toggle */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 border-r border-border/50 pr-2 mr-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={onPrev}
                disabled={activeIndex === 0}
                title="Previous Story (Left Arrow)"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={onTogglePause}
                title={isPaused ? "Play Autoplay (Space)" : "Pause Autoplay (Space)"}
              >
                {isPaused ? <Play size={14} className="fill-current" /> : <Pause size={14} className="fill-current" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={onNext}
                disabled={activeIndex === STORIES.length - 1}
                title="Next Story (Right Arrow)"
              >
                <ChevronRight size={16} />
              </Button>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
