"use client";

import { useExperience } from "@/store/useExperience";

export default function ThemeSwitcher() {
  const { activeExperience, setExperience } = useExperience();

  return (
    <div className="flex items-center p-1 rounded-full border border-zinc-200 bg-zinc-100 text-xs font-mono">
      <button
        type="button"
        onClick={() => setExperience("default")}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          activeExperience === "default"
            ? "bg-white text-zinc-950 font-semibold shadow-2xs"
            : "text-zinc-500 hover:text-zinc-900"
        }`}
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setExperience("winter")}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          activeExperience === "winter"
            ? "bg-zinc-950 text-white font-semibold shadow-2xs"
            : "text-zinc-500 hover:text-zinc-900"
        }`}
      >
        Winter
      </button>
    </div>
  );
}
