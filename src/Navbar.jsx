import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoMini from "./LogoMini";

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
  letterSpacing: "2px",
  fontFamily: "sans-serif"
};

// Hook para detectar el tamaño de pantalla
function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

export default function Navbar({ scrollY = 0, forceVisible = false, smallLogo = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWindowSize();
  const isMobile = width <= 1024; // mobile + tablet

  const showNavItems = forceVisible || scrollY > window.innerHeight * 0.8;
  const isLogoSmall = smallLogo || scrollY > window.innerHeight * 0.5;

  const handleLinkClick = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ─── DESKTOP ─── */
  if (!isMobile) {
    return (
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          minHeight: "100px",
          padding: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "80px",
          color: "#fff",
          zIndex: 100,
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
            transition: "all 1s ease"
          }}
        >
          <a href="/#trabajos" style={linkStyle}>Services</a>
          <a href="#inicio" style={linkStyle}>About</a>
        </div>

        {/* logo */}
        <div style={{ width: "120px", textAlign: "center" }}>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ display: "inline-block", width: "100%" }}>
            <LogoMini />
          </Link>
        </div>

        {/* derecha */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            opacity: showNavItems ? 1 : 0,
            transform: showNavItems ? "translateX(0)" : "translateX(80px)",
            transition: "all 1s ease"
          }}
        >
          <Link to="/work" onClick={() => window.scrollTo(0, 0)} style={linkStyle}>Work</Link>
          <Link to="/Contact" onClick={() => window.scrollTo(0, 0)} style={linkStyle}>Contact</Link>
        </div>
      </nav>
    );
  }

  /* ─── MOBILE / TABLET ─── */
  return (
    <>
      {/* Barra superior */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100vw",
          maxWidth: "100%",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          boxSizing: "border-box",
          margin: 0,
          zIndex: 200,
          background: menuOpen
            ? "rgba(0,0,0,0.95)"
            : isLogoSmall
            ? "rgba(0,0,0,0.6)"
            : "transparent",
          backdropFilter: "blur(7px)",
          transition: "background 0.4s ease"
        }}
      >
        {/* Espacio izquierdo (balance) */}
        <div style={{ width: "36px" }} />

        {/* Logo — centrado */}
        <Link to="/" onClick={handleLinkClick} style={{ display: "inline-block", width: "80px" }}>
          <LogoMini />
        </Link>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "5px",
            width: "36px",
            height: "36px"
          }}
        >
          {/* Las 3 líneas del ícono, animadas */}
          <span style={{
            display: "block",
            width: "100%",
            height: "1.5px",
            background: "#fff",
            transformOrigin: "center",
            transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            transition: "transform 0.35s ease"
          }} />
          <span style={{
            display: "block",
            width: "100%",
            height: "1.5px",
            background: "#fff",
            opacity: menuOpen ? 0 : 1,
            transition: "opacity 0.2s ease"
          }} />
          <span style={{
            display: "block",
            width: "100%",
            height: "1.5px",
            background: "#fff",
            transformOrigin: "center",
            transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            transition: "transform 0.35s ease"
          }} />
        </button>
      </nav>

      {/* Menú desplegable fullscreen */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100vw",
          maxWidth: "100%",
          height: "100vh",
          background: "rgba(0,0,0,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 190,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "48px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.4s ease"
        }}
      >
        {[
          { label: "Services", href: "/#trabajos", isAnchor: true },
          { label: "About", href: "#inicio", isAnchor: true },
          { label: "Work", to: "/work" },
          { label: "Contact", to: "/Contact" }
        ].map((item, i) => (
          <div
            key={item.label}
            style={{
              transform: menuOpen ? "translateY(0)" : "translateY(24px)",
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.5s ease ${i * 0.07}s, opacity 0.5s ease ${i * 0.07}s`
            }}
          >
            {item.isAnchor ? (
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  ...linkStyle,
                  fontSize: "28px",
                  letterSpacing: "6px",
                  fontWeight: "300"
                }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                to={item.to}
                onClick={handleLinkClick}
                style={{
                  ...linkStyle,
                  fontSize: "28px",
                  letterSpacing: "6px",
                  fontWeight: "300"
                }}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
