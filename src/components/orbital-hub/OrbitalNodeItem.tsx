import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { OrbitalNodeData, SectionId } from './orbital-types';
import { FolderGit2, Cpu, UserCheck, Terminal } from 'lucide-react';

interface OrbitalNodeItemProps {
  node: OrbitalNodeData;
  activeNodeId: SectionId | null;
  onSelectNode: (id: SectionId) => void;
  onUpdatePosition: (id: SectionId, pos: THREE.Vector3) => void;
}

const ICON_MAP = {
  FolderGit2: FolderGit2,
  Cpu: Cpu,
  UserCheck: UserCheck,
  Terminal: Terminal,
};

export const OrbitalNodeItem: React.FC<OrbitalNodeItemProps> = ({
  node,
  activeNodeId,
  onSelectNode,
  onUpdatePosition,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const isActive = activeNodeId === node.id;
  const isAnyActive = activeNodeId !== null;

  // Persistent time accumulator for orbital position calculations
  const timeAcc = useRef<number>(node.phaseOffset);

  useFrame((state, delta) => {
    // If this node is active or another node is focused, freeze / slow orbit
    let currentSpeed = node.speed;
    if (isActive) {
      currentSpeed = 0; // Lock position when active
    } else if (hovered) {
      currentSpeed = node.speed * 0.15; // Dampen when hovered
    } else if (isAnyActive) {
      currentSpeed = node.speed * 0.2; // Slow down background nodes when one is focused
    }

    timeAcc.current += delta * currentSpeed;

    const t = timeAcc.current;
    const r = node.radius;
    const theta = node.inclination;

    // Parametric Orbital Math
    const x = r * Math.cos(t) * Math.cos(theta) - r * Math.sin(t) * Math.sin(theta);
    const y = node.yAmplitude * Math.sin(t);
    const z = r * Math.cos(t) * Math.sin(theta) + r * Math.sin(t) * Math.cos(theta);

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
      // Report current position for camera targeting
      onUpdatePosition(node.id, groupRef.current.position);
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 1.5 : 0.6);
      meshRef.current.rotation.y += delta * (hovered ? 2.0 : 0.8);

      // Smoothly scale up on hover or when active
      const targetScale = isActive ? 1.4 : hovered ? 1.25 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
    }
  });

  const IconComponent = ICON_MAP[node.iconName as keyof typeof ICON_MAP] || FolderGit2;

  const renderGeometry = () => {
    switch (node.geometryType) {
      case 'octahedron':
        return <octahedronGeometry args={[0.7, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.65, 0]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case 'box':
      default:
        return <boxGeometry args={[0.9, 0.9, 0.9]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {/* Interactive 3D Node Mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectNode(node.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {renderGeometry()}
        <meshStandardMaterial
          color={node.color}
          roughness={0.15}
          metalness={0.8}
          emissive={node.color}
          emissiveIntensity={isActive ? 0.9 : hovered ? 0.6 : 0.2}
          wireframe={hovered}
        />
      </mesh>

      {/* Point Light on the node */}
      <pointLight color={node.color} intensity={hovered || isActive ? 2 : 0.5} distance={4} />

      {/* HTML Spatial Label Bridge */}
      <Html
        position={[0, 1.1, 0]}
        center
        distanceFactor={12}
        style={{
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          opacity: isAnyActive && !isActive ? 0.2 : 1,
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectNode(node.id);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-pointer ${
            isActive
              ? 'bg-primary/90 text-primary-foreground border-primary shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-110'
              : hovered
              ? 'bg-card/90 text-foreground border-primary/60 shadow-lg scale-105'
              : 'bg-background/60 text-muted-foreground border-border/40 hover:border-primary/40'
          }`}
        >
          <IconComponent className="w-3.5 h-3.5" style={{ color: node.color }} />
          <span className="font-semibold whitespace-nowrap">{node.label}</span>
        </div>
      </Html>
    </group>
  );
};
