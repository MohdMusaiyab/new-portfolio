"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WinterExperience = dynamic(
  () => import("@/components/experiences/winter/index"),
  {
    ssr: false,
  },
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

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
    <main className="w-full min-h-screen relative overflow-hidden pb-[100px] md:pb-0 bg-[#09090b]">
      <WinterExperience />
    </main>
  );
}
