import { Link } from "react-router-dom";
import LogoMini from "./LogoMini";

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
  letterSpacing: "2px",
  fontFamily: "sans-serif"
};

export default function Navbar({ scrollY = 0, forceVisible = false, smallLogo = false }) {

  const showNavItems = forceVisible || scrollY > window.innerHeight * 0.8;
  const isLogoSmall = smallLogo || scrollY > window.innerHeight * 0.5;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100px",
        padding: "0 20px",
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
        <Link to="/" style={{ display: "inline-block", width: "100%" }}>
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
        <Link to="/work" style={linkStyle}>Work</Link>
        <Link to="/Contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}