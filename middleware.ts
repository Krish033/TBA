import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    request.nextUrl.pathname.startsWith("/api/") ||
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  if (!request.cookies.get("tba")) {
    if (["/auth/signin", "/auth/signup", "/"].includes(pathname))
      return NextResponse.next();

    return NextResponse.redirect(new URL("/", request.url));
  } else {
    if (["/auth/signin", "/auth/signup"].includes(pathname))
      return NextResponse.redirect(new URL("/tba", request.url));

    return NextResponse.next();
  }
}
