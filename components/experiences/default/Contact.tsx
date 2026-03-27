"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/MohdMusaiyab",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN || "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: process.env.NEXT_PUBLIC_PERSONAL_TWITTER || "https://twitter.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function Field({
  label,
  id,
  type = "text",
  textarea = false,
  value,
  onChange,
  disabled,
}: {
  label: string;
  id: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const shared: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `2px solid ${focused ? "#0d9488" : "rgba(13,148,136,0.15)"}`,
    color: "#1c1917",
    fontFamily: "inherit",
    fontSize: "16px",
    fontWeight: "500",
    outline: "none",
    padding: "16px 0 12px",
    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
    boxShadow: focused ? "0 4px 6px -6px rgba(13,148,136,0.3)" : "none",
    resize: "none",
  };

  return (
    <div className="relative flex flex-col group">
      <label
        htmlFor={id}
        className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-400"
        style={{ color: active ? "#0d9488" : "#a8a29e" }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          style={shared}
          className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] selection:bg-[#0d9488] selection:text-white"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          style={shared}
          className="selection:bg-[#0d9488] selection:text-white"
        />
      )}
    </div>
  );
}

export default function DefaultContact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const disabled = status === "sending" || status === "sent";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#fdfbf7] text-[#1c1917] font-sans overflow-hidden selection:bg-[#0d9488] selection:text-white"
    >
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[-20%] left-0 w-[60vw] h-[60vw] bg-[#0d9488]/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-[clamp(2.5rem,8vh,5rem)]">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-[#0d9488]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d9488]">
                Get In Touch
              </span>
            </div>
            <h2 className="text-[clamp(1.75rem,min(5vw,8vh),6rem)] font-black uppercase tracking-tighter leading-[0.85] text-[#1c1917]">
              Let&apos;s <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0d9488] to-[#042f2e]">
                Connect.
              </span>
            </h2>
          </div>

          {/* ✦ Improved tagline copy — dev-specific, memorable */}
          <p className="max-w-[42ch] text-[#57534e] text-sm md:text-base lg:text-lg font-light leading-relaxed pb-2 md:text-right">
            I write code that ships, systems that scale, and interfaces people
            remember.{" "}
            <span className="text-[#0d9488] font-medium">
              Drop a message — let&apos;s build something worth talking about.
            </span>
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Form Side */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="w-full lg:w-[58%]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              <Field
                label="Subject"
                id="contact-subject"
                value={form.subject}
                onChange={set("subject")}
                disabled={disabled}
              />
              <Field
                label="Message"
                id="contact-message"
                textarea
                value={form.message}
                onChange={set("message")}
                disabled={disabled}
              />

              <div className="flex items-center gap-6 pt-6">
                {/* ✦ Sharp-cornered send button — feels more like a terminal action */}
                <motion.button
                  type="submit"
                  disabled={disabled}
                  whileHover={disabled ? {} : { scale: 1.03 }}
                  whileTap={disabled ? {} : { scale: 0.97 }}
                  className="relative overflow-hidden flex items-center gap-3 px-10 py-4 border border-[#0d9488]/30 rounded-sm text-xs font-bold uppercase tracking-[0.15em] transition-all duration-400 group shadow-sm hover:shadow-[0_8px_24px_-6px_rgba(13,148,136,0.5)]"
                  style={{
                    background: status === "sent" ? "#fdfbf7" : "#0d9488",
                    color: status === "sent" ? "#0d9488" : "#fdfbf7",
                    cursor: disabled ? "default" : "pointer",
                  }}
                >
                  {/* Sweep gradient hover on idle state */}
                  {status === "idle" && (
                    <span className="absolute inset-0 bg-linear-to-r from-[#0d9488] to-[#042f2e] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  )}

                  <AnimatePresence mode="wait">
                    {status === "sending" ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 flex items-center gap-3"
                      >
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting...
                      </motion.span>
                    ) : status === "sent" ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 flex items-center gap-2"
                      >
                        Message Sent
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.span>
                    ) : status === "error" ? (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 flex items-center gap-2 text-rose-300"
                      >
                        Transmit Failed
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 flex items-center gap-2"
                      >
                        Send Message{" "}
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Details Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.2,
            }}
            className="w-full lg:w-[42%] flex flex-col gap-6"
          >
            {/* ✦ Info Box — tightened padding, reworded heading, sharper corners */}
            <div className="relative bg-white border border-[#0d9488]/15 rounded-xl p-6 overflow-hidden shadow-[0_8px_30px_-12px_rgba(13,148,136,0.1)] group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#0d9488]/5 rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-150" />
              {/* ✦ Replaced "Establish Connection" with dev-toned heading */}
              <p className="relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#0d9488] mb-3">
                <span className="font-mono opacity-60 mr-1">{'//'}</span> Always Reachable
              </p>
              <p className="relative z-10 text-sm leading-relaxed text-[#57534e] font-light">
                Got a tricky architecture problem, a product idea, or just want
                to nerd out over tech? My inbox is open — no ticket system, no
                gatekeeping.
              </p>
            </div>

            {/* ✦ Socials — renamed heading, glow + scale hover */}
            <div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#a8a29e] mb-5">
                Follow the Signal
              </p>
              <div className="flex flex-col">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.3 + i * 0.1,
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative flex items-center justify-between py-3 border-b border-[#0d9488]/10 last:border-b-0 overflow-hidden transition-all duration-300 hover:shadow-[0_0_18px_-4px_rgba(13,148,136,0.25)] rounded-lg px-2 -mx-2"
                    style={{ textDecoration: "none" }}
                  >
                    {/* Hover Sweep BG */}
                    <span className="absolute inset-0 bg-linear-to-r from-[#0d9488]/8 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.19,1,0.22,1] rounded-lg" />

                    <div className="relative z-10 flex items-center gap-4">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#fdfbf7] border border-[#0d9488]/20 text-[#57534e] group-hover:border-[#0d9488] group-hover:text-[#0d9488] group-hover:scale-110 group-hover:shadow-[0_0_12px_-2px_rgba(13,148,136,0.4)] transition-all duration-300">
                        {s.icon}
                      </div>
                      <span className="text-sm font-bold tracking-wider uppercase text-[#1c1917] group-hover:text-[#0d9488] transition-colors duration-300">
                        {s.label}
                      </span>
                    </div>

                    <span className="relative z-10 text-[#a8a29e] group-hover:text-[#0d9488] group-hover:-rotate-45 transition-all duration-300">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* ✦ Email box — sharp corners, tighter padding */}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "musaiyab2003@gmail.com"}`}
              className="group relative bg-[#0d9488]/5 p-5 border border-[#0d9488]/15 overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_-8px_rgba(13,148,136,0.35)] hover:border-[#0d9488]/40"
              style={{ textDecoration: "none" }}
            >
              <div className="absolute inset-0 bg-[#0d9488]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#0d9488] mb-2">
                <span className="font-mono opacity-60 mr-1">&gt;</span> Direct Line
              </p>
              <p className="relative z-10 text-sm font-semibold text-[#1c1917] tracking-wide group-hover:text-[#0d9488] transition-colors duration-300">
                {process.env.NEXT_PUBLIC_PERSONAL_EMAIL ||
                  "musaiyab2003@gmail.com"}
              </p>
            </a>
          </motion.div>
        </div>

        {/* Footer separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-[#0d9488]/20 to-transparent mt-16 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#a8a29e]">
            © {new Date().getFullYear()} Mohd Musaiyab
          </span>
        </div>
      </div>
    </section>
  );
}