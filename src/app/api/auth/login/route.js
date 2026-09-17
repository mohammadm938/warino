import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

import prisma from "@/app/lib/prisma";

const COOKIE_NAME = "warino_session";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET در فایل .env تنظیم نشده است.");
  }

  return new TextEncoder().encode(secret);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password || "";

    // اعتبارسنجی ایمیل
    if (!email) {
      return Response.json(
        {
          success: false,
          message: "ایمیل الزامی است.",
        },
        {
          status: 400,
        },
      );
    }

    // اعتبارسنجی رمز عبور
    if (!password) {
      return Response.json(
        {
          success: false,
          message: "رمز عبور الزامی است.",
        },
        {
          status: 400,
        },
      );
    }

    // پیدا کردن کاربر
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // عمداً پیام یکسان می‌دهیم تا مشخص نشود ایمیل وجود دارد یا نه
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "ایمیل یا رمز عبور اشتباه است.",
        },
        {
          status: 401,
        },
      );
    }

    // بررسی رمز عبور
    const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordIsValid) {
      return Response.json(
        {
          success: false,
          message: "ایمیل یا رمز عبور اشتباه است.",
        },
        {
          status: 401,
        },
      );
    }

    // ساخت JWT
    const token = await new SignJWT({
      userId: user.id,
      role: user.role,
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(getSecretKey());

    // ساخت پاسخ
    const response = Response.json({
      success: true,
      message: "ورود با موفقیت انجام شد.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // ذخیره JWT داخل HttpOnly Cookie
    response.headers.set(
      "Set-Cookie",
      [
        `${COOKIE_NAME}=${token}`,
        "Path=/",
        "HttpOnly",
        "SameSite=Lax",
        "Max-Age=604800",
        process.env.NODE_ENV === "production" ? "Secure" : "",
      ]
        .filter(Boolean)
        .join("; "),
    );

    return response;
  } catch (error) {
    console.error("خطا در ورود:", error);

    return Response.json(
      {
        success: false,
        message: "خطایی هنگام ورود رخ داد.",
      },
      {
        status: 500,
      },
    );
  }
}
