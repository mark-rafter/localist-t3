import { safeParseFloat } from "@/helpers/parse";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const headerToCookieMap = new Map([
  ["x-vercel-ip-latitude", 51.5],
  ["x-vercel-ip-longitude", 0.0],
]);

function addReqHeadersToResCookies(request: NextRequest, result: NextResponse<unknown>) {
  for (const [header, value] of headerToCookieMap) {
    const headerValue = request.headers.get(header);
    result.cookies.set(header, `${safeParseFloat(headerValue, value)}`);
  }
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  addReqHeadersToResCookies(req, res);
  return res;
}

export const config = {
  matcher: ["/", "/feed", "/home"],
};
