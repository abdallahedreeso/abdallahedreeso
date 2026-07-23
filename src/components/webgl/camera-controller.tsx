import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/use-portfolio-store';

export function CameraController() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  useFrame((state, delta) => {
    // Map scrollProgress (0 to 1) to camera target positions along dive path
    const targetZ = 15 - scrollProgress * 10; // Zoom in from 15 to 5
    const targetY = -scrollProgress * 18;      // Pan down along Y axis
    const targetX = Math.sin(scrollProgress * Math.PI) * 1.5; // Subtle cinematic arc

    // Smooth camera translation (lerp)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 3);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 3);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 3);

    // Camera look target tracks scroll position
    const lookY = -scrollProgress * 18;
    state.camera.lookAt(0, lookY, 0);
  });

  return null;
}
