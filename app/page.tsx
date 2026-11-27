"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useExperience } from "@/store/useExperience";

const DefaultExperience = dynamic(
  () => import("@/components/experiences/default/index"),
  {
    ssr: false,
  },
);

const WinterExperience = dynamic(
  () => import("@/components/experiences/winter/index"),
  {
    ssr: false,
  },
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { activeExperience } = useExperience();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const hash = window.location.hash; // e.g. "#skills"
    if (!hash) return;

    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <main
      className={`w-full min-h-screen relative overflow-hidden pb-[100px] md:pb-0 transition-colors duration-300 ${
        activeExperience === "default"
          ? "bg-white text-zinc-950"
          : "bg-[#09090b] text-[#f8fafc]"
      }`}
    >
      {activeExperience === "default" ? (
        <DefaultExperience />
      ) : (
        <WinterExperience />
      )}
    </main>
  );
}
