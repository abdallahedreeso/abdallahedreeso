import { useState, useEffect, useCallback, useRef } from "react";

export interface StoryItem {
  id: string;
  label: string;
  shortName: string;
}

export const STORIES: StoryItem[] = [
  { id: "hero", label: "01. Introduction", shortName: "Hero" },
  { id: "about", label: "02. Executive Bio", shortName: "About" },
  { id: "projects", label: "03. Work & Portfolio", shortName: "Projects" },
  { id: "skills", label: "04. Tech Capabilities", shortName: "Skills" },
  { id: "contact", label: "05. Get In Touch", shortName: "Contact" },
];

const DEFAULT_STORY_DURATION = 8000; // 8 seconds per story

export function useStoryController(totalStories: number = STORIES.length, duration: number = DEFAULT_STORY_DURATION) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const isPausedRef = useRef(isPaused);

  isPausedRef.current = isPaused;

  const goToStory = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex) return;
      const newDir = targetIndex > activeIndex ? 1 : -1;
      setDirection(newDir);
      setActiveIndex(Math.max(0, Math.min(targetIndex, totalStories - 1)));
      setProgress(0);
      progressRef.current = 0;
      lastTimeRef.current = null;
    },
    [activeIndex, totalStories]
  );

  const nextStory = useCallback(() => {
    if (activeIndex < totalStories - 1) {
      setDirection(1);
      setActiveIndex((prev) => prev + 1);
      setProgress(0);
      progressRef.current = 0;
      lastTimeRef.current = null;
    }
  }, [activeIndex, totalStories]);

  const prevStory = useCallback(() => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((prev) => prev - 1);
      setProgress(0);
      progressRef.current = 0;
      lastTimeRef.current = null;
    }
  }, [activeIndex]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
    lastTimeRef.current = null;
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
    lastTimeRef.current = null;
  }, []);

  // Timer loop with requestAnimationFrame
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null && !isPausedRef.current) {
        const delta = time - lastTimeRef.current;
        const increment = (delta / duration) * 100;
        progressRef.current = Math.min(100, progressRef.current + increment);
        setProgress(progressRef.current);

        if (progressRef.current >= 100) {
          if (activeIndex < totalStories - 1) {
            nextStory();
          } else {
            // At the end, keep at 100% or loop back
            progressRef.current = 100;
            setProgress(100);
          }
          return;
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [activeIndex, duration, nextStory, totalStories]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        nextStory();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevStory();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePause();
      } else if (e.key >= "1" && e.key <= String(totalStories)) {
        const target = parseInt(e.key, 10) - 1;
        goToStory(target);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStory, prevStory, togglePause, goToStory, totalStories]);

  return {
    activeIndex,
    direction,
    isPaused,
    progress,
    goToStory,
    nextStory,
    prevStory,
    pause,
    resume,
    togglePause,
    stories: STORIES,
  };
}
