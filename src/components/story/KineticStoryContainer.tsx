import { ReactNode } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface KineticStoryContainerProps {
  storyId: string;
  direction: 1 | -1;
  children: ReactNode;
}

const kineticVariants: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    skewX: direction > 0 ? -10 : 10,
    opacity: 0,
    filter: "brightness(1.4) contrast(1.2)",
    scale: 0.98,
  }),
  animate: {
    x: "0%",
    skewX: 0,
    opacity: 1,
    filter: "brightness(1) contrast(1)",
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 380, damping: 32 },
      skewX: { duration: 0.22, ease: "easeOut" },
      opacity: { duration: 0.15 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    skewX: direction > 0 ? 10 : -10,
    opacity: 0,
    filter: "brightness(0.7)",
    scale: 0.96,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  }),
};

export function KineticStoryContainer({
  storyId,
  direction,
  children,
}: KineticStoryContainerProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-background">
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={storyId}
          custom={direction}
          variants={kineticVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden pt-20 pb-10 px-4 md:px-8 lg:px-12 flex flex-col justify-start"
        >
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
