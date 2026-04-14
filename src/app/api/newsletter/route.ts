import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const ipHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) return true;
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
    const { _honeypot, _timestamp } = body;

    // Bot detection
    if (_honeypot || (_timestamp && Date.now() - _timestamp < 3000)) {
      return NextResponse.json({ success: true });
    }

    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many subscriptions. Please try again later." },
        { status: 429 }
      );
    }

    // Validate email
    if (!EMAIL_RE.test(rawEmail) || rawEmail.length > 254) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Satani Research Centre" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New Newsletter Subscriber: ${rawEmail}`,
      html: `<p>New newsletter subscription from: <strong>${escapeHtml(rawEmail)}</strong></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}