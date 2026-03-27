import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, ContactPayload } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;

    const { 
      senderName = "Anonymous Visitor", 
      senderEmail = "no-reply@portfolio.com", 
      subject, 
      message 
    } = body;

    if (!subject || !message) {
      return NextResponse.json(
        { success: false, error: "Subject and Message are required." },
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
