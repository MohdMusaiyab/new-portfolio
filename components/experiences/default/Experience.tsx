"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import experienceData from "@/app/data/experience.json";

export default function DefaultExperience() {
  return (
    <section
      id="experience"
      className="relative w-full min-h-screen flex flex-col justify-start pt-24 pb-12 px-6 md:px-12 lg:px-24 text-[#292524] font-sans overflow-hidden bg-[#fdfbf7]"
    >
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-12 h-[2px] bg-[#0d9488]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#78716c]">
              Professional History
            </span>
          </div>
          <h3 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] text-[#1c1917]">
            Work <br />
            <span className="font-light text-[#0d9488]">experience.</span>
          </h3>
        </motion.div>

        {/* Experience List */}
        <div className="flex flex-col gap-16 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[38px] md:left-[46px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#0d9488]/50 via-[#d6d3d1]/50 to-transparent hidden sm:block z-0" />

          {/* Cards */}
          {experienceData.experience.map((exp, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="relative z-10 flex flex-col sm:flex-row gap-6 md:gap-12"
            >
              {/* Logo / Timeline Node */}
              <div className="relative shrink-0 flex justify-center sm:block">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border border-[#e7e5e4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex items-center justify-center relative z-10 group hover:scale-105 transition-transform duration-300">
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      sizes="96px"
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-4xl font-black text-[#0d9488]/30">
                      {exp.company.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-white border border-[#e7e5e4] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] p-8 md:p-10 hover:shadow-[0_8px_30px_rgb(13,148,136,0.08)] transition-all duration-500 hover:border-[#0d9488]/20">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-[#1c1917]">
                      {exp.company}
                    </h4>
                    <p className="text-lg md:text-xl text-[#0d9488] font-medium">
                      {exp.position}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-start md:items-end text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#a8a29e]">
                    <span className="flex items-center gap-2 bg-[#fdfbf7] px-3 py-1.5 rounded-full border border-[#e7e5e4] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] text-[#57534e]">
                      <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-pulse" />
                      {exp.duration.start} — {exp.duration.end}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#78716c]">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-[#0d9488]/20 via-[#e7e5e4] to-transparent w-full mb-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                  {exp.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex gap-4 group cursor-default">
                      <span className="text-xs font-mono font-bold text-[#0d9488]/40 group-hover:text-[#0d9488] transition-colors mt-[3px] shrink-0">
                        0{hIdx + 1}
                      </span>
                      <p className="text-sm md:text-base text-[#57534e] leading-relaxed font-light">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Core Stack */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center px-4 py-2 bg-[#ccfbf1]/50 border border-[#99f6e4] rounded-xl text-xs font-bold text-[#115e59] cursor-default hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0d9488]/10 hover:bg-[#ccfbf1] hover:border-[#5eead4] transition-all duration-300"
                    >
                      {skill}
                    </span>
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
