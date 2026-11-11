"use client";

/**
 * Work Experience Section (Default / Light Theme)
 * 
 * Aesthetic:
 *   - Editorial dossier with line-art styling matching the cartoon builder river banner.
 *   - Dark-green ink (#2b3a2f), low roundedness (rounded-md), hard offset shadows.
 *   - Clean progressive disclosure: scannable company, role, duration, and status by default.
 *   - Interactive accordion expands to reveal detailed systems accomplishments and verified skills.
 *   - Fully mobile-responsive with comfortable touch targets and no text cramping.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import experienceData from "@/app/data/experience.json";
import { Briefcase, ChevronDown, MapPin, CheckCircle2, Wrench } from "lucide-react";
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

  return (
    <section
      id="experience"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-white border-t border-[#2b3a2f]/10"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#2b3a2f]/15">
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
          <span className="text-[11px] font-mono text-[#2b3a2f]/60 font-medium tabular-nums">
            2025 — Present
          </span>
        </div>

        {/* Compressed Experience Accordion List */}
        <div className="space-y-3.5">
          {experienceData.experience.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;
            const isPresent = exp.duration.end.toLowerCase() === "present";

            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className={`group rounded-md border-2 bg-white text-[#2b3a2f] transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "shadow-[3px_3px_0_0_#2b3a2f]"
                    : "hover:shadow-[3px_3px_0_0_#2b3a2f] hover:-translate-y-0.5 shadow-[1.5px_1.5px_0_0_#2b3a2f]"
                }`}
                style={{ borderColor: INK }}
              >
                {/* Clickable Header Row: Logo, Company Name, Role, Meta & Toggle */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer select-none transition-colors hover:bg-[#2b3a2f]/[0.02]"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Logo Box with Hard Ink Border */}
                    <div
                      className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-md border bg-white shrink-0 overflow-hidden flex items-center justify-center p-1.5 shadow-[1px_1px_0_0_#2b3a2f]"
                      style={{ borderColor: INK }}
                    >
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        <span className="font-mono text-sm font-bold text-[#2b3a2f]">
                          {exp.company.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Company Name, Position & Active Status Badge */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-[#2b3a2f] tracking-tight">
                          {exp.company}
                        </h3>
                        {isPresent && (
                          <span
                            className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-[#a8d672]/30 text-[#2b3a2f] border shadow-[1px_1px_0_0_#2b3a2f]"
                            style={{ borderColor: INK }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2b3a2f]" />
                            Present
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-[13px] font-medium text-[#2b3a2f]/70 truncate mt-0.5">
                        {exp.position}
                      </p>
                    </div>
                  </div>

                  {/* Right Meta: Duration, Location & Interactive Chevron */}
                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 pl-3">
                    <div className="flex flex-col items-end text-right font-mono text-[11px] sm:text-xs">
                      <span className="font-bold text-[#2b3a2f] tabular-nums">
                        {exp.duration.start} — {exp.duration.end}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-[#2b3a2f]/55 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} className="shrink-0 text-[#2b3a2f]/50" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Expand/Collapse Chevron Indicator */}
                    <div
                      className={`w-7 h-7 rounded-md border flex items-center justify-center transition-transform duration-200 shadow-[1px_1px_0_0_#2b3a2f] ${
                        isExpanded
                          ? "rotate-180 bg-[#ffd23f] text-[#2b3a2f]"
                          : "bg-white text-[#2b3a2f]/70 group-hover:text-[#2b3a2f]"
                      }`}
                      style={{ borderColor: INK }}
                    >
                      <ChevronDown size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Details Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t"
                      style={{ borderColor: `${INK}20` }}
                    >
                      <div className="p-4 sm:p-5 bg-[#faf8f5]/60 sm:pl-16">
                        {/* Highlights Header */}
                        <div className="flex items-center gap-1.5 mb-2.5">
                          <CheckCircle2 size={12} className="text-[#2b3a2f]/60 stroke-[2.2]" />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#2b3a2f]/60 font-bold">
                            Highlights
                          </span>
                        </div>

                        {/* Bullet Highlights with Custom Square Markers */}
                        <ul className="space-y-2 mb-4">
                          {exp.highlights.map((point, pIdx) => (
                            <li
                              key={pIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed text-[#2b3a2f]/85 font-normal"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-[1px] bg-[#2b3a2f]/40 mt-1.5 shrink-0"
                                aria-hidden
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech & Competency Badges with Authentic Vector Icons */}
                        <div className="pt-3 border-t border-[#2b3a2f]/10">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Wrench size={11} className="text-[#2b3a2f]/60 stroke-[2.2]" />
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#2b3a2f]/50 font-semibold">
                              Technologies
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            {exp.skills.map((skill, sIdx) => {
                              const SkillIcon = EXP_ICON_MAP[skill];

                              return (
                                <motion.span
                                  key={sIdx}
                                  whileHover={reduce ? {} : { y: -2, scale: 1.04 }}
                                  whileTap={{ scale: 0.96 }}
                                  transition={{ type: "spring", stiffness: 450, damping: 16 }}
                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white text-[#2b3a2f] border shadow-[1px_1px_0_0_#2b3a2f] hover:bg-[#ffd23f] hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all duration-150 cursor-default select-none"
                                  style={{ borderColor: INK }}
                                >
                                  {SkillIcon && (
                                    <SkillIcon className="w-3 h-3 shrink-0" />
                                  )}
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
