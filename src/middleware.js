import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "warino_session";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET در فایل .env تنظیم نشده است.");
  }

  return new TextEncoder().encode(secret);
}

async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    if (!payload.userId || !payload.role) {
      return null;
    }

    return {
      id: Number(payload.userId),
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const sessionCookie = request.cookies.get(COOKIE_NAME);

  // کاربر اصلاً وارد نشده
  if (!sessionCookie?.value) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // بررسی JWT
  const user = await verifySession(sessionCookie.value);

  // Session نامعتبر یا منقضی شده
  if (!user) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", pathname);

    const response = NextResponse.redirect(loginUrl);

    response.cookies.delete(COOKIE_NAME);

    return response;
  }

  // فقط SELLER و ADMIN اجازه ورود به پنل فروشنده را دارند
  if (user.role !== "SELLER" && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // دسترسی مجاز است
  return NextResponse.next();
}

export const config = {
  matcher: ["/seller/:path*"],
};
