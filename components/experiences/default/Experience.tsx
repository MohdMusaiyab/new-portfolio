"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import experienceData from "@/app/data/experience.json";
import { Briefcase, MapPin } from "lucide-react";

export default function DefaultExperience() {
  return (
    <section id="experience" className="w-full py-12 sm:py-16 px-5 sm:px-8 border-b border-stone-200/80">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-2 mb-8">
          <Briefcase size={14} className="text-stone-400" />
          <h2 className="text-xs font-dm-mono uppercase tracking-[0.2em] font-semibold text-stone-900">
            Work Experience
          </h2>
        </div>

        {/* Experience List */}
        <div className="space-y-10">
          {experienceData.experience.map((exp, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="relative pl-0 sm:pl-2"
            >
              {/* Header: Company, Position, Location & Dates */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  {/* Logo Box */}
                  <div className="relative w-9 h-9 rounded-md bg-stone-100 border border-stone-200 shrink-0 overflow-hidden flex items-center justify-center">
                    {exp.logo ? (
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    ) : (
                      <span className="font-dm-mono text-xs font-bold text-stone-500">
                        {exp.company.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-[15px] font-semibold text-stone-900 leading-snug">
                      {exp.position}
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col sm:items-end gap-1.5 sm:gap-0.5 text-[11px] font-dm-mono text-stone-500 pl-12 sm:pl-0">
                  <span className="text-stone-700 font-medium tabular-nums">
                    {exp.duration.start} — {exp.duration.end}
                  </span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <MapPin size={10} />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Highlights bullet points */}
              <ul className="space-y-1.5 pl-12 sm:pl-12 mb-3">
                {exp.highlights.map((point, pIdx) => (
                  <li
                    key={pIdx}
                    className="text-xs sm:text-[13px] leading-relaxed text-stone-600 font-normal list-disc list-outside"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              {/* Skills tags */}
              <div className="flex flex-wrap items-center gap-1.5 pl-12 sm:pl-12">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded text-[10px] font-dm-mono bg-stone-100 text-stone-600 border border-stone-200/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
