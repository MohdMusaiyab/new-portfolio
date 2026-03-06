"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const WA = (a: number) => `rgba(255,255,255,${a})`;

export default function SkillPill({
  name,
  delay = 0,
}: {
  name: string;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const TRACE = "#93E7FB";

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex items-center gap-2.5 px-4 py-2.5 cursor-default"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        background: hovered
          ? "rgba(147,231,251,0.04)"
          : "rgba(255,255,255,0.02)",
        backdropFilter: "blur(8px)",
        transition: "background 0.35s ease",
      }}
    >
      {/* SVG Container for Tracing Border */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        {/* Glow Layer (references global filter in layout.tsx) */}
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke={TRACE}
          strokeWidth="6"
          filter="url(#skill-pill-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: hovered ? 1 : 0,
            opacity: hovered ? 0.45 : 0,
          }}
          transition={{
            pathLength: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.15 },
          }}
        />

        {/* Sharp inner line */}
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke={TRACE}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: hovered ? 1 : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            pathLength: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.08 },
          }}
        />
      </svg>

      {/* Indicator Dot */}
      <span
        className="shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-500"
        style={{ background: hovered ? TRACE : WA(0.3) }}
      />
      {/* Label */}
      <span
        className="font-dm-mono text-[11px] tracking-[0.16em] uppercase whitespace-nowrap transition-colors duration-500"
        style={{ color: hovered ? TRACE : WA(0.7) }}
      >
        {name}
      </span>
    </motion.span>
  );
}
