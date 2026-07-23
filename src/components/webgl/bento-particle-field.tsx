import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/use-portfolio-store';

const PARTICLE_COUNT = 240;

export function BentoParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const { viewport } = useThree();
  
  const hoveredCardBounds = usePortfolioStore((s) => s.hoveredCardBounds);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const theme = usePortfolioStore((s) => s.theme);
  const isDark = theme === 'dark';

  // Generate initial random particles in 3D space
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 30 - 5;
      const z = (Math.random() - 0.5) * 10 - 2;
      const speed = 0.2 + Math.random() * 0.5;
      const scale = 0.03 + Math.random() * 0.04;
      temp.push({ x, y, z, origX: x, origY: y, origZ: z, speed, scale });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    let targetX: number | null = null;
    let targetY: number | null = null;

    if (hoveredCardBounds) {
      const normX = (hoveredCardBounds.x + hoveredCardBounds.width / 2) / window.innerWidth;
      const normY = (hoveredCardBounds.y + hoveredCardBounds.height / 2) / window.innerHeight;

      targetX = (normX - 0.5) * viewport.width * 1.2;
      targetY = -(normY - 0.5) * viewport.height * 1.2 - scrollProgress * 18;
    }

    particles.forEach((p, i) => {
      let curX = p.origX + Math.sin(state.clock.getElapsedTime() * p.speed + i) * 0.4;
      let curY = p.origY + Math.cos(state.clock.getElapsedTime() * p.speed * 0.8 + i) * 0.4;
      let curZ = p.origZ;

      if (targetX !== null && targetY !== null) {
        const dx = targetX - curX;
        const dy = targetY - curY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 25) {
          const force = (1 - Math.min(distSq / 25, 1)) * 1.5;
          curX += dx * force * 0.2;
          curY += dy * force * 0.2;
          curZ += 1.5 * force;
        }
      }

      dummy.position.set(curX, curY, curZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={isDark ? "#0066FF" : "#1E40AF"}
        transparent
        opacity={isDark ? 0.7 : 0.85}
      />
    </instancedMesh>
  );
}
