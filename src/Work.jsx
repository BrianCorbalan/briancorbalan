import React, { useState, useEffect } from "react";
import "./Work.css";
import Navbar from "./Navbar";
import BorderGlow from './BorderGlow';
import Footer from './Footer';

const projects = [
  {
    id: 1,
    title: "Advertising - First semester 2025",
    category: ["Video", "Motion"],
    cover: "/img/cover-01.jpg",
    client: "Eminsur",
    layout: "no-gap",
    media: [
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/5a687e231375329.688850470baff.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/00193a231375329.688850470b63d.jpg" },
      { type: "embed", src: "https://player.vimeo.com/video/1105336364?h=1c5f147b57" },
      { type: "embed", src: "https://player.vimeo.com/video/1105336489?h=d154c35120" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/1bd0e3231375329.688850470b060.jpg" },
      { type: "embed", src: "https://player.vimeo.com/video/1105337157?h=20ee1a9d70" },
      { type: "embed", src: "https://player.vimeo.com/video/1105337173?h=625f58c1d4" },
      { type: "embed", src: "https://player.vimeo.com/video/1105337185?h=b9af675b63" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/b77ba0231375329.688850470a97e.jpg" },
    ]
  },
  {
    id: 2,
    title: "Tasaciones 2024",
    category: ["Video", "Motion", "Design"],
    cover: "/img/cover-02.jpg",
    client: "Fera",
    layout: "no-gap",
    media: [
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/9b188e219708361.67b66bc8971d7.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/8d8a40219708361.67b66bc897a44.jpg" },
      { type: "embed", src: "https://player.vimeo.com/video/1058441531?h=9dd6d99bc5" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/9f1085219708361.67b69340b14ef.jpg" },
      { type: "embed", src: "https://player.vimeo.com/video/1058441555?h=4b71fa4dcf" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/b5678a219708361.67b69340b02ba.jpg" },
      { type: "embed", src: "https://player.vimeo.com/video/1058441498?h=ad52b28abe" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/76fca6219708361.67b69340b0bf8.jpg" },

    ]
  },
  {
    id: 3,
    title: "Branding",
    category: ["Design", "Branding"],
    cover: "/img/cover-03.jpg",
    client: "ZKD Resources",
    layout: "no-gap",
    media: [
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/54f19d112458045.684796e905cf5.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/6f9dbb112458045.684799a03317f.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/4e5f2d112458045.684796e90508f.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/da1163112458045.684796e906d3b.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/1cd37e112458045.684799a033a93.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/93eaf2112458045.684796e903dc0.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/0c3a75112458045.684796e903636.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/db3b2e112458045.684796e9055e0.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/76053f112458045.684796e906163.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/15bd98112458045.684796e904971.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/ab9832112458045.684796e90660f.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/3236e8112458045.684796e9044b1.jpg" },
    ]
  },
  {
    id: 4,
    title: "Branding",
    category: ["Design", "Branding"],
    cover: "/img/cover-04.jpg",
    client: "Latin American Digital Hub",
    layout: "no-gap",
    media: [
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/2ec16e114598745.6853840be428d.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/1f54b7114598745.6853840be3685.png" },
      { type: "embed", src: "https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=3abfbf8a-4d0e-11f0-bb24-0936e1cb08fb"},
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/c90d21114598745.6853840be531e.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/c5c20b114598745.6853840be474c.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/966780114598745.685382c9cfa2d.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/ee254e114598745.6853840be4c33.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/e87730114598745.6853840be3bde.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/94afe7114598745.685382c9d0174.png" },
    ]
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
    client: "Prefumo",
    layout: "no-gap",
    media: [
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/4e4386192804145.65e1486f92250.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/efe7ce192804145.65e149dc92409.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c1386192804145.65e149dc91546.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/737b65192804145.65e149dc90668.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/c5c440192804145.65e149dc8deb1.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/4d574e192804145.65e149dc8f771.jpg" },
      { type: "embed", src: "https://www-ccv.adobe.io/v1/player/ccv/KU36EmANgwE/embed?api_key=behance1"},
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/871125192804145.65e149dc93041.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/5aae01192804145.65e149dc94dc7.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a5949e192804145.65e149dc8eb3b.jpg" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/45f649192804145.65e149dc93edf.jpg" },
    ]
  },
  {
    id: 7,
    title: "Colección Invierno",
    category: ["Design", "Motion"],
    cover: "/img/cover-07.jpg",
    client: "Prefumo",
    layout: "no-gap",
    media: [
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/6c0d59195031121.660616bf21b2c.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/d2ceb1195031121.660616bf1f4cd.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/04660f195031121.660616bf1ff10.gif" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/5f2b89195031121.660616bf207ef.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/16048b195031121.660616bf2282d.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/71289d195031121.660616bf23c0b.png" },
      { type: "embed", src: "https://player.vimeo.com/video/924120693?h=cec0f28838" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7f6dcf195031121.660616bf22ba4.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/de95b2195031121.660616bf249f4.gif" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/55cf18195031121.660616bf21ecf.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/4f8c27195031121.660616bf2324c.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/0a7e57195031121.660616bf23fc7.png" }
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
                  {selected.media.map((m, i) => {
                    if (m.type === "video") {
                      return (
                        <video
                          key={i}
                          src={m.src}
                          controls
                          style={{ width: "100%", display: "block" }}
                        />
                      );
                    }

                    if (m.type === "embed") {
                      return (
                        <div key={i} className="embed-wrapper">
                          <iframe
                            src={m.src}
                            allow="autoplay; fullscreen"
                            allowFullScreen
                          />
                        </div>
                      );
                    }

                    return (
                      <img
                        key={i}
                        src={m.src}
                        alt=""
                        style={{ width: "100%", display: "block" }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <div id="footer" style={{ padding: "0% 10%", background: "#000" }}>
        <Footer />
      </div>
    </>
  );
}