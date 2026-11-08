"use client";

import { motion } from "framer-motion";
import educationData from "@/app/data/education.json";
import { GraduationCap } from "lucide-react";

export default function DefaultEducation() {
  const sorted = [...educationData.education].reverse();

  return (
    <section id="education" className="w-full py-12 sm:py-16 px-5 sm:px-8 border-b border-stone-200/80">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap size={14} className="text-stone-400" />
          <h2 className="text-xs font-dm-mono uppercase tracking-[0.2em] font-semibold text-stone-900">
            Education
          </h2>
        </div>

        {/* Education Entries */}
        <div className="space-y-6">
          {sorted.map((edu, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-4 sm:p-5 rounded-lg border border-stone-200/80 bg-white/70"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                <h3 className="text-sm sm:text-[15px] font-semibold text-stone-900">
                  {edu.institution}
                </h3>
                <span className="text-[11px] font-dm-mono text-stone-500 tabular-nums">
                  {edu.startYear} — {edu.endYear}
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-stone-700 font-medium mb-2">
                {edu.degree}
              </p>

              {edu.score && (
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-dm-mono bg-stone-100 text-stone-600 border border-stone-200/80 mb-2.5">
                  Score: {edu.score}
                </div>
              )}

              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="space-y-1 pl-3 border-l border-stone-200">
                  {edu.highlights.map((h, hIdx) => (
                    <li
                      key={hIdx}
                      className="text-[12px] leading-relaxed text-stone-500"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
