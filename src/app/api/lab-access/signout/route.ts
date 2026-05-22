import { NextResponse } from "next/server";
import { getToolOrDefault } from "@/lib/lab-access/tools";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tool = getToolOrDefault(url.searchParams.get("tool"));
  const res = NextResponse.redirect(`${url.origin}${tool.page}`);
  res.cookies.set({
    name: tool.cookieName,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/lab-tools",
    maxAge: 0,
  });
  return res;
}
