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
    <section id="skills" className="w-full py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
              Technical Capabilities
            </h2>
            <p className="mt-1 text-sm text-zinc-500 font-sans">
              Tooling, languages, and systems architecture competencies.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {skillsData.skills.length} Domains
          </span>
        </div>

        <div className="mt-8 space-y-6">
          {skillsData.skills.map((categoryGroup, idx) => {
            const CategoryIcon = CATEGORY_ICON_MAP[categoryGroup.name] || Code2;

            return (
              <motion.div
                key={categoryGroup.name}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-5 sm:p-6 rounded-2xl border border-zinc-200/80 bg-zinc-50/40 hover:bg-zinc-50/80 transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-3.5">
                  <div className="p-1.5 rounded-md border border-zinc-200 bg-white text-zinc-700">
                    <CategoryIcon size={14} />
                  </div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
                    {categoryGroup.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categoryGroup.skills.map((skillItem) => {
                    const skillName = skillItem.name;
                    const IconComponent = SKILL_ICON_MAP[skillName] || FaCode;

                    return (
                      <span
                        key={skillName}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-mono font-medium text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 transition-all duration-150 shadow-2xs select-none"
                      >
                        <IconComponent className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>{skillName}</span>
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
