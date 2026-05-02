import LightRays from './LightRays';
import LogoMini from "./LogoMini";

function Footer() {
  return (
    <div className="footer-wrapper" style={{ width: "100%", position: "relative", height: "30vh", overflow: "hidden" }}>

      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={1}
        saturation={1}
      />

      <div className="footer-content">

        {/* Logo — orden 1 en mobile, col central en desktop */}
        <div className="footer-logo">
          <LogoMini />
        </div>

        {/* Col izquierda — orden 2 en mobile */}
        <div className="footer-left">
          <div className="status-badge">
            <span className="status-dot"></span>
            Available for Work
          </div>
          <p>Crafting visual experiences that blend motion, design and storytelling.</p>
        </div>

        {/* Col derecha — orden 3 en mobile */}
        <div className="footer-right">
          <h4>Contact</h4>
          <p>briancorbalan@gmail.com</p>
          <p>Buenos Aires, Argentina</p>
          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Behance</a>
          </div>
        </div>

      </div>

      <style>{`
        .footer-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-areas: "left left logo logo logo logo right right";
          align-items: center;
          color: #fff;
          width: 100%;
          padding: 0 40px;
          box-sizing: border-box;
        }

        .footer-logo  { grid-area: logo; display: flex; justify-content: center; align-items: center; z-index: 5; }
        .footer-left  { grid-area: left; }
        .footer-right { grid-area: right; }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .footer-content {
            position: relative;
            inset: unset;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 32px;
            padding: 48px 32px;
            min-height: unset;
          }

          .footer-logo  { order: 1; }
          .footer-left  { order: 2; }
          .footer-right { order: 3; }

          .footer-right div { justify-content: center; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .footer-content {
            gap: 24px;
            padding: 36px 20px;
          }
        }

        /* En mobile/tablet el wrapper no tiene altura fija */
        @media (max-width: 1024px) {
          .footer-wrapper {
            height: auto !important;
            overflow: visible !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Footer;
