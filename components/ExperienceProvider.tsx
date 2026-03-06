"use client";

import { useEffect } from "react";
import { useExperience } from "@/store/useExperience";
import Header from "@/components/Header";

export default function ExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activeExperience } = useExperience();

  useEffect(() => {
    document.documentElement.setAttribute("data-experience", activeExperience);
  }, [activeExperience]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
