"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Check, Copy } from "lucide-react";

export default function DefaultContact() {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const email = process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "mohdmusaiyab@gmail.com";
  const github = process.env.NEXT_PUBLIC_PERSONAL_GITHUB || "https://github.com/MohdMusaiyab";
  const linkedin = process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN || "https://linkedin.com/in/mohdmusaiyab";

  const isFormValid = form.subject.trim().length > 0 && form.message.trim().length > 0;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || status === "sending" || status === "sent") return;
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

  return (
    <section id="contact" className="w-full py-12 sm:py-16 px-5 sm:px-8 bg-[#faf8f5]/40">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-2 mb-8">
          <Mail size={14} className="text-stone-400" />
          <h2 className="text-xs font-dm-mono uppercase tracking-[0.2em] font-semibold text-stone-900">
            Get In Touch
          </h2>
        </div>

        {/* Contact Container */}
        <div className="space-y-6">
          {/* Direct Channels */}
          <div className="p-4 sm:p-5 rounded-lg border border-stone-200/80 bg-white/70">
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed mb-4">
              I’m currently available for full-time engineering roles, backend contracts, and technical collaborations. The quickest way to reach me is via email.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-dm-mono transition-colors cursor-pointer shadow-2xs"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? "Copied to clipboard" : email}</span>
              </button>

              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-stone-200 text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs font-dm-mono transition-colors"
              >
                <Github size={12} />
                <span>GitHub</span>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-stone-200 text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs font-dm-mono transition-colors"
              >
                <Linkedin size={12} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="p-4 sm:p-5 rounded-lg border border-stone-200/80 bg-white/70">
            <h3 className="text-xs font-semibold text-stone-900 mb-4 font-dm-mono tracking-tight">
              Or Send a Quick Message
            </h3>

            {status === "sent" ? (
              <div className="py-6 text-center text-xs font-dm-mono text-emerald-800 bg-emerald-50/60 rounded-md border border-emerald-200/60">
                Message delivered successfully. I&apos;ll get back to you promptly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="subject" className="block text-[11px] font-dm-mono text-stone-500 mb-1">
                    Subject / Email
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                    placeholder="name@company.com — Backend opportunity"
                    className="w-full px-3 py-2 text-xs font-sans text-stone-900 bg-white border border-stone-200 rounded-md focus:outline-none focus:border-stone-400 placeholder:text-stone-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-dm-mono text-stone-500 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Hey Musaiyab, wanted to discuss a role..."
                    className="w-full px-3 py-2 text-xs font-sans text-stone-900 bg-white border border-stone-200 rounded-md focus:outline-none focus:border-stone-400 placeholder:text-stone-400 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  {status === "error" ? (
                    <span className="text-[11px] font-dm-mono text-rose-600">
                      Failed to send. Please email directly.
                    </span>
                  ) : (
                    <span className="text-[11px] font-dm-mono text-stone-400">
                      Direct inbox dispatch
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={!isFormValid || status === "sending"}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-stone-900 text-stone-50 hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Send size={11} />
                    <span>{status === "sending" ? "Sending..." : "Send"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="mt-12 pt-6 border-t border-stone-200/70 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-dm-mono text-stone-400">
          <span>Mohd Musaiyab • {new Date().getFullYear()}</span>
          <span>Crafted with Next.js &amp; Tailwind</span>
        </div>
      </div>
    </section>
  );
}
