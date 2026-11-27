"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import educationData from "@/app/data/education.json";

export default function DefaultEducation() {
  const reduce = useReducedMotion();
  const sorted = [...educationData.education].reverse();

  return (
    <section id="education" className="w-full py-10 sm:py-14 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-zinc-100">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
            Education
          </h2>
        </div>

        <div className="mt-6 sm:mt-7 space-y-3.5 sm:space-y-4">
          {sorted.map((edu, idx) => (
            <motion.article
              key={edu.institution}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl border border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-2xs transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                <div className="relative w-12 h-12 rounded-xl border border-zinc-200 bg-zinc-50 shrink-0 overflow-hidden flex items-center justify-center p-2">
                  {edu.logo ? (
                    <Image
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <span className="font-mono text-base font-bold text-zinc-800">
                      {edu.institution.charAt(0)}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-950 tracking-tight">
                    {edu.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mt-1 font-mono">
                    <span className="font-medium text-zinc-800">{edu.institution}</span>
                    <span>•</span>
                    <span className="text-zinc-600 tabular-nums">
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                </div>
              </div>

              {edu.score && (
                <div className="flex items-center gap-2 shrink-0 sm:self-center pl-16 sm:pl-0">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-50 text-zinc-800 border border-zinc-200/80">
                    {edu.score}
                  </span>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
