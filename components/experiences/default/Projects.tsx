"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/app/data/projects.json";
import SkillNode from "@/components/ui/SkillNode";

export default function DefaultProjects() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#fdfbf7] py-20 md:py-[clamp(2.5rem,8vh,8rem)] px-6 sm:px-12 lg:px-16 text-[#1c1917] font-sans overflow-hidden selection:bg-[#0d9488] selection:text-[#fdfbf7]"
    >
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-[15%] bottom-0 w-px bg-[#0d9488]/10" />
        <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[#0d9488]/[0.03] md:bg-[#0d9488]/5 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-10 md:w-12 h-px bg-[#0d9488]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d9488]">
                Selected Works
              </span>
            </div>
            <h3 className="text-[clamp(1.75rem,min(5vw,8vh),6rem)] font-black uppercase tracking-tighter leading-[0.85] text-[#1c1917]">
              Featured <br />
              <span className="text-[#0d9488] md:text-transparent md:bg-clip-text md:bg-linear-to-r md:from-[#0d9488] md:to-[#042f2e]">
                Projects.
              </span>
            </h3>
          </div>
          <p className="max-w-[38ch] text-[#57534e] text-sm md:text-base lg:text-lg font-light leading-relaxed pb-2">
            Click any project to explore its structural details, tech stack, and
            live deployments.
          </p>
        </motion.div>

        {/* Projects Accordion List */}
        <div className="border-t-2 border-[#1c1917]">
          {projectsData.projects.map((project, idx) => {
            const isOpen = expandedIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: Math.min(idx * 0.1, 0.4),
                  ease: "easeOut",
                }}
                className="border-b border-[#0d9488]/20 group/row"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-3 md:gap-4 py-3 md:py-[clamp(0.75rem,2vh,2rem)] cursor-pointer group text-left relative overflow-hidden"
                >
                  {/* Subtle hover background highlight */}
                  <div className="absolute inset-0 bg-[#0d9488]/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1] z-0" />

                  <div className="relative z-10 flex items-center gap-4 md:gap-12 grow">
                    <span className="text-[10px] md:text-sm font-bold font-mono text-[#0d9488]/60 w-6 md:w-8 shrink-0 tracking-widest">
                      0{idx + 1}
                    </span>
                    <span className="text-xl md:text-[clamp(1.25rem,min(3vw,4vh),3rem)] font-extrabold tracking-tight text-[#1c1917] group-hover:text-[#0d9488] transition-colors duration-300">
                      {project.name}
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center gap-4 md:gap-6 shrink-0">
                    {/* Tech Stack Preview pills */}
                    <span className="hidden lg:flex gap-2">
                      {project.techStack.slice(0, 3).map((t, i) => (
                        <SkillNode key={i} name={t} small delay={idx * 0.1 + i * 0.02} />
                      ))}
                    </span>

                    {/* Animated Cross/Plus icon */}
                    <motion.span
                      animate={{
                        rotate: isOpen ? 135 : 0,
                        backgroundColor: isOpen ? "#0d9488" : "transparent",
                        color: isOpen ? "#fdfbf7" : "#1c1917",
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-none border border-[#0d9488]/30 grid place-items-center shrink-0 group-hover:border-[#0d9488] transition-colors"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </motion.span>
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden bg-white/40 backdrop-blur-sm"
                    >
                      <div className="pt-2 pb-10 px-0 sm:px-4 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
                        {/* Project Image - Fully visible, mobile optimized */}
                        <div className="relative w-full lg:w-[45%] h-[200px] sm:h-[240px] md:h-[320px] rounded-none overflow-hidden bg-[#fdfbf7] border border-[#0d9488]/20 shrink-0 shadow-[0_10px_30px_-15px_rgba(13,148,136,0.15)] group/img">
                          {project.images?.[0] ? (
                            <Image
                              src={project.images[0]}
                              alt={`${project.name} screenshot`}
                              fill
                              sizes="(max-width:1024px) 100vw, 500px"
                              className="object-cover group-hover/img:scale-105 group-hover/img:rotate-1 transition-transform duration-700 ease-[0.19,1,0.22,1]"
                            />
                          ) : (
                            <div className="absolute inset-0 grid place-items-center text-[#a8a29e] font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">
                              Index // Blank
                            </div>
                          )}
                        </div>

                        {/* Project Details */}
                        <div className="flex flex-col justify-between grow py-2 px-2 sm:px-0">
                          <div className="mb-6 md:mb-8">
                            <ul className="space-y-2 md:space-y-3">
                              {project.keyPoints.map((point, pIdx) => (
                                <motion.li
                                  key={pIdx}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.1 + pIdx * 0.05 }}
                                  whileHover={{ x: 5, color: "#1c1917" }}
                                  className="group/point flex gap-3 text-sm md:text-base text-[#57534e] font-normal leading-relaxed transition-all duration-300"
                                >
                                  <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#0d9488]/30 group-hover/point:bg-[#0d9488] transition-colors" />
                                  <span>{point}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 md:gap-8 pt-6 border-t border-[#0d9488]/10">
                            {/* Skills / Tech Stack */}
                            <div className="flex flex-wrap gap-2 max-w-full xl:max-w-[60%]">
                              {project.techStack.map((tech, tIdx) => (
                                <SkillNode
                                  key={tIdx}
                                  name={tech}
                                  small={true}
                                  delay={idx * 0.1 + tIdx * 0.02}
                                />
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 mt-2 xl:mt-0">
                              {project.githubRepo && (
                                <a
                                  href={project.githubRepo}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex-1 sm:flex-none justify-center px-4 md:px-5 py-3 rounded-none border border-[#e7e5e4] bg-white text-[#1c1917] hover:border-[#1c1917] text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-1 shadow-sm flex items-center gap-2"
                                >
                                  <svg
                                    width="14"
                                    height="14"
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
                                  className="group flex-1 sm:flex-none justify-center relative overflow-hidden px-4 md:px-5 py-3 rounded-none bg-[#0d9488] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-1 shadow-[0_8px_20px_-8px_rgba(13,148,136,0.6)] flex items-center gap-2"
                                >
                                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                                  <span className="relative z-10 flex items-center gap-2">
                                    <svg
                                      width="14"
                                      height="14"
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
                                  </span>
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
