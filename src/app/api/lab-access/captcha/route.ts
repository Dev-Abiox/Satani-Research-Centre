import { NextResponse } from "next/server";
import { generateCaptcha } from "@/lib/lab-access/captcha";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const { svg, token } = await generateCaptcha();
    return NextResponse.json({ success: true, svg, token });
  } catch (err) {
    console.error("[lab-access/captcha]", err);
    return NextResponse.json(
      { success: false, error: "Failed to generate captcha" },
      { status: 500 }
    );
  }
}
