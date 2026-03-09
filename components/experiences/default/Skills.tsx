"use client";

import { motion } from "framer-motion";
import skillsData from "@/app/data/skills.json";

// We keep a subtle tint for the categories to make them distinct,
// but fit them into the clean white/slate aesthetic.
const CATEGORY_ACCENTS: Record<
  string,
  { ring: string; text: string; dot: string; shadow: string }
> = {
  "Programming Languages": {
    ring: "hover:border-violet-300 hover:bg-violet-50/50",
    text: "group-hover:text-violet-700",
    dot: "bg-violet-400",
    shadow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  "Backend Development": {
    ring: "hover:border-blue-300 hover:bg-blue-50/50",
    text: "group-hover:text-blue-700",
    dot: "bg-blue-400",
    shadow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  "Databases and ORM": {
    ring: "hover:border-emerald-300 hover:bg-emerald-50/50",
    text: "group-hover:text-emerald-700",
    dot: "bg-emerald-400",
    shadow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  "DevOps and Tools": {
    ring: "hover:border-amber-300 hover:bg-amber-50/50",
    text: "group-hover:text-amber-700",
    dot: "bg-amber-400",
    shadow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
  "Frontend Development": {
    ring: "hover:border-rose-300 hover:bg-rose-50/50",
    text: "group-hover:text-rose-700",
    dot: "bg-rose-400",
    shadow: "hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
  },
  "Core Competencies": {
    ring: "hover:border-indigo-300 hover:bg-indigo-50/50",
    text: "group-hover:text-indigo-700",
    dot: "bg-indigo-400",
    shadow: "hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
  },
};

const fallbackAccent = CATEGORY_ACCENTS["Backend Development"];

export default function DefaultSkills() {
  return (
    <section
      id="skills"
      className="w-full bg-slate-50 py-20 md:py-32 font-sans border-t border-slate-100"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-slate-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                Technical Arsenal
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none text-slate-900">
              Tools I{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #0f172a 0%, #64748b 45%, #0f172a 100%)",
                  backgroundSize: "200% auto",
                  animation: "shine 4s linear infinite",
                }}
              >
                wield.
              </span>
            </h2>
            <style>{`@keyframes shine { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }`}</style>
          </div>
          <p className="text-sm text-slate-400 max-w-[30ch] leading-relaxed pb-2">
            The core software, languages, and frameworks I use to build scalable
            systems.
          </p>
        </motion.div>

        {/* ── Skills Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.skills.map((category, cIdx) => {
            const accent = CATEGORY_ACCENTS[category.name] || fallbackAccent;

            return (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: cIdx * 0.08 }}
                className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-500 flex flex-col h-full"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${accent.dot} shadow-sm`}
                  />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                    {category.name}
                  </h3>
                </div>

                {/* Skills Cloud */}
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`
                        group inline-flex border border-slate-200 bg-white
                        px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600
                        cursor-default transition-all duration-300 ease-out
                        hover:-translate-y-1 hover:scale-105 ${accent.ring} ${accent.shadow}
                      `}
                    >
                      <span
                        className={`transition-colors duration-300 ${accent.text}`}
                      >
                        {skill.name}
                      </span>
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
