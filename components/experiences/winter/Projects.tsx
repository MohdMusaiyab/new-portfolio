"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SkillPill from "@/components/ui/SkillPill";
import projectsData from "@/app/data/projects.json";

const DEEP_BLACK = "#050505";
const WHITE = "#ffffff";
const WA = (a: number) => `rgba(255,255,255,${a})`;
const MIST = "#888888";

type Project = (typeof projectsData.projects)[0];

// ─── Fix #5: useIsMobile via matchMedia — no synchronous setState in effect ──
// We initialise state lazily from a factory function (only runs client-side).
// The effect only subscribes to *changes* — no synchronous setState call inside
// the effect body, which fixes the ESLint "cascading renders" warning.
function useIsMobile(breakpoint = 1024): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(() => {
    // On the server `window` is undefined — return null for SSR safety.
    if (typeof window === "undefined") return null;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    // Only subscribe to future changes — initial value already set above.
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

// ─── Fix #1: OverflowPill — exact structural clone of SkillPill ──────────────
// Root cause: SkillPill uses `motion.span` with `flex items-center gap-2.5
// px-4 py-2.5` + an indicator dot + dm-mono label. Any pill with different
// padding, gap, or missing dot renders at a different height and breaks the
// flex-wrap row alignment.
// Fix: replicate SkillPill's exact DOM structure + spacing. Static border
// instead of animated SVG, dimmed dot/text to signal "overflow / inactive".
function OverflowPill({
  count,
  isExpanded,
  onClick,
}: {
  count: number;
  isExpanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={
        isExpanded
          ? "Show fewer technologies"
          : `Show ${count} more technologies`
      }
      className="relative flex items-center gap-2.5 px-4 py-2.5 cursor-pointer hover:bg-white/5 transition-colors duration-200"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        background: isExpanded
          ? "rgba(147,231,251,0.08)"
          : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Dot — same dimensions as SkillPill, dimmed to signal inactive */}
      <span
        className="shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-300"
        style={{
          background: isExpanded ? "#93E7FB" : "rgba(255,255,255,0.3)",
        }}
      />
      {/* Label — identical font/size/tracking/case to SkillPill */}
      <span
        className="font-dm-mono text-[11px] tracking-[0.16em] uppercase whitespace-nowrap transition-colors duration-300"
        style={{ color: isExpanded ? "#93E7FB" : "rgba(255,255,255,0.4)" }}
      >
        {isExpanded ? "Collapse" : `+${count}`}
      </span>
    </button>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const [activeImg, setActiveImg] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // ─── Fix #2: interval duration synced exactly with progress bar ──────────
  const SLIDE_DURATION = 4500 + index * 200; // ms — single source of truth

  // ─── Fix #4: Stable advance callback ─────────────────────────────────────
  const advance = useCallback(() => {
    setActiveImg((prev) => (prev + 1) % project.images.length);
  }, [project.images.length]);

  useEffect(() => {
    if (project.images.length <= 1 || paused) return;
    const id = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [project.images.length, paused, advance, SLIDE_DURATION]);

  // Close preview on Escape key
  useEffect(() => {
    if (!isPreviewOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPreviewOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isPreviewOpen]);

  // ─── Fix #3: Lock body scroll when preview is open ───────────────────────
  useEffect(() => {
    document.body.style.overflow = isPreviewOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPreviewOpen]);

  const overflowCount = project.techStack.length - 6;
  const displayedSkills = showAllSkills
    ? project.techStack
    : project.techStack.slice(0, 6);

  return (
    // ─── Fix #4: Both enter AND exit states defined for inView ──────────────
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full mb-10 sm:mb-16 md:mb-24 lg:mb-28 group"
    >
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-24 items-start lg:items-center">
        {/* ── IMAGE ────────────────────────────────────────────────────────── */}
        <div className="w-full lg:w-[62%] shrink-0">
          <motion.div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onClick={() => setIsPreviewOpen(true)}
            className="relative overflow-hidden w-full cursor-zoom-in"
            style={{
              aspectRatio: "16/11",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative frame border */}
            <div className="absolute inset-0 z-20 border border-white/10 pointer-events-none" />
            <div className="absolute inset-0 z-20 border-[6px] border-[#080808] opacity-50 pointer-events-none mix-blend-overlay" />

            {/* ─── Fix #6: First project image loads eagerly/with priority ──── */}
            <AnimatePresence mode="sync">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={project.images[activeImg]}
                  alt={`${project.name} preview ${activeImg + 1} of ${project.images.length}`}
                  fill
                  className="object-cover"
                  // Fix #6: eager + priority for first card's first image
                  loading={index === 0 && activeImg === 0 ? "eager" : "lazy"}
                  priority={index === 0 && activeImg === 0}
                  style={{
                    filter: "brightness(0.85) contrast(1.1) saturate(0.8)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Vignette overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
              }}
            />

            {/* ─── Fix #2: Progress bar duration === interval duration ─────── */}
            {project.images.length > 1 && !paused && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20 bg-black/60">
                <motion.div
                  key={`progress-${activeImg}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: SLIDE_DURATION / 1000, // ← exact sync
                    ease: "linear",
                  }}
                  className="h-full bg-white/40"
                />
              </div>
            )}

            {/* Dot indicators for multiple images */}
            {project.images.length > 1 && (
              <div className="absolute bottom-3 right-3 z-20 flex gap-1.5">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImg(i);
                    }}
                    aria-label={`View image ${i + 1}`}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      background:
                        i === activeImg
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.3)",
                      transform: i === activeImg ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <div className="w-full lg:w-[38%] flex flex-col justify-center">
          {/* Index marker */}
          <div className="flex items-center gap-4 mb-3 md:mb-4">
            <span
              className="font-dm-mono text-[11px] tracking-[0.4em] uppercase"
              style={{ color: WA(0.5) }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="h-px w-10 bg-white/20" />
          </div>

          {/* Title */}
          <motion.h3
            className="font-cinzel font-bold leading-none mb-3 md:mb-5"
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              color: WA(0.85),
            }}
          >
            {project.name}
          </motion.h3>

          {/* Key Points (Bulleted) */}
          <ul className="mb-6 md:mb-10 space-y-3">
            {project.keyPoints.map((point, pIdx) => (
              <motion.li
                key={pIdx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + pIdx * 0.05 }}
                whileHover={{ x: 5, color: WHITE }}
                className="group/point flex gap-3 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] transition-all duration-300"
                style={{
                  color: MIST,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                }}
              >
                <span 
                  className="mt-2 shrink-0 w-1 h-1 rounded-full bg-white/20 group-hover/point:bg-white/60 transition-colors"
                />
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>


          {/* ─── Fix #1: Skills row with properly styled overflow pill ───── */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-5 md:mb-8 items-center">
            {displayedSkills.map((tech) => (
              <SkillPill key={tech} name={tech} />
            ))}
            {overflowCount > 0 && (
              <OverflowPill
                count={overflowCount}
                isExpanded={showAllSkills}
                onClick={() => setShowAllSkills(!showAllSkills)}
              />
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-2 border border-white/20 hover:border-white/50 text-[11px] sm:text-xs tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: WHITE }}
            >
              GitHub
            </a>

            {project.liveSite && project.liveSite !== project.githubRepo && (
              <a
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2 border border-white/20 hover:border-white/50 text-[11px] sm:text-xs tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-all duration-200"
                style={{ color: WHITE }}
              >
                Live
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ─── Fix #3: Preview portal rendered via createPortal pattern ─────────
           Since we can't use ReactDOM.createPortal in a pure component paste,
           we position fixed + z-[9999] with pointer-events guard on siblings.
           The key fix: moved OUTSIDE the overflow-hidden image wrapper div.   */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 md:p-10"
            style={{
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => setIsPreviewOpen(false)}
          >
            {/* Close hint */}
            <div
              className="absolute top-4 right-5 text-[11px] tracking-[0.3em] uppercase"
              style={{ color: WA(0.4) }}
            >
              esc / tap to close
            </div>

            {/* Nav arrows for multi-image projects */}
            {project.images.length > 1 && (
              <>
                <button
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center border border-white/20 hover:border-white/50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImg(
                      (p) =>
                        (p - 1 + project.images.length) % project.images.length,
                    );
                  }}
                  aria-label="Previous image"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M9 2L4 7L9 12"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center border border-white/20 hover:border-white/50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImg((p) => (p + 1) % project.images.length);
                  }}
                  aria-label="Next image"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M5 2L10 7L5 12"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-5xl"
              style={{ maxHeight: "80vh", aspectRatio: "16/11" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.images[activeImg]}
                alt={`${project.name} full preview`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Image counter */}
            {project.images.length > 1 && (
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em]"
                style={{ color: WA(0.4) }}
              >
                {activeImg + 1} / {project.images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Projects() {
  const all = projectsData.projects;
  const INITIAL_DESKTOP = 3;
  const INITIAL_MOBILE = 2;

  const [showAll, setShowAll] = useState(false);

  // ─── Fix #5: null until measured — no hydration flash ───────────────────
  const isMobile = useIsMobile(1024);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: false, margin: "-100px" });

  // While isMobile is null (SSR / first paint), default to desktop limit
  const limit = showAll
    ? all.length
    : (isMobile ?? false)
      ? INITIAL_MOBILE
      : INITIAL_DESKTOP;

  const visible = all.slice(0, limit);
  const remaining = all.length - limit;

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden"
      style={{ background: DEEP_BLACK }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-16 md:py-20 lg:py-24">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 sm:mb-16 md:mb-20 lg:mb-24 border-b border-white/10 pb-5 md:pb-8"
        >
          <h2
            className="font-cinzel font-black"
            style={{
              fontSize: "clamp(34px, 7vw, 84px)",
              color: WHITE,
            }}
          >
            Projects
          </h2>
        </motion.div>

        {/* Project list */}
        <div className="flex flex-col">
          {visible.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* Load more */}
        {!showAll && remaining > 0 && (
          <div className="flex justify-center mt-8 md:mt-16 lg:mt-24">
            <button
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity duration-300"
              style={{ color: WHITE }}
            >
              <span>Load {remaining} More</span>
              <span
                className="w-px h-4 bg-white/40 group-hover:bg-white/70 transition-colors"
                aria-hidden
              />
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="translate-y-0 group-hover:translate-y-0.5 transition-transform duration-200"
              >
                <path
                  d="M6 2V10M2 6L6 10L10 6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
