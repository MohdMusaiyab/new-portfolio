"use client";

/**
 * Featured Projects Section (Default / Light Theme)
 * 
 * Aesthetic:
 *   - Software Viewport Shell: Presents project screenshots inside a sleek,
 *     editorial browser window frame with banner-palette window controls.
 *   - Pure White Background: Crisp white cards, high-contrast ink borders (#2b3a2f),
 *     and hard offset drop-shadows.
 *   - Progressive Disclosure: Shows the top flagship projects initially with a tactile
 *     "Show More" / "Show Fewer" control.
 *   - Interactive Multi-Screen Switcher: Lets viewers toggle between views (e.g.
 *     01: Product UI vs 02: Real-time Dashboard / Metrics).
 *   - Tactile Micro-Interactions: Spring physics, hover lifts, and physical shadows on every element.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import projectsData from "@/app/data/projects.json";
import { FolderGit2, ArrowUpRight, Play, Github, ChevronDown, ChevronUp } from "lucide-react";

const INK = "#2b3a2f";
const INITIAL_COUNT = 4;

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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const images = project.images || [];
  const currentImage = images[activeImageIdx] || images[0] || null;
  const hasVideo = "videoDemo" in project && Boolean(project.videoDemo);
  const hostSlug = getProjectHostSlug(project);

  return (
    <motion.article
      layout={reduce ? false : "position"}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.2) }}
      className="group relative rounded-md border-2 bg-white text-[#2b3a2f] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#2b3a2f] shadow-[1.5px_1.5px_0_0_#2b3a2f]"
      style={{ borderColor: INK }}
    >
      <div>
        {/* Engineered Viewport Titlebar */}
        <div
          className="flex items-center justify-between px-3 py-2 bg-white border-b select-none transition-colors group-hover:bg-[#2b3a2f]/[0.02]"
          style={{ borderColor: `${INK}20` }}
        >
          {/* Left: Window Dots (Blossom Coral, Sun Yellow, Foliage Green) */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden>
            <span
              className="w-2.5 h-2.5 rounded-full border transition-transform group-hover:scale-110"
              style={{ borderColor: INK, backgroundColor: "#ff9aa2" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full border transition-transform group-hover:scale-110"
              style={{ borderColor: INK, backgroundColor: "#ffd23f" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full border transition-transform group-hover:scale-110"
              style={{ borderColor: INK, backgroundColor: "#a8d672" }}
            />
          </div>

          {/* Center: System Host / URL Slug */}
          <div
            className="px-2.5 py-0.5 rounded border bg-white max-w-[140px] sm:max-w-[220px] truncate text-[10px] font-mono text-[#2b3a2f]/70 shadow-[0.5px_0.5px_0_0_#2b3a2f]"
            style={{ borderColor: `${INK}30` }}
          >
            {hostSlug}
          </div>

          {/* Right: Multi-Screen Viewport Switcher */}
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
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#2b3a2f] text-white shadow-[1px_1px_0_0_#2b3a2f]"
                        : "bg-white text-[#2b3a2f]/60 hover:text-[#2b3a2f] hover:bg-[#ffd23f]/25 border"
                    }`}
                    style={isActive ? undefined : { borderColor: `${INK}30` }}
                  >
                    0{imgIdx + 1}
                  </button>
                );
              })
            ) : (
              <span className="text-[9px] font-mono text-[#2b3a2f]/40 font-semibold px-1">
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* Inset Canvas: Clean Framed Preview with Floating Shadow */}
        <div
          className="relative w-full h-44 sm:h-52 bg-white p-2.5 sm:p-3 flex items-center justify-center overflow-hidden border-b-2"
          style={{ borderColor: `${INK}20` }}
        >
          {currentImage ? (
            <div
              className={`relative w-full h-full rounded-[3px] overflow-hidden border bg-white shadow-[1.5px_1.5px_0_0_#2b3a2f] transition-all duration-300 ${
                reduce
                  ? ""
                  : "group-hover:shadow-[2.5px_2.5px_0_0_#2b3a2f]"
              }`}
              style={{ borderColor: `${INK}35` }}
            >
              <Image
                key={currentImage}
                src={currentImage}
                alt={`${project.name} interface view ${activeImageIdx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
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

        {/* Card Header & Content */}
        <div className="p-4 sm:p-5">
          {/* Header Row: Title & Action Pills */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#2b3a2f] tracking-tight leading-snug group-hover:text-[#2b3a2f] transition-colors">
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono font-bold text-[#2b3a2f] bg-white hover:bg-[#ffd23f] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono font-bold text-[#2b3a2f] bg-[#a8d672]/30 hover:bg-[#a8d672] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono font-bold text-[#2b3a2f] bg-[#4fb3d9]/25 hover:bg-[#4fb3d9] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  style={{ borderColor: INK }}
                >
                  <Play size={9} className="fill-[#2b3a2f]" />
                  <span>Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Concise Synopsis with tactile hover interaction */}
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#2b3a2f]/80 font-medium mb-2.5 transition-colors duration-200 hover:text-[#2b3a2f] group-hover:text-[#2b3a2f]">
            {project.description}
          </p>

          {/* Key Points Progressive Disclosure Toggle */}
          {project.keyPoints && project.keyPoints.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                aria-expanded={isDetailsOpen}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-semibold border transition-all duration-150 select-none cursor-pointer ${
                  isDetailsOpen
                    ? "bg-[#ffd23f] text-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f]"
                    : "bg-white text-[#2b3a2f]/70 hover:text-[#2b3a2f] hover:bg-[#ffd23f]/20 shadow-[1px_1px_0_0_#2b3a2f]"
                }`}
                style={{ borderColor: INK }}
              >
                <span>{isDetailsOpen ? "Hide details" : `Key points (${project.keyPoints.length})`}</span>
                <ChevronDown
                  size={12}
                  className={`stroke-[2.2] transition-transform duration-200 ${
                    isDetailsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isDetailsOpen && (
                  <motion.div
                    initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden mt-2.5 pt-2.5 border-t border-[#2b3a2f]/10"
                  >
                    <ul className="space-y-1.5">
                      {project.keyPoints.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="group/point flex items-start gap-2 text-[11px] sm:text-xs leading-relaxed text-[#2b3a2f]/75 font-normal transition-all duration-150 hover:text-[#2b3a2f] hover:translate-x-0.5"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-[1px] bg-[#2b3a2f]/40 group-hover/point:bg-[#ffd23f] group-hover/point:shadow-[1px_1px_0_0_#2b3a2f] mt-1 shrink-0 transition-all duration-150"
                            aria-hidden
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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
            className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white text-[#2b3a2f] border shadow-[1px_1px_0_0_#2b3a2f] hover:bg-[#ffd23f] hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all duration-150 cursor-default select-none"
            style={{ borderColor: INK }}
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
          <span className="text-[11px] font-mono text-[#2b3a2f]/60 font-semibold">
            {showAll ? `All ${totalProjects} shown` : `Showing 4 of ${totalProjects}`}
          </span>
        </div>

        {/* Projects Cards Grid: Viewport-Framed Design */}
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
