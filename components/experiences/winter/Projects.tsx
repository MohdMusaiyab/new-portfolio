"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import projectsData from "@/app/data/projects.json";

const DEEP_BLACK = "#050505";
const CHARCOAL = "#111111";
const WHITE = "#ffffff";
const WA = (a: number) => `rgba(255,255,255,${a})`;
const MIST = "#888888";

type Project = (typeof projectsData.projects)[0];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (project.images.length <= 1) return;
    const interval = setInterval(
      () => {
        setActiveImg((prev) => (prev + 1) % project.images.length);
      },
      4500 + index * 200,
    );

    return () => clearInterval(interval);
  }, [project.images.length, index]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full mb-32 md:mb-48 group"
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24 items-center lg:items-center">
        {}
        <div className="w-full lg:w-[62%] shrink-0">
          <motion.div
            className="relative overflow-hidden w-full"
            style={{
              aspectRatio: "16/10",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {}
            <div className="absolute inset-0 z-20 border border-white/10 pointer-events-none" />
            <div className="absolute inset-0 z-20 border-[6px] border-[#080808] opacity-50 pointer-events-none mix-blend-overlay" />

            {}
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
                  alt={`${project.name} preview`}
                  fill
                  className="object-cover"
                  style={{
                    filter: "brightness(0.85) contrast(1.1) saturate(0.8)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
              }}
            />

            {}
            {project.images.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 z-20 bg-black/60">
                <motion.div
                  key={`progress-${activeImg}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.5, ease: "linear" }}
                  className="h-full bg-white/40"
                />
              </div>
            )}
          </motion.div>
        </div>

        {}
        <div className="w-full lg:w-[38%] flex flex-col justify-center">
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="font-dm-mono text-[11px] tracking-[0.4em] uppercase"
              style={{ color: WA(0.5) }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>

          <motion.h3
            className="font-cinzel font-bold leading-none mb-6"
            style={{
              fontSize: "clamp(40px, 4vw, 56px)",
              color: WHITE,
              letterSpacing: "0.02em",
              textShadow: "0 4px 20px rgba(255,255,255,0.1)",
            }}
          >
            {project.name}
          </motion.h3>

          <p
            className="text-[15px] leading-[1.8] mb-8"
            style={{
              color: MIST,
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
            }}
          >
            {project.description}
          </p>

          <ul className="space-y-4 mb-10">
            {project.keyPoints.slice(0, 3).map((kp, i) => (
              <li key={i} className="flex gap-4 items-start group/kp">
                <span
                  className="shrink-0 mt-[10px] w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover/kp:scale-150 group-hover/kp:bg-white"
                  style={{ background: WA(0.3) }}
                />
                <span
                  className="text-[13px] leading-[1.7]"
                  style={{ color: WA(0.6), fontWeight: 300 }}
                >
                  {kp}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: WA(0.7),
                  border: `1px solid ${WA(0.15)}`,
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/link overflow-hidden flex items-center justify-center border border-white/20 px-8 py-3 transition-colors hover:border-white/50"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: WHITE,
              }}
            >
              <span className="relative z-10">GitHub</span>
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover/link:translate-y-0 transition-transform duration-300 ease-out" />
            </a>

            {project.liveSite && project.liveSite !== project.githubRepo && (
              <a
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group/live flex items-center gap-2 transition-all hover:opacity-100 opacity-60"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: WHITE,
                }}
              >
                <span>Live Site</span>
                <span className="group-hover/live:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const all = projectsData.projects;
  const INITIAL_DESKTOP = 5;
  const INITIAL_MOBILE = 3;

  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isClient]);

  const limit = showAll
    ? all.length
    : isMobile
      ? INITIAL_MOBILE
      : INITIAL_DESKTOP;
  const visible = all.slice(0, limit);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=DM+Mono:wght@300;400&family=Inter:wght@300;400&display=swap');
        .font-cinzel  { font-family: 'Cinzel', serif; }
        .font-dm-mono { font-family: 'DM Mono', monospace; }
      `}</style>

      <section
        id="projects"
        className="relative w-full overflow-hidden"
        style={{ background: DEEP_BLACK }}
      >
        {}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 100% 100% at 50% 0%, ${CHARCOAL} 0%, ${DEEP_BLACK} 100%)`,
          }}
        />

        {}
        <div
          className="absolute right-[-20%] top-[10%] w-[60%] h-[80%] pointer-events-none rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute left-[-20%] bottom-[10%] w-[50%] h-[60%] pointer-events-none rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)",
          }}
        />

        {}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.7'/%3E%3C/svg%3E")`,
            opacity: 0.15,
          }}
        />

        {}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to bottom, #000 0%, transparent 100%)`,
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-32 md:py-48">
          {}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-32 md:mb-48 border-b border-white/10 pb-12"
          >
            <div>
              <h2
                className="font-cinzel font-black leading-none"
                style={{
                  fontSize: "clamp(50px, 8vw, 110px)",
                  color: WHITE,
                  letterSpacing: "0.02em",
                  textShadow: "0 10px 40px rgba(255,255,255,0.1)",
                }}
              >
                Projects
              </h2>
            </div>
          </motion.div>

          {}
          <div className="flex flex-col">
            <AnimatePresence>
              {visible.map((project, i) => (
                <ProjectRow key={project.name} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {}
          {!showAll && all.length > limit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex justify-center mt-10 md:mt-24"
            >
              <button
                onClick={() => setShowAll(true)}
                className="group flex flex-col items-center gap-4 transition-all duration-500 hover:opacity-100 opacity-60"
              >
                <div className="h-20 w-px bg-linear-to-b from-transparent via-white/50 to-white/50" />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: WHITE,
                  }}
                >
                  Load Remaining Projects
                </span>
                <span className="text-white text-lg transition-transform duration-500 group-hover:translate-y-2">
                  ↓
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
