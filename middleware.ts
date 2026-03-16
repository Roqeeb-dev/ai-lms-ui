import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLES } from "./types/roles";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard") {
    if (role === ROLES.STUDENT)
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    if (role === ROLES.INSTRUCTOR)
      return NextResponse.redirect(
        new URL("/dashboard/instructor", request.url),
      );
    if (role === ROLES.ADMIN)
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
