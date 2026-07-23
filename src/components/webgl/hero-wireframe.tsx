import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/use-portfolio-store';

export function HeroWireframe() {
  const meshRef = useRef<THREE.Group>(null!);
  const outerGeomRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const theme = usePortfolioStore((s) => s.theme);
  const isDark = theme === 'dark';

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Mouse tracking lerp
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.4;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX + state.clock.getElapsedTime() * 0.15, delta * 3);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, delta * 3);

    // Inner core pulse
    if (innerCoreRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.08;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }

    // Dynamic scroll transition: shift object & scale out smoothly when diving past hero
    const heroOpacity = Math.max(0, 1 - scrollProgress * 3);
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -scrollProgress * 8, delta * 4);
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, heroOpacity > 0.01 ? 1 : 0.001, delta * 4));
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Outer Wireframe Low-Poly Icosahedron */}
      <mesh ref={outerGeomRef}>
        <icosahedronGeometry args={[2.8, 1]} />
        <meshBasicMaterial
          color={isDark ? "#3B82F6" : "#1E40AF"}
          wireframe
          transparent
          opacity={isDark ? 0.65 : 0.85}
        />
      </mesh>

      {/* Outer Glow Halo Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.4, 0.015, 16, 100]} />
        <meshBasicMaterial
          color={isDark ? "#0066FF" : "#2563EB"}
          transparent
          opacity={isDark ? 0.4 : 0.6}
        />
      </mesh>

      {/* Inner Glowing Core Node */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial
          color={isDark ? "#60A5FA" : "#1D4ED8"}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}
