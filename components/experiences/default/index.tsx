"use client";

import { motion } from "framer-motion";
import Hero from "./Hero";
import Experience from "./Experience";
import Projects from "./Projects";
import Education from "./Education";
import Skills from "./Skills";
import Contact from "./Contact";

export default function DefaultExperienceLayout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full"
    >
      <Hero />
      <Experience />
      <Projects />
      <Education />
      <Skills />
      <Contact />
    </motion.div>
  );
}
