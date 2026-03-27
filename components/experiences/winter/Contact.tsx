"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const WA = (a: number) => `rgba(255,255,255,${a})`;
const W = "#ffffff";

const SOCIALS = [
  {
    label: "GitHub",
    href: process.env.NEXT_PUBLIC_PERSONAL_GITHUB,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: process.env.NEXT_PUBLIC_PERSONAL_TWITTER,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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

  const base: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? WA(0.55) : WA(0.15)}`,
    color: W,
    fontFamily: "'DM Mono', monospace",
    fontSize: "14px",
    letterSpacing: "0.05em",
    outline: "none",
    padding: "12px 0",
    transition: "border-color 0.25s ease",
    resize: "none",
    caretColor: W,
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-dm-mono text-[10px] tracking-[0.35em] uppercase"
        style={{
          color: focused ? WA(0.6) : WA(0.3),
          transition: "color 0.25s",
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          style={base}
          className="scrollbar-none"
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
          style={base}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "100px" });
  const formInView = useInView(formRef, { once: true, margin: "100px" });

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
    <>
      <style>{`

        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
        ::placeholder { color: rgba(255,255,255,0.18); font-family: 'DM Mono', monospace; }
        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #111111 inset;
          -webkit-text-fill-color: #ffffff;
          transition: background-color 5000s ease-in-out 0s;
        }
        input:focus, textarea:focus {
          box-shadow: 0 20px 25px -5px rgba(255, 255, 255, 0.05), 0 8px 10px -6px rgba(255, 255, 255, 0.05);
          outline: none;
        }
      `}</style>

      <section
        id="contact"
        className="relative w-full overflow-hidden"
        style={{ background: "#09090b" }}
      >
        {}
        <div
          className="absolute top-0 right-0 w-[55%] h-[70%] pointer-events-none blur-[160px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 65%)",
          }}
        />
        <div className="grain-overlay" aria-hidden="true" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
          {}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12 md:mb-16"
          >
            <p
              className="font-dm-mono text-[10px] tracking-[0.45em] uppercase mb-5"
              style={{ color: WA(0.4) }}
            >
              Get in Touch
            </p>
            <h2
              className="font-cinzel font-black leading-none"
              style={{
                fontSize: "clamp(48px, 9vw, 120px)",
                color: W,
                letterSpacing: "0.02em",
                textShadow: "0 8px 40px rgba(255,255,255,0.08)",
              }}
            >
              Contact
            </h2>
          </motion.div>

          {}
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
            {}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full lg:w-[58%]"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {}

                <Field
                  label="Subject"
                  id="subject"
                  value={form.subject}
                  onChange={set("subject")}
                  disabled={disabled}
                />
                <Field
                  label="Message"
                  id="message"
                  textarea
                  value={form.message}
                  onChange={set("message")}
                  disabled={disabled}
                />

                {}
                <div className="flex items-center gap-6 pt-2">
                  <motion.button
                    type="submit"
                    disabled={disabled}
                    whileHover={disabled ? {} : { scale: 1.02 }}
                    whileTap={disabled ? {} : { scale: 0.98 }}
                    className="relative flex items-center gap-3 px-10 py-4 transition-all duration-300 hover:bg-white hover:text-black hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] W-[fit-content]"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: status === "sent" ? WA(0.5) : W,
                      border: `1px solid ${status === "sent" ? WA(0.12) : WA(0.3)}`,
                      background: "transparent",
                      cursor: disabled ? "default" : "pointer",
                    }}
                  >
                    {}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: disabled ? 0 : 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      style={{ background: WA(0.05) }}
                    />

                    <AnimatePresence mode="wait">
                      {status === "sending" ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span className="inline-block w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                          Sending
                        </motion.span>
                      ) : status === "sent" ? (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Message Sent ✓
                        </motion.span>
                      ) : status === "error" ? (
                        <motion.span
                          key="error"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Retry ↗
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          Send Message
                          <svg
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 17L17 7M17 7H7M17 7v10"
                            />
                          </svg>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-dm-mono text-[11px] tracking-widest"
                        style={{ color: WA(0.35) }}
                      >
                        Something went wrong.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.1,
              }}
              className="w-full lg:w-[42%] flex flex-col gap-14"
            >
              {}
              <div>
                <p
                  className="font-dm-mono text-[10px] tracking-[0.35em] uppercase mb-5"
                  style={{ color: WA(0.3) }}
                >
                  Let&apos;s Collaborate
                </p>
                <p
                  className="text-[16px] leading-[1.85]"
                  style={{
                    color: WA(0.55),
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Whether it&apos;s a product idea, a freelance project, or just
                  a conversation about tech — my inbox is open. I&apos;ll
                  respond within 24 hours.
                </p>
              </div>

              {}
              <div className="h-px w-full" style={{ background: WA(0.08) }} />

              {}
              <div>
                <p
                  className="font-dm-mono text-[10px] tracking-[0.35em] uppercase mb-6"
                  style={{ color: WA(0.3) }}
                >
                  Find me on
                </p>
                <div className="flex flex-col gap-4">
                  {SOCIALS.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 16 }}
                      animate={formInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.25 + i * 0.08,
                      }}
                      className="group relative flex items-center gap-4 py-5 px-4 -mx-4 border-b last:border-none transition-all duration-500 overflow-hidden"
                      style={{
                        borderColor: WA(0.06),
                        textDecoration: "none",
                        color: WA(0.5),
                        background: "transparent",
                      }}
                    >
                      {/* Premium Hover Sweep Background */}
                      <motion.div
                        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                        whileHover={{ x: ["-100%", "0%"] }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${WA(0.04)} 50%, transparent 100%)`,
                        }}
                      />

                      {/* Hover Glow / Accent Line */}
                      <div 
                        className="absolute bottom-0 left-0 w-full h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1] origin-left"
                        style={{ background: `linear-gradient(90deg, ${WA(0.2)}, transparent)` }}
                      />

                      <span className="relative z-10 transition-all duration-500 group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
                        {s.icon}
                      </span>
                      <span
                        className="relative z-10 font-cinzel text-sm tracking-widest uppercase transition-all duration-500 group-hover:text-white group-hover:translate-x-1 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                        style={{ letterSpacing: "0.22em" }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="relative z-10 ml-auto text-base transition-all duration-500 group-hover:translate-x-2 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                        style={{ color: WA(0.2) }}
                      >
                        →
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {}
              <div className="h-px w-full" style={{ background: WA(0.08) }} />

              {}
              <div>
                <p
                  className="font-dm-mono text-[10px] tracking-[0.35em] uppercase mb-3"
                  style={{ color: WA(0.3) }}
                >
                  Or write directly
                </p>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_PERSONAL_EMAIL}`}
                  className="font-dm-mono text-[13px] tracking-[0.12em] transition-colors duration-300 hover:text-white"
                  style={{ color: WA(0.5), textDecoration: "none" }}
                >
                  {process.env.NEXT_PUBLIC_PERSONAL_EMAIL ||
                    "musaiyab2003@gmail.com"}
                </a>
              </div>
            </motion.div>
          </div>

          {}
          <div
            className="w-full h-px mt-16 md:mt-24"
            style={{
              background: `linear-gradient(to right, transparent, ${WA(0.08)} 50%, transparent)`,
            }}
          />
          <div className="flex items-center justify-between mt-8 ">
            <span
              className="font-dm-mono text-[10px]  tracking-[0.3em] uppercase"
              style={{ color: "white" }}
            >
              © 2026 Mohd Musaiyab
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
