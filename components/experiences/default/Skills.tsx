"use client";

import { motion } from "framer-motion";
import skillsData from "@/app/data/skills.json";
import { Wrench } from "lucide-react";

export default function DefaultSkills() {
  return (
    <section id="skills" className="w-full py-12 sm:py-16 px-5 sm:px-8 border-b border-stone-200/80">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-2 mb-8">
          <Wrench size={14} className="text-stone-400" />
          <h2 className="text-xs font-dm-mono uppercase tracking-[0.2em] font-semibold text-stone-900">
            Skills &amp; Capabilities
          </h2>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skillsData.skills.map((category, cIdx) => (
            <motion.div
              key={cIdx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: cIdx * 0.05 }}
              className="p-4 rounded-lg border border-stone-200/80 bg-white/70"
            >
              <h3 className="text-xs font-semibold text-stone-900 mb-2.5 font-dm-mono tracking-tight">
                {category.name}
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded text-[11px] font-dm-mono bg-stone-100 text-stone-700 border border-stone-200/60"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
