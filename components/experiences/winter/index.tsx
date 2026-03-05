"use client";

import { motion } from "framer-motion";
import Hero from "./Hero";
import Projects from "./Projects";

export default function WinterExperience() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full"
    >
      <Hero />
      <Projects />
    </motion.div>
  );
}
