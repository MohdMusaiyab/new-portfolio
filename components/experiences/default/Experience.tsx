"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import experienceData from "@/app/data/experience.json";
import SkillNode from "@/components/ui/SkillNode";

export default function DefaultExperience() {
  return (
    <section
      id="experience"
      className="relative w-full py-20 md:py-32 px-6 sm:px-12 lg:px-24 text-[#292524] font-sans overflow-hidden bg-[#fdfbf7]"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24 text-center sm:text-left"
        >
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-5">
            <span className="w-12 h-[2px] bg-[#0d9488]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d9488]">
              Professional History
            </span>
          </div>
          <h3 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-[#1c1917]">
            Work <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0d9488] to-[#042f2e]">
              Experience.
            </span>
          </h3>
        </motion.div>

        {/* Experience List */}
        <div className="flex flex-col gap-8 md:gap-12 relative">
          {experienceData.experience.map((exp, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(13,148,136,0.25)",
                borderColor: "rgba(13,148,136,0.3)"
              }}
              className="group relative bg-white/60 backdrop-blur-md border border-[#e7e5e4] rounded-[24px] md:rounded-[32px] p-6 sm:p-10 hover:bg-white overflow-hidden transition-colors duration-300"
            >
              {/* Subtle accent corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-[#0d9488]/5 to-transparent pointer-events-none" />

              <div className="relative z-10">
                {/* Header: Unified Logo + Company Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-5">
                    {/* Integrated Logo Box */}
                    <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-[#0d9488]/10 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-center p-2 group-hover:border-[#0d9488]/30 transition-colors duration-500">
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={48}
                          height={48}
                          className="object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-2xl font-black text-[#0d9488]/20">
                          {exp.company.charAt(0)}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-0.5">
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#1c1917] group-hover:text-[#0d9488] transition-colors">
                        {exp.company}
                      </h4>
                      <p className="text-base md:text-lg text-[#0d9488] font-semibold tracking-tight">
                        {exp.position}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-start sm:items-end">
                    <span className="inline-flex items-center gap-2 bg-[#fdfbf7] px-4 py-1.5 rounded-full border border-[#0d9488]/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#57534e] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse" />
                      {exp.duration.start} — {exp.duration.end}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#a8a29e]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-linear-to-r from-[#0d9488]/10 via-[#e7e5e4] to-transparent w-full mb-8" />

                {/* Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 mb-10">
                  {exp.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex gap-4 group/item">
                      <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#0d9488]/40 group-hover/item:bg-[#0d9488] transition-colors shrink-0" />
                      <p className="text-sm sm:text-base text-stone-600 leading-[1.7] font-medium">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Shared Skill Nodes Rendering */}
                <div className="flex flex-wrap gap-2 md:gap-3 pt-6 border-t border-[#e7e5e4]/50">
                  {exp.skills.map((skill, sIdx) => (
                    <SkillNode
                      key={sIdx}
                      name={skill}
                      small={true}
                      delay={idx * 0.1 + sIdx * 0.02}
                    />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
