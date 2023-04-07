import { safeParseFloat } from "@/helpers/parse";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const headerToCookieMap = new Map([
  ["x-vercel-ip-latitude", 51.5],
  ["x-vercel-ip-longitude", 0.0],
]);

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  for (const [key, value] of headerToCookieMap) {
    const headerValue = req.headers.get(key);
    res.cookies.set(key, `${safeParseFloat(headerValue, value)}`);
  }

  return res;
}

export const config = {
  matcher: ["/", "/feed", "/home"],
};
