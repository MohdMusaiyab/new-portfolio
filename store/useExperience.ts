import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Experience = "default" | "winter";

interface ExperienceState {
  activeExperience: Experience;
  setExperience: (experience: Experience) => void;
}

export const useExperience = create<ExperienceState>()(
  persist(
    (set) => ({
      activeExperience: "default",
      setExperience: (experience) => set({ activeExperience: experience }),
    }),
    {
      name: "experience-storage",
    },
  ),
);
