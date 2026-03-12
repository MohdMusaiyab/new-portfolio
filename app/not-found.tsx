"use client";

import Link from "next/link";
import { useExperience } from "@/store/useExperience";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { activeExperience } = useExperience();
  const [mounted, setMounted] = useState(false);
  const isWinter = activeExperience === "winter";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center p-6 ${
        isWinter ? "bg-[#0a0a0a] text-white" : "bg-[#fdfbf7] text-[#1c1917]"
      } font-sans transition-colors duration-700`}
    >
      <div className="relative text-center">
        {/* Animated Background Numbers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className={`absolute inset-0 flex items-center justify-center text-[20rem] font-black pointer-events-none select-none ${
            isWinter ? "text-white" : "text-[#0d9488]"
          }`}
        >
          404
        </motion.div>

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className={`text-8xl md:text-9xl font-black mb-4 tracking-tighter ${
              isWinter ? "text-white" : "font-cinzel text-[#1c1917]"
            }`}
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2
              className={`text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mb-8 ${
                isWinter ? "text-white/70" : "font-cinzel text-[#0d9488]"
              }`}
            >
              Wayward Connection
            </h2>
            <p
              className={`max-w-[40ch] mx-auto text-sm md:text-base mb-12 leading-relaxed ${
                isWinter
                  ? "text-white/50 font-mono"
                  : "text-[#57534e] font-light"
              }`}
            >
             You Might have come on wrong place
            </p>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isWinter
                    ? "bg-white text-black border border-white hover:bg-transparent hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "bg-[#0d9488] text-white hover:bg-[#1c1917] shadow-[0_10px_20px_-5px_rgba(13,148,136,0.3)]"
                }`}
              >
                {isWinter ? "Return to Base" : "Back to Home"}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
