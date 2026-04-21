import React, { useState, useEffect } from "react";
import "./Work.css";
import Navbar from "./Navbar";
import BorderGlow from './BorderGlow';

const projects = [
  {
    id: 1,
    title: "Brand Motion",
    category: ["Video", "Motion"],
    cover: "/img/cover-01.jpg",
    client: "Eminsur",
    media: [
      { type: "video", src: "/img/video-01.mp4" },
      { type: "image", src: "/img/img-01.jpg" }
    ]
  },
  {
    id: 2,
    title: "Campaign Edit",
    category: ["Video", "Motion"],
    cover: "/img/cover-02.jpg",
    client: "Fera",
    media: [{ type: "video", src: "/img/video-02.mp4" }]
  },
  {
    id: 3,
    title: "Branding",
    category: ["Design", "Branding"],
    cover: "/img/cover-03.jpg",
    client: "ZKD Resources",
    media: [{ type: "image", src: "/img/img-03.jpg" }]
  },
  {
    id: 4,
    title: "Branding",
    category: ["Design", "Branding"],
    cover: "/img/cover-04.jpg",
    client: "Latin American Digital Hub",
    media: [{ type: "image", src: "/img/img-04.jpg" }]
  },
  {
    id: 5,
    title: "Branding",
    category: ["Design", "Branding"],
    cover: "/img/cover-05.jpg",
    client: "Inside Earth",
    media: [{ type: "image", src: "/img/img-04.jpg" }]
  },
  {
    id: 6,
    title: "Colección Otoño",
    category: ["Design", "Motion"],
    cover: "/img/cover-06.jpg",
    client: "",
    layout: "no-gap",
    media: [
      { type: "image", src: "/img/invierno-01.webp" },
      { type: "image", src: "/img/invierno-02.webp" },
      { type: "image", src: "/img/invierno-03.gif" },
      { type: "image", src: "/img/invierno-04.webp" }
    ]
  },
  {
    id: 7,
    title: "Colección Invierno",
    category: ["Design", "Motion"],
    cover: "/img/cover-07.jpg",
    client: "",
    layout: "no-gap",
    media: [
      { type: "image", src: "/img/invierno-01.webp" },
      { type: "image", src: "/img/invierno-02.webp" },
      { type: "image", src: "/img/invierno-03.gif" },
      { type: "image", src: "/img/invierno-04.webp" },
      { type: "image", src: "/img/invierno-05.webp" },
      { type: "image", src: "/img/invierno-06.png" },
      { type: "video", src: "/img/invierno-07.mp4" },
      { type: "image", src: "/img/invierno-07.webp" },
      { type: "image", src: "/img/invierno-08.gif" },
      { type: "image", src: "/img/invierno-09.webp" },
      { type: "image", src: "/img/invierno-10.webp" },
      { type: "image", src: "/img/invierno-11.webp" }
    ]
  }
];

const filters = ["All", "Motion", "Video", "AI", "Design", "Branding"];

export default function Work() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
  }, [selected]);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category.includes(active));

  return (
    <>
      {/* ✅ Navbar siempre visible + logo chico */}
      <Navbar forceVisible={true} smallLogo={true} />

      <section className="work-page">
        <div className="work-header">
          <h1>Selected Work</h1>
          <p>A selection of motion, video and design projects.</p>
        </div>

        <div className="work-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={active === f ? "active" : ""}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="work-grid">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="work-card"
              onClick={() => setSelected(p)}
            >
              <BorderGlow backgroundColor="#1a1a1a">
              <div className="work-media">
                <img src={p.cover} alt={p.title} />
              </div>
              </BorderGlow>
              <div className="work-info">
                <h3>{p.title}</h3>
                <p>{p.client}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selected && (
          <div className="modal" onClick={() => setSelected(null)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-inner">
                <button
                  className="modal-close"
                  onClick={() => setSelected(null)}
                >
                  ✕
                </button>

                <h2>{selected.title}</h2>
                {selected.client && <p>{selected.client}</p>}

                <div className={`modal-media ${selected.layout || ""}`}>
                  {selected.media.map((m, i) =>
                    m.type === "video" ? (
                      <video key={i} src={m.src} controls />
                    ) : (
                      <img key={i} src={m.src} alt="" />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}