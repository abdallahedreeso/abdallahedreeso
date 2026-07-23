import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTimelineStore } from '@/store/useTimelineStore';

// Orbiting Scene Rig with Camera & Mesh Parametric Rotation
const OrbitalRig: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const smoothProgressRef = useRef(0);

  // Pre-allocate particles geometry for performance
  const particleCount = 600;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const colorA = new THREE.Color('#06b6d4'); // Cyan
    const colorB = new THREE.Color('#6366f1'); // Indigo

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const mixed = colorA.clone().lerp(colorB, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const targetProgress = useTimelineStore.getState().progress;
    // Lerp smooth progress interpolation (0.12 factor)
    smoothProgressRef.current += (targetProgress - smoothProgressRef.current) * 0.12;
    const t = smoothProgressRef.current;

    // Rotate main group continuously correlated to playhead
    if (groupRef.current) {
      groupRef.current.rotation.y = t * Math.PI * 4; // 2 full 360 rotations
      groupRef.current.rotation.x = Math.sin(t * Math.PI * 2) * 0.25;
      groupRef.current.position.z = Math.cos(t * Math.PI * 2) * 1.5;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * Math.PI * -2;
      ringRef.current.rotation.x = t * Math.PI * 3;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * Math.PI * 2;
    }

    // Dynamic Camera Parametric Orbit
    const radius = 10;
    const cameraTheta = t * Math.PI * 2;
    state.camera.position.x = radius * Math.sin(cameraTheta);
    state.camera.position.z = radius * Math.cos(cameraTheta);
    state.camera.position.y = Math.sin(t * Math.PI * 3) * 2;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} color="#38bdf8" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />

      {/* Main Orbiting Group */}
      <group ref={groupRef}>
        {/* Core Wireframe Octahedron Mesh */}
        <mesh>
          <octahedronGeometry args={[3.2, 2]} />
          <meshStandardMaterial
            color="#0ea5e9"
            wireframe
            transparent
            opacity={0.4}
            emissive="#0284c7"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Inner Solid Tech Core */}
        <mesh>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial
            color="#6366f1"
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Orbiting Gyroscope Rings */}
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[5, 0.03, 16, 100]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[0, Math.PI / 3, 0]}>
            <torusGeometry args={[6, 0.02, 16, 100]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.5} />
          </mesh>
        </group>
      </group>

      {/* Ambient Particle Vortex */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ground Grid lines */}
      <gridHelper args={[40, 40, '#1e293b', '#0f172a']} position={[0, -5, 0]} />
    </>
  );
};

export const Spatial3DCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <OrbitalRig />
      </Canvas>
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
    </div>
  );
};

export default Spatial3DCanvas;
