"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import educationData from "@/app/data/education.json";

const DEEP_BLACK = "#050505";
const CHARCOAL = "#111111";
const WHITE = "#ffffff";
const WA = (a: number) => `rgba(255,255,255,${a})`;

type Education = (typeof educationData.education)[0];

function EduCard({ item, index }: { item: Education; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className={`relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-0 items-center w-full mb-32 group`}
    >
      {}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-[500px] h-px bg-white/10 z-0" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-px h-32 bg-white/10 z-0" />

      {}
      <div
        className={`w-full md:w-1/2 flex justify-center z-10 ${isEven ? "md:pr-16" : "md:pl-16"}`}
      >
        <motion.div
          className="relative w-[280px] h-[340px] md:w-[320px] md:h-[400px] flex flex-col items-center justify-center p-8 overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
            border: `1px solid ${WA(0.1)}`,
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          {}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

          {}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 bg-black/50 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
            <Image
              src={item.logo}
              alt={`${item.institution} logo`}
              fill
              className="object-contain p-4 mix-blend-screen"
              style={{ filter: "brightness(1.5) contrast(1.2) grayscale(0.2)" }}
            />
          </div>

          <div
            className="font-dm-mono text-[64px] leading-none text-white/5 absolute bottom-4 right-4 user-select-none"
            style={{ letterSpacing: "-0.05em" }}
          >
            {item.startYear}
          </div>
        </motion.div>
      </div>

      {}
      <div
        className={`w-full md:w-1/2 flex flex-col z-10 ${isEven ? "md:pl-16 text-left" : "md:pr-16 md:text-right"}`}
      >
        <div
          className={`flex flex-col ${isEven ? "items-start" : "items-start md:items-end"}`}
        >
          <div className="flex items-center gap-4 mb-5">
            <span
              className="font-dm-mono text-[11px] tracking-[0.3em] uppercase px-3 py-1 border border-white/20 rounded-full"
              style={{ color: WA(0.6), background: "rgba(255,255,255,0.03)" }}
            >
              {item.startYear} — {item.endYear}
            </span>
            <div className="hidden md:block w-12 h-px bg-white/20" />
          </div>

          <h3
            className="font-cinzel font-bold text-3xl md:text-5xl leading-[1.1] mb-4"
            style={{
              color: WHITE,
              textShadow: "0 4px 20px rgba(255,255,255,0.1)",
            }}
          >
            {item.institution}
          </h3>

          <h4
            className="font-inter text-lg md:text-xl font-light tracking-wide mb-10"
            style={{ color: WA(0.5) }}
          >
            {item.degree}
          </h4>

          {}
          <div
            className={`flex flex-col gap-6 w-full ${isEven ? "" : "md:items-end"}`}
          >
            {item.highlights.map((highlight, i) => {
              const parts = highlight.split(/([\d.%]+)/g).filter(Boolean);

              return (
                <div
                  key={i}
                  className={`flex flex-col ${isEven ? "items-start border-l" : "items-start md:items-end md:border-r border-l md:border-l-0"} border-white/10 pl-5 md:pl-0 ${isEven ? "" : "md:pr-5"} py-1 transition-colors duration-300 hover:border-white/40`}
                >
                  <p className="font-dm-mono text-[12px] uppercase tracking-[0.2em] text-white/30 mb-1">
                    0{i + 1}
                  </p>
                  <p className="font-inter text-[15px] font-light leading-relaxed text-white/70">
                    {parts.map((part, pidx) =>
                      /[\d.%]+/.test(part) ? (
                        <span
                          key={pidx}
                          className="font-dm-mono text-white tracking-wider"
                        >
                          {part}
                        </span>
                      ) : (
                        <span key={pidx}>{part}</span>
                      ),
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`

      `}</style>

      <section
        id="education"
        className="relative w-full py-32 md:py-48 overflow-hidden"
        style={{ background: CHARCOAL }}
      >
        {}
        <div
          className="absolute right-[-20%] top-0 w-[60%] h-[80%] pointer-events-none rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
          {}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-32"
          >
            <div className="w-px h-24 bg-linear-to-b from-transparent to-white/30 mb-8" />
            <h2
              className="font-cinzel font-bold tracking-[0.2em] uppercase"
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                color: WHITE,
              }}
            >
              Academic Genesis
            </h2>
            <div className="w-px h-24 bg-linear-to-t from-transparent to-white/30 mt-8" />
          </motion.div>

          {}
          <div className="flex flex-col relative w-full pt-10">
            {educationData.education.map((item, i) => (
              <EduCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
