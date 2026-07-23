import { lazy, Suspense, useEffect } from 'react';
import { usePortfolioStore } from '@/store/use-portfolio-store';

const WebGLCanvasContainer = lazy(() => import('./canvas-container'));

export function WebGLWrapper() {
  const setScrollProgress = usePortfolioStore((s) => s.setScrollProgress);
  const setMousePos = usePortfolioStore((s) => s.setMousePos);

  useEffect(() => {
    // Passive scroll listener for zero main-thread lag
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos(normX, normY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setScrollProgress, setMousePos]);

  return (
    <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#030303]" />}>
      <WebGLCanvasContainer />
    </Suspense>
  );
}
