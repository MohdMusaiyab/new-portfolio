"use client";
import { useEffect, useState } from "react";

const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Figma",
  "PostgreSQL",
  "Vercel",
];
const ROLES = [
  "Website Developer",
  "Frontend Engineer",
  "UI Craftsman",
  "Code & Design",
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
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&family=Newsreader:ital,opsz,wght@1,6..72,300;1,6..72,500&display=swap');

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
          font-family: 'Cabinet Grotesk', sans-serif;
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

         .c-intro  { grid-column: 1 / 8;  grid-row: 1; }
         .c-photo  { grid-column: 8 / 13; grid-row: 1; }
         .c-stack  { grid-column: 1 / 5;  grid-row: 2; }
         .c-stats  { grid-column: 5 / 9;  grid-row: 2; }
         .c-status { grid-column: 9 / 13; grid-row: 2; }

        .c-intro { padding: clamp(1.8rem, 3.5vw, 2.8rem) clamp(1.8rem, 3.5vw, 2.8rem); display: flex; flex-direction: column; justify-content: space-between; min-height: 320px; }

        .intro-top {}
        .intro-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.4rem;
        }
        .intro-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: bpulse 2.5s ease-in-out infinite;
        }

        .intro-headline {
          font-size: clamp(2.4rem, 4.8vw, 4.2rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .intro-headline em {
          font-family: 'Newsreader', serif;
          font-style: italic;
          font-weight: 300;
          color: var(--blue);
          letter-spacing: -0.02em;
        }

        .intro-role {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          height: 1.5rem;
          overflow: hidden;
          margin-bottom: 1.4rem;
        }
        .intro-role-dash { width: 1.2rem; height: 1.5px; background: var(--muted); flex-shrink: 0; }
        .intro-role-text {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--mid);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .intro-role-text.out { opacity: 0; transform: translateY(8px); }

        .intro-desc {
          font-size: 0.88rem;
          line-height: 1.75;
          color: var(--mid);
          font-weight: 400;
          max-width: 46ch;
          margin-bottom: 0;
        }

        .intro-bottom {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2rem;
          padding-top: 1.6rem;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }

        .btn-main {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
          background: var(--ink);
          padding: 0.72em 1.5em;
          border-radius: 10px;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .btn-main:hover { background: #2c2825; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }

        .btn-soft {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--mid);
          background: transparent;
          padding: 0.7em 1.4em;
          border-radius: 10px;
          text-decoration: none;
          border: 1px solid var(--border);
          transition: border-color 0.18s, color 0.18s, background 0.18s;
        }
        .btn-soft:hover { border-color: #c0bab3; background: var(--bg); color: var(--ink); }

        .c-photo {
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: linear-gradient(145deg, #e8e0d8 0%, #d4ccc2 100%);
          padding: 1.8rem;
          position: relative;
          overflow: hidden;
        }
        .photo-avatar {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar-svg { width: 72%; height: 72%; }

        .photo-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .pc1 { width: 220px; height: 220px; background: rgba(255,255,255,0.12); top: -60px; right: -60px; }
        .pc2 { width: 140px; height: 140px; background: rgba(0,0,0,0.04); bottom: 40px; left: -40px; }

        .photo-chip {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 100px;
          padding: 0.45em 1em;
          width: fit-content;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 0.01em;
        }
        .photo-chip-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }

        .c-stack { padding: 1.5rem 1.6rem; display: flex; flex-direction: column; }
        .card-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1rem;
        }
        .pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .pill {
          font-size: 0.71rem;
          font-weight: 600;
          color: var(--mid);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 0.3em 0.75em;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          cursor: default;
        }
        .pill:hover { background: var(--bl-bg); border-color: var(--bl-bd); color: var(--blue); }

        .c-stats { padding: 1.5rem 1.6rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
        .stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .stat-num {
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--ink);
        }
        .stat-num sup { font-size: 1rem; font-weight: 700; color: var(--blue); vertical-align: super; }
        .stat-lbl { font-size: 0.68rem; font-weight: 500; color: var(--muted); letter-spacing: 0.02em; }

        .stats-divider {
          grid-column: 1 / -1;
          height: 1px;
          background: var(--border);
          margin: -0.2rem 0;
        }

        .c-status {
          padding: 1.5rem 1.6rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--ink);
          border-color: transparent;
        }
        .c-status:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.2); }

        .status-top {}
        .status-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.9rem;
        }
        .status-location {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .status-time {
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.04em;
        }

        .status-avail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.4rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .avail-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; animation: bpulse 2.5s ease-in-out infinite; flex-shrink: 0; }
        .avail-text { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.7); }

        .social-row {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.9rem;
        }
        .social-chip {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 6px;
          padding: 0.3em 0.7em;
          transition: color 0.15s, border-color 0.15s;
        }
        .social-chip:hover { color: rgba(255,255,255,0.9); border-color: rgba(255,255,255,0.3); }

        .c-intro  { opacity: 0; animation: bentoin 0.6s ease 0.05s forwards; }
        .c-photo  { opacity: 0; animation: bentoin 0.6s ease 0.15s forwards; }
        .c-stack  { opacity: 0; animation: bentoin 0.6s ease 0.25s forwards; }
        .c-stats  { opacity: 0; animation: bentoin 0.6s ease 0.35s forwards; }
        .c-status { opacity: 0; animation: bentoin 0.6s ease 0.45s forwards; }

        @keyframes bentoin {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bpulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50%      { box-shadow: 0 0 0 4px rgba(74,222,128,0); }
        }

        @media (max-width: 900px) {
          .bento { grid-template-columns: repeat(6, 1fr); }
          .c-intro  { grid-column: 1 / 7; grid-row: 1; }
          .c-photo  { grid-column: 1 / 4; grid-row: 2; min-height: 200px; }
          .c-status { grid-column: 4 / 7; grid-row: 2; }
          .c-stack  { grid-column: 1 / 4; grid-row: 3; }
          .c-stats  { grid-column: 4 / 7; grid-row: 3; }
        }
        @media (max-width: 560px) {
          .bento { grid-template-columns: 1fr 1fr; gap: 10px; }
          .c-intro  { grid-column: 1 / 3; grid-row: 1; }
          .c-photo  { grid-column: 1 / 3; grid-row: 2; min-height: 180px; }
          .c-status { grid-column: 1 / 3; grid-row: 3; }
          .c-stack  { grid-column: 1 / 3; grid-row: 4; }
          .c-stats  { grid-column: 1 / 3; grid-row: 5; grid-template-columns: repeat(4, 1fr); }
          .stats-divider { display: none; }
          .intro-headline { font-size: 2rem; }
        }
      `}</style>

      <div className="b">
        <div className="bento">
          {}
          <div className="card c-intro">
            <div className="intro-top">
              <div className="intro-label">
                <span className="intro-dot" />
                Available for work · 2025
              </div>
              <h1 className="intro-headline">
                Building websites
                <br />
                people <em>love</em> to use.
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
                I'm Alex — a developer who cares deeply about clean code, sharp
                interfaces, and digital products that feel genuinely effortless.
                Based in New York, working globally.
              </p>
            </div>
            <div className="intro-bottom">
              <a href="#work" className="btn-main">
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

          {}
          <div className="card c-photo">
            <div className="pc1 photo-circle" />
            <div className="pc2 photo-circle" />
            <div className="photo-avatar">
              <svg
                className="avatar-svg"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ag1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c9bfb2" />
                    <stop offset="100%" stopColor="#a89e92" />
                  </linearGradient>
                  <linearGradient id="ag2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f5e6d3" />
                    <stop offset="100%" stopColor="#e8d5be" />
                  </linearGradient>
                  <linearGradient id="ag3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b3530" />
                    <stop offset="100%" stopColor="#1c1917" />
                  </linearGradient>
                </defs>
                {}
                <ellipse cx="100" cy="240" rx="70" ry="55" fill="url(#ag3)" />
                <rect
                  x="62"
                  y="155"
                  width="76"
                  height="88"
                  rx="14"
                  fill="url(#ag3)"
                />
                {}
                <rect
                  x="87"
                  y="135"
                  width="26"
                  height="28"
                  rx="6"
                  fill="url(#ag2)"
                />
                {}
                <ellipse cx="100" cy="115" rx="46" ry="50" fill="url(#ag2)" />
                {}
                <ellipse cx="100" cy="72" rx="46" ry="22" fill="url(#ag3)" />
                <rect
                  x="54"
                  y="72"
                  width="13"
                  height="28"
                  rx="6"
                  fill="url(#ag3)"
                />
                <rect
                  x="133"
                  y="72"
                  width="13"
                  height="28"
                  rx="6"
                  fill="url(#ag3)"
                />
                {}
                <ellipse cx="83" cy="115" rx="8" ry="9" fill="white" />
                <ellipse cx="117" cy="115" rx="8" ry="9" fill="white" />
                <circle cx="85" cy="116" r="5" fill="#1c1917" />
                <circle cx="119" cy="116" r="5" fill="#1c1917" />
                <circle cx="87" cy="114" r="1.5" fill="white" />
                <circle cx="121" cy="114" r="1.5" fill="white" />
                {}
                <path
                  d="M89 132 Q100 142 111 132"
                  stroke="#c4a882"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {}
                <path
                  d="M80 158 L100 172 L120 158"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <div className="photo-chip">
              <span className="photo-chip-dot" />
              Alex Morgan
            </div>
          </div>

          {}
          <div className="card c-stack">
            <p className="card-label">Tech stack</p>
            <div className="pills">
              {STACK.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {}
          <div className="card c-stats">
            {[
              { n: "48", s: "+", l: "Projects" },
              { n: "6", s: "yr", l: "Experience" },
            ].map(({ n, s, l }) => (
              <div key={l} className="stat-item">
                <div className="stat-num">
                  {n}
                  <sup>{s}</sup>
                </div>
                <div className="stat-lbl">{l}</div>
              </div>
            ))}
            <div className="stats-divider" />
            {[
              { n: "40", s: "+", l: "Clients" },
              { n: "12", s: "×", l: "Awards" },
            ].map(({ n, s, l }) => (
              <div key={l} className="stat-item">
                <div className="stat-num">
                  {n}
                  <sup>{s}</sup>
                </div>
                <div className="stat-lbl">{l}</div>
              </div>
            ))}
          </div>

          {}
          <div className="card c-status">
            <div className="status-top">
              <p className="status-label">Location</p>
              <p className="status-location">New York, USA</p>
              <p className="status-time">{time}</p>
            </div>
            <div>
              <div className="status-avail">
                <span className="avail-dot" />
                <span className="avail-text">Open to new projects</span>
              </div>
              <div className="social-row">
                {["GitHub", "LinkedIn", "Read.cv"].map((s) => (
                  <a key={s} href="#" className="social-chip">
                    {s}
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
