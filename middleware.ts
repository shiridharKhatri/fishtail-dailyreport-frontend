// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const employeeToken = req.cookies.get("employee_token");
  const adminToken = req.cookies.get("admin_token");
  const url = req.nextUrl.clone();

  // If user is trying to access login page
  if (url.pathname === "/") {
    if (employeeToken) {
      url.pathname = "/employee";
      return NextResponse.redirect(url);
    } 
    if (adminToken) {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    // If no token, let them access login
    return NextResponse.next();
  }

  // For protected routes: redirect if no token
  if (url.pathname.startsWith("/employee") && !employeeToken) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  if (url.pathname.startsWith("/admin") && !adminToken) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to login page and protected routes
export const config = {
  matcher: ["/", "/employee/:path*", "/admin/:path*"],
};
