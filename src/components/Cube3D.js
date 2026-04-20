"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useState } from "react";

function SpinningCube({ isInteracting }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Only auto-rotate when user is NOT grabbing
    if (!isInteracting) {
      meshRef.current.rotation.y += delta * 0.4;
    }
    // Fixed tilt — always locked, never drifts
    meshRef.current.rotation.x = 0.18;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3.2, 3.2, 3.2]} />
      {/* Rough metal texture, no lights applied yet */}
      <meshStandardMaterial color="#ff6b00" roughness={0.6} metalness={0.8} />
    </mesh>
  );
}

export default function Cube3D() {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing pointer-events-auto"
      onMouseDown={() => setIsInteracting(true)}
      onMouseUp={() => setIsInteracting(false)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      <Canvas camera={{ position: [0, 2, 7], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        {/* Lights removed! Relying solely on material properties and surrounding empty space */}
        <SpinningCube isInteracting={isInteracting} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
