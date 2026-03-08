"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import educationData from "@/app/data/education.json";

export default function DefaultEducation() {
  return (
    <section
      id="education"
      className="w-full bg-[#f1ede8] py-24 md:py-32 text-[#1c1917] font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#a8a29e]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
              Academic Background
            </span>
          </div>
          <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9]">
            My <br />
            <span className="font-light text-blue-600">education.</span>
          </h3>
        </motion.div>

        {/* ── Education Grid ── */}
        <div className="relative">
          {/* Connectors (Desktop Horizontal & Mobile Vertical) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 md:w-16 hidden md:flex items-center justify-center z-0 text-[#d6cfc5]">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="animate-pulse"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 flex md:hidden flex-col items-center justify-center z-0 text-[#d6cfc5]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="animate-pulse"
            >
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 relative z-10">
            {educationData.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative bg-[#faf8f5] border border-[#e7e2db] rounded-[32px] overflow-hidden hover:border-[#d6cfc5] hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 flex flex-col items-center text-center p-12"
              >
                {/* Square Logo Box */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl shadow-sm border border-[#e7e2db] flex items-center justify-center overflow-hidden p-5 mb-8 transform group-hover:-translate-y-3 group-hover:shadow-lg transition-all duration-500">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-blue-500" />
                  {edu.logo ? (
                    <Image
                      src={edu.logo}
                      alt={edu.institution}
                      fill
                      sizes="160px"
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-5xl font-black text-[#d6cfc5]">
                      {edu.institution.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Years badge */}
                <div className="inline-flex items-center px-4 py-1.5 bg-white border border-[#e7e2db] rounded-full text-[11px] font-bold tracking-widest text-[#78716c] shadow-sm mb-6 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors duration-500">
                  {edu.startYear} — {edu.endYear}
                </div>

                {/* Text Data */}
                <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-3 text-[#1c1917] group-hover:text-blue-900 transition-colors duration-500">
                  {edu.institution}
                </h4>

                {/* Score / Percentage display */}
                {edu.score && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold tracking-wide mb-3 group-hover:bg-green-100 transition-colors duration-500">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {edu.score}
                  </div>
                )}

                <p className="text-base md:text-lg font-semibold text-[#57534e] group-hover:text-blue-600 transition-colors duration-500 max-w-[90%] leading-relaxed mt-1">
                  {edu.degree}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
