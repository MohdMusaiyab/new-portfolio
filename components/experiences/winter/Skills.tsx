"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SKILL_GROUPS = [
  {
    category: "Languages",
    num: "01",
    skills: ["Go (Golang)", "TypeScript", "JavaScript", "Java", "C++", "SQL"],
  },
  {
    category: "Backend",
    num: "02",
    skills: [
      "Gin Gonic",
      "Node.js",
      "Express.js",
      "WebSockets",
      "RESTful APIs",
    ],
  },
  {
    category: "Databases",
    num: "03",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "GORM", "Prisma ORM"],
  },
  {
    category: "DevOps & Tools",
    num: "04",
    skills: ["Docker", "AWS S3", "GitHub Actions", "Postman", "Linux / Bash"],
  },
  {
    category: "Frontend",
    num: "05",
    skills: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS"],
  },
  {
    category: "Architecture",
    num: "06",
    skills: ["System Design", "RBAC Security", "Multi-tenant Arch", "DSA"],
  },
];

import SkillPill from "@/components/ui/SkillPill";

const WA = (a: number) => `rgba(255,255,255,${a})`;
const WHITE = "#ffffff";

function CategoryBlock({
  group,
  blockIndex,
}: {
  group: (typeof SKILL_GROUPS)[0];
  blockIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: blockIndex * 0.06,
      }}
      className="flex flex-col gap-5"
    >
      {}
      <div className="flex items-center gap-4">
        <span
          className="font-dm-mono text-[9px] tracking-[0.35em] uppercase"
          style={{ color: WA(0.3) }}
        >
          {group.num}
        </span>
        <div className="h-px flex-1" style={{ background: WA(0.08) }} />
        <h3
          className="font-cinzel font-bold text-sm tracking-widest uppercase"
          style={{ color: WA(0.9), letterSpacing: "0.18em" }}
        >
          {group.category}
        </h3>
      </div>

      {}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, si) => (
          <SkillPill
            key={skill}
            name={skill}
            delay={inView ? blockIndex * 0.05 + si * 0.04 : 0}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`

      `}</style>

      <section
        id="skills"
        className="relative w-full overflow-hidden py-28 md:py-40"
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
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <p
                className="font-dm-mono text-[10px] tracking-[0.45em] uppercase mb-5"
                style={{ color: WA(0.4) }}
              >
                Capabilities
              </p>
              <h2
                className="font-cinzel font-black leading-none"
                style={{
                  fontSize: "clamp(48px, 8vw, 108px)",
                  color: WHITE,
                  letterSpacing: "0.02em",
                  textShadow: "0 8px 40px rgba(255,255,255,0.08)",
                }}
              >
                Skills
              </h2>
            </div>
            <p
              className="font-dm-mono text-[11px] tracking-widest max-w-[200px] md:text-right leading-relaxed"
              style={{ color: WA(0.28) }}
            >
              {SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0)} skills
              across {SKILL_GROUPS.length} domains.
            </p>
          </motion.div>

          {}
          <div
            className="w-full h-px mb-16 md:mb-20"
            style={{ background: WA(0.07) }}
          />

          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-14 md:gap-16">
            {SKILL_GROUPS.map((group, i) => (
              <CategoryBlock
                key={group.category}
                group={group}
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
