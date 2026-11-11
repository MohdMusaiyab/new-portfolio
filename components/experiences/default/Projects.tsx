"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import projectsData from "@/app/data/projects.json";
import { FolderGit2, ArrowUpRight, Play, Github } from "lucide-react";

const INK = "#2b3a2f";

export default function DefaultProjects() {
  return (
    <section id="projects" className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-white border-t border-[#2b3a2f]/10">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#2b3a2f]/15">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-md border-2 bg-white text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f]"
              style={{ borderColor: INK }}
            >
              <FolderGit2 size={14} className="stroke-[2.2]" />
            </span>
            <h2 className="text-sm font-mono uppercase tracking-[0.18em] font-bold text-[#2b3a2f]">
              Featured Projects
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#2b3a2f]/50">
            {projectsData.projects.length} Works
          </span>
        </div>

        {/* Projects Cards Grid: Image-First Compact Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {projectsData.projects.map((project, idx) => {
            const hasVideo = "videoDemo" in project && Boolean(project.videoDemo);
            const previewImage = project.images?.[0] || null;

            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.25) }}
                className="group relative rounded-md border-2 bg-white text-[#2b3a2f] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f]"
                style={{ borderColor: INK }}
              >
                <div>
                  {/* Project Screenshot / Thumbnail Preview */}
                  <div
                    className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#2b3a2f]/5 border-b-2"
                    style={{ borderColor: INK }}
                  >
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt={`${project.name} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[#2b3a2f]/40 uppercase tracking-widest">
                        System Architecture
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    {/* Header Row: Title & Action Pills */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <h3 className="text-sm sm:text-base font-bold text-[#2b3a2f] tracking-tight leading-snug">
                        {project.name}
                      </h3>

                      {/* Direct Action Links */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {project.githubRepo && (
                          <a
                            href={project.githubRepo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.name} GitHub Repository`}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-mono font-bold text-[#2b3a2f] bg-white hover:bg-[#ffd23f] hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all"
                            style={{ borderColor: INK }}
                          >
                            <Github size={11} className="stroke-[2.2]" />
                            <span>Code</span>
                          </a>
                        )}

                        {project.liveSite && (
                          <a
                            href={project.liveSite}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.name} Live Site`}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-mono font-bold text-[#2b3a2f] bg-[#a8d672]/30 hover:bg-[#a8d672] hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all"
                            style={{ borderColor: INK }}
                          >
                            <span>Live</span>
                            <ArrowUpRight size={11} className="stroke-[2.5]" />
                          </a>
                        )}

                        {hasVideo && (
                          <a
                            href={project.videoDemo as string}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.name} Video Demo`}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] font-mono font-bold text-[#2b3a2f] bg-[#4fb3d9]/25 hover:bg-[#4fb3d9] hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all"
                            style={{ borderColor: INK }}
                          >
                            <Play size={9} className="fill-[#2b3a2f]" />
                            <span>Demo</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Concise 1-sentence synopsis (no elaborate walls of text) */}
                    <p className="text-xs sm:text-[13px] leading-relaxed text-[#2b3a2f]/75 font-medium line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Footer */}
                <div
                  className="px-4 py-3 sm:px-5 bg-[#faf8f5]/60 border-t flex flex-wrap items-center gap-1.5"
                  style={{ borderColor: `${INK}15` }}
                >
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white text-[#2b3a2f] border shadow-[1px_1px_0_0_#2b3a2f] hover:bg-[#ffd23f] hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all duration-150 cursor-default select-none"
                      style={{ borderColor: INK }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
