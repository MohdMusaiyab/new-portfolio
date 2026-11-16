"use client";

/**
 * Featured Projects Section (Default / Light Theme)
 *
 * Clean, uncluttered design showcasing work in our cartoon builder banner vibe:
 *   - River Palette Titlebars: Each project carries a themed banner titlebar (#4fb3d9, #a8d672, #ffd23f, #ff9aa2, etc.).
 *   - Hover-Only Screenshot Carousel: Screenshots remain calm and static by default, cycling smoothly only when the user hovers over that project.
 *   - Clickable & Hoverable Titlebar Link: Direct access to live deployments.
 *   - Uncluttered & Spacious: Clear typography, concise synopsis, and tactile tech chips.
 *   - Full prefers-reduced-motion support.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import projectsData from "@/app/data/projects.json";
import { FolderGit2, ArrowUpRight, Play, Github, ChevronDown, ChevronUp } from "lucide-react";

const INK = "#2b3a2f";
const INITIAL_COUNT = 4;

/* River banner palette matching Hero & Experience */
const BANNER_COLORS = [
  "#4fb3d9", // River Blue (Distributed Notification Engine)
  "#a8d672", // Foliage Green (Infybite)
  "#ffd23f", // Sun Yellow (Bails on Fire)
  "#ff9aa2", // Blossom Coral (NearH)
  "#c77dff", // Lavender (Hey Imposter)
  "#f4a259", // Warm Peach (Mess-Bazaar)
];

type ProjectItem = (typeof projectsData.projects)[number];

function getProjectHostSlug(project: ProjectItem) {
  if (project.liveSite) {
    try {
      const url = new URL(project.liveSite);
      return url.hostname.replace("www.", "");
    } catch {
      // fallback
    }
  }
  return `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.app`;
}

