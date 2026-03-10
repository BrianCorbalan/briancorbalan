import React, { forwardRef, useRef } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const GlassLogo = forwardRef(({ position = [0, 0, 0] }, ref) => {
  const { scene } = useGLTF("/logo.glb");
  const meshRef = ref || useRef();

  const controls = process.env.NODE_ENV === "development"
    ? useControls({
        thickness: { value: 1.0, min: 0, max: 1 },
        distortion: { value: 1.0, min: 0, max: 1 },
        chromaticAberration: { value: 0.10, min: 0, max: 0.1 },
        roughness: { value: 0.05, min: 0, max: 0.5 },
      })
    : {
        thickness: 1.0,
        distortion: 1.0,
        chromaticAberration: 0.10,
        roughness: 0.05,
      };

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= delta * 0.3; // giro horizontal inverso
    }
  });

  const mesh = scene.children.find((child) => child.type === "Mesh");
  if (!mesh) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={mesh.geometry}
      scale={[0.7, 0.7, 0.7]}
      position={position}
      rotation={[Math.PI / 2, 0, 0]} // vertical
    >
      <MeshTransmissionMaterial
        resolution={1024}
        thickness={controls.thickness}
        distortion={controls.distortion}
        chromaticAberration={controls.chromaticAberration}
        roughness={controls.roughness}
        ior={1.5}
        color="white"
        anisotropy={1}
        transparent
        backside
      />
    </mesh>
  );
});

export default GlassLogo;