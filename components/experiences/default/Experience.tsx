"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import experienceData from "@/app/data/experience.json";

export default function DefaultExperience() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="experience"
      className="w-full bg-white py-20 md:py-32 font-sans border-t border-slate-100"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-slate-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
              Professional History
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-none text-slate-900">
            Work{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #0f172a 0%, #64748b 45%, #0f172a 100%)",
                backgroundSize: "200% auto",
                animation: "shine 4s linear infinite",
              }}
            >
              experience.
            </span>
          </h2>
          <style>{`@keyframes shine { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }`}</style>
        </motion.div>

        {/* ── Accordion list ── */}
        <div className="flex flex-col divide-y divide-slate-100">
          {experienceData.experience.map((exp, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* ── Row header (always visible) ── */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-3 md:gap-6 py-5 md:py-6 cursor-pointer group text-left px-2 sm:px-4"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Company logo */}
                    <div className="relative w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center group-hover:border-slate-400 transition-colors duration-200">
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          fill
                          priority={idx === 0}
                          fetchPriority={idx === 0 ? "high" : "auto"}
                          sizes="40px"
                          className="object-contain p-1.5"
                        />
                      ) : (
                        <span className="text-sm font-black text-slate-300">
                          {exp.company.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Company + role */}
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-[14px] md:text-[15px] font-bold text-slate-900 group-hover:text-slate-700 transition-colors leading-tight">
                        {exp.company}
                      </p>
                      <p className="text-[11px] md:text-xs text-slate-400 font-medium mt-0.5">
                        {exp.position} <br className="sm:hidden" />
                        <span className="hidden sm:inline">· </span>
                        {exp.duration.start} — {exp.duration.end}
                      </p>
                    </div>
                  </div>

                  {/* Location + chevron */}
                  <div className="flex items-center gap-3 md:gap-4 shrink-0">
                    <div className="hidden md:flex items-center mr-2">
                      <span className="text-[11px] font-medium text-slate-400">
                        {exp.location}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center shrink-0 transition-all duration-300
                        ${isOpen ? "bg-slate-900 border-slate-900 rotate-180" : "bg-white group-hover:border-slate-400"}`}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isOpen ? "white" : "#94a3b8"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* ── Expanded detail ── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 md:pb-8 pt-2 pl-2 sm:pl-[68px] md:pl-[76px] pr-2 sm:pr-12">
                        {/* Highlights */}
                        <div className="mb-6">
                          <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-slate-400 mb-4">
                            Key Contributions
                          </p>
                          <ul className="flex flex-col gap-3">
                            {exp.highlights.map((h, hIdx) => (
                              <li key={hIdx} className="flex gap-3 group/item">
                                <span className="text-[10px] font-mono font-bold text-slate-300 group-hover/item:text-slate-900 transition-colors mt-[3px] shrink-0">
                                  {String(hIdx + 1).padStart(2, "0")}
                                </span>
                                <p className="text-sm text-slate-500 leading-relaxed group-hover/item:text-slate-700 transition-colors">
                                  {h}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills */}
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-slate-400 mb-3">
                            Core Stack
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600
                                  hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
