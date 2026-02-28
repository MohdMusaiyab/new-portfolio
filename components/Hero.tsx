"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Cinzel font import — Tailwind v4 doesn't handle @import, keep in global CSS or here */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=DM+Mono:wght@300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.1); }
        }

        .anim-name {
          animation: fadeUp 1.1s cubic-bezier(.16,1,.3,1) 0.3s forwards;
        }
        .anim-scroll-line {
          animation: scrollPulse 2.2s ease-in-out infinite;
        }

        .font-cinzel   { font-family: 'Cinzel', serif; }
        .font-dm-mono  { font-family: 'DM Mono', monospace; }
      `}</style>

      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* ── Background smoke image ── */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bg.png')`,
            backgroundPosition: "center top",
          }}
        />

        {/* ── Dark gradient overlay ── */}
        <div
          className="absolute inset-0 z-1"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.22) 65%, rgba(0,0,0,0.82) 100%)",
          }}
        />

        {/* ── Edge vignette ── */}
        <div
          className="absolute inset-0 z-2"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* ── Content: name only ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl">
          <h1
            className={[
              "font-cinzel font-bold opacity-0 anim-name",
              "text-[clamp(52px,9vw,128px)]",
              "leading-[0.92] tracking-[0.12em]",
              "text-[#F5F0E8]",
            ].join(" ")}
            style={{
              textShadow:
                "0 0 80px rgba(201,168,76,0.35), 0 0 160px rgba(201,168,76,0.15), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            Mohd Musiayab
          </h1>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
          style={{ animation: "fadeIn 1.2s ease 1s forwards" }}
        >
          <span className="font-dm-mono text-[9px] tracking-[0.28em] uppercase text-[rgba(245,240,232,0.28)]">
            Scroll
          </span>
          <span
            className="anim-scroll-line w-px h-12"
            style={{
              background:
                "linear-gradient(to bottom, rgba(201,168,76,0.35), transparent)",
            }}
          />
        </div>
      </section>
    </>
  );
}
