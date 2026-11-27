"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Terminal, X, RefreshCw } from "lucide-react";

interface CompanionThought {
  tag: string;
  text: string;
}

const DEV_TELEMETRY: CompanionThought[] = [
  { tag: "SYSTEMS", text: "goroutine worker pool humming at peak efficiency" },
  { tag: "REDIS", text: "pub/sub latency < 1.2ms across all channels" },
  { tag: "PRODUCTION", text: "120+ enterprise bugs diagnosed & resolved" },
  { tag: "MEMORY", text: "heap allocations stable: zero memory leaks" },
  { tag: "CI/CD", text: "all 48 integration tests passing green" },
  { tag: "ARCH", text: "idempotency keys verified for distributed engine" },
  { tag: "STATUS", text: "open to backend & full-stack opportunities" },
];

export default function SleekCompanion() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [thoughtIdx, setThoughtIdx] = useState(0);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const companionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pupil cursor tracking
  useEffect(() => {
    if (reduce || !mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!companionRef.current) return;
      const rect = companionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const maxDistance = 4; // max pupil movement in px

      if (distance === 0) {
        setPupilOffset({ x: 0, y: 0 });
      } else {
        const factor = Math.min(distance / 200, 1);
        setPupilOffset({
          x: (deltaX / distance) * maxDistance * factor,
          y: (deltaY / distance) * maxDistance * factor,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduce, mounted]);

  // Periodic natural blink
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4500);
    return () => clearInterval(interval);
  }, [reduce]);

  // Next thought click handler
  const handleCycleThought = () => {
    setThoughtIdx((prev) => (prev + 1) % DEV_TELEMETRY.length);
  };

  if (!mounted) return null;

  const currentThought = DEV_TELEMETRY[thoughtIdx];

  return (
    <div
      ref={companionRef}
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center select-none"
    >
      <AnimatePresence mode="wait">
        {collapsed ? (
          <motion.button
            key="collapsed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setCollapsed(false)}
            title="Expand companion widget"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200/90 bg-white/90 backdrop-blur-md shadow-sm hover:border-zinc-400 text-zinc-700 transition-all cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-950 animate-pulse" />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-zinc-200/90 bg-white/95 backdrop-blur-md shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-200"
          >
            {/* Minimalist interactive eye orb */}
            <button
              type="button"
              onClick={handleCycleThought}
              title="Click companion for dev thoughts"
              className="relative flex items-center justify-center w-6 h-6 rounded-full bg-zinc-950 shrink-0 cursor-pointer overflow-hidden transition-transform active:scale-90"
            >
              {/* Pupil tracking */}
              <motion.span
                className="w-2 h-2 rounded-full bg-white shadow-2xs"
                animate={
                  isBlinking
                    ? { scaleY: 0.1 }
                    : {
                        scaleY: 1,
                        x: pupilOffset.x,
                        y: pupilOffset.y,
                      }
                }
                transition={{ duration: 0.1 }}
              />
            </button>

            {/* Telemetry thought pill */}
            <div
              onClick={handleCycleThought}
              className="flex items-center gap-2 cursor-pointer max-w-[280px] text-left"
            >
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/60 uppercase shrink-0">
                {currentThought.tag}
              </span>
              <span className="text-xs font-mono text-zinc-700 truncate">
                {currentThought.text}
              </span>
            </div>

            {/* Cycle & Collapse buttons */}
            <div className="flex items-center gap-1 pl-1 border-l border-zinc-200/80">
              <button
                type="button"
                onClick={handleCycleThought}
                title="Next status"
                className="p-1 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
              >
                <RefreshCw size={11} />
              </button>
              <button
                type="button"
                onClick={() => setCollapsed(true)}
                title="Minimize companion"
                className="p-1 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
