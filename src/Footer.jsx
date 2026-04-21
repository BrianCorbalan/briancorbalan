import LightRays from './LightRays';
import LogoMini from "./LogoMini";

function Footer() {
  return (
    <div style={{ width: "100%", height: "30vh", position: "relative" }}>
      
      {/* BACKGROUND (igual que lo tenías) */}
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

      {/* CONTENIDO ENCIMA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          alignItems: "center",
          
          color: "#fff",
          width: "100%",
        }}
      >
        {/* Col 1-2 */}
        <div style={{ gridColumn: "span 2" }}>
            <div className="status-badge">
                <span className="status-dot"></span>
                Available for Work
            </div>
          <p style={{ marginBottom: "20px",}}>
            
            Crafting visual experiences that blend motion, design and storytelling.
          </p>

        </div>

        {/* Col 3 */}
        <div style={{gridColumn: "span 4",display: "flex",justifyContent: "center", alignItems: "center", zIndex:5}}
>           
          <LogoMini />
        </div>

        {/* Col 4-6 */}
        <div style={{ gridColumn: "span 2" }}>
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
    </div>
  );
}

export default Footer;