"use client";

/**
 * Plankie Mascot (Default Theme Exclusive)
 *
 * Dynamic Emotional Reactions:
 *   - Facial expressions, eyebrows, mouth, and posture dynamically morph based
 *     on Plankie's active developer thought (anger, confusion, panic, smugness, shock, deep focus).
 *   - Angry: Slanted brows, clenched gritted teeth, red anger mark, furious key pounding.
 *   - Confused: Cocked eyebrow, asymmetrical o_O eyes, crooked mouth, floating sweat drop.
 *   - Panic: Huge shock eyes with shivering pupils, gasping scream mouth, frantic typing.
 *   - Smug: Cocky smirk, relaxed curved eye arcs, leisurely keystrokes.
 *   - Shocked: Sparkle star pupils, wide open happy gasp, hands frozen in disbelief.
 *   - Focused: Concentrated stare with tongue tip peeking out.
 *   - Sleeping: Serene resting curves, closed laptop, floating "Z z z" bubbles.
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const INK = "#2b3a2f";

type MascotMood = "coding" | "walking" | "celebrating";
type DevEmotion = "angry" | "confused" | "panic" | "smug" | "shocked" | "focused";

interface DevThought {
  text: string;
  emotion: DevEmotion;
}

const COMICAL_DEV_THOUGHTS: DevThought[] = [
  { text: "again an issue?! 😤", emotion: "angry" },
  { text: "why is it not working?! 💢", emotion: "angry" },
  { text: "who wrote this?! (git blame: me)", emotion: "confused" },
  { text: "nil pointer dereference 💀", emotion: "panic" },
  { text: "wait... why DID it work? 🤔", emotion: "confused" },
  { text: "merged directly to main 😱", emotion: "panic" },
  { text: "it worked on my machine... 😏", emotion: "smug" },
  { text: "it compiled on first try?! 😳", emotion: "shocked" },
  { text: "goroutine leak detected?! 🚨", emotion: "panic" },
  { text: "404: bug not found 🔍", emotion: "confused" },
  { text: "LGTM, ship it! 🚢", emotion: "smug" },
  { text: "Ctrl+Z Ctrl+Z Ctrl+Z! 😭", emotion: "panic" },
  { text: "all 48 tests passing!! 🎉", emotion: "shocked" },
  { text: "console.log('here 123')", emotion: "focused" },
  { text: "just one more semicolon;", emotion: "focused" },
  { text: "TODO: fix before prod (2024)", emotion: "smug" },
];

export default function PlankieMascot() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [walkDuration, setWalkDuration] = useState(1.4);
  const [facing, setFacing] = useState<1 | -1>(1); // 1 = right, -1 = left
  const [mood, setMood] = useState<MascotMood>("coding");
  const [bubble, setBubble] = useState<string | null>(null);
  const [thoughtIndex, setThoughtIndex] = useState<number>(0);
  const [isAsleep, setIsAsleep] = useState(false);

  const walkingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bubbleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const thoughtIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isScrollingRef = useRef<boolean>(false);

  // Initialize position and track mobile viewport responsiveness
  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => typeof window !== "undefined" && window.innerWidth < 768;
    const mobile = checkIsMobile();
    setIsMobile(mobile);

    // Initial position:
    // On mobile: perched comfortably on the lower runway above the bottom navigation pill
    // On desktop: bottom right corner
    const initialX = mobile
      ? Math.max(20, window.innerWidth - 84)
      : Math.max(20, window.innerWidth - 130);
    const initialY = mobile
      ? window.innerHeight - 145
      : Math.max(20, window.innerHeight - 140);

    setPosition({ x: initialX, y: initialY });
    setTarget({ x: initialX, y: initialY });

    const handleResize = () => {
      const currentMobile = checkIsMobile();
      setIsMobile(currentMobile);
      setTarget((prev) => ({
        x: Math.max(18, Math.min(window.innerWidth - 72, prev.x)),
        y: Math.max(
          currentMobile ? 32 : 104,
          Math.min(window.innerHeight - (currentMobile ? 130 : 95), prev.y)
        ),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track touch gestures to prevent scroll drags from registering as accidental taps
  useEffect(() => {
    if (!mounted) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now(),
        };
        isScrollingRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartRef.current && e.touches.length === 1) {
        const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
        const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
        // If finger moves more than 10px, it's a page scroll gesture
        if (dx > 10 || dy > 10) {
          isScrollingRef.current = true;
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mounted]);

  // Cycle comical programming thoughts while Plankie is actively coding
  useEffect(() => {
    if (!mounted || isAsleep || mood !== "coding") return;

    thoughtIntervalRef.current = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % COMICAL_DEV_THOUGHTS.length);
    }, 3800);

    return () => {
      if (thoughtIntervalRef.current) clearInterval(thoughtIntervalRef.current);
    };
  }, [mounted, isAsleep, mood]);

  // Global click & tap listener: Plankie notices user input and walks over
  useEffect(() => {
    if (!mounted || isAsleep) return;

    const handleWindowClick = (e: MouseEvent) => {
      // If triggered by a touch drag/scroll gesture on mobile, ignore completely
      if (isScrollingRef.current) {
        isScrollingRef.current = false;
        return;
      }

      // Don't react to clicks directly inside Plankie's own interactive controls (cheer / wake buttons)
      const targetEl = e.target as HTMLElement | null;
      if (targetEl && targetEl.closest("[data-mascot-control]")) {
        return;
      }

      const clickX = e.clientX;
      const clickY = e.clientY;

      let clampedX: number;
      let clampedY: number;

      if (isMobile) {
        // ── MOBILE ADAPTATION ──
        // On mobile, there is NO top-level header (desktop header is hidden md:flex)!
        // Only need minimal top headroom (~32px) for speech bubble and notch.
        // At the bottom, respect the floating mobile navigation pill (#site-nav-mobile).
        const MOBILE_SAFE_CEILING = 32;
        const MOBILE_BOTTOM_LIMIT = window.innerHeight - 130;
        const MOBILE_SAFE_LEFT = 18;
        const MOBILE_SAFE_RIGHT = window.innerWidth - 72;

        const offsetX = clickX > window.innerWidth / 2 ? -44 : 18;
        clampedX = Math.max(MOBILE_SAFE_LEFT, Math.min(MOBILE_SAFE_RIGHT, clickX + offsetX));
        clampedY = Math.max(MOBILE_SAFE_CEILING, Math.min(MOBILE_BOTTOM_LIMIT, clickY - 24));
      } else {
        // ── DESKTOP ADAPTATION ──
        // Desktop has fixed top header (64px) + speech bubble headroom = 104px minimum safe Y.
        // Desktop has no bottom navigation pill, so normal bottom margin applies.
        const DESKTOP_SAFE_CEILING = 104;
        const DESKTOP_BOTTOM_LIMIT = window.innerHeight - 95;
        const DESKTOP_SAFE_LEFT = 16;
        const DESKTOP_SAFE_RIGHT = window.innerWidth - 76;

        const offsetX = clickX > window.innerWidth / 2 ? -48 : 24;
        clampedX = Math.max(DESKTOP_SAFE_LEFT, Math.min(DESKTOP_SAFE_RIGHT, clickX + offsetX));
        clampedY = Math.max(DESKTOP_SAFE_CEILING, Math.min(DESKTOP_BOTTOM_LIMIT, clickY - 24));
      }

      // Calculate real distance to pace the walk duration naturally
      const dx = clampedX - position.x;
      const dy = clampedY - position.y;
      const distance = Math.hypot(dx, dy);

      // Steady walking pace
      const speed = isMobile ? 220 : 200;
      const minDuration = isMobile ? 0.6 : 0.9;
      const maxDuration = isMobile ? 2.2 : 2.6;
      const calculatedDuration = reduce ? 0.1 : Math.max(minDuration, Math.min(maxDuration, distance / speed));

      // Turn to face the clicked target rather than just movement vector
      const centerOffsetX = isMobile ? 26 : 34;
      const faceDirection: 1 | -1 = clickX >= clampedX + centerOffsetX ? 1 : -1;
      setFacing(faceDirection);
      setWalkDuration(calculatedDuration);
      setTarget({ x: clampedX, y: clampedY });
      setMood("walking");

      // Curiosity bubble on departure
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      const curiositySymbols = ["?", "✦", "!", "⚙", "01"];
      const randomSymbol = curiositySymbols[Math.floor(Math.random() * curiositySymbols.length)];
      setBubble(randomSymbol);

      // Transition from walking to coding once Plankie arrives
      if (walkingTimeoutRef.current) clearTimeout(walkingTimeoutRef.current);
      walkingTimeoutRef.current = setTimeout(() => {
        setPosition({ x: clampedX, y: clampedY });
        setMood("coding");
        setBubble(null);
      }, calculatedDuration * 1000);
    };

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
      if (walkingTimeoutRef.current) clearTimeout(walkingTimeoutRef.current);
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    };
  }, [mounted, isAsleep, isMobile, position.x, position.y, reduce]);

  // Click handler when visitor directly taps Plankie
  const handleMascotDirectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAsleep) {
      // Wake up Plankie
      setIsAsleep(false);
      setMood("coding");
      setBubble("!");
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      bubbleTimeoutRef.current = setTimeout(() => setBubble(null), 1200);
      return;
    }

    setMood("celebrating");
    setBubble("⭐");
    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setBubble(null);
      setMood("coding");
    }, 1800);
  };

  const currentThought = COMICAL_DEV_THOUGHTS[thoughtIndex];
  const emotion = currentThought.emotion;

  if (!mounted) return null;

  return (
    <div
      aria-label="Plankie, the interactive coding mascot"
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none"
    >
      {/* Plankie Container */}
      <motion.div
        animate={{
          x: target.x,
          y: target.y,
          opacity: isAsleep ? 0.65 : 1,
        }}
        transition={{
          duration: mood === "walking" ? walkDuration : 0.3,
          ease: mood === "walking" ? [0.25, 0.1, 0.25, 1] : "easeInOut",
        }}
        className="absolute top-0 left-0"
      >
        <div
          className="relative group/mascot origin-bottom transition-transform duration-300"
          style={{
            width: isMobile ? 58 : 68,
            height: isMobile ? 64 : 74,
            transform: isMobile ? "scale(0.84)" : "scale(1)",
          }}
        >
          {/* Reaction Bubble (Curiosity or Celebration when clicked) */}
          <AnimatePresence>
            {bubble && !isAsleep && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none z-50"
              >
                <div
                  className="px-2 py-0.5 rounded-full border bg-white text-[#2b3a2f] font-mono font-bold text-[11px] shadow-[1px_1px_0_0_#2b3a2f] flex items-center justify-center leading-none"
                  style={{ borderColor: INK }}
                >
                  <span>{bubble}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sleeping Z-Z-Z Floating Bubbles when Resting */}
          <AnimatePresence>
            {isAsleep && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: -12 }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                className="absolute -top-8 right-1 pointer-events-none flex items-center gap-0.5 font-mono font-bold text-[#2b3a2f]"
              >
                <span className="text-[12px]">Z</span>
                <span className="text-[9.5px] opacity-75">z</span>
                <span className="text-[7.5px] opacity-50">z</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── COMICAL DEVELOPER THOUGHT BUBBLE WITH EMOTIONAL ACCENTS ── */}
          <AnimatePresence mode="wait">
            {mood === "coding" && !isAsleep && !bubble && (
              <motion.div
                key={currentThought.text}
                initial={{ opacity: 0, scale: 0.85, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-9 left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap"
              >
                <div
                  className={`relative px-2 py-0.5 rounded-md border text-[9.5px] font-mono font-bold text-[#2b3a2f] shadow-[1.5px_1.5px_0_0_#2b3a2f] flex items-center gap-1 leading-tight ${
                    emotion === "angry"
                      ? "bg-[#ff9aa2]/35 border-[#2b3a2f]"
                      : emotion === "panic"
                      ? "bg-[#ffd23f]/40 border-[#2b3a2f]"
                      : emotion === "shocked" || emotion === "smug"
                      ? "bg-[#a8d672]/30 border-[#2b3a2f]"
                      : "bg-white border-[#2b3a2f]"
                  }`}
                  style={{ borderColor: INK }}
                >
                  <span>{currentThought.text}</span>
                  {/* Thought bubble pointer pointing down to Plankie */}
                  <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-r border-b rotate-45 ${
                      emotion === "angry"
                        ? "bg-[#ff9aa2]/35 border-[#2b3a2f]"
                        : emotion === "panic"
                        ? "bg-[#ffd23f]/40 border-[#2b3a2f]"
                        : emotion === "shocked" || emotion === "smug"
                        ? "bg-[#a8d672]/30 border-[#2b3a2f]"
                        : "bg-white border-[#2b3a2f]"
                    }`}
                    style={{ borderColor: INK }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Mascot Body Wrapper */}
          <button
            type="button"
            data-mascot-control="true"
            onClick={handleMascotDirectClick}
            title={
              isAsleep
                ? "Plankie is sleeping... (Click to wake up)"
                : mood === "coding"
                ? `Plankie feels ${emotion}: "${currentThought.text}" (Click to cheer!)`
                : "Plankie: Walking to inspection site"
            }
            className="pointer-events-auto cursor-pointer focus:outline-none relative w-full h-full flex items-center justify-center"
            style={{ transform: `scaleX(${facing})` }}
          >
            {/* SVG Character: Plankie */}
            <svg
              viewBox="0 0 64 68"
              className="w-14 h-16 filter drop-shadow-[2px_2.5px_0_#2b3a2f]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Legs: ONLY animate during walking; completely still during sleep or coding */}
              <g>
                {/* Left Leg & Boot */}
                <motion.g
                  animate={
                    mood === "walking" && !reduce
                      ? { rotate: [-24, 24, -24] }
                      : isAsleep
                      ? { rotate: 8, y: 1 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{
                    repeat: mood === "walking" && !reduce ? Infinity : 0,
                    duration: 0.22,
                    ease: "easeInOut",
                  }}
                  style={{ originX: "20px", originY: "46px" }}
                >
                  <line x1="20" y1="46" x2="20" y2="57" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
                  <ellipse cx="18" cy="58" rx="4.5" ry="2.5" fill="#f4a259" stroke={INK} strokeWidth="1.8" />
                </motion.g>

                {/* Right Leg & Boot */}
                <motion.g
                  animate={
                    mood === "walking" && !reduce
                      ? { rotate: [24, -24, 24] }
                      : isAsleep
                      ? { rotate: -8, y: 1 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{
                    repeat: mood === "walking" && !reduce ? Infinity : 0,
                    duration: 0.22,
                    ease: "easeInOut",
                  }}
                  style={{ originX: "32px", originY: "46px" }}
                >
                  <line x1="32" y1="46" x2="32" y2="57" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
                  <ellipse cx="34" cy="58" rx="4.5" ry="2.5" fill="#f4a259" stroke={INK} strokeWidth="1.8" />
                </motion.g>
              </g>

              {/* Plank Body Container: Reacts with emotional postures */}
              <motion.g
                animate={
                  mood === "walking" && !reduce
                    ? { y: [0, -3.5, 0], x: 0 }
                    : isAsleep && !reduce
                    ? { y: [0, -1.2, 0], x: 0 }
                    : mood === "coding" && emotion === "angry" && !reduce
                    ? { x: [0, -1.2, 1.2, 0], y: [0, -1.2, 0] }
                    : mood === "coding" && emotion === "panic" && !reduce
                    ? { x: [0, -1, 1, 0], y: [0, -2, 0] }
                    : mood === "coding" && emotion === "shocked" && !reduce
                    ? { y: [0, -3, 0] }
                    : mood === "coding" && !reduce
                    ? { y: [0, -1.5, 0], x: 0 }
                    : mood === "celebrating" && !reduce
                    ? { y: [0, -10, 0], rotate: [0, -8, 8, 0] }
                    : { x: 0, y: 0 }
                }
                transition={{
                  repeat: isAsleep || mood === "coding" || mood === "walking" ? Infinity : 0,
                  duration:
                    isAsleep
                      ? 2.8
                      : mood === "walking"
                      ? 0.22
                      : emotion === "angry" || emotion === "panic"
                      ? 0.16
                      : 1.2,
                  ease: "easeInOut",
                }}
              >
                {/* Main Timber Body (#ffd23f Sun Yellow with #2b3a2f Ink outline) */}
                <rect
                  x="10"
                  y="12"
                  width="34"
                  height="36"
                  rx="6"
                  fill="#ffd23f"
                  stroke={INK}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Wood Grain Lines */}
                <path d="M15 17 Q24 16 36 17" stroke="#e8b828" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 41 Q22 42 38 41" stroke="#e8b828" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="34" cy="22" r="1.5" fill="#e8b828" />

                {/* ── EYEBROWS (Morphing with Emotion) ── */}
                {!isAsleep && mood === "coding" && (
                  <g>
                    {emotion === "angry" ? (
                      // Sharp angry inward slants
                      <>
                        <path d="M18 19 L24 21.5" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
                        <path d="M36 19 L30 21.5" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
                      </>
                    ) : emotion === "confused" ? (
                      // One high puzzled arch, one flat
                      <>
                        <path d="M18 18 Q21 15 24 17" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
                        <path d="M30 21 L36 22" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                      </>
                    ) : emotion === "panic" ? (
                      // High terrified arches
                      <>
                        <path d="M18 18 Q21 14 24 17" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                        <path d="M30 17 Q33 14 36 18" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                      </>
                    ) : emotion === "smug" ? (
                      // Relaxed cocky diagonal
                      <>
                        <path d="M19 20 L24 19" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                        <path d="M30 19 Q33 17 36 19" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                      </>
                    ) : emotion === "shocked" ? (
                      // High disbelief arches
                      <>
                        <path d="M18 17 Q21 13 24 16" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
                        <path d="M30 16 Q33 13 36 17" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
                      </>
                    ) : (
                      // Focused horizontal brows
                      <>
                        <path d="M18 20 L24 20" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                        <path d="M30 20 L36 20" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                      </>
                    )}
                  </g>
                )}

                {/* ── EYES (Morphing with Emotion) ── */}
                {isAsleep ? (
                  // Serene sleeping eyes
                  <>
                    <path d="M19 28 Q22 31 25 28" stroke={INK} strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <path d="M29 28 Q32 31 35 28" stroke={INK} strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  </>
                ) : mood === "celebrating" ? (
                  // Joyful happy closed arcs
                  <>
                    <path d="M19 26 Q22 22 25 26" stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none" />
                    <path d="M29 26 Q32 22 35 26" stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none" />
                  </>
                ) : emotion === "angry" && mood === "coding" ? (
                  // Furious anime squints (> <)
                  <>
                    <path d="M19 23 L24 25 L19 27" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M35 23 L30 25 L35 27" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
                  </>
                ) : emotion === "confused" && mood === "coding" ? (
                  // Asymmetrical puzzled o_O eyes
                  <>
                    <circle cx="21" cy="25" r="2.1" fill={INK} />
                    <circle cx="21.7" cy="24.3" r="0.8" fill="#ffffff" />
                    <circle cx="33" cy="25" r="3.2" fill={INK} />
                    <circle cx="34" cy="24" r="1.1" fill="#ffffff" />
                    {/* Small blue sweat drop */}
                    <path d="M39 20 Q41 18 40 16 Q38 18 39 20" fill="#4fb3d9" stroke={INK} strokeWidth="0.8" />
                  </>
                ) : emotion === "panic" && mood === "coding" ? (
                  // Giant wide shock eyes with tiny jittery pupils (O O)
                  <>
                    <circle cx="21" cy="25" r="3.6" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
                    <circle cx="21" cy="25" r="1.3" fill={INK} />
                    <circle cx="33" cy="25" r="3.6" fill="#ffffff" stroke={INK} strokeWidth="1.8" />
                    <circle cx="33" cy="25" r="1.3" fill={INK} />
                  </>
                ) : emotion === "smug" && mood === "coding" ? (
                  // Smug relaxed arcs looking sideways
                  <>
                    <path d="M19 26 Q22 23 25 26" stroke={INK} strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <path d="M29 25 Q32 22 35 25" stroke={INK} strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  </>
                ) : emotion === "shocked" && mood === "coding" ? (
                  // Huge wide sparkling eyes with star catchlight
                  <>
                    <circle cx="21" cy="25" r="3.5" fill={INK} />
                    <circle cx="22" cy="24" r="1.4" fill="#ffffff" />
                    <circle cx="33" cy="25" r="3.5" fill={INK} />
                    <circle cx="34" cy="24" r="1.4" fill="#ffffff" />
                  </>
                ) : (
                  // Focused coding / curious eyes
                  <>
                    <circle cx="21" cy="25" r="2.4" fill={INK} />
                    <circle cx="33" cy="25" r="2.4" fill={INK} />
                    <circle cx="22" cy="24" r="0.8" fill="#ffffff" />
                    <circle cx="34" cy="24" r="0.8" fill="#ffffff" />
                  </>
                )}

                {/* ── CHEEKS (Blushing with Emotion) ── */}
                <ellipse
                  cx="16"
                  cy="30"
                  rx="2.5"
                  ry="1.6"
                  fill={emotion === "angry" && mood === "coding" ? "#ff6b6b" : "#ff9aa2"}
                  opacity={emotion === "panic" && mood === "coding" ? 0.4 : 0.9}
                />
                <ellipse
                  cx="38"
                  cy="30"
                  rx="2.5"
                  ry="1.6"
                  fill={emotion === "angry" && mood === "coding" ? "#ff6b6b" : "#ff9aa2"}
                  opacity={emotion === "panic" && mood === "coding" ? 0.4 : 0.9}
                />

                {/* Anger Vein Symbol 💢 when Angry */}
                {emotion === "angry" && mood === "coding" && !isAsleep && (
                  <g>
                    <path d="M39 14 L43 14 M41 12 L41 16" stroke="#e02424" strokeWidth="1.6" strokeLinecap="round" />
                  </g>
                )}

                {/* ── MOUTH (Morphing with Emotion) ── */}
                {isAsleep ? (
                  // Sleeping peaceful smile
                  <path d="M24 33 Q27 34 30 33" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
                ) : mood === "celebrating" ? (
                  // Open celebration cheer
                  <path d="M23 29 Q27 36 31 29 Z" stroke={INK} strokeWidth="1.8" fill="#ff9aa2" />
                ) : emotion === "angry" && mood === "coding" ? (
                  // Clenched gritted teeth grimace!
                  <g>
                    <rect x="23" y="30" width="8" height="4" rx="1" fill="#ffffff" stroke={INK} strokeWidth="1.6" />
                    <line x1="25.5" y1="30" x2="25.5" y2="34" stroke={INK} strokeWidth="1" />
                    <line x1="28.5" y1="30" x2="28.5" y2="34" stroke={INK} strokeWidth="1" />
                    <line x1="23" y1="32" x2="31" y2="32" stroke={INK} strokeWidth="1" />
                  </g>
                ) : emotion === "confused" && mood === "coding" ? (
                  // Crooked wavy perplexed mouth
                  <path d="M23 32 Q26 29 28 32 Q30 33 32 31" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
                ) : emotion === "panic" && mood === "coding" ? (
                  // Open shuddering gasp/scream
                  <ellipse cx="27" cy="32" rx="3" ry="4.2" fill={INK} stroke={INK} strokeWidth="1" />
                ) : emotion === "smug" && mood === "coding" ? (
                  // Cocky half-smirk
                  <path d="M24 31 Q28 34 32 30" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
                ) : emotion === "shocked" && mood === "coding" ? (
                  // Wide open happy gasp
                  <path d="M23 29 Q27 36 31 29 Z" fill="#ff9aa2" stroke={INK} strokeWidth="1.8" />
                ) : (
                  // Focused mouth with tongue tip peeking out
                  <g>
                    <path d="M24 31 Q27 32 30 31" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M28 31 Q28.5 33.5 30 33.5 Q31.5 33.5 31 31 Z" fill="#ff9aa2" stroke={INK} strokeWidth="0.8" />
                  </g>
                )}

                {/* Builder Cap / Miniature Hardhat on Top */}
                <path d="M12 14 Q27 8 42 14" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
                <rect x="18" y="7" width="18" height="6" rx="2.5" fill="#ffd23f" stroke={INK} strokeWidth="2" />

                {/* ── COMPUTER / CODING SETUP (Active when idle/coding) ── */}
                {mood === "coding" && !isAsleep && (
                  <g>
                    {/* Miniature Laptop Base (Keyboard) */}
                    <rect
                      x="33"
                      y="45"
                      width="18"
                      height="4"
                      rx="1"
                      fill="#e2e8f0"
                      stroke={INK}
                      strokeWidth="1.6"
                    />
                    {/* Keyboard key hints */}
                    <line x1="35" y1="47" x2="49" y2="47" stroke={INK} strokeWidth="1" strokeDasharray="1.2 1" />

                    {/* Open Laptop Display with River Blue screen (#4fb3d9) */}
                    <polygon
                      points="47,45 53,30 57,31 51,46"
                      fill={emotion === "angry" ? "#ff9aa2" : "#4fb3d9"}
                      stroke={INK}
                      strokeWidth="1.5"
                    />
                    {/* Glowing mini code scanlines on screen */}
                    <line x1="49" y1="35" x2="54" y2="36" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                    <line
                      x1="48"
                      y1="39"
                      x2="52"
                      y2="40"
                      stroke={emotion === "angry" ? "#e02424" : "#a8d672"}
                      strokeWidth="1"
                      strokeLinecap="round"
                    />

                    {/* Clacking Hands typing with emotion-based cadence */}
                    <motion.ellipse
                      cx="37"
                      cy="44"
                      rx="2.2"
                      ry="1.8"
                      fill="#ffd9b3"
                      stroke={INK}
                      strokeWidth="1.3"
                      animate={
                        emotion === "shocked"
                          ? { y: -4 } // Hands frozen in awe!
                          : !reduce
                          ? { y: [0, -2.5, 0] }
                          : {}
                      }
                      transition={{
                        repeat: emotion === "shocked" ? 0 : Infinity,
                        duration: emotion === "angry" || emotion === "panic" ? 0.09 : emotion === "smug" ? 0.32 : 0.18,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.ellipse
                      cx="42"
                      cy="44"
                      rx="2.2"
                      ry="1.8"
                      fill="#ffd9b3"
                      stroke={INK}
                      strokeWidth="1.3"
                      animate={
                        emotion === "shocked"
                          ? { y: -4 } // Hands frozen in awe!
                          : !reduce
                          ? { y: [-2.5, 0, -2.5] }
                          : {}
                      }
                      transition={{
                        repeat: emotion === "shocked" ? 0 : Infinity,
                        duration: emotion === "angry" || emotion === "panic" ? 0.09 : emotion === "smug" ? 0.32 : 0.18,
                        ease: "easeInOut",
                        delay: emotion === "shocked" ? 0 : 0.05,
                      }}
                    />
                  </g>
                )}

                {/* ── CLOSED LAPTOP WHEN ASLEEP / WALKING ── */}
                {(isAsleep || mood === "walking") && (
                  <g>
                    {/* Tucked or Closed Laptop */}
                    <rect
                      x="34"
                      y={isAsleep ? "48" : "36"}
                      width="15"
                      height="4.5"
                      rx="1"
                      fill="#cbd5e1"
                      stroke={INK}
                      strokeWidth="1.5"
                    />
                    {/* Tiny logo dot on lid */}
                    <circle cx="41.5" cy={isAsleep ? "50.2" : "38.2"} r="0.8" fill={INK} />
                    {/* Arm holding laptop */}
                    <path
                      d={isAsleep ? "M30 38 Q34 46 38 48" : "M32 35 Q36 37 38 36"}
                      stroke={INK}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </motion.g>
            </svg>
          </button>

          {/* Minimal Sleep/Wake Toggle Pill */}
          <div
            className={`absolute -bottom-5 left-1/2 -translate-x-1/2 transition-opacity duration-200 pointer-events-auto flex items-center gap-1 ${
              isAsleep ? "opacity-100" : "opacity-0 md:group-hover/mascot:opacity-100"
            }`}
          >
            <button
              type="button"
              data-mascot-control="true"
              onClick={(e) => {
                e.stopPropagation();
                setIsAsleep((p) => !p);
              }}
              className="px-2 py-0.5 rounded text-[8.5px] font-mono font-bold text-[#2b3a2f] bg-white border border-[#2b3a2f]/30 shadow-[1px_1px_0_0_#2b3a2f] hover:bg-[#ffd23f]/30 transition-all cursor-pointer whitespace-nowrap"
            >
              {isAsleep ? "Wake Up" : "Take a Nap"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
