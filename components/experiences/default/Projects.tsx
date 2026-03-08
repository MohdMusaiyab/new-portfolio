"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/app/data/projects.json";

export default function DefaultProjects() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="projects"
      className="w-full bg-[#f1ede8] py-24 md:py-32 text-[#1c1917] font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#a8a29e]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
                Selected Works
              </span>
            </div>
            <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9]">
              Featured <br />
              <span className="font-light text-blue-600">projects.</span>
            </h3>
          </div>
          <p className="max-w-[38ch] text-[#57534e] text-sm leading-relaxed pb-2">
            Click any project to explore its details, tech stack, and links.
          </p>
        </motion.div>

        {}
        <div className="border-t border-[#e7e2db]">
          {projectsData.projects.map((project, idx) => {
            const isOpen = expandedIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(idx * 0.05, 0.2) }}
                className="border-b border-[#e7e2db]"
              >
                {}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center gap-4 md:gap-8 py-5 md:py-6 cursor-pointer group text-left"
                >
                  {}
                  <span className="text-[11px] font-mono text-[#a8a29e] w-6 shrink-0">
                    0{idx + 1}
                  </span>

                  {}
                  <span className="text-lg md:text-2xl font-bold tracking-tight grow group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </span>

                  {}
                  <span className="hidden md:flex gap-1.5 shrink-0">
                    {project.techStack.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#faf8f5] border border-[#e7e2db] text-[9px] font-bold text-[#a8a29e] uppercase tracking-widest rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </span>

                  {}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-8 h-8 rounded-full border border-[#e7e2db] grid place-items-center text-[#a8a29e] shrink-0 group-hover:border-blue-400 group-hover:text-blue-500 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </motion.span>
                </button>

                {}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-10 md:pl-14 flex flex-col lg:flex-row gap-6 lg:gap-10">
                        {}
                        <div className="relative w-full lg:w-[320px] aspect-video rounded-xl overflow-hidden bg-[#faf8f5] border border-[#e7e2db] shrink-0">
                          {project.images?.[0] ? (
                            <Image
                              src={project.images[0]}
                              alt={`${project.name} screenshot`}
                              fill
                              sizes="(max-width:1024px) 100vw, 320px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 grid place-items-center text-[#a8a29e] font-mono text-xs">
                              No preview
                            </div>
                          )}
                        </div>

                        {}
                        <div className="flex flex-col justify-between grow">
                          <p className="text-[#57534e] text-sm leading-[1.7] mb-6 max-w-[55ch]">
                            {project.description}
                          </p>

                          {}
                          <div className="flex flex-col gap-2 mb-6">
                            {project.keyPoints.slice(0, 2).map((kp, kIdx) => (
                              <p
                                key={kIdx}
                                className="text-xs text-[#78716c] leading-[1.6] pl-3 border-l-2 border-[#e7e2db]"
                              >
                                {kp}
                              </p>
                            ))}
                          </div>

                          {}
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex flex-wrap gap-1.5">
                              {project.techStack.map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2.5 py-1 bg-white border border-[#e7e2db] text-[10px] font-bold text-[#78716c] uppercase tracking-widest rounded-md"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-2 ml-auto">
                              {project.githubRepo && (
                                <a
                                  href={project.githubRepo}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-4 py-2 rounded-lg bg-[#1c1917] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#292524] transition-colors flex items-center gap-1.5"
                                >
                                  <svg
                                    width="12"
                                    height="12"
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
                              {project.liveSite && (
                                <a
                                  href={project.liveSite}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                                >
                                  <svg
                                    width="12"
                                    height="12"
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
