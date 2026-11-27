"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import experienceData from "@/app/data/experience.json";
import { ChevronDown, MapPin, Briefcase } from "lucide-react";
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

export default function Experience() {
  const reduce = useReducedMotion();
  // First item open by default for rich content discovery
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="experience" className="w-full py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
              Work Experience
            </h2>
            <p className="mt-1 text-sm text-zinc-500 font-sans">
              Engineering impact across enterprise environments and dynamic startup teams.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {experienceData.experience.length} Positions
          </span>
        </div>

        <div className="mt-8 space-y-4">
          {experienceData.experience.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;
            const isPresent = exp.duration.end.toLowerCase() === "present";

            return (
              <motion.article
                key={idx}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`group rounded-2xl border transition-all duration-200 bg-white ${
                  isExpanded
                    ? "border-zinc-300 shadow-sm ring-1 ring-zinc-950/5"
                    : "border-zinc-200/80 hover:border-zinc-300 hover:shadow-2xs"
                }`}
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none transition-colors rounded-2xl"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl border border-zinc-200 bg-zinc-50 shrink-0 overflow-hidden flex items-center justify-center p-2">
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      ) : (
                        <span className="font-mono text-base font-bold text-zinc-800">
                          {exp.company.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-semibold text-zinc-950 tracking-tight">
                          {exp.position}
                        </h3>
                        {isPresent && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Current
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mt-1 font-mono">
                        <span className="font-medium text-zinc-800">{exp.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-zinc-400" />
                          {exp.location}
                        </span>
                        <span>•</span>
                        <span className="text-zinc-600 tabular-nums">
                          {exp.duration.start} — {exp.duration.end}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex items-center gap-2 shrink-0">
                    <div
                      className={`p-2 rounded-lg border border-zinc-200 text-zinc-400 group-hover:text-zinc-950 group-hover:border-zinc-300 transition-all duration-200 ${
                        isExpanded ? "rotate-180 bg-zinc-50" : "bg-white"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-zinc-100"
                    >
                      <div className="p-5 sm:p-6 pt-4 space-y-5 bg-zinc-50/40">
                        {/* Key Highlights */}
                        <div>
                          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                            Key Accomplishments & Systems Built
                          </h4>
                          <ul className="space-y-2.5">
                            {exp.highlights.map((item, hIdx) => (
                              <li
                                key={hIdx}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Verified Technologies */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="pt-4 border-t border-zinc-200/60">
                            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                              Technologies & Tools Applied
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.skills.map((skill, sIdx) => {
                                const Icon = EXP_ICON_MAP[skill] || FaCode;
                                return (
                                  <span
                                    key={sIdx}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white text-zinc-700 border border-zinc-200/80 shadow-2xs"
                                  >
                                    <Icon className="w-3.5 h-3.5 text-zinc-500" />
                                    <span>{skill}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
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
