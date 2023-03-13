import { safeParseFloat } from "@/helpers/parse";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  res.cookies.set(
    "x-vercel-ip-latitude",
    `${safeParseFloat(req.headers.get("x-vercel-ip-latitude"), 51.5)}`
  );
  res.cookies.set(
    "x-vercel-ip-longitude",
    `${safeParseFloat(req.headers.get("x-vercel-ip-longitude"), 0.0)}`
  );

  return res;
}

export const config = {
  matcher: ["/", "/feed", "/home"],
};
