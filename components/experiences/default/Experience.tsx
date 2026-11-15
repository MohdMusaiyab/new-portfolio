"use client";

/**
 * Work Experience Section (Default / Light Theme)
 *
 * Aesthetic:
 *   - Tactile neo-craft dossier inspired directly by the Hero section's design language.
 *   - Dark-green ink borders (#2b3a2f), low roundedness (rounded-md), hard offset shadows.
 *   - Hero-matched titlebars: Foliage Green (#a8d672) for active role, Sun Yellow (#ffd23f) for prior role.
 *   - Choreography:
 *     - Staggered physical card drop-in with calibrated spring physics.
 *     - Tactile hover lift and shadow deepening.
 *     - Smooth, non-janky accordion disclosure.
 *     - Hero-inspired plank chips for verified technologies.
 *   - Production-grade accessibility with full prefers-reduced-motion compliance.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import experienceData from "@/app/data/experience.json";
import { Briefcase, ChevronDown, MapPin } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiFramer,
  SiJira,
} from "react-icons/si";
import {
  FaJava,
  FaDatabase,
  FaAws,
  FaServer,
  FaDiagramProject,
  FaGitAlt,
  FaNetworkWired,
  FaCode,
} from "react-icons/fa6";

const INK = "#2b3a2f";
const EASE = [0.16, 1, 0.3, 1] as const;

/* Palette matching the Hero banner world */
const BANNER_COLORS = [
  "#ffd23f", // Sun Yellow
  "#4fb3d9", // River Blue
  "#a8d672", // Foliage Green
  "#ff9aa2", // Blossom Coral
  "#f4a259", // Warm Peach
  "#c77dff", // Lavender
  "#bfe8f2", // Fresh Mint
  "#80e3b6", // Emerald Mint
];

/* Authentic vector brand icons for experience skill tags */
const EXP_ICON_MAP: Record<string, IconType> = {
  "Core Java": FaJava,
  "SQL": FaDatabase,
  "Cloud": FaAws,
  "Debugging": FaCode,
  "Production Support": FaServer,
  "Agile": FaDiagramProject,
  "Problem Solving": FaCode,
  "System Design": FaDiagramProject,
  "TypeScript": SiTypescript,
  "React.js": SiReact,
  "Redux Toolkit": SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
  "REST APIs": FaNetworkWired,
  "Performance Opt": FaCode,
  "Git": FaGitAlt,
  "Jira": SiJira,
};

