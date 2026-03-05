"use client";

import { useExperience } from "@/store/useExperience";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { activeExperience, setExperience } = useExperience();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-gray-200/20 dark:border-gray-800/50 p-1.5 rounded-full shadow-lg">
      <button
        onClick={() => setExperience("default")}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
          activeExperience === "default"
            ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
            : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        }`}
      >
        Default
      </button>
      <button
        onClick={() => setExperience("winter")}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
          activeExperience === "winter"
            ? "bg-[#0a0a0a] text-[#F5F0E8] border border-[#c9a84c]/30 shadow-[0_0_15px_rgba(201,168,76,0.2)]"
            : "text-gray-600 dark:text-gray-400 hover:text-[#c9a84c]"
        }`}
      >
        Winter
      </button>
    </div>
  );
}
