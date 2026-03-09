"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import educationData from "@/app/data/education.json";

export default function DefaultEducation() {
  // Reverse chronological order
  const sortedEducation = [...educationData.education].reverse();

  return (
    <section
      id="education"
      className="relative w-full bg-[#fdfbf7] py-24 md:py-32 text-[#1c1917] font-sans overflow-hidden selection:bg-[#0d9488] selection:text-[#fdfbf7]"
    >
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] right-[20%] h-px bg-[#0d9488]/10" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[#0d9488]/5 blur-[150px] rounded-full translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-[#0d9488]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d9488]">
                Academic Background
              </span>
            </div>
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-[#1c1917]">
              Education <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0d9488] to-[#042f2e]">
                History.
              </span>
            </h3>
          </div>
          <p className="max-w-[42ch] text-[#57534e] text-sm md:text-base lg:text-lg font-light leading-relaxed pb-2 md:text-right">
            A chronological timeline of my academic journey, foundations, and
            qualifications.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Timeline Line (Desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#0d9488]/30 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-12 lg:gap-24 relative z-10">
            {sortedEducation.map((edu, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.1,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Panel */}
                  <div
                    className={`w-full lg:w-1/2 flex flex-col ${isEven ? "lg:items-end" : "lg:items-start"}`}
                  >
                    <div className="relative w-full max-w-[480px] bg-white border border-[#0d9488]/15 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_-12px_rgba(13,148,136,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(13,148,136,0.2)] hover:border-[#0d9488]/40 transition-all duration-500 overflow-hidden text-left">
                      {/* Decorative Background Accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0d9488]/5 rounded-bl-full pointer-events-none" />

                      <div className="flex items-center gap-6 mb-8 relative z-10">
                        {/* Logo Box */}
                        <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 bg-[#fdfbf7] rounded-2xl border border-[#0d9488]/20 flex items-center justify-center overflow-hidden p-3 shadow-inner group-hover:border-[#0d9488]/50 transition-all duration-500">
                          {edu.logo ? (
                            <Image
                              src={edu.logo}
                              alt={edu.institution}
                              fill
                              sizes="80px"
                              className="object-contain p-2"
                            />
                          ) : (
                            <span className="text-2xl md:text-3xl font-black text-[#0d9488]/40">
                              {edu.institution.charAt(0)}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center w-fit px-3 py-1 bg-[#fdfbf7] border border-[#0d9488]/20 rounded-md text-[10px] md:text-xs font-bold tracking-widest text-[#0d9488]">
                            {edu.startYear} — {edu.endYear}
                          </span>
                          {edu.score && (
                            <span className="inline-flex items-center w-fit gap-1 text-[11px] font-bold text-[#1c1917] tracking-wider mt-1 border-b border-[#0d9488]/30 pb-0.5">
                              {edu.score}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10">
                        <h4 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-2 text-[#1c1917] group-hover:text-[#0d9488] transition-colors duration-500">
                          {edu.institution}
                        </h4>
                        <p className="text-sm md:text-base font-medium text-[#57534e] leading-relaxed">
                          {edu.degree}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Node (Desktop only) */}
                  <div className="hidden lg:flex shrink-0 w-16 h-16 items-center justify-center relative">
                    <div className="w-4 h-4 rounded-full border-2 border-[#0d9488] bg-[#fdfbf7] z-10 shadow-[0_0_15px_rgba(13,148,136,0.4)] transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#0d9488]/20 rounded-full animate-ping opacity-20" />
                  </div>

                  {/* Empty space for balance */}
                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
