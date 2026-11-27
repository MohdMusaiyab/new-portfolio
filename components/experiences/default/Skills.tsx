"use client";

import { motion, useReducedMotion } from "framer-motion";
import skillsData from "@/app/data/skills.json";
import {
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

interface SkillItemMeta {
  icon: IconType;
  color: string;
}

const SKILL_META: Record<string, SkillItemMeta> = {
  // Programming Languages
  "Go (Golang)": { icon: SiGo, color: "#00ADD8" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "JavaScript": { icon: SiJavascript, color: "#D97706" }, // Warm deep amber/gold for crisp contrast on light background
  "C++": { icon: SiCplusplus, color: "#00599C" },
  "SQL": { icon: FaDatabase, color: "#336791" },

  // Backend Development
  "Gin Gonic": { icon: SiGin, color: "#00ADD8" },
  "Node.js": { icon: FaNodeJs, color: "#5FA04E" },
  "Express.js": { icon: SiExpress, color: "#18181B" },
  "WebSockets": { icon: SiSocketdotio, color: "#0A0A0A" },
  "RESTful APIs": { icon: FaNetworkWired, color: "#0284C7" },

  // Databases & ORM
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "MongoDB": { icon: SiMongodb, color: "#13AA52" },
  "MySQL": { icon: SiMysql, color: "#00758F" },
  "GORM": { icon: SiGo, color: "#00ADD8" },
  "Prisma ORM": { icon: SiPrisma, color: "#2D3748" },

  // DevOps & Tools
  "Docker": { icon: SiDocker, color: "#2496ED" },
  "AWS S3": { icon: FaAws, color: "#FF9900" },
  "Git / GitHub Actions": { icon: FaGitAlt, color: "#F05032" },
  "Postman": { icon: SiPostman, color: "#FF6C37" },
  "Linux / Bash": { icon: SiLinux, color: "#CA8A04" },

  // Frontend Development
  "React.js": { icon: SiReact, color: "#087EA4" },
  "React.JS": { icon: SiReact, color: "#087EA4" },
  "Next.js": { icon: SiNextdotjs, color: "#09090B" },
  "Redux Toolkit": { icon: SiRedux, color: "#764ABC" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },

  // Architecture & Core
  "System Design": { icon: FaDiagramProject, color: "#6366F1" },
  "RBAC Security": { icon: FaShieldHalved, color: "#10B981" },
  "Multi-tenant Architecture": { icon: FaServer, color: "#8B5CF6" },
  "DSA": { icon: FaCode, color: "#EC4899" },
};

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  "Programming Languages": "Languages",
  "Backend Development": "Backend",
  "Databases and ORM": "Databases & ORM",
  "DevOps and Tools": "DevOps & Cloud",
  "Frontend Development": "Frontend",
  "Core Competencies": "Architecture",
};

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

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="w-full py-10 sm:py-14 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-zinc-100">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
            Skills
          </h2>
        </div>

        {/* Clean Horizontally Stacked Rows */}
        <div className="mt-6 divide-y divide-zinc-100 border-b border-zinc-100">
          {skillsData.skills.map((categoryGroup, idx) => {
            const CategoryIcon = CATEGORY_ICON_MAP[categoryGroup.name] || Code2;
            const displayName =
              CATEGORY_DISPLAY_NAMES[categoryGroup.name] || categoryGroup.name;

            return (
              <motion.div
                key={categoryGroup.name}
                initial={reduce ? undefined : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="py-3.5 sm:py-4.5 first:pt-0 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 group"
              >
                {/* Horizontal Category Title with Icon */}
                <div className="w-full sm:w-44 sm:shrink-0 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md border border-zinc-200/80 bg-zinc-50 text-zinc-600 shadow-2xs group-hover:border-zinc-300 group-hover:text-zinc-950 transition-colors">
                    <CategoryIcon size={14} />
                  </div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-600 group-hover:text-zinc-950 transition-colors">
                    {displayName}
                  </span>
                </div>

                {/* Horizontal Skill Pills Row */}
                <div className="flex-1 flex flex-wrap gap-2 items-center">
                  {categoryGroup.skills.map((skillItem) => {
                    const skillName = skillItem.name;
                    const meta = SKILL_META[skillName] || {
                      icon: FaCode,
                      color: "#71717A",
                    };
                    const IconComponent = meta.icon;

                    return (
                      <span
                        key={skillName}
                        className="group/skill relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200/90 bg-white text-xs font-mono font-medium text-zinc-800 transition-all duration-200 shadow-2xs hover:border-zinc-300 hover:bg-zinc-50/70 hover:shadow-xs hover:-translate-y-0.5 cursor-default select-none"
                      >
                        <span
                          className="inline-flex items-center justify-center transition-transform duration-200 ease-out group-hover/skill:scale-125 group-hover/skill:-rotate-6"
                          style={{ color: meta.color }}
                        >
                          <IconComponent className="w-3.5 h-3.5 shrink-0" />
                        </span>
                        <span className="group-hover/skill:text-zinc-950 transition-colors">
                          {skillName}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
