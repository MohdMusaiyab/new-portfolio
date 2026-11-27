import { create } from "zustand";

export type Experience = "default" | "winter";

interface ExperienceState {
  activeExperience: Experience;
  setExperience: (experience: Experience) => void;
}

export const useExperience = create<ExperienceState>()((set) => ({
  activeExperience: "default",
  setExperience: (experience: Experience) => set({ activeExperience: experience }),
}));
