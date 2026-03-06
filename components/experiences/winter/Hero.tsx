"use client";

import { useState, useEffect } from "react";

const ROLES = [
  "Backend Architect",
  "Full Stack Engineer",
  "Distributed Systems",
  "API Design Specialist",
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
          text-shadow: 0 2px 10px rgba(0,0,0,0.6);
        }
        .wh-role-text.out {
          opacity: 0;
          transform: translateY(8px);
        }

        .wh-resume {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 32px;
          border: 1px solid rgba(255,255,255,0.8);
          background: white;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: black;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .wh-resume:hover { background: transparent; color: white; border-color: white; }

        .wh-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border: 1px solid rgba(255,255,255,0.3);
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(5px);
        }
        .wh-ghost:hover { border-color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.1); }

        .wh-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .wh-meta-divider {
          width: 1px; height: 10px;
          background: rgba(255,255,255,0.4);
        }
      `}</style>

      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bg.webp')`,
            backgroundPosition: "center top",
          }}
        />

        {/* Improved Gradient Overlays for Visibility */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          {/* Name Section */}
          <h1
            className="wh-2 font-cinzel font-bold leading-[0.92] tracking-[0.1em] mb-6"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(46px,9vw,124px)",
              color: "#FFFFFF",
              textShadow:
                "0 0 40px rgba(255,255,255,0.3), 0 3px 12px rgba(0,0,0,1)",
            }}
          >
            Mohd Musaiyab
          </h1>

          {/* Dynamic Roles */}
          <div className="wh-3 flex items-center justify-center gap-4 mb-10">
            <span
              style={{
                width: 40,
                height: 1,
                background: "rgba(255,255,255,0.4)",
              }}
            />
            <span
              className={`wh-role-text${roleIn ? "" : " out"}`}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              {ROLES[roleIdx]}
            </span>
            <span
              style={{
                width: 40,
                height: 1,
                background: "rgba(255,255,255,0.4)",
              }}
            />
          </div>

          {/* Short Tech Intro */}
          <p
            className="wh-4 mb-12"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(14px, 1.6vw, 16px)",
              fontWeight: 300,
              lineHeight: 1.8,
              maxWidth: 520,
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              letterSpacing: "0.02em",
            }}
          >
            Engineering robust digital infrastructures with a focus on
            performance and scalability. I specialize in building
            high-concurrency systems and immersive user experiences.
          </p>

          {/* CTA Buttons */}
          <div className="wh-5 flex flex-wrap items-center justify-center gap-6">
            <a href="/resume.pdf" download className="wh-resume">
              Resume
            </a>
            <a href="#contact" className="wh-ghost">
              Get in touch
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

          {/* Working Status / Meta */}
          <div className="wh-meta wh-6 mt-16">
            <span>2 Yrs Exp</span>
            <span className="wh-meta-divider" />
            <span>Full Stack</span>
            <span className="wh-meta-divider" />
            <span className="">Open to Work</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 wh-6">
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
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
                "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)",
            }}
          />
        </div>
      </section>
    </>
  );
}
