import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BorderGlow from "./BorderGlow";
import "./About.css";
import { Link } from "react-router-dom";

/* ── Animated skill bar ── */
function SkillBar({ name, level, delay = 0 }) {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ab-skill-item" ref={ref}>
      <div className="ab-skill-header">
        <span className="ab-skill-name">{name}</span>
        <span className="ab-skill-pct">{level}%</span>
      </div>
      <div className="ab-skill-track">
        <div
          className="ab-skill-fill"
          style={{
            width: animated ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );
}

/* ── Experience card ── */
function ExpCard({ date, role, company, items, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ab-exp-card ${visible ? "ab-exp-card--in" : ""}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="ab-exp-dot" />
      <p className="ab-exp-date">{date}</p>
      <h3 className="ab-exp-role">{role}</h3>
      <p className="ab-exp-company">{company}</p>
      {items && (
        <ul className="ab-exp-list">
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}

/* ── MAIN ── */
export default function About() {
  const heroRef = useRef(null);

  /* Mouse glow tracking */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - left) / width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - top) / height) * 100}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const experience = [
    {
      date: "Jun 2020 – Present",
      role: "Motion Graphic Designer · Web Developer",
      company: "Inversiones Digitales — Marketing Agency",
      items: [
        "Lead of the Audiovisual Design team",
        "Audiovisual pieces for social media and events",
        "Design, editing and automation of email marketing campaigns",
        "Landing page and HTML sub-page layout for specific campaigns",
      ],
    },
    {
      date: "Dec 2020 – Jun 2025",
      role: "Freelance Graphic Designer · Creative Coordinator",
      company: "Corporate Innovation Partners — Innovation Consultancy",
      items: [
        "Comprehensive branding for the company and its sub-brands",
        "Institutional design: presentations, stationery, etc.",
        "Audiovisual content editing",
        "WordPress website design & maintenance",
        "Coordination of creative collaborators",
      ],
    },
    {
      date: "Oct 2024 – Dec 2024",
      role: "Motion Graphic Designer (Freelance)",
      company: "The 8 Agency — Design Agency",
      items: [
        "Adjunct video editor during the Dell Technologies event in Brazil",
      ],
    },
    {
      date: "Jan 2019 – Present",
      role: "Freelance Graphic Designer",
      company: "Independent Projects",
      items: [
        "Branding for entrepreneurs: logos, business cards, custom pieces",
        "Audiovisual content editing for social media",
        "Professional presentations and institutional material",
      ],
    },
  ];

  const skills = [
    { name: "Adobe After Effects", level: 95 },
    { name: "Adobe Premiere Pro", level: 90 },
    { name: "Photoshop & Illustrator", level: 88 },
    { name: "Figma / Adobe XD", level: 82 },
    { name: "HTML · CSS · JavaScript", level: 75 },
    { name: "Blender 3D", level: 65 },
  ];

  const tools = [
    "After Effects", "Premiere Pro", "Photoshop", "Illustrator",
    "Dimension", "Figma", "Adobe XD", "Webflow", "WordPress",
    "HTML", "CSS", "JavaScript", "Bootstrap", "Git / GitHub",
    "Mailchimp", "Asana", "Trello", "ClickUp", "Blender",
    "Adobe Firefly", "Higgsfield", "Nano Banana",
  ];

  const edu = [
    { title: "Graphic Design", sub: "Universidad de Buenos Aires (UBA)" },
    { title: "Web Development", sub: "Coderhouse — HTML, CSS, Bootstrap, Sass, Git" },
    { title: "JavaScript", sub: "Coderhouse — jQuery, Ajax, JSON, Node.js" },
    { title: "Argentina Programa", sub: "Gobstones, JavaScript, Ruby, OOP" },
    { title: "Technical English for Developers", sub: "Argentina Programa 4.0 · B2" },
  ];

  return (
    <>
      <Navbar forceVisible={true} smallLogo={true} />

      {/* ══ HERO ══ */}
      <section className="ab-hero" ref={heroRef}>
        <div className="ab-hero__glow" />

        <div className="ab-hero__card">
          <ProfileCard
            name="Brian Corbalán"
            title="Motion Graphics · Frontend"
            handle="briancorbalan"
            status="Available for projects"
            contactText="Contact Me"
            avatarUrl="/img/photo-cv.png"
            iconUrl="/img/pattern.png"
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => { window.location.href = "mailto:corbalanbrian@gmail.com"; }}
            behindGlowColor="rgba(90, 60, 180, 0.7)"
            behindGlowSize="55%"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#2a1a4e99 0%,#1a3a6e66 60%,#0d1f3c 100%)"
          />
        </div>

        <div className="ab-hero__text">
          <div className="status-badge">
            <span className="status-dot" />
            Open to work
          </div>

          <h1 className="ab-hero__name">
            Brian<br /><span>Corbalán</span>
          </h1>

          <p className="ab-hero__bio">
            Senior Motion Graphics Designer &amp; Frontend Developer, graduated in Graphic Design from UBA.
            5+ years crafting audiovisual experiences and digital interfaces. Currently leading
            the audiovisual team at a marketing agency while taking on freelance projects across
            multiple industries. Also skilled in 3D modeling and photography.
          </p>

          <div className="ab-hero__links">
            <a href="mailto:corbalanbrian@gmail.com" className="ab-link-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              corbalanbrian@gmail.com
            </a>
            <a href="https://linkedin.com/in/briancorbalan" target="_blank" rel="noreferrer" className="ab-link-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              linkedin.com/in/briancorbalan
            </a>
            <a href="https://behance.net/Corbalan" target="_blank" rel="noreferrer" className="ab-link-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 6h6c2.5 0 4 1.2 4 3.2 0 1.3-.7 2.3-1.8 2.8 1.5.4 2.4 1.6 2.4 3.1C12.1 17.5 10.4 19 7.6 19H1.5V6zm2.4 5.3h3.2c1.1 0 1.8-.6 1.8-1.5s-.6-1.5-1.8-1.5H3.9v3zm0 5.4h3.5c1.3 0 2-.7 2-1.8s-.8-1.8-2-1.8H3.9v3.6zm9.1-8.2h5.8V7h-5.8v1.5zM22.5 13.7c0-2.9-1.7-4.9-4.5-4.9s-4.5 2-4.5 4.9c0 2.9 1.7 4.9 4.5 4.9 2.1 0 3.6-1 4.2-2.7h-2.2c-.4.7-1.1 1.1-2 1.1-1.2 0-2-.8-2.2-2h6.6c.1-.4.1-.9.1-1.3zm-6.6-.8c.2-1 .9-1.7 2.1-1.7s1.9.7 2.1 1.7h-4.2z"/>
              </svg>
              behance.net/Corbalan
            </a>
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section className="ab-section ab-experience">
        <div className="ab-section__left">
          <p className="ab-eyebrow">EXPERIENCE</p>
          <h2 className="ab-section-title">
            Professional<br /><span>Journey</span>
          </h2>
          <p className="ab-section-desc">
            Over five years building brands, motion pieces and digital products for agencies and independent clients.
          </p>
        </div>
        <div className="ab-timeline">
          <div className="ab-timeline__line" />
          {experience.map((exp, i) => (
            <ExpCard key={i} index={i} {...exp} />
          ))}
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section className="ab-section ab-skills">
        <div className="ab-section__left">
          <p className="ab-eyebrow">SKILLS</p>
          <h2 className="ab-section-title">
            Technical<br /><span>Mastery</span>
          </h2>
          <p className="ab-section-desc">
            Years of intensive practice with the industry's leading audiovisual and digital tools.
          </p>
          <div className="ab-softskills">
            {["Critical Thinking", "Visual Creativity", "Autonomy", "Adaptability", "Feedback-driven"].map(s => (
              <span key={s} className="ab-soft-pill">{s}</span>
            ))}
          </div>
        </div>
        <div className="ab-skills-bars">
          {skills.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ══ TOOLS ══ */}
      <section className="ab-section ab-tools">
        <p className="ab-eyebrow">STACK</p>
        <h2 className="ab-section-title">
          Tools &amp; <span>Technologies</span>
        </h2>
        <div className="ab-tools-cloud">
          {tools.map(t => (
            <BorderGlow key={t} backgroundColor="#1a1a1a">
              <span className="ab-tool-pill">{t}</span>
            </BorderGlow>
          ))}
        </div>
      </section>

      {/* ══ EDUCATION ══ */}
      <section className="ab-section ab-edu">
        <p className="ab-eyebrow">EDUCATION</p>
        <h2 className="ab-section-title">
          Education &amp; <span>Courses</span>
        </h2>
        <div className="ab-edu-grid">
          {edu.map((e, i) => (
            <BorderGlow key={i} backgroundColor="#1a1a1a">
              <div className="ab-edu-card">
                <span className="ab-edu-icon">◈</span>
                <div>
                  <p className="ab-edu-title">{e.title}</p>
                  <p className="ab-edu-sub">{e.sub}</p>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>

        <div className="ab-langs">
          <div className="ab-lang-card">
            <span className="ab-lang-flag">🇬🇧</span>
            <div>
              <p className="ab-lang-name">English</p>
              <p className="ab-lang-level">B2 · Upper Intermediate</p>
            </div>
          </div>
          <div className="ab-lang-card">
            <span className="ab-lang-flag">🇦🇷</span>
            <div>
              <p className="ab-lang-name">Spanish</p>
              <p className="ab-lang-level">Native</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="ab-cta">
        <div className="ab-cta__glow" />
        <p className="ab-cta__sub">Got a project in mind?</p>
        <h2 className="ab-cta__title">
          Let's Create<br />Something Exceptional
        </h2>
        <Link
  to="/contact"
  className="glass-button"
  onClick={() => window.scrollTo(0, 0)}
  style={{ marginTop: "2.5rem", display: "inline-flex", textDecoration: "none" }}
>
  <span className="arrow">→</span>
  <span>Contact Me</span>
</Link>
      </section>

      <div style={{ padding: "0% 10%", background: "#000" }}>
        <Footer />
      </div>
    </>
  );
}
