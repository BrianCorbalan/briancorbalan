import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import GlassLogo from "./GlassLogo";
import Preloader from "./Preloader";
import "./App.css";
import { Link } from "react-router-dom";
import BorderGlow from './BorderGlow';
import GlareHover from './GlareHover';
import Prism from './Prism';
import LightRays from './LightRays';
import Footer from './Footer';

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


// BODY
export default function App() {
  
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef(null);

  // Animacion gif
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");

    const cleanups = [];

    cards.forEach((card) => {
      const img = card.querySelector(".service-gif");
      if (!img) return;

      const gif = img.dataset.gif;
      const staticSrc = img.dataset.static;

      const handleEnter = () => {
        img.src = gif + "?t=" + Date.now(); // reinicia GIF
      };

      const handleLeave = () => {
        img.src = staticSrc;
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

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


      
        <div style={{ position: "relative", color:"#fff"}}>
          {/* Video de fondo */}
          <div style={{ width: '100%', height: '100vh', position: 'fixed', zIndex:-4 }}>
            <Prism
              animationType="hover"
              timeScale={1}
              height={5.5}
              baseWidth={4.7}
              scale={3.1}
              hueShift={-0.0416}
              colorFrequency={1}
              noise={0}
              glow={0.9}
            />
          </div>
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
              zIndex: -6,
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
            <BorderGlow backgroundColor="#1a1a1a">
            <div className="service-card">

              <div className="service-icon">
                <img
                  src="/img/motion.png"
                  data-static="/img/motion.png"
                  data-gif="/img/motion.gif"
                  className="service-gif"
                  width={50}
                />
              </div>

              <h3>MOTION GRAPHICS</h3>

              <p>
                Creating dynamic animations and visual storytelling that transform
                ideas into engaging motion-driven experiences.
              </p>

            </div>
            </BorderGlow>

            <BorderGlow backgroundColor="#1a1a1a">
            <div className="service-card">

              <div className="service-icon">
                <img
                  src="/img/video-cam.png"
                  data-static="/img/video-cam.png"
                  data-gif="/img/video-cam.gif"
                  className="service-gif"
                  width={50}
                />
              </div>

              <h3>VIDEO EDITING</h3>

              <p>
                Crafting compelling video narratives through precise editing,
                rhythm, and storytelling.
              </p>

            </div>
            </BorderGlow>
            <BorderGlow backgroundColor="#1a1a1a">
            <div className="service-card">

              <div className="service-icon">
                <img
                  src="/img/photo.png"
                  data-static="/img/photo.png"
                  data-gif="/img/photo.gif"
                  className="service-gif"
                  width={50}
                />
              </div>

              <h3>GRAPHIC DESIGN</h3>

              <p>
                Designing modern visual identities and digital assets that
                communicate clearly and leave a lasting impression.
              </p>

            </div>
            </BorderGlow>

          </div>
          
          {/* Sección Perfil Profesional */}
          <div style={{ display: "flex", background: "#111" }}>
            
            {/* video */}
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
              <h2 style={{ fontSize: "3.4rem", marginBottom: "1rem"}}>
                Designing Visual Stories & Digital Experiences
              </h2>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                I’m Brian Corbalán, a Senior Motion Graphics Designer passionate about transforming ideas into meaningful visual experiences.
                With over six years in the field, I craft motion-driven designs that connect, inspire, and leave an impact.
              </p>
            </div>
          </div>

          {/* Sección Últimos trabajos */}
          <div id="trabajos" className="trabajos">
            <h2 className="trabajos-title">Featured Projects</h2>
            <p className="trabajos-desc">
              Explore my recent creations and discover how I can transform your vision into reality.
            </p>

            <div className="grid">
              
              {/* Video grande */}
              
              <div className="item item-large">
                <video src="/img/video-01.mp4" autoPlay loop muted playsInline />
              </div> 

              <div className="item">
                <video src="/img/video-02.mp4" autoPlay loop muted playsInline />
              </div>

              <div className="item">
                <video src="/img/video-03.mp4" autoPlay loop muted playsInline />
              </div>

              {window.innerWidth >= 768 && (
                <>
                  <div className="item">
                    <video src="/img/video-04.mp4" autoPlay loop muted playsInline />
                  </div>

                  <div className="item">
                    <video src="/img/video-05.mp4" autoPlay loop muted playsInline />
                  </div>
                </>
              )}
            </div>
          </div>


          {/* Sección círculo de trabajos */}
            <div style={{ padding: "1% 0%", background: "#111" }}>
              <RotatingCircle />
            </div>  


          {/* Footer*/}
          <div id="footer" style={{ padding: "0% 10%", background: "#000",}}>
                <Footer />
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

