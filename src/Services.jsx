import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Services.css";

/* ── Floating particle canvas ── */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;

    const particles = [];
    const PARTICLE_COUNT = 90;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.5 + 0.3,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          opacity: Math.random() * 0.5 + 0.1,
          hue: Math.random() > 0.6 ? 260 : 200,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();
    window.addEventListener("resize", () => { resize(); initParticles(); });
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="sv-particle-canvas" />;
}

/* ── Floating background fragments ── */
function BackgroundFragments() {
  const fragments = [
    { label: "Motion", delay: 0, depth: 0.2, x: "8%", y: "15%" },
    { label: "UI/UX", delay: 1.2, depth: 0.5, x: "85%", y: "22%" },
    { label: "Brand", delay: 2.4, depth: 0.3, x: "12%", y: "68%" },
    { label: "3D", delay: 0.8, depth: 0.7, x: "78%", y: "74%" },
    { label: "Code", delay: 3.1, depth: 0.4, x: "45%", y: "88%" },
    { label: "Visual", delay: 1.7, depth: 0.6, x: "92%", y: "48%" },
    { label: "FX", delay: 0.4, depth: 0.25, x: "5%", y: "44%" },
    { label: "AI", delay: 2.0, depth: 0.8, x: "60%", y: "10%" },
  ];

  return (
    <div className="sv-bg-fragments" aria-hidden="true">
      {fragments.map((f, i) => (
        <div
          key={i}
          className="sv-bg-frag"
          style={{
            left: f.x,
            top: f.y,
            animationDelay: `${f.delay}s`,
            opacity: 0.06 + f.depth * 0.08,
            fontSize: `${10 + f.depth * 8}rem`,
            filter: `blur(${(1 - f.depth) * 2}px)`,
          }}
        >
          {f.label}
        </div>
      ))}
    </div>
  );
}

