import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { geo } = request;

  if (!geo?.latitude || !geo?.longitude) {
    return NextResponse.next();
  }

  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-geo-latitude", geo.latitude);
  reqHeaders.set("x-geo-longitude", geo.longitude);

  console.log(reqHeaders);

  return NextResponse.next({
    request: {
      headers: reqHeaders,
    },
  });
}

export const config = {
  matcher: "/api/auth/(.*)",
};
