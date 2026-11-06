import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, sessionSecret, verifyToken } from "@/lib/session";

export const config = { matcher: ["/admin/:path*"] };

// Every /admin route except the login page requires a valid signed session cookie.
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  const secret = sessionSecret();
  const token = req.cookies.get(COOKIE)?.value;
  if (secret && token && (await verifyToken(token, secret))) return NextResponse.next();
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
