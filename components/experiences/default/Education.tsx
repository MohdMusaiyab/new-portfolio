"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import educationData from "@/app/data/education.json";
import { ChevronDown, GraduationCap } from "lucide-react";

export default function DefaultEducation() {
  const reduce = useReducedMotion();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const sorted = [...educationData.education].reverse();

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="education" className="w-full py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
              Education & Academic Background
            </h2>
            <p className="mt-1 text-sm text-zinc-500 font-sans">
              Foundational computer science, systems engineering, and research.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {sorted.length} Institutions
          </span>
        </div>

        <div className="mt-8 space-y-4">
          {sorted.map((edu, idx) => {
            const isExpanded = expandedIndex === idx;

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
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none rounded-2xl"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl border border-zinc-200 bg-zinc-50 shrink-0 overflow-hidden flex items-center justify-center p-2">
                      {edu.logo ? (
                        <Image
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      ) : (
                        <GraduationCap size={20} className="text-zinc-600" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-semibold text-zinc-950 tracking-tight">
                          {edu.degree}
                        </h3>
                        {edu.score && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200/60">
                            {edu.score}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mt-1 font-mono">
                        <span className="font-medium text-zinc-800">{edu.institution}</span>
                        <span>•</span>
                        <span className="text-zinc-600 tabular-nums">
                          {edu.startYear} — {edu.endYear}
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

                <AnimatePresence initial={false}>
                  {isExpanded && edu.highlights && edu.highlights.length > 0 && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-zinc-100"
                    >
                      <div className="p-5 sm:p-6 pt-4 bg-zinc-50/40">
                        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                          Coursework & Achievements
                        </h4>
                        <ul className="space-y-2">
                          {edu.highlights.map((h, hIdx) => (
                            <li
                              key={hIdx}
                              className="text-sm text-zinc-700 flex items-start gap-2.5 leading-relaxed"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
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
