"use client";

import { motion } from "framer-motion";
import skillsData from "@/app/data/skills.json";
import SkillNode from "@/components/ui/SkillNode";

export default function DefaultSkills() {
  return (
    <section
      id="skills"
      className="relative w-full bg-[#fdfbf7] py-20 md:py-[clamp(2.5rem,8vh,8rem)] px-6 sm:px-12 lg:px-16 text-[#1c1917] font-sans overflow-hidden selection:bg-[#0d9488] selection:text-[#fdfbf7]"
    >
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-[15%] top-0 w-px bg-[#0d9488]/10" />
        <div className="absolute top-1/2 right-[-10%] w-[35vw] h-[35vw] bg-[#0d9488]/5 blur-[120px] rounded-full -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-28"
        >
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-10 md:w-12 h-px bg-[#0d9488]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d9488]">
                Skill Set
              </span>
            </div>
            <h3 className="text-[clamp(1.75rem,min(5vw,8vh),6rem)] font-black uppercase tracking-tighter leading-[0.85] text-[#1c1917]">
              My  <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0d9488] to-[#042f2e]">
               Toolkit
              </span>
            </h3>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {skillsData.skills.map((category, cIdx) => (
            <motion.div
              key={cIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: Math.min(cIdx * 0.1, 0.4),
                ease: [0.19, 1, 0.22, 1],
                duration: 0.6,
              }}
              className="relative flex flex-col pt-4 md:pt-6 group"
            >
              {/* Category Header */}
              <div className="absolute top-0 left-0 right-0 flex items-center gap-4 border-b border-[#0d9488]/15 pb-4">
                <div className="relative w-2 h-2 md:w-3 md:h-3 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0d9488] z-10" />
                  <div className="absolute inset-0 border border-[#0d9488]/40 rounded-full animate-ping opacity-50" />
                </div>
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#1c1917] group-hover:text-[#0d9488] transition-colors duration-300">
                  {category.name}
                </h4>
              </div>

              {/* Skills Nodes container */}
              <div className="flex flex-wrap gap-2 md:gap-3 pt-10 md:pt-12">
                {category.skills.map((skill, sIdx) => (
                  <SkillNode
                    key={sIdx}
                    name={skill.name}
                    delay={cIdx * 0.05 + sIdx * 0.03}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
