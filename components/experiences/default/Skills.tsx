"use client";

import { motion } from "framer-motion";
import skillsData from "@/app/data/skills.json";

const CATEGORY_ACCENTS: Record<
  string,
  { bg: string; border: string; text: string; dot: string }
> = {
  "Programming Languages": {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-600",
    dot: "bg-violet-400",
  },
  "Backend Development": {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-600",
    dot: "bg-sky-400",
  },
  "Databases and ORM": {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-600",
    dot: "bg-emerald-400",
  },
  "DevOps and Tools": {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
    dot: "bg-amber-400",
  },
  "Frontend Development": {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-600",
    dot: "bg-rose-400",
  },
  "Core Competencies": {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-600",
    dot: "bg-indigo-400",
  },
};

const fallbackAccent = {
  bg: "bg-blue-50",
  border: "border-blue-200",
  text: "text-blue-600",
  dot: "bg-blue-400",
};

export default function DefaultSkills() {
  return (
    <section
      id="skills"
      className="w-full bg-[#f8f6f3] py-24 md:py-32 text-[#1c1917] font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#a8a29e]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
              Technical Arsenal
            </span>
          </div>
          <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9]">
            Tools I <br />
            <span className="font-light text-blue-600">wield.</span>
          </h3>
        </motion.div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.skills.map((category, cIdx) => {
            const accent = CATEGORY_ACCENTS[category.name] || fallbackAccent;

            return (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: Math.min(cIdx * 0.07, 0.35) }}
                className="bg-[#faf8f5] border border-[#e7e2db] rounded-2xl p-6 hover:border-[#d6cfc5] hover:shadow-lg hover:shadow-stone-200/40 transition-all duration-400 group"
              >
                {}
                <div className="flex items-center gap-2.5 mb-5">
                  <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#78716c]">
                    {category.name}
                  </h4>
                </div>

                {}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`
                        inline-flex items-center gap-1.5
                        px-3.5 py-2
                        ${accent.bg} ${accent.border} border
                        rounded-xl
                        text-[12px] font-semibold ${accent.text}
                        cursor-default
                        hover:-translate-y-0.5 hover:shadow-md
                        transition-all duration-300 ease-out
                      `}
                    >
                      {skill.name}
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
