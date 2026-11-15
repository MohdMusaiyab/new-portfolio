"use client";

/**
 * Skills Section (Default / Light Theme)
 *
 * Aesthetic:
 *   - Clean modular dossier grid matching Hero, Experience & Education.
 *   - Hero-matched category titlebars with disciplined river banner accents.
 *   - Authentic vector brand icons with uniform, calm chip styling.
 *   - No color overload or disorienting tilts; high scannability and clear hierarchy.
 *   - Accessible entrance animations with prefers-reduced-motion support.
 */

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import skillsData from "@/app/data/skills.json";
import {
  Wrench,
  Code2,
  Server,
  Database,
  Boxes,
  Layout,
  Cpu,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiGo,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiPrisma,
  SiDocker,
  SiPostman,
  SiLinux,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiExpress,
  SiGin,
  SiSocketdotio,
} from "react-icons/si";
import {
  FaNodeJs,
  FaAws,
  FaGitAlt,
  FaDatabase,
  FaShieldHalved,
  FaServer,
  FaDiagramProject,
  FaCode,
  FaNetworkWired,
} from "react-icons/fa6";

const INK = "#2b3a2f";
const EASE = [0.16, 1, 0.3, 1] as const;

/* Calm, hero-coordinated palette for category headers */
const CATEGORY_COLORS: Record<string, string> = {
  "Programming Languages": "#ffd23f", // Sun Yellow
  "Backend Development": "#a8d672",   // Foliage Green
  "Frontend Development": "#4fb3d9",  // River Blue
  "Databases and ORM": "#c77dff",     // Lavender
  "DevOps and Tools": "#f4a259",      // Warm Peach
  "Core Competencies": "#ff9aa2",     // Blossom Coral
};

/* Authentic vector brand glyphs */
const SKILL_ICON_MAP: Record<string, IconType> = {
  "Go (Golang)": SiGo,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "C++": SiCplusplus,
  "SQL": FaDatabase,
  "Gin Gonic": SiGin,
  "Node.js": FaNodeJs,
  "Express.js": SiExpress,
  "WebSockets": SiSocketdotio,
  "RESTful APIs": FaNetworkWired,
  "PostgreSQL": SiPostgresql,
  "MongoDB": SiMongodb,
  "MySQL": SiMysql,
  "GORM": SiGo,
  "Prisma ORM": SiPrisma,
  "Docker": SiDocker,
  "AWS S3": FaAws,
  "Git / GitHub Actions": FaGitAlt,
  "Postman": SiPostman,
  "Linux / Bash": SiLinux,
  "React.js": SiReact,
  "React.JS": SiReact,
  "Next.js": SiNextdotjs,
  "Redux Toolkit": SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "System Design": FaDiagramProject,
  "RBAC Security": FaShieldHalved,
  "Multi-tenant Architecture": FaServer,
  "DSA": FaCode,
};

/* Semantic category icons */
const CATEGORY_ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  "Programming Languages": Code2,
  "Backend Development": Server,
  "Databases and ORM": Database,
  "DevOps and Tools": Boxes,
  "Frontend Development": Layout,
  "Core Competencies": Cpu,
};

export default function DefaultSkills() {
  const reduce = useReducedMotion();

  const cardVariant: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: reduce ? 0 : i * 0.08,
        ease: EASE,
      },
    }),
  };

  return (
    <section
      id="skills"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fafc] border-t border-[#2b3a2f]/10"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#2b3a2f]/15">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-md border-2 bg-white text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f]"
              style={{ borderColor: INK }}
            >
              <Wrench size={14} className="stroke-[2.2]" />
            </span>
            <h2 className="text-sm font-mono uppercase tracking-[0.18em] font-bold text-[#2b3a2f]">
              Skills &amp; Tech Stack
            </h2>
          </div>
        </div>

        {/* Clean, Modular Domain Grid: 2 rows of 3 on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {skillsData.skills.map((category, cIdx) => {
            const CatIcon = CATEGORY_ICON_MAP[category.name] || Wrench;
            const headerColor = CATEGORY_COLORS[category.name] || "#ffd23f";

            return (
              <motion.article
                key={cIdx}
                custom={cIdx}
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="group rounded-md border-2 bg-white text-[#2b3a2f] overflow-hidden shadow-[2.5px_2.5px_0_0_#2b3a2f] hover:shadow-[4px_4px_0_0_#2b3a2f] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                style={{ borderColor: INK }}
              >
                {/* Hero-matched Category Titlebar */}
                <div
                  className="border-b px-3.5 py-2 flex items-center justify-between select-none"
                  style={{ borderColor: `${INK}20`, backgroundColor: headerColor }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <CatIcon size={13} className="shrink-0 stroke-[2.2] text-[#2b3a2f]" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#2b3a2f] truncate">
                      {category.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#2b3a2f]/70 tabular-nums shrink-0 ml-2">
                    {category.skills.length}
                  </span>
                </div>

                {/* Clean, Uniform Skill Badges */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-wrap content-start gap-1.5 sm:gap-2">
                  {category.skills.map((skill, sIdx) => {
                    const IconComponent = SKILL_ICON_MAP[skill.name];

                    return (
                      <div
                        key={sIdx}
                        className="group/badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#2b3a2f]/20 bg-[#f8fafc] hover:bg-white hover:border-[#2b3a2f] text-[11px] sm:text-xs font-mono font-medium text-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 transition-all duration-150 select-none"
                      >
                        {IconComponent && (
                          <IconComponent className="w-3.5 h-3.5 shrink-0 transition-transform duration-150 group-hover/badge:scale-110 text-[#2b3a2f]" />
                        )}
                        <span className="whitespace-nowrap tracking-tight">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
