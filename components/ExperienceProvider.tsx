"use client";

import { useEffect } from "react";
import { useExperience } from "@/store/useExperience";
import ThemeSwitcher from "@/components/ThemeSwitcher";

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
      <ThemeSwitcher />
      {children}
    </>
  );
}
