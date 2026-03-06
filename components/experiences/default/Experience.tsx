"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import experienceData from "@/app/data/experience.json";

export default function DefaultExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const totalItems = experienceData.experience.length;
      if (totalItems === 0) return;
      const progressPerItem = 1 / totalItems;
      const rawIndex = Math.floor(latest / progressPerItem);

      const safeIndex = Math.min(Math.max(rawIndex, 0), totalItems - 1);
      setActiveIndex(safeIndex);
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f8f6f3] text-[#1c1917] font-sans"
    >
      {}
      <div className="max-w-[1300px] mx-auto w-full flex flex-col md:flex-row relative">
        {}
        <div className="md:w-[45%] lg:w-[40%] shrink-0 h-[60vh] md:h-screen md:sticky top-0 p-8 md:p-12 lg:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#e7e2db] bg-[#faf8f5] z-10 overflow-hidden">
          <div className="absolute top-12 left-12 md:top-20 md:left-20 flex items-center gap-3">
            <span className="w-8 h-px bg-[#a8a29e]" />
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
              Professional History
            </h2>
          </div>

          <div className="relative w-full aspect-square md:aspect-4/5 rounded-[24px] overflow-hidden bg-white border border-[#e7e2db] shadow-sm flex items-center justify-center p-8 mt-12 md:mt-0">
            {}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex items-center justify-center p-8"
              >
                {experienceData.experience[activeIndex]?.logo ? (
                  <Image
                    src={experienceData.experience[activeIndex].logo}
                    alt={`${experienceData.experience[activeIndex].company} logo`}
                    fill
                    className="object-contain drop-shadow-md z-10 transition-transform duration-700 hover:scale-110"
                  />
                ) : (
                  <span className="text-[120px] font-black text-[#e7e2db] tracking-tighter">
                    {experienceData.experience[activeIndex]?.company.charAt(0)}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {}
        <div className="md:w-[55%] lg:w-[60%] w-full shrink-0 z-0">
          <div className="flex flex-col">
            {experienceData.experience.map((exp, idx) => {
              return (
                <div
                  key={idx}
                  className="min-h-screen py-32 px-6 md:px-16 lg:px-24 flex flex-col justify-center border-b border-[#e7e2db] last:border-b-0"
                >
                  {}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-[11px] font-bold uppercase tracking-widest text-[#a8a29e]">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                      {exp.duration.start} — {exp.duration.end}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {exp.location}
                    </span>
                  </div>

                  {}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.1] mb-2 text-[#1c1917]">
                    {exp.company}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-medium text-[#57534e] mb-12">
                    <span className="italic font-light mr-2">as</span>
                    {exp.position}
                  </h4>

                  {}
                  <div className="flex flex-col gap-6 mb-16">
                    {exp.highlights.map((highlight, hIdx) => {
                      const parts = highlight
                        .split(/(\d+(?:\.\d+)?[+%]?)/g)
                        .filter(Boolean);
                      return (
                        <div
                          key={hIdx}
                          className="flex gap-6 group cursor-default"
                        >
                          <span className="text-[10px] font-mono font-bold text-[#d6cfc5] group-hover:text-blue-500 transition-colors mt-[5px] shrink-0">
                            0{hIdx + 1}
                          </span>
                          <p className="text-[#57534e] text-base md:text-lg leading-[1.6] md:leading-[1.7] font-light">
                            {parts.map((part, pIdx) =>
                              /\d+(?:\.\d+)?[+%]?/.test(part) ? (
                                <span
                                  key={pIdx}
                                  className="font-mono font-semibold text-[#1c1917] bg-white border border-[#e7e2db] px-[4px] py-[2px] rounded-[4px] mx-px whitespace-nowrap shadow-sm group-hover:border-blue-200 transition-colors"
                                >
                                  {part}
                                </span>
                              ) : (
                                <span key={pIdx}>{part}</span>
                              ),
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {}
                  <div className="pt-8 border-t border-[#e7e2db]">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e] mb-4">
                      Core Stack
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-4 py-2 bg-white border border-[#e7e2db] text-xs font-semibold text-[#57534e] shadow-sm rounded-full tracking-wide hover:scale-105 hover:border-[#d6cfc5] transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
