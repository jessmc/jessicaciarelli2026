import { useState, useEffect, useRef } from "react";
import "./portfolio.scss";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { category: "Frontend", emoji: "🎨", items: ["React", "TypeScript", "SCSS", "Vue.js", "JQuery", "JavaScript"] },
  { category: "Backend", emoji: "⚙️", items: ["Node.js", "PHP", "MySQL", "REST APIs"] },
  { category: "Tooling", emoji: "🛠️", items: ["Git", "WordPress", "Vite", "Figma", "WCAG"] },
];

const PROJECTS = [
  {
    id: 1,
    title: "The Tipsy Endpoint",
    description: "A React & Typescript App using the API The Drinks DB to display and search different cocktails. Features ingredients, instructions, and images.",
    tags: ["React", "TypeScript", "API"],
    emoji: "🍹",
    color: "#ffd6e7",
    year: "2026",
    link: 'https://the-thirsty-endpoint.netlify.app'
  },
  {
    id: 2,
    title: "National Parks",
    description: "A React & Typescript App using the National Parks API. Features a geolocation section that suggest parks found near you.",
    tags: ["TypeScript", "SCSS", "React", "API"],
    emoji: "🌲",
    color: "#c8f0d8",
    year: "2026",
    link: 'https://national-parks-jc.netlify.app'
  },
  // {
  //   id: 3,
  //   title: "Nightwatch CLI",
  //   description: "A developer tool for monitoring containerized services with live logs, health checks, and alerting.",
  //   tags: ["Node.js", "Docker", "CLI"],
  //   emoji: "🦉",
  //   color: "#d6e8ff",
  //   year: "2023",
  // },
  // {
  //   id: 4,
  //   title: "Cartograph",
  //   description: "An interactive mapping tool for visualizing geospatial datasets with custom layers and heatmaps.",
  //   tags: ["Python", "React", "PostGIS"],
  //   emoji: "🗺️",
  //   color: "#fff3c8",
  //   year: "2023",
  // },
];

const SOCIAL_LINKS = [
  { label: "GitHub",   url: "https://github.com/jessmc" },
  { label: "LinkedIn", url: "https://linkedin.com/in/jciarelli" },
  { label: "Codepen",  url: "https://codepen.io/jessmc" },
];

