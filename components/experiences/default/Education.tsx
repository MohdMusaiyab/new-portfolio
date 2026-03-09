"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import educationData from "@/app/data/education.json";

export default function DefaultEducation() {
  return (
    <section
      id="education"
      className="w-full bg-white py-20 md:py-32 font-sans border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 md:mb-32 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-slate-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
              Academic Background
            </span>
            <span className="w-8 h-px bg-slate-300" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[80px] font-extrabold tracking-tighter leading-none text-slate-900">
            My{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #0f172a 0%, #64748b 45%, #0f172a 100%)",
                backgroundSize: "200% auto",
                animation: "shine 4s linear infinite",
              }}
            >
              education.
            </span>
          </h2>
          <style>{`@keyframes shine { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }`}</style>
        </motion.div>

        {/* ── Staggered Layout ── */}
        <div className="flex flex-col gap-24 md:gap-40">
          {educationData.education.map((edu, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-10 md:gap-20 group`}
              >
                {/* Visual Side (Logo Container) */}
                <div className="w-full md:w-5/12 flex justify-center shrink-0">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-3xl md:rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)] group-hover:scale-[1.02] group-hover:border-slate-200 transition-all duration-700 overflow-hidden">
                    {/* Decorative blurred blob behind image */}
                    <div className="absolute inset-0 bg-blue-100/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full scale-150" />

                    {edu.logo ? (
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 z-10 transition-transform duration-700 group-hover:scale-110">
                        <Image
                          src={edu.logo}
                          alt={edu.institution}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 768px) 112px, 180px"
                          unoptimized // FIX: Prevents Next.js from blurring external logos
                          className="object-contain drop-shadow-sm p-4 md:p-0"
                        />
                      </div>
                    ) : (
                      <span className="text-6xl font-black text-slate-200 z-10">
                        {edu.institution.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`w-full md:w-7/12 flex flex-col ${isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"} items-center text-center`}
                >
                  {/* Meta (Years & Score) */}
                  <div
                    className={`flex flex-wrap items-center gap-3 mb-6 ${isEven ? "justify-start" : "justify-center md:justify-end"}`}
                  >
                    <span className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                      {edu.startYear} — {edu.endYear}
                    </span>
                    {edu.score && (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {edu.score}
                      </span>
                    )}
                  </div>

                  {/* Headings */}
                  <h3 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-3 md:mb-4 group-hover:text-slate-700 transition-colors duration-300">
                    {edu.institution}
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-[35ch] mb-8 md:mb-10 px-4 md:px-0">
                    {edu.degree}
                  </p>

                  {/* Highlights (Numbered List) */}
                  {edu.highlights.length > 0 && (
                    <div className="flex flex-col gap-5 w-full max-w-[400px]">
                      {edu.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className={`flex items-start gap-4 group/item ${isEven ? "flex-row" : "flex-row md:flex-row-reverse"}`}
                        >
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-400 shrink-0 group-hover/item:border-slate-900 group-hover/item:bg-slate-900 group-hover/item:text-white transition-all duration-300">
                            {hIdx + 1}
                          </span>
                          <p
                            className={`text-[15px] text-slate-500 leading-relaxed group-hover/item:text-slate-900 transition-colors ${isEven ? "text-left" : "text-center md:text-right"}`}
                          >
                            {h}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
