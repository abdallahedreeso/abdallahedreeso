import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CentralCore: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.25;
      wireframeRef.current.rotation.z += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Wireframe Shield */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner Solid Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#0b132b"
          roughness={0.2}
          metalness={0.9}
          emissive="#00f0ff"
          emissiveIntensity={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Equatorial Energy Ring */}
      <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Point Light source at origin */}
      <pointLight color="#00f0ff" intensity={3} distance={12} decay={2} />
    </group>
  );
};
