"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import projectsData from "@/app/data/projects.json";
import { ArrowUpRight, Play, Github, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

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
  return `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.dev`;
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

  useEffect(() => {
    if (!isHovered || images.length <= 1 || reduce) return;

    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % images.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [isHovered, images.length, reduce]);

  return (
    <motion.article
      layout={reduce ? false : "position"}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.06, 0.2) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIdx(0);
      }}
      className="group relative rounded-2xl border border-zinc-200/80 bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-zinc-300 hover:shadow-md"
    >
      <div>
        {/* Minimal Browser Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50/80 border-b border-zinc-100 select-none">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
          </div>

          <a
            href={destinationUrl}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-0.5 rounded-md border border-zinc-200 bg-white text-[11px] font-mono text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 transition-colors inline-flex items-center gap-1 max-w-[200px] truncate"
          >
            <span className="truncate">{hostSlug}</span>
            <ArrowUpRight size={11} className="shrink-0 text-zinc-400" />
          </a>

          <div className="flex items-center gap-1 shrink-0">
            {images.length > 1 ? (
              images.map((_, imgIdx) => {
                const isActive = activeImageIdx === imgIdx;
                return (
                  <button
                    key={imgIdx}
                    type="button"
                    onClick={() => setActiveImageIdx(imgIdx)}
                    aria-label={`Show preview ${imgIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      isActive ? "w-4 bg-zinc-800" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                    }`}
                  />
                );
              })
            ) : (
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                PROD
              </span>
            )}
          </div>
        </div>

        {/* Media Preview Viewport */}
        <div className="relative w-full h-48 sm:h-56 bg-zinc-100/50 p-2 sm:p-3 overflow-hidden border-b border-zinc-100 flex items-center justify-center">
          {currentImage ? (
            <div
              className="relative w-full h-full rounded-lg overflow-hidden border border-zinc-200/60 bg-white cursor-pointer"
              onClick={() => {
                if (images.length > 1) {
                  setActiveImageIdx((prev) => (prev + 1) % images.length);
                }
              }}
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
                    alt={`${project.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-400 uppercase tracking-widest border border-dashed border-zinc-200 rounded-lg">
              Architecture Schematic
            </div>
          )}
        </div>

        {/* Project Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-950 font-sans group-hover:text-zinc-900 transition-colors">
              {project.name}
            </h3>
            <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Key Architectural Points */}
          {project.keyPoints && project.keyPoints.length > 0 && (
            <ul className="space-y-1.5 pt-1">
              {project.keyPoints.slice(0, 3).map((point, kIdx) => (
                <li
                  key={kIdx}
                  className="text-xs text-zinc-600 flex items-start gap-2 leading-relaxed"
                >
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-400 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Stack Chips */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-zinc-100/80 text-zinc-700 border border-zinc-200/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between gap-3 bg-zinc-50/30">
        <div className="flex items-center gap-2">
          {project.liveSite && (
            <a
              href={project.liveSite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
            >
              <span>Visit App</span>
              <ArrowUpRight size={13} />
            </a>
          )}

          {project.githubRepo && (
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-colors"
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
            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <Play size={12} className="fill-current" />
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
    <section id="projects" className="w-full py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
              Featured Systems & Projects
            </h2>
            <p className="mt-1 text-sm text-zinc-500 font-sans">
              Distributed services, real-time protocols, and full-stack software products.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {totalProjects} Systems Built
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <span>Show Fewer Systems</span>
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
