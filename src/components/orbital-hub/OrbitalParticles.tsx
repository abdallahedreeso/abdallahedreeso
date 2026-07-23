import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ORBITAL_NODES_CONFIG } from './orbital-types';

export const OrbitalParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate background spatial starfield particles
  const particlePositions = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 12 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Background Starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#64748b"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Orbital Path Indicator Rings */}
      {ORBITAL_NODES_CONFIG.map((node) => (
        <group
          key={`orbit-ring-${node.id}`}
          rotation={[node.inclination, 0, 0]}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[node.radius - 0.015, node.radius + 0.015, 128]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
