"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SkillPill from "@/components/ui/SkillPill";
import experienceData from "@/app/data/experience.json";

const DEEP_BLACK = "#0a0a0a";
const WHITE = "#ffffff";
const WA = (a: number) => `rgba(255,255,255,${a})`;

type Experience = (typeof experienceData.experience)[0];

function ExperienceCard({ item }: { item: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
      className="relative md:pl-20 py-8 md:py-12 group"
    >
      {}
      <div className="hidden md:block absolute left-[27px] top-0 bottom-0 w-px bg-white/5 group-last:bottom-auto group-last:h-full">
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: "100%" } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full"
          style={{
            background: `linear-gradient(to bottom, ${WA(0.5)} 0%, transparent 100%)`,
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[76px] w-[9px] h-[9px] rounded-full border border-black z-10 transition-colors duration-500 group-hover:bg-white"
          style={{ background: WA(0.3) }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {}
        <div className="w-full md:w-[220px] shrink-0 pt-2 flex flex-row md:flex-col items-center md:items-start gap-6 md:gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
            {item.logo ? (
              <Image
                src={item.logo}
                alt={`${item.company} logo`}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            ) : (
              <span className="font-cinzel text-xl text-white/50">
                {item.company.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <h4
              className="font-dm-mono text-[11px] tracking-[0.2em] uppercase mb-1"
              style={{ color: WA(0.7) }}
            >
              {item.duration.start} — {item.duration.end}
            </h4>
            <span
              className="font-inter text-[13px] tracking-wide"
              style={{ color: WA(0.4) }}
            >
              {item.location}
            </span>
          </div>
        </div>

        {}
        <div className="flex-1">
          <h3
            className="font-cinzel font-bold text-3xl md:text-4xl mb-2 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
            style={{ color: WA(0.85), letterSpacing: "0.02em" }}
          >
            {item.position}
          </h3>
          <h4
            className="font-dm-mono text-sm md:text-base tracking-widest uppercase mb-6 transition-colors duration-300 group-hover:text-white/80"
            style={{ color: WA(0.5) }}
          >
            {item.company}
          </h4>

          <ul className="space-y-3 mb-6">
            {item.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-4 items-start group/li">
                <span
                  className="shrink-0 mt-[10px] w-1.5 h-[1.5px] transition-all duration-300 group-hover/li:w-3 group-hover/li:bg-white"
                  style={{ background: WA(0.3) }}
                />
                <span
                  className="text-[15px] md:text-base leading-relaxed transition-all duration-300 group-hover/li:text-white group-hover/li:font-normal group-hover/li:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  style={{
                    color: WA(0.65),
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {highlight}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <SkillPill key={skill} name={skill} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: false, margin: "-100px" });

  return (
    <>
      <style>{`

      `}</style>

      <section
        id="experience"
        className="relative w-full overflow-hidden"
        style={{ background: DEEP_BLACK }}
      >
        {}
        <div
          className="absolute left-[-20%] top-[30%] w-[60%] h-[80%] pointer-events-none rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 60%)",
          }}
        />

        <div className="grain-overlay" aria-hidden="true" />

        {}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to bottom, rgba(5,5,5,1) 0%, transparent 100%)`,
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
          {}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16 border-b border-white/10 pb-8"
          >
            <h2
              className="font-cinzel font-black leading-none"
              style={{
                fontSize: "clamp(50px, 8vw, 110px)",
                color: WHITE,
                letterSpacing: "0.02em",
                textShadow: "0 10px 40px rgba(255,255,255,0.1)",
              }}
            >
              Experience
            </h2>
          </motion.div>

          {}
          <div className="flex flex-col relative">
            {experienceData.experience.map((item, i) => (
              <ExperienceCard
                key={`${item.company}-${i}`}
                item={item}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