const FLOATING_SHAPES = [
  { shape: "circle", size: 90, x: 6,  y: 12, delay: 0,   color: "#ffd6e7" },
  { shape: "donut",  size: 65, x: 88, y: 8,  delay: 1.2, color: "#c8f0d8" },
  { shape: "star",   size: 45, x: 78, y: 52, delay: 0.6, color: "#ffebb0" },
  { shape: "circle", size: 55, x: 4,  y: 68, delay: 1.8, color: "#d6e8ff" },
  { shape: "donut",  size: 35, x: 93, y: 78, delay: 0.9, color: "#ffd6e7" },
  { shape: "star",   size: 55, x: 48, y: 92, delay: 2.1, color: "#c8f0d8" },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wiggleSkill, setWiggleSkill] = useState<string | null>(null);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const [id, el] of Object.entries(sectionsRef.current)) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sectionsRef.current[id]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="portfolio">

      {/* Floating background shapes */}
      <div className="shapes" aria-hidden>
        {FLOATING_SHAPES.map((s, i) => (
          <div
            key={i}
            className={`shape shape--${s.shape}`}
            style={{
              width: s.size, height: s.size,
              left: `${s.x}%`, top: `${s.y}%`,
              animationDelay: `${s.delay}s`,
              "--shape-color": s.color,
            } as React.CSSProperties}
          />
        ))}
      </div>

    {/* Nav */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <button className="nav__logo" onClick={() => scrollTo("hero")}>
          <span className="nav__logo-wave">👋</span>
          <span>hey, I'm Jessica!</span>
        </button>
        <ul className="nav__links">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                className={`nav__link ${activeSection === link.toLowerCase() ? "nav__link--active" : ""}`}
                onClick={() => scrollTo(link.toLowerCase())}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
        <button className="nav__cta" onClick={() => scrollTo("contact")}>Let's talk! ✨</button>
        <button className={`nav__hamburger ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

     {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        {NAV_LINKS.map((link, i) => (
          <button
            key={link}
            className="mobile-menu__link"
            style={{ animationDelay: `${i * 70}ms` }}
            onClick={() => scrollTo(link.toLowerCase())}
          >
            {link}
          </button>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero" ref={(el) => { sectionsRef.current["hero"] = el; }} id="hero">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" /> Open to opportunities
          </div>
        <h1 className="hero__title">
            React &amp; TypeScript developer
            <br />
            who cares about{" "}
            <span className="hero__title-highlight">
              <span className="hero__title-underline">the details.</span>
              <svg className="hero__squiggle" viewBox="0 0 240 12" fill="none">
                <path d="M2 6 C24 1, 46 11, 68 6 C90 1, 112 11, 134 6 C156 1, 178 11, 200 6 C216 1, 232 10, 238 6"
                  stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="hero__sub">
            Hi! I'm a web developer focused on building things that are fast, polished, and genuinely pleasant to use. 
            I communicate clearly, care about the details, and love interfaces that feel as good as they look.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => scrollTo("projects")}>See my work 🚀</button>
            <button className="btn btn--outline" onClick={() => scrollTo("about")}>About me</button>
          </div>
        </div>
        <div className="hero__dot-grid" aria-hidden>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="hero__dot" style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about" ref={(el) => { sectionsRef.current["about"] = el; }} id="about">
        <div className="container">
          <div className="section-tag">About me 🙋🏻‍♀️</div>
          <div className="about__grid">
            <div className="about__visual">
              <div className="about__avatar-wrap">
                <div className="about__avatar">JC</div>
                <div className="about__avatar-ring" />
                <div className="about__sticker about__sticker--1">💻</div>
                <div className="about__sticker about__sticker--2">☕</div>
                <div className="about__sticker about__sticker--3">✨</div>
              </div>
            </div>
            <div className="about__text">
              <h2 className="about__heading">
                Nice to meet you! I'm <em>Jessica Ciarelli.</em>
              </h2>
            <p>
                I'm a full-stack developer who's worn a few hats along the way — growing
                from hands-on development into a Director role, leading a production team
                while never stepping away from the code. That combination of building and
                leading taught me a lot about communication, timelines, and what it
                actually takes to ship great work.
              </p>
              <p>
                My background includes building full-stack WordPress sites for Fortune 500
                companies and trade associations, so I know how to work with real
                clients, real stakes, and real deadlines. These days I'm focused on
                React and TypeScript, and I bring that same care for craft to every
                project. I have a deep love for translating pixel-perfect designs into
                code — if something is 2px off, I <em>will</em> notice.
              </p>
              <p>
                When I'm not coding, you'll find me practicing piano,
                learning Mandarin, or playing video games.
              </p>
              <div className="about__facts">
                {[
                  { emoji: "📍", text: "Based in Washington D.C." },
                  { emoji: "🎓", text: "Fashion grad, self-taught developer" },
                  { emoji: "👧🏻 👦🏻", text: "Lucky mom × 2" },
                ].map(({ emoji, text }) => (
                  <div className="about__fact" key={text}>
                    <span>{emoji}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="skills" ref={(el) => { sectionsRef.current["skills"] = el; }} id="skills">
        <div className="container">
          <div className="section-tag">Skills 🛠️</div>
          <h2 className="skills__heading">Things I'm good at</h2>
          <div className="skills__grid">
            {SKILLS.map((group) => (
              <div className="skills__group" key={group.category}>
                <div className="skills__group-header">
                  <span className="skills__emoji">{group.emoji}</span>
                  <h3>{group.category}</h3>
                </div>
                <div className="skills__pills">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`skill-pill ${wiggleSkill === skill ? "skill-pill--wiggle" : ""}`}
                      onMouseEnter={() => setWiggleSkill(skill)}
                      onAnimationEnd={() => setWiggleSkill(null)}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="projects" ref={(el) => { sectionsRef.current["projects"] = el; }} id="projects">
        <div className="container">
          <div className="section-tag">Projects 🔭</div>
          <h2 className="projects__heading">Stuff I've built</h2>
          <div className="projects__grid">
            {PROJECTS.map((project) => (
              <article
                className="project-card"
                key={project.id}
                style={{ "--card-color": project.color } as React.CSSProperties}
              >
                <div className="project-card__emoji">{project.emoji}</div>
                <div className="project-card__body">
                  <div className="project-card__top">
                    <h3 className="project-card__title">{project.title}</h3>
                    <span className="project-card__year">{project.year}</span>
                  </div>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__link">View project →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" ref={(el) => { sectionsRef.current["contact"] = el; }} id="contact">
        <div className="container">
          <div className="contact__inner">
            <div className="contact__confetti" aria-hidden>
              {["🎈","⭐","🎊","💌","🌟","🎀"].map((e, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
              ))}
            </div>
            <div className="section-tag">Contact 💌</div>
            <h2 className="contact__heading">
              Let's make something <em>awesome</em> together!
            </h2>
            <p className="contact__sub">
              I'm currently open to new roles and opportunities. If you think I'd be a good fit for your team, I'd love to hear from you. 📧
            </p>
            <a href="mailto:jciarelli@gmail.com" className="btn btn--primary btn--big">
              Say hello 👋
            </a>
            <div className="contact__social">
              {SOCIAL_LINKS.map(({ label, url }) => (
                <a
                    key={label}
                    href={url}
                    className="contact__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {label}
                    </a>
                ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <span>Made with 🩷 by Jessica Ciarelli</span>
          <span>React + TypeScript © 2026</span>
        </div>
      </footer>
    </div>
  );
}