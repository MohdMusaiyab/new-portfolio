"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/MohdMusaiyab",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.16 6.84a14.54 14.54 0 00-3.66-1.12c-.2.35-.41.74-.58 1.1-1.32-.2-2.6-.2-3.86 0-.16-.36-.38-.75-.58-1.1-1.28.4-2.52.79-3.66 1.12C1 14.28.37 20.35 1 24c1.6 1.18 3.12 1.88 4.6 2.36.42-.55.8-1.13 1.13-1.74-.46-.17-.92-.38-1.34-.64.12-.09.22-.17.33-.26 2.87 1.3 5.96 1.3 8.76 0 .11.1.22.18.33.26-.43.26-.88.47-1.34.64.33.62.71 1.2 1.13 1.74 1.48-.48 3-1.18 4.6-2.36.7-4.32-.12-10.4-4.84-17.16z" />
        <circle cx="8.5" cy="15.5" r="1.5" />
        <circle cx="15.5" cy="15.5" r="1.5" />
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
    borderBottom: `2px solid ${focused ? "#0f172a" : "#e2e8f0"}`,
    color: "#0f172a",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: 500,
    outline: "none",
    padding: "12px 0 14px",
    transition: "border-color 0.3s ease",
    resize: "none",
  };

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={id}
        className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
        style={{ color: active ? "#0f172a" : "#94a3b8" }}
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
          className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] placeholder:text-slate-300"
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
    senderName: "",
    senderEmail: "",
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
      className="relative w-full bg-white text-slate-900 font-sans border-t border-slate-100"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36">
        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-slate-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
              Get in Touch
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[84px] font-extrabold tracking-tighter leading-[0.9]">
            Let&apos;s{" "}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #0f172a 0%, #64748b 45%, #0f172a 100%)",
                backgroundSize: "200% auto",
                animation: "shine 4s linear infinite",
              }}
            >
              connect.
            </motion.span>
          </h2>
        </motion.div>

        {/* ── Layout split ── */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[58%]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col sm:flex-row gap-10">
                <div className="flex-1">
                  <Field
                    label="Your Name"
                    id="name"
                    value={form.senderName}
                    onChange={set("senderName")}
                    disabled={disabled}
                  />
                </div>
                <div className="flex-1">
                  <Field
                    label="Email Address"
                    id="email"
                    type="email"
                    value={form.senderEmail}
                    onChange={set("senderEmail")}
                    disabled={disabled}
                  />
                </div>
              </div>

              <Field
                label="Subject"
                id="subject"
                value={form.subject}
                onChange={set("subject")}
                disabled={disabled}
              />
              <Field
                label="Your Message"
                id="message"
                textarea
                value={form.message}
                onChange={set("message")}
                disabled={disabled}
              />

              <div className="flex items-center gap-5 pt-4">
                <motion.button
                  type="submit"
                  disabled={disabled}
                  whileHover={disabled ? {} : { scale: 1.02 }}
                  whileTap={disabled ? {} : { scale: 0.98 }}
                  className="relative overflow-hidden flex items-center gap-2.5 px-8 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-md"
                  style={{
                    background: status === "sent" ? "#f1f5f9" : "#0f172a",
                    color: status === "sent" ? "#94a3b8" : "#fff",
                    cursor: disabled ? "default" : "pointer",
                    boxShadow:
                      status === "sent"
                        ? "none"
                        : "0 8px 30px rgba(15,23,42,0.15)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {status === "sending" ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending
                      </motion.span>
                    ) : status === "sent" ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Sent ✓
                      </motion.span>
                    ) : status === "error" ? (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Retry
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-white"
                      >
                        Send Message
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
                      className="text-xs font-semibold tracking-wider text-rose-500"
                    >
                      Error sending.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          {/* Socials / Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="w-full lg:w-[42%] flex flex-col gap-8"
          >
            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />{" "}
                Let&apos;s Collaborate
              </p>
              <p className="text-[15px] leading-relaxed text-slate-600 font-medium max-w-[34ch]">
                Whether it&apos;s a product idea, a systems debate, or just a
                conversation about tech — my inbox is always open.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-slate-200 rounded-[2rem]
                    text-slate-400 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300"
                >
                  <span>{s.icon}</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>

            <a
              href="mailto:musaiyab2003@gmail.com"
              className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-[2rem]
                group hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-500 transition-colors">
                  Direct Email
                </span>
                <span className="font-mono text-sm font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                  musaiyab2003@gmail.com
                </span>
              </div>
              <span className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="w-full h-px bg-slate-200 mt-24 mb-6" />
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <span>© 2026 Mohd Musaiyab</span>
          <span>Pune, IN</span>
        </div>
      </div>
    </section>
  );
}
