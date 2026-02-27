import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard") {
    if (role === "student")
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    if (role === "teacher")
      return NextResponse.redirect(new URL("/dashboard/teacher", request.url));
    if (role === "admin")
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