export default function DefaultExperience() {
  const reduce = useReducedMotion();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  /* Smooth decelerated card entrance */
  const cardVariant: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: reduce ? 0 : i * 0.1,
        ease: EASE,
      },
    }),
  };

  return (
    <section
      id="experience"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fafc] border-t border-[#2b3a2f]/10"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-[#2b3a2f]/15">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-md border-2 bg-white text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f]"
              style={{ borderColor: INK }}
            >
              <Briefcase size={14} className="stroke-[2.2]" />
            </span>
            <h2 className="text-sm font-mono uppercase tracking-[0.18em] font-bold text-[#2b3a2f]">
              Experience
            </h2>
          </div>
        </div>

        {/* Experience Cards List */}
        <div className="space-y-4 sm:space-y-5">
          {experienceData.experience.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;
            const isPresent = exp.duration.end.toLowerCase() === "present";
            const headerColor = isPresent ? "#a8d672" : "#ffd23f";

            return (
              <motion.article
                key={idx}
                custom={idx}
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className={`group rounded-md border-2 bg-white text-[#2b3a2f] overflow-hidden transition-all duration-200 ${
                  isExpanded
                    ? "shadow-[4px_4px_0_0_#2b3a2f]"
                    : "shadow-[2.5px_2.5px_0_0_#2b3a2f] hover:shadow-[4px_4px_0_0_#2b3a2f] hover:-translate-y-0.5"
                }`}
                style={{ borderColor: INK }}
              >
                {/* Hero-matched Titlebar */}
                <div
                  className="border-b px-3.5 sm:px-4 py-2 flex items-center justify-between select-none"
                  style={{ borderColor: `${INK}20`, backgroundColor: headerColor }}
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2b3a2f]">
                    {exp.company}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#2b3a2f] tabular-nums">
                    {exp.duration.start} — {exp.duration.end}
                  </span>
                </div>

                {/* Main Interactive Header Row */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer select-none transition-colors hover:bg-[#2b3a2f]/[0.02]"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Logo in tactile ink box */}
                    <div
                      className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-md border bg-white shrink-0 overflow-hidden flex items-center justify-center p-1.5 shadow-[1px_1px_0_0_#2b3a2f] transition-transform duration-150 group-hover:scale-105"
                      style={{ borderColor: INK }}
                    >
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={36}
                          height={36}
                          className="object-contain"
                        />
                      ) : (
                        <span className="font-mono text-base font-bold text-[#2b3a2f]">
                          {exp.company.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Role Title, Company & Location */}
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#2b3a2f] tracking-tight">
                        {exp.position}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-medium text-[#2b3a2f]/70 flex items-center gap-1.5 mt-0.5">
                        <span className="font-semibold text-[#2b3a2f]">
                          {exp.company}
                        </span>
                        <span className="text-[#2b3a2f]/40">•</span>
                        <span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs">
                          <MapPin size={11} className="shrink-0 text-[#2b3a2f]/60" />
                          {exp.location}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Expand / Collapse Indicator */}
                  <div className="flex items-center shrink-0 pl-3">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md border flex items-center justify-center transition-all duration-200 shadow-[1px_1px_0_0_#2b3a2f] ${
                        isExpanded
                          ? "rotate-180 bg-[#2b3a2f] text-white shadow-[1.5px_1.5px_0_0_#2b3a2f]"
                          : "bg-white text-[#2b3a2f] hover:bg-[#ffd23f]"
                      }`}
                      style={{ borderColor: INK }}
                    >
                      <ChevronDown size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Details Drawer */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                      className="overflow-hidden border-t"
                      style={{ borderColor: `${INK}20` }}
                    >
                      <div className="p-4 sm:p-5 bg-white sm:pl-16">
                        {/* Bullet Highlights with enlargement micro-interaction */}
                        <ul className="space-y-3 mb-5">
                          {exp.highlights.map((point, pIdx) => (
                            <li
                              key={pIdx}
                              className="group/item flex items-start gap-3 text-sm sm:text-[15px] leading-relaxed text-[#2b3a2f]/80 font-normal origin-left transition-all duration-150 hover:scale-[1.015] hover:translate-x-1 hover:text-[#2b3a2f]"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-[1px] border bg-[#ffd23f] shadow-[1px_1px_0_0_#2b3a2f] mt-2 shrink-0 transition-transform duration-150 group-hover/item:scale-125"
                                style={{ borderColor: INK }}
                                aria-hidden
                              />
                              <span className="transition-colors duration-150">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Technology Plank Chips */}
                        <div className="pt-4 border-t" style={{ borderColor: `${INK}15` }}>
                          <div className="flex flex-wrap items-center gap-2">
                            {exp.skills.map((skill, sIdx) => {
                              const SkillIcon = EXP_ICON_MAP[skill];

                              return (
                                <motion.span
                                  key={sIdx}
                                  whileHover={reduce ? {} : { y: -2, scale: 1.03 }}
                                  whileTap={reduce ? {} : { scale: 0.97 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 450,
                                    damping: 20,
                                  }}
                                  className="group/skill inline-flex items-center gap-1.5 rounded-md border bg-white px-2.5 py-1 text-xs font-mono font-bold text-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all cursor-default select-none"
                                  style={{ borderColor: INK }}
                                >
                                  <span
                                    aria-hidden
                                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border text-[#2b3a2f] transition-transform duration-150 group-hover/skill:scale-110"
                                    style={{
                                      borderColor: INK,
                                      background:
                                        BANNER_COLORS[sIdx % BANNER_COLORS.length],
                                    }}
                                  >
                                    {SkillIcon && (
                                      <SkillIcon className="h-2.5 w-2.5" />
                                    )}
                                  </span>
                                  <span>{skill}</span>
                                </motion.span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
