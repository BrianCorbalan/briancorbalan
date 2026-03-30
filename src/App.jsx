import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import GlassLogo from "./GlassLogo";
import Preloader from "./Preloader";
import "./App.css";
import { Link } from "react-router-dom";

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
  letterSpacing: "2px",
  fontFamily: "sans-serif"
};



function RotatingCircle() {

  const images = Array.from({ length: 16 }, (_, i) =>
    `/img/circulo-${String(i + 1).padStart(2, "0")}.jpg`
  );

  return (
    <div className="circle-section">

      <div className="circle-mask">

        <div className="circle-wrapper">

          <div className="circle-rotator">

            {images.map((src, i) => {
              const angle = (360 / 16) * i;

              return (
                <img
                  key={i}
                  src={src}
                  className="circle-img"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      rotate(${angle}deg)
                      translate(700px)
                      
                    `
                  }}
                />
              );
            })}

          </div>

        </div>

      </div>

      <div className="circle-content">

        <h2>Let’s Create Something Exceptional</h2>

        <p>
          Let’s work together to create a bold brand or seamless digital
          experience. Get in touch!
        </p>

        <button className="glass-button">
          <span className="arrow">→</span>
          <Link to="/contact" style={{color:"#fff"}}>Contact me</Link>
        </button>

      </div>

    </div>
  );
}

export default function App() {
  
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showNavItems = scrollY > window.innerHeight * 0.8;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const video = videoRef.current;

  if (!video) return;

  const handleScrollVideo = () => {
    if (!video.duration) return; // 🔥 evita pantalla en blanco

    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;

    video.currentTime = video.duration * scrollFraction;
  };

  const handleLoaded = () => {
  video.currentTime = video.duration * 0.3; // 👈 30%
  window.addEventListener("scroll", handleScrollVideo);
  };

  video.addEventListener("loadedmetadata", handleLoaded);

  return () => {
    window.removeEventListener("scroll", handleScrollVideo);
    video.removeEventListener("loadedmetadata", handleLoaded);
  };
}, []);

  const isLogoSmall = scrollY > window.innerHeight * 0.5;

  return (
    <>
    <style>
      {`
      @keyframes slideLeft {
        from { transform: translateX(-100px); opacity:0 }
        to { transform: translateX(0); opacity:1 }
      }

      @keyframes slideRight {
        from { transform: translateX(100px); opacity:0 }
        to { transform: translateX(0); opacity:1 }
      }
      `}
    </style>
    <Preloader />
      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          minHeight: "100px",
          padding: "0 20px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "80px",
          color: "#fff",
          zIndex: 2,
          pointerEvents: "auto",

          opacity: showNavItems ? 1 : 0,
          
          transition: "all 0.8s ease",

          background: isLogoSmall ? "rgba(0,0,0,0.6)" : "transparent",
          backdropFilter: "blur(7px)"
        }}
      >

        {/* izquierda */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            opacity: showNavItems ? 1 : 0,
            transform: showNavItems ? "translateX(0)" : "translateX(-80px)",
            transition: "all 1.0s ease"
          }}
        >
          <a href="#trabajos" style={linkStyle}>Services</a>
          <a href="#inicio" style={linkStyle}>About</a>
        </div>

        {/* espacio central para el logo */}
        <div style={{ width: "120px" , textAlign: "center" }}>
          <a href="#hero">                  </a>
        </div>

        {/* derecha */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            opacity: showNavItems ? 1 : 0,
            transform: showNavItems ? "translateX(0)" : "translateX(80px)",
            transition: "all 1.0s ease",            
          }}
        >
          <Link to="/work" style={linkStyle}>Work</Link>
          
          <Link to="/Contact" style={linkStyle}>Contact</Link>
        </div>

      </nav>


      
        <div style={{ position: "relative", color: "#fff",  }}>
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
              zIndex: -5,
            }}
          />
          {/* HERO UI */}
            <div id="hero" className="hero-ui" style={{ zIndex: 4 }}>

              {/* izquierda */}
              <div className="hero-left">
                <div className="status-badge">
                  <span className="status-dot"></span>
                  Available for Work
                </div>

                <p>Motion Graphic Designer</p>
                <p>Video Editor</p>
                <p>Graphic Designer</p>

              </div>

              {/* derecha */}
              <div className="hero-right">

                <p>
                  Motion Designer specialized in creating dynamic visual content,
                  combining animation, graphic design, and editing to produce
                  modern visual experiences.
                </p>

                <button className="glass-button">
                  <span className="arrow">→</span>
                  <Link to="/work" style={{color:"#fff"}}>See my work</Link>
                </button>

              </div>

            </div>

          {/* Canvas sticky full screen */}
          <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 3, pointerEvents: "none" }}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              style={{ background: "transparent", touchAction: "pan-y",pointerEvents: "none" }}
              gl={{ alpha: true }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />

              <LogoWithScroll scrollY={scrollY} />
              <ResponsiveText scrollY={scrollY} />

              {!isMobile && (
                <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
              )}
                <Environment preset="city" />
            </Canvas>
          </div>

          {/* Sección resumen de servicios */}
          <div className="services-section">

            <div className="service-card">

              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2"/>
                </svg>
              </div>

              <h3>MOTION GRAPHICS</h3>

              <p>
                Creating dynamic animations and visual storytelling that transform
                ideas into engaging motion-driven experiences.
              </p>

            </div>


            <div className="service-card">

              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="3"/>
                  <circle cx="6" cy="18" r="3"/>
                  <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                  <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                </svg>
              </div>

              <h3>VIDEO EDITING</h3>

              <p>
                Crafting compelling video narratives through precise editing,
                rhythm, and storytelling.
              </p>

            </div>


            <div className="service-card">

              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/>
                </svg>
              </div>

              <h3>GRAPHIC DESIGN</h3>

              <p>
                Designing modern visual identities and digital assets that
                communicate clearly and leave a lasting impression.
              </p>

            </div>

          </div>
          
          {/* Contenedor principal */}
          <div style={{ display: "flex", background: "#111" }}>
            {/* 🎥 IZQUIERDA - VIDEO */}
            <div style={{ flex: 1, position: "relative" }}>
              <video
                /*ref={videoRef}*/
                src="/img/abstract-background-2.mp4"
                muted
                playsInline
                autoPlay
                loop
                style={{
                  width: "100%",
                  height: "50vh",
                  
                  position: "sticky",
                  top: 0,
                }}
              />
            </div>

            {/* Sección perfil profesional a la derecha */}
            <div id="inicio" style={{ flex: 1, padding: "5% 10%" }}>
              <h2 style={{ fontFamily: "sans-serif", fontSize: "3rem", marginBottom: "1rem", color: "#c2b990"}}>
                Designing Visual Stories & Digital Experiences
              </h2>
              <p style={{ fontFamily: "sans-serif", fontSize: "1.2rem", lineHeight: "1.6" }}>
                I’m Brian Corbalán, a Senior Motion Graphics Designer passionate about transforming ideas into meaningful visual experiences.
                With over six years in the field, I craft motion-driven designs that connect, inspire, and leave an impact.
              </p>
            </div>
          </div>

          {/* Sección Últimos trabajos */}
          <div id="trabajos" style={{ padding: "5% 10%", background: "#111" }}>
            <h2 style={{ fontFamily: "sans-serif", fontSize: "3rem", marginBottom: "1rem" }}>
              Featured Projects
            </h2>
            <p style={{ fontFamily: "sans-serif", fontSize: "1.2rem", lineHeight: "1.6" }}>
              Explore my recentcreations and discover how I can transform your vision into reality.
            </p>

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


          {/* Sección círculo de trabajos */}
            <div style={{ padding: "1% 0", background: "#111" }}>
              <RotatingCircle />
            </div>  


          {/* Sección contacto */}
          <div id="contacto" style={{ padding: "1% 10%", background: "transparent", minHeight: "25vh" }}>
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

  const opacity = Math.max(1 - scrollY / (maxScroll * 0.45), 0);

  if (isMobile) {
    return (
      <>
        <Text
          font="/fonts/Zain-Bold.ttf"
          position={[0, 0.6, -0.7]}
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
          font="/fonts/Zain-Bold.ttf"
          position={[0, -0.1, -0.7]}
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
      font="/fonts/Zain-Bold.ttf"
      position={[0, 0.4, -0.7]}
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

  const y = 0.2 + 1.9 * t;
  meshRef.current.position.set(0, y, 0);

  // Rotación solo según scroll (un solo sentido)
  meshRef.current.rotation.y = t * Math.PI * 1.5; // gira hasta 360° con el scroll
});

  return <mesh ref={meshRef} onClick={handleClick} cursor="pointer">
    <GlassLogo position={[0, 0, 0]} />
  </mesh>;
}