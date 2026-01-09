import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Firebase token stored in cookie

  // Route protection
  console.log("req.nexturl => ", req.nextUrl.pathname);

  const isDashboardRoute = req.nextUrl.pathname.includes("dashboard");

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect all /dashboard/* routes
};
