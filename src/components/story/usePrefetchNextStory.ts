import { useEffect } from "react";

export function usePrefetchNextStory(activeIndex: number) {
  useEffect(() => {
    const nextIndex = activeIndex + 1;
    const prefetch = () => {
      switch (nextIndex) {
        case 1:
          import("@/components/about-section");
          break;
        case 2:
          import("@/components/projects-section");
          break;
        case 3:
          import("@/components/skills-section");
          break;
        case 4:
          import("@/components/contact-section");
          break;
        default:
          break;
      }
    };

    if ("requestIdleCallback" in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(prefetch);
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        }
      };
    } else {
      const timer = setTimeout(prefetch, 200);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);
}
