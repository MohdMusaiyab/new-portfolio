"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import projectsData from "@/app/data/projects.json";
import {
  ArrowUpRight,
  Github,
  Play,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const INITIAL_COUNT = 4;
type ProjectItem = (typeof projectsData.projects)[number];

/* Atmospheric backdrops placed behind project mockups that reveal on hover */
const PROJECT_BACKDROPS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80", // Fluid abstract architectural curves
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80", // Clean 3D geometric landscape
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80", // Minimal tech hardware gradient
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80", // Soft atmospheric color mesh
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", // Coastal horizon
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80", // Code & matrix flow
];

function ProjectCard({ project, idx }: { project: ProjectItem; idx: number }) {
  const reduce = useReducedMotion();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = project.images || [];
  const currentImage = images[activeImageIdx] || images[0] || null;
  const hasVideo = "videoDemo" in project && Boolean(project.videoDemo);
  const primaryUrl = project.liveSite || project.githubRepo || "#";
  const backdropUrl = PROJECT_BACKDROPS[idx % PROJECT_BACKDROPS.length];

  return (
    <motion.article
      layout={reduce ? undefined : "position"}
      initial={reduce ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.2) }}
      className="group relative rounded-2xl border border-zinc-200/80 bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-zinc-300 hover:shadow-xs"
    >
      <div>
        {/* Visual Preview Frame with Layered Emerging Image Backdrop */}
        <div className="relative w-full h-52 sm:h-56 bg-zinc-50/80 overflow-hidden border-b border-zinc-100 flex items-center justify-center p-3 sm:p-4">
          {/* Emerging Image Backdrop (reveals from behind on hover, stays z-0) */}
          <div
            className="absolute inset-1.5 sm:inset-2 rounded-xl overflow-hidden pointer-events-none transition-all duration-500 ease-out transform scale-95 opacity-25 group-hover:scale-100 group-hover:opacity-90 z-0 border border-zinc-200/50"
            aria-hidden="true"
          >
            <Image
              src={backdropUrl}
              alt="Project backdrop decoration"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-center filter brightness-[0.96] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Soft luminous wash over the backdrop */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] transition-opacity duration-300 group-hover:bg-white/15" />
          </div>

          {/* Foreground Project Screenshot Mockup (Sits on top at z-10) */}
          {currentImage ? (
            <div
              className="relative z-10 w-[88%] h-[84%] rounded-lg overflow-hidden border border-zinc-200/90 bg-white shadow-xs transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-md cursor-pointer"
              onClick={() => {
                if (images.length > 1) {
                  setActiveImageIdx((prev) => (prev + 1) % images.length);
                }
              }}
              title={
                images.length > 1 ? "Click to view next preview" : undefined
              }
            >
              <Image
                src={currentImage}
                alt={`${project.name} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="relative z-10 w-[88%] h-[84%] rounded-lg border border-dashed border-zinc-300 bg-white flex items-center justify-center font-mono text-xs text-zinc-400">
              System Architecture
            </div>
          )}
        </div>

        {/* Compact Content: Title, One-Liner, and Skills */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="group/title inline-flex items-center gap-1.5 text-base sm:text-lg font-semibold tracking-tight text-zinc-950 hover:text-zinc-700 transition-colors"
            >
              <span>{project.name}</span>
              <ArrowUpRight
                size={15}
                className="text-zinc-400 group-hover/title:text-zinc-950 transition-colors"
              />
            </a>
          </div>

          <p className="text-sm text-zinc-600 leading-relaxed font-sans">
            {project.description}
          </p>

          {/* Clean Tech Skill Chips */}
          <div className="pt-1 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Clean Actions (No redundancy) */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between gap-3 bg-zinc-50/20 text-xs font-mono">
        <div className="flex items-center gap-3">
          {project.liveSite && (
            <a
              href={project.liveSite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-zinc-800 hover:text-zinc-950 transition-colors"
            >
              <span>Visit</span>
              <ArrowUpRight size={12} className="text-zinc-400" />
            </a>
          )}

          {project.githubRepo && (
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              <Github size={13} />
              <span>Source</span>
            </a>
          )}
        </div>

        {hasVideo && (
          <a
            href={(project as any).videoDemo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            <Play size={11} className="fill-current" />
            <span>Demo</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const totalProjects = projectsData.projects.length;
  const displayedProjects = showAll
    ? projectsData.projects
    : projectsData.projects.slice(0, INITIAL_COUNT);

  return (
    <section
      id="projects"
      className="w-full py-10 sm:py-14 bg-white border-b border-zinc-100"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
              Projects
            </h2>
          </div>
        </div>

        <div className="mt-6 sm:mt-7 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <AnimatePresence>
            {displayedProjects.map((project, idx) => (
              <ProjectCard key={project.name} project={project} idx={idx} />
            ))}
          </AnimatePresence>
        </div>

        {totalProjects > INITIAL_COUNT && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs font-mono font-medium hover:border-zinc-400 hover:text-zinc-950 transition-all shadow-2xs cursor-pointer"
            >
              {showAll ? (
                <>
                  <span>Show Fewer Projects</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>View All {totalProjects} Projects</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
