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

// --- Validation ---

const NAME_RE = /^[A-Za-z\-' ]{2,50}$/;
const CITY_RE = /^[A-Za-z\-' ]{2,80}$/;
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[0-9]{10}$/;

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function validate(body: Record<string, unknown>): { ok: true; data: ValidatedContact } | { ok: false; error: string } {
  const firstName = isString(body.firstName) ? body.firstName.trim() : "";
  const lastName = isString(body.lastName) ? body.lastName.trim() : "";
  const email = isString(body.email) ? body.email.trim() : "";
  const phone = isString(body.phone) ? body.phone.trim() : "";
  const country = isString(body.country) ? body.country.trim() : "";
  const address = isString(body.address) ? body.address.trim() : "";
  const city = isString(body.city) ? body.city.trim() : "";
  const state = isString(body.state) ? body.state.trim() : "";
  const area = isString(body.area) ? body.area.trim() : "";
  const message = isString(body.message) ? body.message.trim() : "";

  if (!NAME_RE.test(firstName)) return { ok: false, error: "Invalid first name" };
  if (!NAME_RE.test(lastName)) return { ok: false, error: "Invalid last name" };
  if (!EMAIL_RE.test(email) || email.length > 254) return { ok: false, error: "Invalid email" };
  if (phone && !PHONE_RE.test(phone)) return { ok: false, error: "Invalid phone (must be 10 digits)" };
  if (country.length < 2 || country.length > 80) return { ok: false, error: "Invalid country" };
  if (address.length < 5 || address.length > 200) return { ok: false, error: "Invalid address" };
  if (!CITY_RE.test(city)) return { ok: false, error: "Invalid city" };
  if (state.length < 2 || state.length > 80) return { ok: false, error: "Invalid state" };
  if (area.length < 2 || area.length > 100) return { ok: false, error: "Invalid area of interest" };
  if (message.length < 20 || message.length > 2000) return { ok: false, error: "Message must be 20–2000 characters" };

  return {
    ok: true,
    data: { firstName, lastName, email, phone, country, address, city, state, area, message },
  };
}

interface ValidatedContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  state: string;
  area: string;
  message: string;
}

// HTML-escape user input before embedding in the email body to prevent
// HTML injection / phishing payloads in the inbox.
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// --- Rate limiting (in-memory, per-IP, sliding window) ---

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 submissions per hour per IP
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
    const { _honeypot, _timestamp } = body;

    // Bot detection: honeypot field filled
    if (_honeypot) {
      return NextResponse.json({ success: true }); // Fake success to fool bots
    }

    // Bot detection: form submitted too fast (under 3 seconds)
    if (_timestamp && Date.now() - _timestamp < 3000) {
      return NextResponse.json({ success: true }); // Fake success
    }

    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Server-side validation — never trust the client
    const result = validate(body);
    if (!result.ok) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
    const { firstName, lastName, email, phone, country, address, city, state, area, message } = result.data;

    await transporter.sendMail({
      from: `"Satani Research Centre" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Contact: ${area} — ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(phone) || "—"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Country</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(country)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Address</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(address)}, ${escapeHtml(city)}, ${escapeHtml(state)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Area of Interest</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(area)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(message).replace(/\n/g, "<br>")}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}