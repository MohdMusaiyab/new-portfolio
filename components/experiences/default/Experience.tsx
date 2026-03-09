"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import experienceData from "@/app/data/experience.json";

export default function DefaultExperience() {
  return (
    <section
      id="experience"
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
              Professional History
            </span>
          </div>
          <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9]">
            Work <br />
            <span className="font-light text-blue-600">experience.</span>
          </h3>
        </motion.div>

        {}
        <div className="flex flex-col gap-8">
          {experienceData.experience.map((exp, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#faf8f5] border border-[#e7e2db] rounded-2xl overflow-hidden hover:border-[#d6cfc5] hover:shadow-xl hover:shadow-stone-200/30 transition-all duration-500"
            >
              {}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-10">
                {}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border border-[#e7e2db] overflow-hidden shrink-0 flex items-center justify-center">
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      sizes="96px"
                      className="object-contain p-3"
                    />
                  ) : (
                    <span className="text-4xl font-black text-[#e7e2db]">
                      {exp.company.charAt(0)}
                    </span>
                  )}
                </div>

                {}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                      {exp.duration.start} — {exp.duration.end}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        width="10"
                        height="10"
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
                  <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-1">
                    {exp.company}
                  </h4>
                  <p className="text-base md:text-lg text-[#78716c] font-medium">
                    {exp.position}
                  </p>
                </div>
              </div>

              {}
              <div className="h-px bg-[#e7e2db] mx-6 md:mx-10" />

              {}
              <div className="p-6 md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e] mb-6">
                  Key Contributions
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                  {exp.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex gap-4 group cursor-default">
                      <span className="text-[10px] font-mono font-bold text-[#d6cfc5] group-hover:text-blue-500 transition-colors mt-[5px] shrink-0">
                        0{hIdx + 1}
                      </span>
                      <p className="text-sm text-[#57534e] leading-[1.7] font-light">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <div className="h-px bg-[#e7e2db] mx-6 md:mx-10" />

              {}
              <div className="p-6 md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e] mb-4">
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center px-3.5 py-2 bg-sky-50 border border-sky-200 rounded-xl text-[12px] font-semibold text-sky-600 cursor-default hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ease-out"
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
