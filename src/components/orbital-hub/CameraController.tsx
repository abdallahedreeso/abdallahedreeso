import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';
import { SectionId } from './orbital-types';

interface CameraControllerProps {
  activeNodeId: SectionId | null;
  nodePositions: Map<SectionId, THREE.Vector3>;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  activeNodeId,
  nodePositions,
}) => {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    let desiredCameraPos = new THREE.Vector3(0, 0, 14);
    let desiredLookAtPos = new THREE.Vector3(0, 0, 0);

    if (activeNodeId && nodePositions.has(activeNodeId)) {
      const nodePos = nodePositions.get(activeNodeId)!;

      // Position camera slightly offset from the targeted orbital node
      desiredCameraPos = new THREE.Vector3(
        nodePos.x,
        nodePos.y + 0.5,
        nodePos.z + 3.2
      );

      desiredLookAtPos = nodePos.clone();
    }

    // Damp camera position smooth transition
    easing.damp3(camera.position, desiredCameraPos, 0.35, delta);

    // Damp camera lookAt target
    easing.damp3(targetLookAt.current, desiredLookAtPos, 0.35, delta);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};
