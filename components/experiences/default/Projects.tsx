"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/app/data/projects.json";

export default function DefaultProjects() {
  const [hovered, setHovered] = useState<number>(0);
  const active = projectsData.projects[hovered];

  return (
    <section
      id="projects"
      className="w-full bg-white py-20 md:py-28 font-sans border-t border-slate-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-slate-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                Selected Works
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-none text-slate-900">
              Featured{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #0f172a 0%, #64748b 45%, #0f172a 100%)",
                  backgroundSize: "200% auto",
                  animation: "shine 4s linear infinite",
                }}
              >
                projects.
              </span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-[30ch] leading-relaxed pb-1">
            Hover a project to explore its stack and details.
          </p>
        </motion.div>

        <style>{`@keyframes shine { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }`}</style>

        {/* ── Main grid: list left + preview right ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-8 md:mt-0">
          {/* LEFT: Numbered project list */}
          <div className="flex-1 flex flex-col w-full divide-y divide-slate-100 border-t border-slate-100">
            {projectsData.projects.map((project, idx) => {
              const isActive = hovered === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  onMouseEnter={() => setHovered(idx)}
                  className={`group relative flex items-center gap-5 py-5 cursor-default transition-all duration-300 ${
                    isActive ? "pl-4" : "pl-0"
                  }`}
                >
                  {/* Active indicator bar */}
                  <motion.div
                    layout
                    className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-slate-900" : "bg-transparent"
                    }`}
                  />

                  {/* Index number */}
                  <span
                    className={`text-[11px] font-mono font-bold w-6 shrink-0 transition-colors duration-200 ${
                      isActive ? "text-slate-900" : "text-slate-300"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Project name + description */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-base md:text-lg font-bold tracking-tight leading-tight transition-colors duration-200 ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-500 group-hover:text-slate-800"
                      }`}
                    >
                      {project.name}
                    </p>
                    <p
                      className={`text-xs mt-0.5 leading-relaxed transition-all duration-300 ${
                        isActive
                          ? "text-slate-500 max-h-10 opacity-100"
                          : "text-transparent max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tech badges (top 3) */}
                  <div className="hidden md:flex gap-1.5 shrink-0">
                    {project.techStack.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded border transition-all duration-300 ${
                          isActive
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-400 border-slate-200"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <span
                    className={`text-xs font-mono transition-all duration-200 ${
                      isActive
                        ? "opacity-100 text-slate-900 translate-x-0"
                        : "opacity-0 -translate-x-1"
                    }`}
                  >
                    →
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Preview panel (Hidden on small screens) */}
          <div className="hidden lg:block w-full lg:w-[380px] shrink-0 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_4px_28px_rgba(15,23,42,0.07)]"
              >
                {/* Project image */}
                <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
                  {active.images?.[0] ? (
                    <Image
                      src={active.images[0]}
                      alt={active.name}
                      fill
                      sizes="340px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-black text-slate-200">
                        {active.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Number watermark */}
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold text-white/60">
                    {String(hovered + 1).padStart(2, "0")} /{" "}
                    {projectsData.projects.length.toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {active.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {active.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {active.techStack.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-600 rounded-md
                          hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2">
                    {active.githubRepo && (
                      <a
                        href={active.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest
                          hover:bg-slate-700 transition-colors"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        Code
                      </a>
                    )}
                    {active.liveSite && (
                      <a
                        href={active.liveSite}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest
                          hover:border-slate-900 hover:bg-slate-50 transition-all"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
