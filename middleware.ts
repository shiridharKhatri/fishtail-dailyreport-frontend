// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("employee_token") || req.cookies.get("admin_token");
  const url = req.nextUrl.clone();

  // If no token, redirect to login page (/)
  if (!token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Optional: you can fetch /api/verify here to check role
  // or decode JWT token to restrict routes

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/employee/:path*", "/admin/:path*"],
};
