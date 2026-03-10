import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import GlassLogo from "./GlassLogo";
import Preloader from "./Preloader";


export default function App() {
  
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLogoSmall = scrollY > window.innerHeight * 0.5;

  return (
    <>
    <Preloader />
      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 20px",
          background: isLogoSmall ? "#000" : "transparent",
          color: "#fff",
          zIndex: 1,
          transition: "background 0.3s ease",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={{ width: "25px", height: "3px", background: "#fff" }} />
          <span style={{ width: "25px", height: "3px", background: "#fff" }} />
          <span style={{ width: "25px", height: "3px", background: "#fff" }} />
        </div>

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "20px",
              background: "#000",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <a href="#inicio" style={{ color: "#fff", textDecoration: "none" }}>
              Inicio
            </a>
            <a href="#trabajos" style={{ color: "#fff", textDecoration: "none" }}>
              Todos los trabajos
            </a>
            <a href="#contacto" style={{ color: "#fff", textDecoration: "none" }}>
              Contacto
            </a>
          </div>
        )}
      </nav>


      
        <div style={{ position: "relative", color: "#fff" }}>
          {/* Video de fondo */}
          <video
            src="https://static.vecteezy.com/system/resources/previews/068/482/268/mp4/real-bokeh-background-05-free-video.mp4"
            autoPlay
            loop
            muted
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          />

          {/* Canvas sticky full screen */}
            <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 2 }}>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                 style={{ background: "transparent", touchAction: "pan-y", pointerEvents: "none" }}
                gl={{ alpha: true }}
                
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />

                <LogoWithScroll scrollY={scrollY} />
                <ResponsiveText scrollY={scrollY} />

                <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
                <Environment preset="city" />
              </Canvas>
            </div>

          {/* Sección perfil profesional */}
          <div id="inicio" style={{ padding: "5% 10%", background: "#111" }}>
            <h1 style={{ fontFamily: "sans-serif", fontSize: "2.5rem", marginBottom: "1rem" }}>
              Sobre mi
            </h1>
            <p style={{ fontFamily: "sans-serif", fontSize: "1.2rem", lineHeight: "1.6" }}>
              Diseñador Gráfico, formado en la Universidad de Buenos Aires, con más de cinco años
              de experiencia en Motion graphics y Diseño digital. Actualmente trabajo como
              Diseñador Motion Graphic Senior en una agencia de marketing, y también trabajo
              como diseñador gráfico freelance. Tengo conocimientos en desarrollo frontend,
              modelado 3D y fotografía.
            </p>
          </div>

          {/* Sección Últimos trabajos */}
          <div id="trabajos" style={{ padding: "5% 10%", background: "#111" }}>
            <h2 style={{ fontFamily: "sans-serif", fontSize: "2rem", marginBottom: "2rem" }}>
              Últimos trabajos
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: window.innerWidth < 768 ? "1fr 1fr" : "1fr 1fr 1fr",
                gridTemplateRows: window.innerWidth < 768 ? "250px 250px" : "repeat(2, 300px)",
                gap: "10px",
              }}
            >
              {/* Video grande */}
              <div
                style={{
                  gridColumn: window.innerWidth < 768 ? "span 2" : "auto",
                  gridRow: window.innerWidth < 768 ? "span 1" : "span 2",
                }}
              >
                <video
                  src="/img/video-01.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div>
                <video
                  src="/img/video-02.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div>
                <video
                  src="/img/video-03.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Estos solo aparecen en desktop */}
              {window.innerWidth >= 768 && (
                <>
                  <div>
                    <video
                      src="/img/video-04.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <div>
                    <video
                      src="/img/video-05.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sección contacto */}
          <div id="contacto" style={{ padding: "5% 10%", background: "transparent", minHeight: "50vh" }}>
            <h2 style={{ fontFamily: "sans-serif", fontSize: "2rem", marginBottom: "1rem" }}>
              Contacto
            </h2>
            <p style={{ fontFamily: "sans-serif", fontSize: "1.2rem" }}>
              Aquí va tu formulario de contacto o información de email/teléfono.
            </p>
          </div>
        </div>
      
    </>
  );
}

// Texto responsivo con fade
function ResponsiveText({ scrollY }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 3;
  const fontSize = Math.min(Math.max(viewport.width / 5, 0.3), 0.7);
  const maxScroll = window.innerHeight;

  const opacity = Math.max(1 - scrollY / (maxScroll * 0.5), 0);

  if (isMobile) {
    return (
      <>
        <Text
          position={[0, 0.35, -0.7]}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          material-transparent={true}
          material-opacity={opacity}
        >
          BRIAN
        </Text>
        <Text
          position={[0, -0.35, -0.7]}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          material-transparent={true}
          material-opacity={opacity}
        >
          CORBALÁN
        </Text>
      </>
    );
  }

  return (
    <Text
      position={[0, 0, -0.7]}
      fontSize={fontSize}
      color="white"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0}
      material-transparent={true}
      material-opacity={opacity}
    >
      BRIAN CORBALÁN
    </Text>
  );
}

// Logo 3D con scroll effect y más chico
function LogoWithScroll({ scrollY }) {
  const meshRef = useRef();

  const handleClick = () => {
    // Scroll suave al inicio (top de la página)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

useFrame(() => {
  if (!meshRef.current) return;

  const maxScroll = window.innerHeight;
  const t = Math.min(scrollY / maxScroll, 1);

  // Escala y posición
  const scale = 0.9 * (1 - 0.9 * t);
  meshRef.current.scale.set(scale, scale, scale);

  const y = 0 + 2.1 * t;
  meshRef.current.position.set(0, y, 0);

  // Rotación solo según scroll (un solo sentido)
  meshRef.current.rotation.y = t * Math.PI * 1.5; // gira hasta 360° con el scroll
});

  return <mesh ref={meshRef} onClick={handleClick} cursor="pointer">
    <GlassLogo position={[0, 0, 0]} />
  </mesh>;
}