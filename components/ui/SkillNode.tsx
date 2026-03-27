"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SkillNodeProps {
  name: string;
  delay?: number;
  small?: boolean;
}

export default function SkillNode({
  name,
  delay = 0,
  small = false,
}: SkillNodeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative z-10 inline-flex items-center justify-center bg-[#fdfbf7] border border-[#0d9488]/15 cursor-default group/node ${
        small ? "px-3 py-1.5" : "px-4 md:px-5 py-2.5"
      }`}
    >
      {/* SVG Trace Container */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* Glow Layer */}
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="#0d9488"
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: hovered ? 1 : 0,
            opacity: hovered ? 0.3 : 0,
          }}
          transition={{
            pathLength: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.15 },
          }}
          className="blur-sm"
        />

        {/* Sharp inner line */}
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="#0d9488"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: hovered ? 1 : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            pathLength: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.08 },
          }}
        />
      </svg>

      {/* Subtle inner glow on hover */}
      <span
        className={`absolute inset-0 bg-linear-to-b from-transparent to-[#0d9488]/10 transition-opacity duration-300 pointer-events-none ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <span
        className={`relative z-10 font-bold tracking-wide transition-colors duration-300 ${
          small ? "text-[10px] md:text-xs" : "text-xs md:text-sm"
        } ${hovered ? "text-[#0d9488]" : "text-[#57534e]"}`}
      >
        {name}
      </span>
    </motion.div>
  );
}
