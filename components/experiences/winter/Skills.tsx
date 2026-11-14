"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import skillsData from "@/app/data/skills.json";
import SkillPill from "@/components/ui/SkillPill";

const WA = (a: number) => `rgba(255,255,255,${a})`;
const WHITE = "#ffffff";

function CategoryBlock({
  category,
  blockIndex,
}: {
  category: (typeof skillsData.skills)[0];
  blockIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const num = String(blockIndex + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: blockIndex * 0.05,
      }}
      className="flex flex-col gap-4 md:gap-5 group/category"
    >
      <div className="flex items-center gap-4">
        <span
          className="font-dm-mono text-[9px] tracking-[0.35em] uppercase"
          style={{ color: WA(0.3) }}
        >
          {num}
        </span>
        <div className="h-px flex-1" style={{ background: WA(0.08) }} />
        <h3
          className="font-cinzel font-bold text-sm tracking-widest uppercase transition-all duration-300 group-hover/category:text-white group-hover/category:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          style={{ color: WA(0.9), letterSpacing: "0.18em" }}
        >
          {category.name}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, si) => (
          <SkillPill
            key={skill.name}
            name={skill.name}
            delay={inView ? blockIndex * 0.05 + si * 0.04 : 0}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: false, margin: "-80px" });

  return (
    <>
      <style>{`

      `}</style>

      <section
        id="skills"
        className="relative w-full overflow-hidden py-10 md:py-24"
        style={{ background: "#0a0a0a" }}
      >
        <div
          className="absolute right-[-10%] top-[20%] w-[45%] h-[60%] pointer-events-none blur-[130px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 65%)",
          }}
        />
        <div className="grain-overlay" aria-hidden="true" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
          {}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 md:pb-8"
          >
            <div>
              <h2
                className="font-cinzel font-black leading-none"
                style={{
                  fontSize: "clamp(34px, 7vw, 84px)",
                  color: WHITE,
                  letterSpacing: "0.02em",
                  textShadow: "0 8px 40px rgba(255,255,255,0.08)",
                }}
              >
                Skills
              </h2>
            </div>
          </motion.div>

          {}
          <div
            className="w-full h-px mb-10 md:mb-20"
            style={{ background: WA(0.07) }}
          />

          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-16">
            {skillsData.skills.map((category, i) => (
              <CategoryBlock
                key={category.name}
                category={category}
                blockIndex={i}
              />
            ))}
          </div>

          {}
          <div
            className="w-full h-px mt-24"
            style={{
              background: `linear-gradient(to right, transparent, ${WA(0.1)} 50%, transparent)`,
            }}
          />
        </div>
      </section>
    </>
  );
}
