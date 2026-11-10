"use client";

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
  FaJava,
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

/* Palette matching the cartoon builder banner */
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
  "Java": FaJava,
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
  "React.JS": SiReact,
  "Next.js": SiNextdotjs,
  "Redux Toolkit": SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "System Design": FaDiagramProject,
  "RBAC Security": FaShieldHalved,
  "Multi-tenant Architecture": FaServer,
  "DSA": FaCode,
};

/* Category headers with semantic Lucide glyphs */
const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
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
  // Subtle alternating tilts (-2.5 to 2.5 degrees) for organic plank feel
  const tilt = ((colorIndex % 5) - 2) * 1.25;

  return (
    <motion.div
      whileHover={
        reduce
          ? {}
          : {
              y: -4,
              scale: 1.05,
              rotate: tilt,
            }
      }
      whileTap={{ scale: 0.95, y: -1 }}
      transition={{ type: "spring", stiffness: 450, damping: 16 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-md border-2 text-xs font-mono font-bold transition-all duration-200 cursor-default select-none shadow-[2px_2px_0_0_#2b3a2f]"
      style={{
        borderColor: INK,
        backgroundColor: isHovered ? color : "#ffffff",
        color: INK,
        boxShadow: isHovered
          ? "3px 3px 0 0 #2b3a2f"
          : "1.5px 1.5px 0 0 #2b3a2f",
      }}
    >
      {IconComponent && (
        <IconComponent
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-115 group-hover:rotate-6"
        />
      )}
      <span className="whitespace-nowrap tracking-tight">{name}</span>
    </motion.div>
  );
}

export default function DefaultSkills() {
  const totalSkillsCount = skillsData.skills.reduce(
    (acc, cat) => acc + cat.skills.length,
    0,
  );

  return (
    <section
      id="skills"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#fdfbf7] border-t border-[#2b3a2f]/10"
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
              Skills &amp; Capabilities
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#2b3a2f]/60 font-medium">
            {totalSkillsCount} Verified Technologies
          </span>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.skills.map((category, cIdx) => {
            const CatIcon = CATEGORY_ICON_MAP[category.name] || Wrench;

            return (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: cIdx * 0.05 }}
                className="rounded-md border-2 bg-white p-4 sm:p-5 text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f] hover:shadow-[3px_3px_0_0_#2b3a2f] transition-all duration-200 flex flex-col justify-between"
                style={{ borderColor: INK }}
              >
                <div>
                  {/* Card Header with Icon, Category Title & Count Badge */}
                  <div
                    className="flex items-center justify-between gap-2 mb-4 pb-2.5 border-b"
                    style={{ borderColor: `${INK}15` }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <CatIcon size={14} className="text-[#2b3a2f]/70 shrink-0 stroke-[2.2]" />
                      <h3 className="text-xs font-bold text-[#2b3a2f] font-mono tracking-tight uppercase truncate">
                        {category.name}
                      </h3>
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border text-[#2b3a2f]/70 bg-[#faf8f5] shrink-0"
                      style={{ borderColor: `${INK}20` }}
                    >
                      {category.skills.length}
                    </span>
                  </div>

                  {/* Skills Interactive Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.skills.map((skill, sIdx) => {
                      const globalIndex = cIdx * 6 + sIdx;
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
