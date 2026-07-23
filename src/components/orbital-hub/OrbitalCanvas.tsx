import React, { useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { ORBITAL_NODES_CONFIG, SectionId } from './orbital-types';
import { CentralCore } from './CentralCore';
import { OrbitalParticles } from './OrbitalParticles';
import { OrbitalNodeItem } from './OrbitalNodeItem';
import { CameraController } from './CameraController';

interface OrbitalCanvasProps {
  activeNodeId: SectionId | null;
  onSelectNode: (id: SectionId | null) => void;
}

export const OrbitalCanvas: React.FC<OrbitalCanvasProps> = ({
  activeNodeId,
  onSelectNode,
}) => {
  const nodePositionsRef = useRef<Map<SectionId, THREE.Vector3>>(new Map());

  const handleUpdatePosition = useCallback((id: SectionId, pos: THREE.Vector3) => {
    nodePositionsRef.current.set(id, pos);
  }, []);

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onPointerDown={(e) => {
          // Deselect if clicking on empty space in canvas
          if (e.target === e.currentTarget) {
            onSelectNode(null);
          }
        }}
      >
        {/* Ambient & Directional Scene Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="#3b82f6" />

        {/* Central Geometric Gravity Node */}
        <CentralCore />

        {/* Ambient Starfield & Orbit Track Rings */}
        <OrbitalParticles />

        {/* Orbiting Section Nodes */}
        {ORBITAL_NODES_CONFIG.map((node) => (
          <OrbitalNodeItem
            key={node.id}
            node={node}
            activeNodeId={activeNodeId}
            onSelectNode={onSelectNode}
            onUpdatePosition={handleUpdatePosition}
          />
        ))}

        {/* Camera Kinematic Animation Controller */}
        <CameraController
          activeNodeId={activeNodeId}
          nodePositions={nodePositionsRef.current}
        />
      </Canvas>
    </div>
  );
};
