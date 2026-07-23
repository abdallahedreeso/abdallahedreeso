import { Canvas } from '@react-three/fiber';
import { HeroWireframe } from './hero-wireframe';
import { BentoParticleField } from './bento-particle-field';
import { CameraController } from './camera-controller';
import { usePortfolioStore } from '@/store/use-portfolio-store';

export default function WebGLCanvasContainer() {
  const isLowPower = usePortfolioStore((s) => s.isLowPower);
  const theme = usePortfolioStore((s) => s.theme);
  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#030303]' : 'bg-[#F8FAFC]'
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 100 }}
        dpr={isLowPower ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Ambient & Cobalt/Sapphire Accent Lights */}
        <ambientLight intensity={isDark ? 0.4 : 0.8} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={isDark ? 0.8 : 1.2}
          color={isDark ? "#60A5FA" : "#1E40AF"}
        />
        <pointLight
          position={[-10, -10, -5]}
          intensity={isDark ? 0.5 : 0.7}
          color={isDark ? "#0066FF" : "#2563EB"}
        />

        {/* 3D Scene Components */}
        <CameraController />
        <HeroWireframe />
        <BentoParticleField />
      </Canvas>
    </div>
  );
}
