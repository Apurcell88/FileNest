import { NextResponse } from "next/server";
import { getSession } from "./lib/session";

export const config = {
  matcher: ["/", "/dashboard"],
};

export async function middleware(req) {
  const sessionId = req.cookies.get("session_id")?.value;
  console.log("sessionId in middleware:", sessionId);
  const { pathname } = req.nextUrl;
  // If logged in (cookie exists) and on root, redirect to dashboard
  if (sessionId) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  } else {
    // If not logged in and trying to access /dashboard, redirect home
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
}
