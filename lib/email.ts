import nodemailer from "nodemailer";

/* ─────────────────────────────────────────────────────────────────────
   Email Service — powered by Gmail + Nodemailer
   Env vars required:
     MAIL_USER     — your full Gmail address (e.g. you@gmail.com)
     MAIL_PASS     — your 16-char Gmail App Password (NOT your login pw)
───────────────────────────────────────────────────────────────────── */

export interface ContactPayload {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}

export interface MailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/* ── Reusable transporter ────────────────────────────────────────── */
function createTransporter() {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!user || !pass) {
    throw new Error(
      "Missing env vars: MAIL_USER and MAIL_PASS must be set in .env.local",
    );
  }

  return nodemailer.createTransport({
    service: "gmail", // Gmail SMTP — most common, zero extra config
    auth: { user, pass },
  });
}

/* ── Core send function ──────────────────────────────────────────── */
export async function sendContactEmail(
  payload: ContactPayload,
): Promise<MailResult> {
  const { senderName, senderEmail, subject, message } = payload;

  try {
    const transporter = createTransporter();
    const recipient = process.env.MAIL_USER!; // send to yourself

    const info = await transporter.sendMail({
      from: `"${senderName}" <${process.env.MAIL_USER}>`,
      replyTo: `"${senderName}" <${senderEmail}>`,
      to: recipient,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${senderName} <${senderEmail}>\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:auto;padding:32px;background:#fafafa;border-radius:8px;">
          <p style="font-size:12px;color:#aaa;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:24px;">New message via Portfolio</p>
          <h2 style="font-size:22px;color:#111;margin-bottom:4px;">${subject}</h2>
          <p style="font-size:14px;color:#666;margin-bottom:28px;">
            From <strong>${senderName}</strong> — <a href="mailto:${senderEmail}" style="color:#2563eb;">${senderEmail}</a>
          </p>
          <div style="font-size:15px;color:#333;line-height:1.75;white-space:pre-wrap;background:#fff;padding:20px 24px;border-radius:6px;border:1px solid #e5e5e5;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
          <p style="font-size:11px;color:#bbb;margin-top:28px;">Sent via portfolio contact form &mdash; reply directly to this email to respond.</p>
        </div>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("[sendContactEmail] Failed:", error);
    return { success: false, error };
  }
}
