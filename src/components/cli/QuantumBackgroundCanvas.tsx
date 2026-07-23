import React, { useEffect, useRef, useState } from 'react';

export const QuantumBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [matrixMode, setMatrixMode] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const themes = [
    { bg1: '#070b19', bg2: '#0b132b', node: 'rgba(56, 189, 248, ', line: 'rgba(14, 165, 233, ' },
    { bg1: '#0f051d', bg2: '#1a0b2e', node: 'rgba(236, 72, 153, ', line: 'rgba(168, 85, 247, ' },
    { bg1: '#021814', bg2: '#042822', node: 'rgba(52, 211, 153, ', line: 'rgba(16, 185, 129, ' },
  ];

  useEffect(() => {
    const handleMatrixToggle = () => setMatrixMode((prev) => !prev);
    const handleThemeCycle = () => setThemeIndex((prev) => (prev + 1) % themes.length);

    window.addEventListener('quantum-matrix-toggle', handleMatrixToggle);
    window.addEventListener('quantum-theme-cycle', handleThemeCycle);

    return () => {
      window.removeEventListener('quantum-matrix-toggle', handleMatrixToggle);
      window.removeEventListener('quantum-theme-cycle', handleThemeCycle);
    };
  }, [themes.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for standard 3D canvas background
    const particleCount = Math.min(70, Math.floor(width / 20));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    // Matrix rain setup
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }).fill(1) as number[];
    const matrixChars = '0123456789ABCDEF⚛⚡QUANTUM-CLI-ABDALLAH-EDREES-ARCH';

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      const currentTheme = themes[themeIndex];

      if (matrixMode) {
        ctx.fillStyle = 'rgba(2, 10, 8, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff66';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00ff66';
          ctx.fillText(text, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else {
        // Gradient dark background
        const grad = ctx.createRadialGradient(
          mouseX,
          mouseY,
          50,
          width / 2,
          height / 2,
          Math.max(width, height)
        );
        grad.addColorStop(0, currentTheme.bg2);
        grad.addColorStop(1, currentTheme.bg1);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Render 3D particle mesh
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * p.z;
          p.y += p.vy * p.z;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse influence magnetic pull
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += (dx / dist) * 0.3;
            p.y += (dy / dist) * 0.3;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
          ctx.fillStyle = `${currentTheme.node}${0.3 + p.z * 0.2})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `${currentTheme.node}0.6)`;
          ctx.fill();

          // Connect nearby nodes with glowing lines
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const pdx = p.x - p2.x;
            const pdy = p.y - p2.y;
            const pDist = Math.sqrt(pdx * pdx + pdy * pdy);

            if (pDist < 140) {
              const alpha = (1 - pDist / 140) * 0.25;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `${currentTheme.line}${alpha})`;
              ctx.lineWidth = 0.8 * p.z;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [matrixMode, themeIndex, themes]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700"
    />
  );
};
