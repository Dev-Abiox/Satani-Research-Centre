import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  const res = NextResponse.redirect(`${origin}/lab-tools`);
  res.cookies.set({
    name: "lab_access",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/lab-tools",
    maxAge: 0,
  });
  return res;
}
