import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, ContactPayload } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;

    const { senderName, senderEmail, subject, message } = body;

    if (!senderName || !senderEmail || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 },
      );
    }

    const result = await sendContactEmail({
      senderName,
      senderEmail,
      subject,
      message,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 },
    );
  }
}