/* ── Floating Screen Card ── */
function FloatingScreen({ children, style, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = (e.clientX - left - width / 2) / width;
      const cy = (e.clientY - top - height / 2) / height;
      el.style.transform = `rotateY(${cx * 8}deg) rotateX(${-cy * 6}deg) translateZ(20px)`;
    };
    const onLeave = () => {
      el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0px)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`sv-float-screen ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ── Section number ── */
function SectionNumber({ n }) {
  return (
    <div className="sv-section-num" aria-hidden="true">
      {String(n).padStart(2, "0")}
    </div>
  );
}

/* ── Reveal on scroll ── */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sv-reveal ${visible ? "sv-reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Motion Graphics screens ── */
function MotionScreens() {
  const screens = [
    { label: "Title Sequence", sub: "Broadcast & Film", accent: "#a78bfa", w: 280, h: 165, z: 3, x: 0, y: 0 },
    { label: "Social Reel", sub: "9:16 Format", accent: "#7c5cfc", w: 120, h: 210, z: 1, x: 310, y: -30 },
    { label: "Event Graphics", sub: "LED / Projection", accent: "#38bdf8", w: 260, h: 148, z: 2, x: 40, y: 200 },
    { label: "Logo Animation", sub: "Identity Motion", accent: "#a78bfa", w: 170, h: 96, z: 0, x: 330, y: 180 },
  ];

  return (
    <div className="sv-screens-3d">
      {screens.map((s, i) => (
        <FloatingScreen
          key={i}
          className="sv-screen-motion"
          style={{
            width: s.w,
            height: s.h,
            left: s.x,
            top: s.y,
            zIndex: s.z,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          <div className="sv-screen-inner" style={{ "--accent": s.accent }}>
            <div className="sv-screen-header">
              <div className="sv-screen-dot" style={{ background: "#ff5f57" }} />
              <div className="sv-screen-dot" style={{ background: "#febc2e" }} />
              <div className="sv-screen-dot" style={{ background: "#28c840" }} />
            </div>
            <div className="sv-screen-body">
              <div className="sv-screen-bar" style={{ width: "65%", background: s.accent }} />
              <div className="sv-screen-bar" style={{ width: "40%", background: `${s.accent}88` }} />
              <div className="sv-screen-timeline">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="sv-tl-block" style={{ background: `${s.accent}${j % 2 === 0 ? "cc" : "55"}`, width: `${10 + Math.random() * 25}%` }} />
                ))}
              </div>
              <p className="sv-screen-label">{s.label}</p>
              <p className="sv-screen-sub">{s.sub}</p>
            </div>
          </div>
        </FloatingScreen>
      ))}
    </div>
  );
}

/* ── Frontend screens ── */
function FrontendScreens() {
  const screens = [
    { label: "Dashboard UI", sub: "React · Tailwind", accent: "#38bdf8", w: 300, h: 190, x: 0, y: 0, z: 3 },
    { label: "Landing Page", sub: "HTML · CSS · JS", accent: "#7c5cfc", w: 200, h: 320, x: 320, y: -20, z: 1 },
    { label: "Web App", sub: "Component System", accent: "#a78bfa", w: 270, h: 160, x: 20, y: 220, z: 2 },
  ];

  return (
    <div className="sv-screens-3d sv-screens-3d--fe">
      {screens.map((s, i) => (
        <FloatingScreen
          key={i}
          className="sv-screen-fe"
          style={{ width: s.w, height: s.h, left: s.x, top: s.y, zIndex: s.z, animationDelay: `${i * 0.9}s` }}
        >
          <div className="sv-screen-inner sv-screen-inner--fe" style={{ "--accent": s.accent }}>
            <div className="sv-fe-nav">
              <div className="sv-fe-nav-dot" />
              <div className="sv-fe-bar" style={{ width: "30%", opacity: 0.5 }} />
              <div className="sv-fe-bar" style={{ width: "20%", opacity: 0.3 }} />
              <div className="sv-fe-bar" style={{ width: "15%", opacity: 0.3 }} />
            </div>
            <div className="sv-fe-body">
              <div className="sv-fe-hero-block" style={{ background: `linear-gradient(135deg, ${s.accent}22, ${s.accent}08)`, border: `1px solid ${s.accent}33` }}>
                <div className="sv-fe-bar" style={{ width: "60%", background: s.accent, height: 10, borderRadius: 4 }} />
                <div className="sv-fe-bar" style={{ width: "40%", opacity: 0.3 }} />
              </div>
              <div className="sv-fe-grid">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="sv-fe-card" style={{ borderColor: `${s.accent}22` }}>
                    <div className="sv-fe-bar" style={{ background: s.accent, opacity: 0.8, height: 6 }} />
                    <div className="sv-fe-bar" style={{ width: "70%", opacity: 0.2 }} />
                  </div>
                ))}
              </div>
              <p className="sv-screen-label">{s.label}</p>
              <p className="sv-screen-sub">{s.sub}</p>
            </div>
          </div>
        </FloatingScreen>
      ))}
    </div>
  );
}

/* ── Branding screens ── */
function BrandingScreens() {
  const items = [
    { label: "Logo Design", type: "logo", accent: "#f59e0b", w: 200, h: 200, x: 0, y: 0, z: 3 },
    { label: "Brand Guidelines", type: "guide", accent: "#a78bfa", w: 280, h: 170, x: 220, y: 30, z: 2 },
    { label: "Stationery", type: "card", accent: "#7c5cfc", w: 240, h: 140, x: 60, y: 230, z: 1 },
    { label: "Visual Identity", type: "palette", accent: "#38bdf8", w: 160, h: 100, x: 340, y: 220, z: 0 },
  ];

  return (
    <div className="sv-screens-3d sv-screens-3d--brand">
      {items.map((s, i) => (
        <FloatingScreen
          key={i}
          className="sv-screen-brand"
          style={{ width: s.w, height: s.h, left: s.x, top: s.y, zIndex: s.z, animationDelay: `${i * 0.6}s` }}
        >
          <div className="sv-screen-inner sv-screen-inner--brand" style={{ "--accent": s.accent }}>
            {s.type === "logo" && (
              <div className="sv-brand-logo-preview">
                <div className="sv-brand-logo-shape" style={{ background: `linear-gradient(135deg, ${s.accent}, ${s.accent}88)` }} />
                <div className="sv-fe-bar" style={{ width: "60%", marginTop: 12, background: s.accent, height: 7, borderRadius: 3 }} />
                <div className="sv-fe-bar" style={{ width: "40%", marginTop: 6, opacity: 0.3, height: 5 }} />
              </div>
            )}
            {s.type === "guide" && (
              <div className="sv-brand-guide">
                <div className="sv-brand-guide-colors">
                  {["#1a1a2e", "#7c5cfc", "#a78bfa", "#f59e0b"].map((c, j) => (
                    <div key={j} className="sv-brand-color-swatch" style={{ background: c }} />
                  ))}
                </div>
                <div className="sv-fe-bar" style={{ width: "80%", background: s.accent, height: 8, borderRadius: 3 }} />
                <div className="sv-fe-bar" style={{ width: "55%", opacity: 0.3 }} />
                <div className="sv-fe-bar" style={{ width: "70%", opacity: 0.2 }} />
              </div>
            )}
            {s.type === "card" && (
              <div className="sv-brand-card-preview" style={{ background: `linear-gradient(135deg, ${s.accent}22, transparent)`, border: `1px solid ${s.accent}33` }}>
                <div className="sv-brand-logo-shape" style={{ width: 24, height: 24, background: s.accent, borderRadius: 4 }} />
                <div style={{ flex: 1 }}>
                  <div className="sv-fe-bar" style={{ width: "60%", background: s.accent, height: 6 }} />
                  <div className="sv-fe-bar" style={{ width: "40%", opacity: 0.3, height: 5 }} />
                </div>
              </div>
            )}
            {s.type === "palette" && (
              <div className="sv-brand-palette">
                {["#7c5cfc", "#a78bfa", "#38bdf8", "#f59e0b", "#ffffff22"].map((c, j) => (
                  <div key={j} className="sv-brand-palette-block" style={{ background: c }} />
                ))}
              </div>
            )}
            <p className="sv-screen-label" style={{ marginTop: "auto", paddingTop: 8 }}>{s.label}</p>
          </div>
        </FloatingScreen>
      ))}
    </div>
  );
}

/* ── AI screens ── */
function AIScreens() {
  return (
    <div className="sv-screens-3d sv-screens-3d--ai">
      <FloatingScreen className="sv-screen-ai" style={{ width: 310, height: 200, left: 0, top: 0, zIndex: 3 }}>
        <div className="sv-ai-inner">
          <div className="sv-ai-header">
            <span className="sv-ai-badge">AI ENHANCED</span>
            <div className="sv-ai-pulse" />
          </div>
          <div className="sv-ai-output">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="sv-ai-line" style={{ width: `${55 + i * 10}%`, animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>
          <div className="sv-ai-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="sv-ai-thumb" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </FloatingScreen>

      <FloatingScreen className="sv-screen-ai" style={{ width: 180, height: 260, left: 330, top: -20, zIndex: 1, animationDelay: "0.8s" }}>
        <div className="sv-ai-inner sv-ai-inner--tall">
          <div className="sv-ai-badge" style={{ marginBottom: 12 }}>GENERATIVE</div>
          <div className="sv-ai-img-placeholder" />
          <div className="sv-ai-line" style={{ width: "80%", marginTop: 10 }} />
          <div className="sv-ai-line" style={{ width: "55%" }} />
        </div>
      </FloatingScreen>

      <FloatingScreen className="sv-screen-ai" style={{ width: 270, height: 150, left: 30, top: 230, zIndex: 2, animationDelay: "1.4s" }}>
        <div className="sv-ai-inner">
          <div className="sv-ai-wave">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="sv-ai-wave-bar" style={{ height: `${20 + Math.sin(i) * 15}px`, animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
          <div className="sv-ai-badge" style={{ marginTop: 8 }}>VIDEO · IMAGE · AUDIO</div>
        </div>
      </FloatingScreen>
    </div>
  );
}

/* ── SERVICE SECTION ── */
function ServiceSection({ number, eyebrow, title, titleAccent, description, features, screens, reverse = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`sv-service-section ${visible ? "sv-service-section--in" : ""} ${reverse ? "sv-service-section--rev" : ""}`}
    >
      <div className="sv-service-content">
        <SectionNumber n={number} />
        <Reveal>
          <p className="sv-eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="sv-service-title">
            {title}<br />
            <span>{titleAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="sv-service-desc">{description}</p>
        </Reveal>
        <Reveal delay={240}>
          <ul className="sv-feature-list">
            {features.map((f, i) => (
              <li key={i} className="sv-feature-item">
                <span className="sv-feature-icon">◈</span>
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={320}>
          <Link to="/contact" className="sv-cta-pill" onClick={() => window.scrollTo(0, 0)}>
            <span>Get a Quote</span>
            <span className="sv-cta-arrow">→</span>
          </Link>
        </Reveal>
      </div>

      <div className="sv-service-visual">
        {screens}
      </div>
    </section>
  );
}

/* ══════════ MAIN PAGE ══════════ */
export default function Services() {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const { left, top, width, height } = heroRef.current?.getBoundingClientRect() || {};
    if (!width) return;
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <>
      <Navbar forceVisible={true} smallLogo={true} />

      {/* ══ HERO ══ */}
      <section
        className="sv-hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
      >
        <ParticleField />
        <BackgroundFragments />

        <div
          className="sv-hero__cursor-glow"
          style={{
            background: `radial-gradient(ellipse 50% 45% at ${mousePos.x}% ${mousePos.y}%, rgba(124,92,252,0.12) 0%, transparent 70%)`,
          }}
        />

        <div className="sv-hero__glow" />

        <div className="sv-hero__content">
          <Reveal>
            <div className="sv-hero__eyebrow">
              <span className="sv-hero-line" />
              <span>SERVICES</span>
              <span className="sv-hero-line" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="sv-hero__title">
              EXPERTISE
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="sv-hero__sub">
              Designing motion experiences, digital products and visual systems
              that transform complex ideas into memorable experiences.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="sv-hero__scroll">
              <div className="sv-scroll-indicator">
                <div className="sv-scroll-dot" />
              </div>
              <span>Scroll to explore</span>
            </div>
          </Reveal>
        </div>

        <div className="sv-hero__service-tags">
          {["Motion Graphics", "Frontend Dev", "Branding", "AI Production"].map((s, i) => (
            <Reveal key={s} delay={480 + i * 80}>
              <span className="sv-hero-tag">{s}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ SERVICE 01 — MOTION GRAPHICS ══ */}
      <ServiceSection
        number={1}
        eyebrow="MOTION GRAPHICS"
        title="Cinematic"
        titleAccent="Motion Design"
        description="From broadcast title sequences to social reels — crafting animated experiences that captivate audiences and communicate with visual precision."
        features={[
          "Broadcast & film title sequences",
          "Social media motion content",
          "Event & LED projection visuals",
          "Logo animation & brand motion",
          "Adobe After Effects · Premiere Pro",
        ]}
        screens={<MotionScreens />}
      />

      {/* ══ SERVICE 02 — FRONTEND ══ */}
      <ServiceSection
        number={2}
        eyebrow="WEB DEVELOPMENT"
        title="Digital"
        titleAccent="Interfaces"
        description="Building performant, visually stunning web experiences — from landing pages to complete UI systems — with meticulous attention to detail and interaction design."
        features={[
          "React · HTML · CSS · JavaScript",
          "Landing pages & marketing sites",
          "Dashboard & web app interfaces",
          "Webflow & WordPress development",
          "Responsive & accessible design",
        ]}
        screens={<FrontendScreens />}
        reverse
      />

      {/* ══ SERVICE 03 — BRANDING ══ */}
      <ServiceSection
        number={3}
        eyebrow="BRANDING & IDENTITY"
        title="Visual"
        titleAccent="Identity Systems"
        description="Comprehensive brand creation for companies that want to stand out — logos, brand guidelines, stationery, and the full visual language that defines a brand's presence."
        features={[
          "Logo design & brand mark",
          "Complete brand guidelines",
          "Stationery & business collateral",
          "Institutional presentations",
          "Brand voice & visual strategy",
        ]}
        screens={<BrandingScreens />}
      />

      {/* ══ SERVICE 04 — AI ══ */}
      <ServiceSection
        number={4}
        eyebrow="AI-ENHANCED PRODUCTION"
        title="Generative"
        titleAccent="Creative AI"
        description="Leveraging cutting-edge AI tools to accelerate and amplify creative production — from AI-generated imagery to generative video and experimental visual concepts."
        features={[
          "Adobe Firefly & AI image generation",
          "Higgsfield generative video",
          "AI-accelerated motion workflows",
          "Concept art & visual exploration",
          "Experimental creative direction",
        ]}
        screens={<AIScreens />}
        reverse
      />

      {/* ══ STATS STRIP ══ */}
      <section className="sv-stats">
        <div className="sv-stats__glow" />
        {[
          { num: "5+", label: "Years of Experience" },
          { num: "80+", label: "Projects Delivered" },
          { num: "3", label: "Industries Served" },
          { num: "∞", label: "Creative Drive" },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 100} className="sv-stat-item">
            <div className="sv-stat-num">{s.num}</div>
            <div className="sv-stat-label">{s.label}</div>
          </Reveal>
        ))}
      </section>

      {/* ══ PROCESS STRIP ══ */}
      <section className="sv-process">
        <Reveal>
          <p className="sv-eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>HOW IT WORKS</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="sv-process-title">The <span>Process</span></h2>
        </Reveal>
        <div className="sv-process-steps">
          {[
            { n: "01", title: "Discovery", desc: "Understanding your goals, audience and vision before any creative decision." },
            { n: "02", title: "Concept", desc: "Translating your brief into a clear creative direction with references and moodboards." },
            { n: "03", title: "Production", desc: "Crafting the final piece with precision, iteration and close communication." },
            { n: "04", title: "Delivery", desc: "Exporting in every format you need, with full rights and source files." },
          ].map((step, i) => (
            <Reveal key={i} delay={i * 100} className="sv-process-step">
              <div className="sv-process-step-inner">
                <span className="sv-process-n">{step.n}</span>
                <h3 className="sv-process-step-title">{step.title}</h3>
                <p className="sv-process-step-desc">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="sv-cta">
        <div className="sv-cta__glow" />
        <BackgroundFragments />
        <div className="sv-cta__content">
          <Reveal>
            <p className="sv-cta__sub">Got a project in mind?</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="sv-cta__title">
              LET'S BUILD<br />
              <span>SOMETHING EXCEPTIONAL</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <Link
              to="/contact"
              className="glass-button sv-cta-btn"
              onClick={() => window.scrollTo(0, 0)}
            >
              <span className="arrow">→</span>
              <span>Contact Me</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <div style={{ padding: "0% 10%", background: "#000" }}>
        <Footer />
      </div>
    </>
  );
}
