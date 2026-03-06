"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/MohdMusaiyab",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
    borderBottom: `1.5px solid ${focused ? "#1c1917" : "#d6cfc5"}`,
    color: "#1c1917",
    fontFamily: "inherit",
    fontSize: "15px",
    outline: "none",
    padding: "14px 0 10px",
    transition: "border-color 0.3s ease",
    resize: "none",
  };

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={id}
        className="text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
        style={{ color: active ? "#1c1917" : "#a8a29e" }}
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
          className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
      className="relative w-full bg-[#faf8f5] text-[#1c1917] font-sans overflow-hidden"
    >
      {}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        {}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#a8a29e]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
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
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-light text-blue-600"
            >
              connect.
            </motion.span>
          </h2>
        </motion.div>

        {}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[58%]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-10">
                <div className="flex-1">
                  <Field
                    label="Your Name"
                    id="contact-name"
                    value={form.senderName}
                    onChange={set("senderName")}
                    disabled={disabled}
                  />
                </div>
                <div className="flex-1">
                  <Field
                    label="Email Address"
                    id="contact-email"
                    type="email"
                    value={form.senderEmail}
                    onChange={set("senderEmail")}
                    disabled={disabled}
                  />
                </div>
              </div>

              <Field
                label="Subject"
                id="contact-subject"
                value={form.subject}
                onChange={set("subject")}
                disabled={disabled}
              />
              <Field
                label="Your Message"
                id="contact-message"
                textarea
                value={form.message}
                onChange={set("message")}
                disabled={disabled}
              />

              {}
              <div className="flex items-center gap-5 pt-4">
                <motion.button
                  type="submit"
                  disabled={disabled}
                  whileHover={disabled ? {} : { scale: 1.02 }}
                  whileTap={disabled ? {} : { scale: 0.98 }}
                  className="relative overflow-hidden flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300"
                  style={{
                    background: status === "sent" ? "#d6cfc5" : "#1c1917",
                    color: status === "sent" ? "#78716c" : "#fff",
                    cursor: disabled ? "default" : "pointer",
                    border: "none",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {status === "sending" ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                          strokeWidth={2.5}
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
                      className="text-[11px] font-semibold tracking-wider text-red-500/70"
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
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
            className="w-full lg:w-[42%] flex flex-col gap-10"
          >
            {}
            <div className="bg-white border border-[#e7e2db] rounded-2xl p-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e] mb-4">
                Let&apos;s Collaborate
              </p>
              <p className="text-[15px] leading-[1.8] text-[#57534e] font-light">
                Whether it&apos;s a product idea, a freelance project, or just a
                conversation about tech — my inbox is always open. I&apos;ll
                respond within 24 hours.
              </p>
            </div>

            {}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e] mb-5">
                Find me on
              </p>
              <div className="flex flex-col gap-1">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 12 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.25 + i * 0.08,
                    }}
                    className="group flex items-center gap-4 py-3.5 border-b border-[#e7e2db] last:border-b-0 text-[#78716c] hover:text-[#1c1917] transition-colors duration-300"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="transition-colors duration-300 group-hover:text-blue-600">
                      {s.icon}
                    </span>
                    <span className="text-sm font-semibold tracking-wider uppercase">
                      {s.label}
                    </span>
                    <span className="ml-auto text-[#d6cfc5] group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {}
            <div className="bg-[#f1ede8] rounded-2xl p-6 border border-[#e7e2db]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e] mb-2">
                Or write directly
              </p>
              <a
                href="mailto:musaiyab2003@gmail.com"
                className="text-sm font-semibold text-[#57534e] hover:text-blue-600 transition-colors duration-300"
                style={{ textDecoration: "none" }}
              >
                musaiyab2003@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {}
        <div className="w-full h-px bg-[#e7e2db] mt-24" />
        <div className="flex items-center justify-between mt-6 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#a8a29e]">
            © 2026 Mohd Musaiyab
          </span>
        </div>
      </div>
    </section>
  );
}
