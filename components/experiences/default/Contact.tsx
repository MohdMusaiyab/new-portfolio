"use client";

import { useState } from "react";
import { Mail, Send, Check, Copy, ArrowUpRight, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
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

  const SOCIAL_CHANNELS = [
    {
      name: "GitHub",
      handle: "@MohdMusaiyab",
      url: github,
      icon: FaGithub,
      color: "#181717",
    },
    {
      name: "LinkedIn",
      handle: "in/mohdmusaiyab",
      url: linkedin,
      icon: FaLinkedinIn,
      color: "#0A66C2",
    },
    {
      name: "X (Twitter)",
      handle: "@mohd_musaiyab",
      url: twitter,
      icon: FaXTwitter,
      color: "#000000",
    },
  ];

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
    <section id="contact" className="w-full py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-zinc-100">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 font-sans">
            Contact
          </h2>
        </div>

        <div className="mt-6 sm:mt-7 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left CTA & Socials Card */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-5 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 bg-zinc-50/40 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-zinc-950 tracking-tight font-sans">
                Let&apos;s build together.
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed font-sans">
                Open for software engineering opportunities, backend consulting, and distributed systems discussions. Drop me a note anytime.
              </p>

              {/* Direct Email Action */}
              <div className="mt-6">
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 block mb-2">
                  Direct Email
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="flex-1 inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 text-xs font-mono text-zinc-800 transition-all shadow-2xs hover:shadow-xs cursor-pointer truncate"
                  >
                    <span className="truncate">{email}</span>
                    <span className="shrink-0 ml-2">
                      {copied ? (
                        <span className="text-emerald-600 font-medium inline-flex items-center gap-1">
                          <Check size={12} /> Copied
                        </span>
                      ) : (
                        <span className="text-zinc-400 inline-flex items-center gap-1 hover:text-zinc-600">
                          <Copy size={12} /> Copy
                        </span>
                      )}
                    </span>
                  </button>

                  <a
                    href={`mailto:${email}`}
                    className="p-2.5 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 transition-colors shadow-2xs shrink-0"
                    title="Send email via mail client"
                    aria-label="Send email via mail client"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Social channels with rich hover interactions */}
            <div className="mt-6 pt-5 border-t border-zinc-200/60">
              <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 block mb-2.5">
                Connect Across Platforms
              </span>
              <div className="grid grid-cols-1 gap-2">
                {SOCIAL_CHANNELS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="transition-transform duration-200 ease-out group-hover:scale-120 group-hover:-rotate-6 shrink-0 inline-flex items-center justify-center"
                        style={{ color: social.color }}
                      >
                        <social.icon size={15} />
                      </span>
                      <span className="text-xs font-mono font-medium text-zinc-700 group-hover:text-zinc-950 transition-colors truncate">
                        {social.name}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={13}
                      className="text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1.5"
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Direct Message Form */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="lg:col-span-7 p-6 sm:p-7 rounded-2xl border border-zinc-200/80 bg-white shadow-2xs"
          >
            <h3 className="text-lg font-semibold text-zinc-950 tracking-tight mb-1 font-sans">
              Send a quick message
            </h3>
            <p className="text-sm text-zinc-500 mb-5 font-sans">
              Delivered directly to my inbox with priority notification.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950 transition-all font-sans"
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
                    placeholder="Project inquiry, role, hello..."
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950 transition-all font-sans"
                  />
                </div>
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
                  rows={3}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Share a few details about your team, problem space, or timeline..."
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950 transition-all resize-none font-sans"
                />
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={!isFormValid || status === "sending"}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                    !isFormValid || status === "sending"
                      ? "bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed"
                      : "bg-zinc-950 text-white hover:bg-zinc-800 shadow-2xs"
                  }`}
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={13} />
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
                    <AlertCircle size={14} /> Send failed. Please use direct email.
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
