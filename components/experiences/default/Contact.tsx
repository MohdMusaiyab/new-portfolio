"use client";

import { useState } from "react";
import { Mail, Send, Github, Linkedin, Check, Copy } from "lucide-react";

const INK = "#2b3a2f";

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
    <section id="contact" className="w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#fdfbf7] border-t border-[#2b3a2f]/10">
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
              Get In Touch
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#2b3a2f]/50">
            Open for Opportunities
          </span>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Left Column: Direct Channels & Reachout Card */}
          <div
            className="rounded-md border-2 bg-white text-[#2b3a2f] p-5 sm:p-6 flex flex-col justify-between shadow-[2px_2px_0_0_#2b3a2f]"
            style={{ borderColor: INK }}
          >
            <div>
              <h3 className="text-base font-bold text-[#2b3a2f] mb-2 tracking-tight">
                Let&apos;s build something resilient together.
              </h3>
              <p className="text-xs sm:text-[13px] text-[#2b3a2f]/75 leading-relaxed mb-6 font-medium">
                I am currently open to full-time backend and distributed systems engineering roles,
                contract microservice architectures, and tech collaborations.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t" style={{ borderColor: `${INK}15` }}>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono font-bold text-[#2b3a2f] bg-[#ff9aa2]/30 hover:bg-[#ff9aa2] hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all cursor-pointer"
                  style={{ borderColor: INK }}
                >
                  {copied ? <Check size={13} className="stroke-[2.5]" /> : <Copy size={13} className="stroke-[2.2]" />}
                  <span>{copied ? "Copied" : email}</span>
                </button>

                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono font-bold text-[#2b3a2f] bg-[#ffd23f]/25 hover:bg-[#ffd23f] hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all"
                  style={{ borderColor: INK }}
                >
                  <Github size={13} className="stroke-[2.2]" />
                  <span>GitHub</span>
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono font-bold text-[#2b3a2f] bg-[#4fb3d9]/25 hover:bg-[#4fb3d9] hover:shadow-[2px_2px_0_0_#2b3a2f] transition-all"
                  style={{ borderColor: INK }}
                >
                  <Linkedin size={13} className="stroke-[2.2]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Dispatch Form */}
          <div
            className="rounded-md border-2 bg-white text-[#2b3a2f] p-5 sm:p-6 shadow-[2px_2px_0_0_#2b3a2f]"
            style={{ borderColor: INK }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2b3a2f] mb-4 font-mono">
              Send a Direct Message
            </h3>

            {status === "sent" ? (
              <div
                className="py-8 text-center text-xs font-mono font-bold text-[#2b3a2f] bg-[#a8d672]/30 rounded border"
                style={{ borderColor: INK }}
              >
                Message delivered successfully. I will get back to you shortly!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="subject" className="block text-[11px] font-mono font-bold text-[#2b3a2f]/70 mb-1">
                    Subject / Email
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                    placeholder="name@company.com — Engineering opportunity"
                    className="w-full px-3 py-2 text-xs font-mono text-[#2b3a2f] bg-[#fdfbf7] border rounded focus:outline-none focus:shadow-[2px_2px_0_0_#2b3a2f] placeholder:text-[#2b3a2f]/40"
                    style={{ borderColor: INK }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-mono font-bold text-[#2b3a2f]/70 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Hey Musaiyab, wanted to discuss a backend project..."
                    className="w-full px-3 py-2 text-xs font-mono text-[#2b3a2f] bg-[#fdfbf7] border rounded focus:outline-none focus:shadow-[2px_2px_0_0_#2b3a2f] placeholder:text-[#2b3a2f]/40 resize-none"
                    style={{ borderColor: INK }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  {status === "error" ? (
                    <span className="text-[11px] font-mono text-red-600 font-bold">
                      Failed to send. Please email directly.
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[#2b3a2f]/50">
                      Direct inbox dispatch
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={!isFormValid || status === "sending"}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded border text-xs font-mono font-bold text-[#2b3a2f] bg-[#ffd23f] hover:shadow-[2px_2px_0_0_#2b3a2f] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                    style={{ borderColor: INK }}
                  >
                    <Send size={11} className="stroke-[2.5]" />
                    <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Minimal Editorial Footer */}
        <div className="mt-14 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#2b3a2f]/60" style={{ borderColor: `${INK}20` }}>
          <span>Mohd Musaiyab • {new Date().getFullYear()}</span>
          <span>Crafted with Next.js &amp; Tailwind</span>
        </div>
      </div>
    </section>
  );
}
