"use client";

/**
 * Contact Section (Default / Light Theme)
 *
 * Aesthetic:
 *   - Tactile editorial cards matching Hero, Experience, Education & Skills.
 *   - Disciplined color application: Calm Foliage Green (#a8d672) and Sun Yellow (#ffd23f) titlebars.
 *   - Restrained borders: 1px hairline inner dividers and soft form outlines.
 *   - Integrated availability indicator (eliminating redundant floating boxes).
 *   - Clean 1-click email copy & direct compose action.
 */

import { useState } from "react";
import { Mail, Send, Github, Linkedin, Check, Copy, ExternalLink, ArrowRight } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const INK = "#2b3a2f";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function DefaultContact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({
    senderEmail: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const email = process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "mohdmusaiyab@gmail.com";
  const github = process.env.NEXT_PUBLIC_PERSONAL_GITHUB || "https://github.com/MohdMusaiyab";
  const linkedin = process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN || "https://linkedin.com/in/mohdmusaiyab";
  const twitter = process.env.NEXT_PUBLIC_PERSONAL_TWITTER || "https://x.com/mohd_musaiyab";

  const isFormValid =
    form.senderEmail.trim().length > 0 &&
    form.subject.trim().length > 0 &&
    form.message.trim().length > 0;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: form.senderEmail.split("@")[0] || "Visitor",
          senderEmail: form.senderEmail,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ senderEmail: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const cardVariant: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: reduce ? 0 : i * 0.1,
        ease: EASE,
      },
    }),
  };

  return (
    <section
      id="contact"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fafc] border-t border-[#2b3a2f]/10"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#2b3a2f]/15">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-md border-2 bg-white text-[#2b3a2f] shadow-[2px_2px_0_0_#2b3a2f]"
              style={{ borderColor: INK }}
            >
              <Mail size={14} className="stroke-[2.2]" />
            </span>
            <h2 className="text-sm font-mono uppercase tracking-[0.18em] font-bold text-[#2b3a2f]">
              Contact
            </h2>
          </div>
        </div>

        {/* Contact Grid: Balanced editorial cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Left Column: Direct Channels & Reachability */}
          <motion.div
            custom={0}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-5 rounded-md border-2 bg-white text-[#2b3a2f] overflow-hidden shadow-[2.5px_2.5px_0_0_#2b3a2f] hover:shadow-[4px_4px_0_0_#2b3a2f] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            style={{ borderColor: INK }}
          >
            {/* Themed Titlebar: Foliage Green with integrated availability badge */}
            <div
              className="border-b px-3.5 sm:px-4 py-2 flex items-center justify-between select-none"
              style={{ borderColor: `${INK}20`, backgroundColor: "#a8d672" }}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2b3a2f]">
                Direct Reach
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#2b3a2f]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2b3a2f] opacity-40" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2b3a2f]" />
                </span>
                <span>OPEN TO WORK</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#2b3a2f] tracking-tight mb-2">
                  Let&apos;s start a conversation.
                </h3>
                <p className="text-xs sm:text-[13px] text-[#2b3a2f]/75 leading-relaxed font-normal">
                  Always glad to talk about distributed systems, backend infrastructure, Go, or full-stack opportunities. Drop a note or connect through any channel below.
                </p>
              </div>

              {/* Direct Email Card with 1-Click Copy and Compose */}
              <div className="my-5 pt-4 border-t border-[#2b3a2f]/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#2b3a2f]/50 font-bold block mb-2">
                  Email
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex-1 inline-flex items-center justify-between px-3 py-2 rounded-md border border-[#2b3a2f]/20 bg-[#f8fafc] hover:bg-white hover:border-[#2b3a2f] text-xs font-mono font-bold text-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all cursor-pointer truncate"
                  >
                    <span className="truncate">{email}</span>
                    <span className="shrink-0 ml-2 inline-flex items-center gap-1 text-[10px] text-[#2b3a2f]/70 font-semibold">
                      {copied ? (
                        <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                          <Check size={12} className="stroke-[2.5]" /> Copied
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <Copy size={11} className="stroke-[2]" /> Copy
                        </span>
                      )}
                    </span>
                  </button>

                  <a
                    href={`mailto:${email}`}
                    aria-label="Send direct email"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[#2b3a2f]/20 bg-[#f8fafc] hover:bg-white hover:border-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] text-[#2b3a2f] transition-all"
                  >
                    <ExternalLink size={13} className="stroke-[2.2]" />
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#2b3a2f]/50 font-bold block mb-2">
                  Online Profiles
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#2b3a2f]/20 bg-[#f8fafc] hover:bg-white hover:border-[#2b3a2f] text-xs font-mono font-bold text-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 transition-all"
                  >
                    <Github size={13} className="stroke-[2.2]" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#2b3a2f]/20 bg-[#f8fafc] hover:bg-white hover:border-[#2b3a2f] text-xs font-mono font-bold text-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 transition-all"
                  >
                    <Linkedin size={13} className="stroke-[2.2]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#2b3a2f]/20 bg-[#f8fafc] hover:bg-white hover:border-[#2b3a2f] text-xs font-mono font-bold text-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f] hover:shadow-[2px_2px_0_0_#2b3a2f] hover:-translate-y-0.5 transition-all"
                  >
                    <FaXTwitter className="w-3 h-3" />
                    <span>X</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Note Composer */}
          <motion.div
            custom={1}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-7 rounded-md border-2 bg-white text-[#2b3a2f] overflow-hidden shadow-[2.5px_2.5px_0_0_#2b3a2f] hover:shadow-[4px_4px_0_0_#2b3a2f] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            style={{ borderColor: INK }}
          >
            {/* Themed Titlebar: Sun Yellow */}
            <div
              className="border-b px-3.5 sm:px-4 py-2 flex items-center justify-between select-none"
              style={{ borderColor: `${INK}20`, backgroundColor: "#ffd23f" }}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2b3a2f]">
                Send a Note
              </span>
              <span className="font-mono text-[10px] font-bold text-[#2b3a2f]/70 uppercase tracking-wider">
                Direct Inbox
              </span>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              {status === "sent" ? (
                <motion.div
                  initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-3"
                >
                  <div
                    className="w-10 h-10 rounded-full border bg-[#a8d672]/30 flex items-center justify-center mx-auto text-[#2b3a2f] shadow-[1px_1px_0_0_#2b3a2f]"
                    style={{ borderColor: INK }}
                  >
                    <Check size={20} className="stroke-[2.5]" />
                  </div>
                  <h4 className="text-sm font-bold font-mono text-[#2b3a2f]">
                    Message received!
                  </h4>
                  <p className="text-xs text-[#2b3a2f]/70 font-medium max-w-sm mx-auto">
                    Thanks for reaching out. I&apos;ll read your note and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#2b3a2f] text-xs font-mono font-bold text-[#2b3a2f] bg-white hover:bg-[#ffd23f]/25 shadow-[1px_1px_0_0_#2b3a2f] transition-all cursor-pointer mt-2"
                  >
                    <span>Send another message</span>
                    <ArrowRight size={11} className="stroke-[2]" />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label
                      htmlFor="senderEmail"
                      className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#2b3a2f]/70 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      id="senderEmail"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={form.senderEmail}
                      onChange={(e) => setForm((p) => ({ ...p, senderEmail: e.target.value }))}
                      className="w-full px-3 py-2 text-xs font-mono text-[#2b3a2f] bg-[#f8fafc] focus:bg-white border border-[#2b3a2f]/25 focus:border-[#2b3a2f] rounded-md focus:outline-none focus:shadow-[2px_2px_0_0_#2b3a2f] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#2b3a2f]/70 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      placeholder="Project inquiry / Collaboration"
                      value={form.subject}
                      onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      className="w-full px-3 py-2 text-xs font-mono text-[#2b3a2f] bg-[#f8fafc] focus:bg-white border border-[#2b3a2f]/25 focus:border-[#2b3a2f] rounded-md focus:outline-none focus:shadow-[2px_2px_0_0_#2b3a2f] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#2b3a2f]/70 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Hi Musaiyab, I wanted to reach out regarding..."
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className="w-full px-3 py-2 text-xs font-mono text-[#2b3a2f] bg-[#f8fafc] focus:bg-white border border-[#2b3a2f]/25 focus:border-[#2b3a2f] rounded-md focus:outline-none focus:shadow-[2px_2px_0_0_#2b3a2f] resize-none transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {status === "error" ? (
                      <span className="text-[11px] font-mono text-red-600 font-bold">
                        Failed to send. Please use direct email.
                      </span>
                    ) : (
                      <span />
                    )}

                    <button
                      type="submit"
                      disabled={!isFormValid || status === "sending"}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-2 text-xs font-mono font-bold text-[#2b3a2f] bg-[#ffd23f] shadow-[2px_2px_0_0_#2b3a2f] hover:shadow-[3.5px_3.5px_0_0_#2b3a2f] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                      style={{ borderColor: INK }}
                    >
                      <Send size={12} className="stroke-[2.2]" />
                      <span>{status === "sending" ? "Sending..." : "Send Note"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Minimal Editorial Footer */}
        <div
          className="mt-14 pt-6 border-t flex items-center justify-center text-[11px] font-mono text-[#2b3a2f]/60"
          style={{ borderColor: `${INK}15` }}
        >
          <span>Mohd Musaiyab • {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
}
