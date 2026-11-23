import { create } from "zustand";

export type Experience = "default" | "winter";

interface ExperienceState {
  activeExperience: Experience;
  setExperience: (experience: Experience) => void;
}

export const useExperience = create<ExperienceState>()((set) => ({
  activeExperience: "winter",
  setExperience: () => set({ activeExperience: "winter" }),
}));
