import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import GlassLogo from "./GlassLogo";

export default function LogoMini() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ height: 90 }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      {/* 🔥 ESTO ES LO QUE TE FALTABA */}
      <Environment preset="city" />

        <group position={[-0.75, -0.10, 0]}>
        <GlassLogo scale={0.3} />
        </group>
    </Canvas>
  );
}