"use client";

/**
 * Skills Section (Default / Light Theme)
 * 
 * Aesthetic:
 *   - Unified Dossier Sheet: Single high-density, framed technical blueprint
 *     replacing repetitive boxy cards with clean domain rows.
 *   - Dark-green ink (#2b3a2f), low roundedness (rounded-md), hard offset shadows.
 *   - Full Mobile Responsiveness: Clean stacked headers on small screens, seamless wrapping,
 *     and touch-friendly interactive targets.
 *   - Authentic Brand Glyphs: Official vector brand icons mapped for every skill.
 *   - Tactile Micro-Interactions: Spring physics, micro-tilts, and river banner pastel floods.
 */

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

/* Palette matching the cartoon builder river banner */
const BANNER_COLORS = [
  "#ffd23f", // Sun Yellow
  "#4fb3d9", // River Blue
  "#a8d672", // Foliage Green
  "#ff9aa2", // Blossom Coral
  "#f4a259", // Warm Peach
  "#c77dff", // Lavender
  "#bfe8f2", // Fresh Mint
];

/* Icon map associating every skill with its authentic vector brand glyph */
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

/* Semantic domain icons for category rows */
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

type SkillBadgeProps = {
  name: string;
  colorIndex: number;
};

function SkillBadge({ name, colorIndex }: SkillBadgeProps) {
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = SKILL_ICON_MAP[name];
  const color = BANNER_COLORS[colorIndex % BANNER_COLORS.length];
  // Alternating micro-tilts (-2.5 to 2.5 degrees) for the tactile plank aesthetic
  const tilt = ((colorIndex % 5) - 2) * 1.25;

  return (
    <motion.div
      whileHover={
        reduce
          ? {}
          : {
              y: -3,
              scale: 1.04,
              rotate: tilt,
            }
      }
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 16 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md border text-[11px] sm:text-xs font-mono font-bold transition-all duration-150 cursor-pointer sm:cursor-default select-none shadow-[1.5px_1.5px_0_0_#2b3a2f]"
      style={{
        borderColor: INK,
        backgroundColor: isHovered ? color : "#ffffff",
        color: INK,
        boxShadow: isHovered
          ? "2.5px 2.5px 0 0 #2b3a2f"
          : "1.5px 1.5px 0 0 #2b3a2f",
      }}
    >
      {IconComponent && (
        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
      )}
      <span className="whitespace-nowrap tracking-tight">{name}</span>
    </motion.div>
  );
}

export default function DefaultSkills() {
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
              Skills
            </h2>
          </div>
        </div>

        {/* Unified Dossier Sheet: Single framed container replacing heavy separate cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className="rounded-md border-2 bg-white text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f] overflow-hidden"
          style={{ borderColor: INK }}
        >
          {/* Categorized Domain Rows inside the Single Sheet */}
          <div className="divide-y divide-[#2b3a2f]/10">
            {skillsData.skills.map((category, cIdx) => {
              const CatIcon = CATEGORY_ICON_MAP[category.name] || Wrench;

              return (
                <div
                  key={cIdx}
                  className="p-3.5 sm:p-5 flex flex-col md:flex-row md:items-start gap-3 sm:gap-4 lg:gap-6 transition-colors duration-150 hover:bg-[#ffd23f]/[0.06]"
                >
                  {/* Domain Header Row: Left sidebar on desktop, top bar on mobile */}
                  <div className="flex items-center gap-2 shrink-0 md:w-44 lg:w-48 pt-0.5">
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded border bg-white text-[#2b3a2f] shrink-0 shadow-[1px_1px_0_0_#2b3a2f] group-hover:scale-105 transition-transform"
                      style={{ borderColor: INK }}
                    >
                      <CatIcon size={12} className="stroke-[2.2]" />
                    </span>
                    <h3 className="text-xs sm:text-[12px] font-bold font-mono text-[#2b3a2f] tracking-tight uppercase truncate">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skills Badges: Full-width wrapping grid on mobile, inline flow on desktop */}
                  <div className="flex-1 flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
                    {category.skills.map((skill, sIdx) => {
                      const globalIndex = cIdx * 5 + sIdx;
                      return (
                        <SkillBadge
                          key={sIdx}
                          name={skill.name}
                          colorIndex={globalIndex}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
