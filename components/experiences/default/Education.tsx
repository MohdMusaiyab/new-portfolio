"use client";

import { motion } from "framer-motion";
import educationData from "@/app/data/education.json";

export default function DefaultEducation() {
  const sortedEducation = [...educationData.education].reverse();

  return (
    <section
      id="education"
      className="relative w-full bg-[#fdfbf7] py-24 md:py-[clamp(2.5rem,8vh,8rem)] px-6 sm:px-12 lg:px-24 text-[#1c1917] font-sans overflow-hidden selection:bg-[#0d9488] selection:text-[#fdfbf7]"
    >
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] right-[20%] h-px bg-[#0d9488]/10" />
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-[#0d9488]/5 blur-[200px] rounded-full translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-6 mb-20 md:mb-28 border-b border-[#0d9488]/10 pb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-12 h-px bg-[#0d9488]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d9488]">
              Academic Background
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h3 className="text-[clamp(1.75rem,min(5vw,8vh),6rem)] font-black uppercase tracking-tighter leading-[0.85] text-[#1c1917]">
              Education <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0d9488] to-[#042f2e]">
                History.
              </span>
            </h3>
          </div>
        </motion.div>

        {/* Structured List Layout */}
        <div className="flex flex-col gap-12 lg:gap-16 relative z-10 pb-8 max-w-5xl mx-auto w-full">
          {sortedEducation.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.05,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="flex flex-col md:flex-row gap-6 md:gap-16 group relative"
            >
              {/* Left Column: Dates & Score */}
              <div className="w-full md:w-1/4 md:shrink-0 pt-4 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start border-b md:border-b-0 border-[#0d9488]/10 pb-4 md:pb-0 mb-2 md:mb-0">
                <div className="flex items-center gap-3 md:mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#0d9488]/40 group-hover:bg-[#0d9488] group-hover:scale-150 transition-all duration-500" />
                  <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-[#57534e] group-hover:text-[#0d9488] transition-colors duration-500">
                    {edu.startYear} — {edu.endYear}
                  </span>
                </div>
                {edu.score && (
                  <span className="text-[11px] md:text-xs font-bold text-[#1c1917] tracking-wider uppercase bg-white px-3 py-1.5 rounded-none border border-[#0d9488]/15 shadow-sm">
                    Score: {edu.score}
                  </span>
                )}
              </div>

              {/* Right Column: Content Card */}
              <div className="w-full relative">
                <div className="relative w-full bg-white border border-[#0d9488]/10 rounded-none p-5 md:p-[clamp(1.25rem,3vh,2.5rem)] shadow-[0_4px_20px_-10px_rgba(13,148,136,0.05)] transition-all duration-700 ease-[0.19,1,0.22,1] group-hover:shadow-[0_20px_40px_-15px_rgba(13,148,136,0.15)] group-hover:-translate-y-2 group-hover:border-[#0d9488]/30">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-[#0d9488]/5 to-transparent rounded-none pointer-events-none" />

                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative z-10">
                    {/* Logo/Icon Area */}
                    <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 bg-[#fdfbf7] rounded-none border border-[#0d9488]/15 flex items-center justify-center overflow-hidden p-3 shadow-inner group-hover:border-[#0d9488]/50 transition-colors duration-500">
                      <span className="font-cinzel text-3xl font-black text-[#0d9488]/30 group-hover:text-[#0d9488]/70 transition-colors duration-500">
                        {edu.institution.charAt(0)}
                      </span>
                    </div>

                    {/* Text Details */}
                    <div className="flex flex-col grow">
                      <h4 className="font-cinzel text-xl md:text-3xl font-black tracking-tight leading-tight mb-2 text-[#1c1917] group-hover:text-[#0d9488] transition-colors duration-500">
                        {edu.institution}
                      </h4>
                      <p className="font-mono text-[11px] md:text-xs font-bold tracking-widest uppercase text-[#0d9488]/80 mb-6">
                        {edu.degree}
                      </p>

                      <ul className="space-y-3">
                        {edu.highlights.map((highlight, i) => {
                          const parts = highlight
                            .split(/([\d.%]+)/g)
                            .filter(Boolean);

                          return (
                            <li
                              key={i}
                              className="flex gap-3 items-start group/li text-[#57534e]"
                            >
                              <span className="shrink-0 mt-[6px] w-[5px] h-[5px] rounded-full bg-[#0d9488]/30 group-hover/li:bg-[#0d9488] group-hover/li:scale-150 transition-all duration-300" />
                              <span className="text-sm md:text-[15px] font-light leading-relaxed group-hover/li:text-[#1c1917] transition-colors duration-300">
                                {parts.map((part, pidx) =>
                                  /[\d.%]+/.test(part) ? (
                                    <span
                                      key={pidx}
                                      className="font-mono font-bold text-[#0d9488] tracking-wider"
                                    >
                                      {part}
                                    </span>
                                  ) : (
                                    <span key={pidx}>{part}</span>
                                  ),
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
