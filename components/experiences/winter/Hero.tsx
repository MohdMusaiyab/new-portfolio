"use client";

import { useState, useEffect } from "react";

const ROLES = [
  "Full Stack Developer",
  "Backend Engineer",
  "React Specialist",
  "System Designer",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleIn, setRoleIn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIn(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleIn(true);
      }, 380);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=DM+Mono:wght@300;400&family=Inter:wght@300;400;500&display=swap');

        @keyframes wFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
        @keyframes locPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(74,222,128,0); }
        }

        .wh-1 { opacity:0; animation: wFadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.15s forwards; }
        .wh-2 { opacity:0; animation: wFadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.35s forwards; }
        .wh-3 { opacity:0; animation: wFadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.55s forwards; }
        .wh-4 { opacity:0; animation: wFadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.72s forwards; }
        .wh-5 { opacity:0; animation: wFadeUp 0.9s cubic-bezier(.16,1,.3,1) 0.88s forwards; }
        .wh-6 { opacity:0; animation: wFadeIn 1.2s ease 1.1s forwards; }

        .wh-scroll { animation: scrollPulse 2.2s ease-in-out infinite; }

        .wh-role-text {
          display: inline-block;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .wh-role-text.out {
          opacity: 0;
          transform: translateY(8px);
        }

        .wh-resume {
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 32px;
          border: 1px solid rgba(255,255,255,0.3);
          background: transparent;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;

          color: #ffffff;
          transition: background 0.3s ease;
          cursor: pointer;
        }
        .wh-resume:hover { background: rgba(255,255,255,0.05); }

        .wh-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .wh-ghost:hover { color: rgba(255,255,255,0.85); }

        .wh-loc {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(10px);
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;

          color: rgba(255,255,255,0.55);
        }
        .wh-loc-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
          animation: locPulse 2s ease-in-out infinite;
        }

        .wh-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;

          color: rgba(255,255,255,0.22);
        }
        .wh-meta-divider {
          width: 1px; height: 10px;
          background: rgba(255,255,255,0.15);
        }
      `}</style>

      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
        {}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bg.png')`,
            backgroundPosition: "center top",
          }}
        />

        {}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 38%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        {}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 85% 85% at 50% 46%, transparent 25%, rgba(0,0,0,0.72) 100%)",
          }}
        />

        {}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-0">
          {}
          <div className="wh-loc wh-1 mb-8">
            <span className="wh-loc-dot" />
            Mysore, India
          </div>

          {}
          <h1
            className="wh-2 font-cinzel font-bold leading-[0.92] tracking-[0.1em] mb-5"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(46px,9vw,124px)",

              color: "#FFFFFF",
              textShadow:
                "0 0 60px rgba(255,255,255,0.22), 0 0 120px rgba(255,255,255,0.08), 0 3px 8px rgba(0,0,0,0.95)",
            }}
          >
            Mohd Musaiyab
          </h1>

          {}
          <div className="wh-3 flex items-center justify-center gap-4 mb-9">
            <span
              style={{
                width: 28,
                height: 1,
                background: "rgba(255,255,255,0.25)",
                flexShrink: 0,
              }}
            />
            <span
              className={`wh-role-text${roleIn ? "" : " out"}`}
              aria-live="polite"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.26em",
                textTransform: "uppercase",

                color: "rgba(255,255,255,0.58)",
              }}
            >
              {ROLES[roleIdx]}
            </span>
            <span
              style={{
                width: 28,
                height: 1,
                background: "rgba(255,255,255,0.25)",
                flexShrink: 0,
              }}
            />
          </div>

          {}
          <p
            className="wh-4 mb-11"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(13px, 1.55vw, 15px)",
              fontWeight: 300,
              lineHeight: 1.88,
              maxWidth: 480,

              color: "rgba(255,255,255,0.42)",
              letterSpacing: "0.015em",
            }}
          >
            I build performant, scalable web products — from clean backend APIs
            to immersive frontend interfaces. Currently a Systems Engineer
            at&nbsp;Infosys.
          </p>

          {}
          <div className="wh-5 flex flex-wrap items-center justify-center gap-4">
            <a href="/resume.pdf" download className="wh-resume">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
            <a href="#contact" className="wh-ghost">
              Get in touch
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

          {}
          <div className="wh-meta wh-6 mt-12">
            <span>2 yrs exp</span>
            <span className="wh-meta-divider" />
            <span>Full Stack</span>
            <span className="wh-meta-divider" />
            <span>Open to work</span>
          </div>
        </div>

        {}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 wh-6">
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
            }}
          >
            Scroll
          </span>
          <span
            className="wh-scroll"
            style={{
              display: "block",
              width: 1,
              height: 44,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)",
            }}
          />
        </div>
      </section>
    </>
  );
}
