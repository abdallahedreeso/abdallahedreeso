import React, { useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import { SpatialDotIndicator } from "./spatial-dot-indicator";
import { SpatialNavControls } from "./spatial-nav-controls";

interface SpatialSliderLayoutProps {
  children: ReactNode[];
}

// 3D Spatial Transition Variants (Keynote presentation feel)
const spatialSlideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 0.88,
    rotateX: direction > 0 ? 15 : -15,
    y: direction > 0 ? 80 : -80,
    filter: "blur(6px)",
    transformPerspective: 1000,
  }),
  center: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    filter: "blur(0px)",
    transformPerspective: 1000,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1], // Apple-style custom spring cubic-bezier
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.88,
    rotateX: direction > 0 ? -15 : 15,
    y: direction > 0 ? -80 : 80,
    filter: "blur(6px)",
    transformPerspective: 1000,
    transition: {
      duration: 0.5,
      ease: [0.7, 0, 0.84, 0],
    },
  }),
};

export function SpatialSliderLayout({ children }: SpatialSliderLayoutProps) {
  const { currentSlideIndex, direction, nextSlide, prevSlide } = usePortfolioStore();

  const isTransitioningRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number>(0);
  const touchStartXRef = useRef<number>(0);

  // Throttled Wheel / Trackpad Scroll Navigation
  useEffect(() => {
    let lastWheelTime = 0;
    const cooldownMs = 600; // Prevent rapid multi-slide jumping

    const handleWheel = (e: WheelEvent) => {
      // Check if user is scrolling inside an scrollable element inside the active slide
      const target = e.target as HTMLElement | null;
      if (target) {
        const scrollableContainer = target.closest(".allow-inner-scroll");
        if (scrollableContainer) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableContainer;
          const isScrollingDown = e.deltaY > 0;
          const isScrollingUp = e.deltaY < 0;

          // If inside scrollable container and not at bounds, let native internal scroll happen
          if (
            (isScrollingDown && scrollTop + clientHeight < scrollHeight - 2) ||
            (isScrollingUp && scrollTop > 2)
          ) {
            return;
          }
        }
      }

      const now = Date.now();
      if (now - lastWheelTime < cooldownMs) return;

      if (Math.abs(e.deltaY) > 20) {
        lastWheelTime = now;
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextSlide, prevSlide]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keyboard shortcuts if focus is inside inputs, textareas or editables
      const activeElement = document.activeElement;
      const isInput =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.tagName === "SELECT" ||
          (activeElement as HTMLElement).isContentEditable);

      if (isInput) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prevSlide();
          break;
        case " ":
          // Only trigger if not on button
          if (activeElement?.tagName !== "BUTTON") {
            e.preventDefault();
            nextSlide();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch Swipe Handlers for Mobile & Tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchStartYRef.current - touchEndY;
    const deltaX = touchStartXRef.current - touchEndX;

    const minSwipeDistance = 45;

    // Check primary swipe direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY > minSwipeDistance) {
        nextSlide();
      } else if (deltaY < -minSwipeDistance) {
        prevSlide();
      }
    } else {
      if (deltaX > minSwipeDistance) {
        nextSlide();
      } else if (deltaX < -minSwipeDistance) {
        prevSlide();
      }
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-background text-foreground relative flex flex-col select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Cyber Ambient Lights */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px]" />
      </div>

      {/* Main Presentation Viewport */}
      <main className="relative flex-1 w-full h-full overflow-hidden z-10">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={spatialSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden"
          >
            {children[currentSlideIndex]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Spatial Side Dot Navigation */}
      <SpatialDotIndicator />

      {/* Floating Spatial Controls */}
      <SpatialNavControls />
    </div>
  );
}
