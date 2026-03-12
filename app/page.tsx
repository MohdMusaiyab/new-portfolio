"use client";

import { useExperience } from "@/store/useExperience";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
  const { activeExperience } = useExperience();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
  }, [mounted]); //
  if (!mounted) return null;

  return (
    <main className="w-full min-h-screen relative overflow-hidden pb-[100px] md:pb-0">
      <AnimatePresence mode="wait">
        {activeExperience === "default" && <DefaultExperience key="default" />}
        {activeExperience === "winter" && <WinterExperience key="winter" />}
      </AnimatePresence>
    </main>
  );
}
