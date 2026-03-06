"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const ROLES = [
  "Full Stack Engineer",
  "Backend Architect",
  "React Specialist",
  "API Designer",
];

/* Vertical scrolling items — replaces tech stack */
const FLOW_ITEMS = [
  "Full Stack Web Apps",
  "REST & GraphQL APIs",
  "System Architecture",
  "UI / UX Engineering",
  "Performance & Scale",
];

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleIn, setRoleIn] = useState(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIn(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleIn(true);
      }, 380);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .b {
          --bg:     #f1ede8;
          --white:  #faf8f5;
          --ink:    #1c1917;
          --mid:    #57534e;
          --muted:  #a8a29e;
          --border: #e7e2db;
          --blue:   #2563eb;
          --bl-bg:  #eff6ff;
          --bl-bd:  #bfdbfe;

          background: var(--bg);
          min-height: 100svh;
          font-family: var(--font-geist-sans), 'Cabinet Grotesk', ui-sans-serif, system-ui, sans-serif;
          color: var(--ink);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(1.2rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem);
        }

        .bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto;
          gap: 12px;
          width: 100%;
          max-width: 1160px;
        }

        .card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }

        /* Left = intro spanning both rows; Right = photo top, flow+info bottom */
        .c-intro  { grid-column: 1 / 7;  grid-row: 1 / 3; } /* spans 2 rows */
        .c-photo  { grid-column: 7 / 13; grid-row: 1; }
        .c-flow   { grid-column: 7 / 10; grid-row: 2; }
        .c-status { grid-column: 10 / 13; grid-row: 2; }

        /* ── Intro card ── */
        .c-intro { padding: clamp(1.8rem, 3.5vw, 2.8rem); display: flex; flex-direction: column; justify-content: space-between; min-height: 320px; }

        .intro-label {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 1.4rem;
        }
        .intro-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
          animation: bpulse 2.5s ease-in-out infinite;
        }
        .intro-headline {
          font-size: clamp(2.4rem, 4.8vw, 4.2rem);
          font-weight: 800; line-height: 1.05; letter-spacing: -0.03em;
          color: var(--ink); margin-bottom: 1rem;
        }
        .intro-headline em {
          font-style: italic; font-weight: 300;
          color: var(--blue); letter-spacing: -0.02em;
        }
        .intro-role {
          display: flex; align-items: center; gap: 0.6rem;
          height: 1.5rem; overflow: hidden; margin-bottom: 1.4rem;
        }
        .intro-role-dash { width: 1.2rem; height: 1.5px; background: var(--muted); flex-shrink: 0; }
        .intro-role-text {
          font-size: 0.9rem; font-weight: 500; color: var(--mid);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .intro-role-text.out { opacity: 0; transform: translateY(8px); }
        .intro-desc {
          font-size: 0.88rem; line-height: 1.75; color: var(--mid);
          font-weight: 400; max-width: 46ch;
        }
        .intro-bottom {
          display: flex; align-items: center; gap: 0.75rem;
          margin-top: 2rem; padding-top: 1.6rem;
          border-top: 1px solid var(--border); flex-wrap: wrap;
        }

        .btn-main {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.8rem; font-weight: 700; color: #fff;
          background: var(--ink); padding: 0.72em 1.5em; border-radius: 10px;
          text-decoration: none; letter-spacing: 0.01em;
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .btn-main:hover { background: #2c2825; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
        .btn-soft {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.8rem; font-weight: 600; color: var(--mid);
          background: transparent; padding: 0.7em 1.4em; border-radius: 10px;
          text-decoration: none; border: 1px solid var(--border);
          transition: border-color 0.18s, color 0.18s, background 0.18s;
        }
        .btn-soft:hover { border-color: #c0bab3; background: var(--bg); color: var(--ink); }

        /* ── Photo card ── */
        .c-photo {
          min-height: 320px; position: relative; overflow: hidden;
          background: #d8d0c8;
        }
        .photo-img {
          object-fit: cover;
          object-position: center top;
          transition: transform 0.5s ease;
        }
        .c-photo:hover .photo-img { transform: scale(1.03); }
        .photo-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(28,25,23,0.55) 0%, transparent 55%);
          z-index: 1;
        }
        .photo-chip {
          position: absolute; bottom: 1.4rem; left: 1.4rem; z-index: 2;
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(255,255,255,0.88); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.95); border-radius: 100px;
          padding: 0.45em 1em; font-size: 0.72rem; font-weight: 700;
          color: var(--ink); letter-spacing: 0.01em;
        }
        .photo-chip-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }

        .c-flow {
          padding: 0;
          display: flex; flex-direction: column;
          overflow: hidden;
          cursor: default;
        }
        .flow-header {
          padding: 0.9rem 1.2rem 0.55rem;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--muted);
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .flow-track-wrap {
          height: 88px; /* shows ~2 rows */
          overflow: hidden; position: relative; flex-shrink: 0;
          mask-image: linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%);
        }
        .flow-track {
          display: flex; flex-direction: column;
          animation: flowScroll 10s linear infinite;
          will-change: transform;
        }
        .flow-track:hover { animation-play-state: paused; }
        .flow-item {
          display: flex; align-items: center; gap: 0.55rem;
          padding: 0.5rem 1.2rem;
          font-size: 0.78rem; font-weight: 600;
          color: var(--ink); border-bottom: 1px solid var(--border);
          transition: background 0.15s;
          white-space: nowrap; flex-shrink: 0;
        }
        .flow-item:hover { background: var(--bg); }
        .flow-item-num {
          font-size: 0.6rem; font-weight: 700; color: var(--muted);
          letter-spacing: 0.06em; min-width: 18px;
        }
        .flow-arrow {
          margin-left: auto; opacity: 0; color: var(--blue);
          font-size: 0.72rem; transform: translateX(-4px);
          transition: opacity 0.15s, transform 0.15s;
        }
        .flow-item:hover .flow-arrow { opacity: 1; transform: translateX(0); }

        @keyframes flowScroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        /* ── Stats card ── */
        .c-stats { padding: 1.5rem 1.6rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
        .stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .stat-num { font-size: 2.6rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1; color: var(--ink); }
        .stat-num sup { font-size: 1rem; font-weight: 700; color: var(--blue); vertical-align: super; }
        .stat-lbl { font-size: 0.68rem; font-weight: 500; color: var(--muted); letter-spacing: 0.02em; }
        .stats-divider { grid-column: 1 / -1; height: 1px; background: var(--border); margin: -0.2rem 0; }

        /* ── Status card ── */
        .c-status {
          padding: 1.5rem 1.6rem; display: flex; flex-direction: column;
          justify-content: space-between;
          background: var(--ink); border-color: transparent;
        }
        .c-status:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.2); }
        .status-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 0.9rem; }
        .status-location { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem; }
        .status-time { font-size: 0.78rem; font-weight: 500; color: rgba(255,255,255,0.45); font-variant-numeric: tabular-nums; letter-spacing: 0.04em; }
        .status-avail { display: flex; align-items: center; gap: 0.5rem; margin-top: 1.4rem; padding-top: 1.2rem; border-top: 1px solid rgba(255,255,255,0.1); }
        .avail-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; animation: bpulse 2.5s ease-in-out infinite; flex-shrink: 0; }
        .avail-text { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.7); }
        .social-row { display: flex; gap: 0.5rem; margin-top: 0.9rem; }
        .social-chip {
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.04em;
          color: rgba(255,255,255,0.45); text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 6px;
          padding: 0.3em 0.7em; transition: color 0.15s, border-color 0.15s;
        }
        .social-chip:hover { color: rgba(255,255,255,0.9); border-color: rgba(255,255,255,0.3); }

        /* ── Entry animations ── */
        .c-intro  { opacity: 0; animation: bentoin 0.55s ease 0.05s forwards; }
        .c-photo  { opacity: 0; animation: bentoin 0.55s ease 0.15s forwards; }
        .c-flow   { opacity: 0; animation: bentoin 0.55s ease 0.25s forwards; }
        .c-stats  { opacity: 0; animation: bentoin 0.55s ease 0.32s forwards; }
        .c-status { opacity: 0; animation: bentoin 0.55s ease 0.39s forwards; }

        @keyframes bentoin {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bpulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50%      { box-shadow: 0 0 0 4px rgba(74,222,128,0); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .bento { grid-template-columns: repeat(6, 1fr); }
          .c-intro  { grid-column: 1 / 7; grid-row: 1; }
          .c-photo  { grid-column: 1 / 4; grid-row: 2; min-height: 220px; }
          .c-status { grid-column: 4 / 7; grid-row: 2; }
          .c-flow   { grid-column: 1 / 4; grid-row: 3; }
        }
        @media (max-width: 560px) {
          .bento { grid-template-columns: 1fr 1fr; gap: 10px; }
          .c-intro  { grid-column: 1 / 3; grid-row: 1; }
          .c-photo  { grid-column: 1 / 3; grid-row: 2; min-height: 200px; }
          .c-flow   { grid-column: 1 / 2; grid-row: 3; min-height: 180px; }
          .c-status { grid-column: 2 / 3; grid-row: 3; }
          .intro-headline { font-size: 2rem; }
        }
      `}</style>

      <div className="b">
        <div className="bento">
          {/* ── Intro ── */}
          <div className="card c-intro">
            <div>
              <div className="intro-label">
                <span className="intro-dot" />
                Available for work · 2025
              </div>
              <h1 className="intro-headline">
                Building systems
                <br />
                that <em>scale</em>.
              </h1>
              <div className="intro-role">
                <span className="intro-role-dash" />
                <span
                  className={`intro-role-text${roleIn ? "" : " out"}`}
                  aria-live="polite"
                >
                  {ROLES[roleIdx]}
                </span>
              </div>
              <p className="intro-desc">
                I&apos;m Musaiyab — a full stack & backend engineer who builds
                performant, scalable products. Currently at Infosys, based in
                Mysore, India.
              </p>
            </div>
            <div className="intro-bottom">
              <a href="#projects" className="btn-main">
                View projects
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </a>
              <a href="#contact" className="btn-soft">
                Get in touch
              </a>
            </div>
          </div>

          {/* ── Photo (real image) ── */}
          <div className="card c-photo">
            <Image
              src="/personal5.jpeg"
              alt="Mohd Musaiyab"
              fill
              priority
              sizes="(max-width: 900px) 50vw, 40vw"
              className="photo-img"
            />
            <div className="photo-gradient" />
            <div className="photo-chip">
              <span className="photo-chip-dot" />
              Mohd Musaiyab
            </div>
          </div>

          {/* ── Vertical flow (replaces tech stack) ── */}
          <div className="card c-flow">
            <p className="flow-header">What I build</p>
            <div className="flow-track-wrap">
              {/* Items duplicated so the scroll loops seamlessly */}
              <div className="flow-track">
                {[...FLOW_ITEMS, ...FLOW_ITEMS].map((item, i) => (
                  <div key={i} className="flow-item">
                    <span className="flow-item-num">
                      {String((i % FLOW_ITEMS.length) + 1).padStart(2, "0")}
                    </span>
                    {item}
                    <span className="flow-arrow">↗</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Info: location + exp/stats combined ── */}
          <div className="card c-status">
            <div>
              <p className="status-label">Based in</p>
              <p className="status-location">Mysore, India</p>
              <p className="status-time">{time} IST</p>
            </div>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.55rem",
              }}
            >
              {[
                { n: "2", s: "yr", l: "Experience" },
                { n: "8", s: "+", l: "Projects shipped" },
              ].map(({ n, s, l }) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 800,
                      lineHeight: 1,
                      color: "#fff",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {n}
                    <sup
                      style={{
                        fontSize: "0.6rem",
                        color: "rgba(255,255,255,0.45)",
                        verticalAlign: "super",
                      }}
                    >
                      {s}
                    </sup>
                  </span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.38)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {l}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div className="status-avail">
                <span className="avail-dot" />
                <span className="avail-text">Open to opportunities</span>
              </div>
              <div className="social-row">
                {[
                  { label: "GitHub", href: "https://github.com/MohdMusaiyab" },
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "Resume", href: "/resume.pdf" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-chip"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
