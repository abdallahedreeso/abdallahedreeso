import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolioStore } from '@/store/use-portfolio-store';

interface BentoCardProps {
  id: string;
  className?: string;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
}

export function BentoCard({
  id,
  className = '',
  children,
  title,
  subtitle,
  badge,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null!);
  const setHoveredCard = usePortfolioStore((s) => s.setHoveredCard);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normX = mouseX / rect.width - 0.5;
    const normY = mouseY / rect.height - 0.5;

    x.set(normX);
    y.set(normY);

    setHoveredCard(id, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setHoveredCard(id, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredCard(null);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-2xl bg-white/80 dark:bg-[#0A0A0C]/80 border border-neutral-200 dark:border-white/10 p-6 backdrop-blur-md shadow-xl dark:shadow-2xl transition-colors duration-300 hover:border-blue-500/50 hover:bg-white/95 dark:hover:bg-[#0D0E14]/90 overflow-hidden ${className}`}
    >
      {/* Subtle Electric Sapphire Hover Gradient Glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-blue-600/20 via-sky-500/10 to-indigo-600/20 blur-xl -z-10" />

      {/* Header Info */}
      {(title || badge) && (
        <div className="flex items-center justify-between mb-3">
          {badge && (
            <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {badge}
            </span>
          )}
          {title && (
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
          )}
        </div>
      )}

      {subtitle && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 font-mono">{subtitle}</p>
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
