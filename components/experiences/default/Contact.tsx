"use client";

import { useState } from "react";
import { Mail, Send, Github, Linkedin, Check, Copy, ArrowRight, AlertCircle } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { motion, useReducedMotion } from "framer-motion";

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

  const updateField = (field: keyof typeof form, value: string) => {
    if (status === "error") setStatus("idle");
    setForm((p) => ({ ...p, [field]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <section id="contact" className="w-full py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
              Get in Touch
            </h2>
            <p className="mt-1 text-sm text-zinc-500 font-sans">
              Open for software engineering opportunities, backend consulting, or technical discussions.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct Contact Info */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-5 p-6 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/20 bg-emerald-50 text-emerald-800 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for new roles</span>
              </div>

              <h3 className="text-lg font-semibold text-zinc-950 tracking-tight">
                Let&apos;s start a conversation.
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed font-sans">
                Always open to discussing distributed systems architecture, Go microservices, high-throughput pipelines, or full-stack engineering roles.
              </p>

              {/* Email Card */}
              <div className="mt-6 pt-5 border-t border-zinc-200/60">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2 font-medium">
                  Direct Email
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex-1 inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 text-xs font-mono text-zinc-800 transition-colors truncate"
                  >
                    <span className="truncate">{email}</span>
                    <span className="shrink-0 ml-2">
                      {copied ? (
                        <span className="text-emerald-600 font-medium inline-flex items-center gap-1">
                          <Check size={12} /> Copied
                        </span>
                      ) : (
                        <span className="text-zinc-400 inline-flex items-center gap-1">
                          <Copy size={12} /> Copy
                        </span>
                      )}
                    </span>
                  </button>

                  <a
                    href={`mailto:${email}`}
                    className="p-2.5 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
                    title="Send email via mail client"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="mt-8 pt-6 border-t border-zinc-200/60 flex items-center gap-3">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={15} />
              </a>
            </div>
          </motion.div>

          {/* Contact Message Form */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="lg:col-span-7 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 bg-white shadow-xs"
          >
            <h3 className="text-lg font-semibold text-zinc-950 tracking-tight mb-1 font-sans">
              Send a direct transmission
            </h3>
            <p className="text-sm text-zinc-500 mb-6 font-sans">
              Your message routes directly to my primary inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono font-medium text-zinc-600 mb-1.5"
                >
                  Your Email <span className="text-zinc-400">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.senderEmail}
                  onChange={(e) => updateField("senderEmail", e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950 transition-all font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-mono font-medium text-zinc-600 mb-1.5"
                >
                  Subject <span className="text-zinc-400">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  placeholder="Project collaboration, hiring inquiry..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950 transition-all font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono font-medium text-zinc-600 mb-1.5"
                >
                  Message <span className="text-zinc-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Share details about your team, problem space, or timeline..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950 transition-all resize-none font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={!isFormValid || status === "sending"}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    !isFormValid || status === "sending"
                      ? "bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed"
                      : "bg-zinc-950 text-white hover:bg-zinc-800 shadow-xs cursor-pointer"
                  }`}
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 font-medium">
                    <Check size={14} /> Message sent successfully!
                  </span>
                )}

                {status === "error" && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-red-600 font-medium">
                    <AlertCircle size={14} /> Transmission failed. Try direct email.
                  </span>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
