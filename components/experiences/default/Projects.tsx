"use client";

import { motion } from "framer-motion";
import projectsData from "@/app/data/projects.json";
import { FolderGit2, ArrowUpRight, Play, Github } from "lucide-react";

export default function DefaultProjects() {
  return (
    <section id="projects" className="w-full py-12 sm:py-16 px-5 sm:px-8 border-b border-stone-200/80">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <FolderGit2 size={14} className="text-stone-400" />
            <h2 className="text-xs font-dm-mono uppercase tracking-[0.2em] font-semibold text-stone-900">
              Selected Projects
            </h2>
          </div>
          <span className="text-[11px] font-dm-mono text-stone-400">
            {projectsData.projects.length} Works
          </span>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projectsData.projects.map((project, idx) => {
            const hasVideo = "videoDemo" in project && Boolean(project.videoDemo);

            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.3) }}
                className="group p-4 sm:p-5 rounded-lg border border-stone-200/80 bg-white/70 hover:bg-white hover:border-stone-300 transition-all shadow-2xs hover:shadow-xs"
              >
                {/* Header: Project Name & Direct Actions */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-sm sm:text-[15px] font-semibold text-stone-900 tracking-tight">
                    {project.name}
                  </h3>

                  {/* Action Badges */}
                  <div className="flex items-center gap-2 shrink-0">
                    {project.githubRepo && (
                      <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-dm-mono text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-colors"
                      >
                        <Github size={11} />
                        <span>Code</span>
                      </a>
                    )}

                    {project.liveSite && (
                      <a
                        href={project.liveSite}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-dm-mono text-stone-800 hover:text-stone-950 font-medium hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-colors"
                      >
                        <span>Live</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}

                    {hasVideo && (
                      <a
                        href={project.videoDemo as string}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-dm-mono text-stone-900 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 font-medium transition-colors"
                      >
                        <Play size={9} className="fill-stone-900" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] leading-relaxed text-stone-600 mb-3 font-normal">
                  {project.description}
                </p>

                {/* Key Architecture Bullet Points */}
                <ul className="space-y-1 mb-3.5 pl-3 border-l border-stone-200">
                  {project.keyPoints.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      className="text-[12px] leading-relaxed text-stone-500 font-normal"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-dm-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200/60"
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