function ProjectCard({ project, idx }: { project: ProjectItem; idx: number }) {
  const reduce = useReducedMotion();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = project.images || [];
  const currentImage = images[activeImageIdx] || images[0] || null;
  const hasVideo = "videoDemo" in project && Boolean(project.videoDemo);
  const hostSlug = getProjectHostSlug(project);
  const destinationUrl = project.liveSite || project.githubRepo || "#";
  const titlebarColor = BANNER_COLORS[idx % BANNER_COLORS.length];

  /* Auto-rotate screenshots ONLY when hovered on this project */
  useEffect(() => {
    if (!isHovered || images.length <= 1 || reduce) return;

    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % images.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [isHovered, images.length, reduce]);

  return (
    <motion.article
      layout={reduce ? false : "position"}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.2) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIdx(0);
      }}
      className="group relative rounded-md border-2 bg-white text-[#2b3a2f] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#2b3a2f] shadow-[2.5px_2.5px_0_0_#2b3a2f]"
      style={{ borderColor: INK }}
    >
      <div>
        {/* Themed Viewport Titlebar matching Hero / Experience banner palette */}
        <div
          className="flex items-center justify-between px-3 py-2 border-b select-none"
          style={{ borderColor: `${INK}20`, backgroundColor: titlebarColor }}
        >
          {/* Window Dots */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full border border-[#2b3a2f]/30 bg-white transition-transform group-hover:scale-110" />
            <span className="w-2.5 h-2.5 rounded-full border border-[#2b3a2f]/30 bg-white transition-transform group-hover:scale-110" />
            <span className="w-2.5 h-2.5 rounded-full border border-[#2b3a2f]/30 bg-white transition-transform group-hover:scale-110" />
          </div>

          {/* Clickable & Hoverable System Host Link */}
          <a
            href={destinationUrl}
            target="_blank"
            rel="noreferrer"
            title={`Open ${project.name}`}
            className="px-2.5 py-0.5 rounded border border-[#2b3a2f]/30 bg-white max-w-[140px] sm:max-w-[220px] truncate text-[10px] font-mono font-medium text-[#2b3a2f]/80 shadow-[0.5px_0.5px_0_0_#2b3a2f] transition-all duration-150 hover:border-[#2b3a2f] hover:bg-[#2b3a2f] hover:text-white hover:shadow-[1.5px_1.5px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer inline-flex items-center gap-1"
          >
            <span className="truncate">{hostSlug}</span>
            <ArrowUpRight size={10} className="shrink-0 stroke-[2.2]" />
          </a>

          {/* Screenshot Pagination Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            {images.length > 1 ? (
              images.map((_, imgIdx) => {
                const isActive = activeImageIdx === imgIdx;
                return (
                  <button
                    key={imgIdx}
                    type="button"
                    onClick={() => setActiveImageIdx(imgIdx)}
                    aria-label={`Switch to screenshot ${imgIdx + 1}`}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[#2b3a2f] text-white border-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f]"
                        : "bg-white text-[#2b3a2f]/70 border-[#2b3a2f]/25 hover:border-[#2b3a2f] hover:bg-white shadow-[0.5px_0.5px_0_0_#2b3a2f]"
                    }`}
                  >
                    0{imgIdx + 1}
                  </button>
                );
              })
            ) : (
              <span className="text-[9px] font-mono text-[#2b3a2f]/70 font-semibold px-1">
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* Screenshot Viewport */}
        <div
          className="relative w-full h-44 sm:h-52 bg-[#f8fafc] p-2.5 sm:p-3 flex items-center justify-center overflow-hidden border-b"
          style={{ borderColor: `${INK}15` }}
        >
          {currentImage ? (
            <div
              className="relative w-full h-full rounded-[3px] overflow-hidden border bg-white shadow-[1px_1px_0_0_#2b3a2f]/10 cursor-pointer group-hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all"
              style={{ borderColor: `${INK}25` }}
              onClick={() => {
                if (images.length > 1) {
                  setActiveImageIdx((prev) => (prev + 1) % images.length);
                }
              }}
              title={images.length > 1 ? "Click to view next screenshot" : undefined}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentImage}
                    alt={`${project.name} preview ${activeImageIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center font-mono text-xs text-[#2b3a2f]/40 uppercase tracking-widest border border-dashed rounded"
              style={{ borderColor: `${INK}20` }}
            >
              System Architecture
            </div>
          )}
        </div>

        {/* Card Body: Title, Action Links & Clean Synopsis */}
        <div className="p-4 sm:p-5">
          {/* Header Row: Title & Action Links */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <h3 className="text-base sm:text-lg font-bold text-[#2b3a2f] tracking-tight leading-snug">
              {project.name}
            </h3>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              {project.githubRepo && (
                <a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} GitHub Repository`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono font-bold text-[#2b3a2f] bg-white hover:bg-[#ffd23f] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-y-0 transition-all"
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono font-bold text-[#2b3a2f] bg-white hover:bg-[#a8d672] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-y-0 transition-all"
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono font-bold text-[#2b3a2f] bg-white hover:bg-[#4fb3d9] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  style={{ borderColor: INK }}
                >
                  <Play size={9} className="fill-[#2b3a2f]" />
                  <span>Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Clean Editorial Synopsis */}
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#2b3a2f]/80 font-normal">
            {project.description}
          </p>
        </div>
      </div>

      {/* Tech Stack Footer */}
      <div
        className="px-4 py-3 sm:px-5 bg-white border-t flex flex-wrap items-center gap-1.5"
        style={{ borderColor: `${INK}15` }}
      >
        {project.techStack.map((tech, tIdx) => (
          <span
            key={tIdx}
            className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white text-[#2b3a2f] border shadow-[0.5px_0.5px_0_0_#2b3a2f] hover:border-[#2b3a2f] hover:bg-[#ffd23f]/25 transition-all duration-150 cursor-default select-none"
            style={{ borderColor: `${INK}30` }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function DefaultProjects() {
  const [showAll, setShowAll] = useState(false);
  const totalProjects = projectsData.projects.length;
  const displayedProjects = showAll
    ? projectsData.projects
    : projectsData.projects.slice(0, INITIAL_COUNT);

  return (
    <section
      id="projects"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fafc] border-t border-[#2b3a2f]/10"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-[#2b3a2f]/15">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-md border-2 bg-white text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f]"
              style={{ borderColor: INK }}
            >
              <FolderGit2 size={14} className="stroke-[2.2]" />
            </span>
            <h2 className="text-sm font-mono uppercase tracking-[0.18em] font-bold text-[#2b3a2f]">
              Projects
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#2b3a2f]/60 font-semibold">
            {showAll ? `All ${totalProjects} shown` : `Showing 4 of ${totalProjects}`}
          </span>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <AnimatePresence>
            {displayedProjects.map((project, idx) => (
              <ProjectCard key={project.name} project={project} idx={idx} />
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Show Fewer Button */}
        {totalProjects > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border-2 font-mono text-xs font-bold text-[#2b3a2f] bg-[#ffd23f] shadow-[2px_2px_0_0_#2b3a2f] hover:shadow-[3.5px_3.5px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none"
              style={{ borderColor: INK }}
            >
              <span>
                {showAll
                  ? "Show fewer projects"
                  : `Show more projects (${totalProjects - INITIAL_COUNT} more)`}
              </span>
              {showAll ? (
                <ChevronUp size={14} className="stroke-[2.5]" />
              ) : (
                <ChevronDown size={14} className="stroke-[2.5]" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
