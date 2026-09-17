import bcrypt from "bcryptjs";

import prisma from "@/app/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = body.name?.trim() || "";
    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password || "";

    // اعتبارسنجی نام
    if (!name) {
      return Response.json(
        {
          success: false,
          message: "نام الزامی است.",
        },
        {
          status: 400,
        },
      );
    }

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Response.json(
        {
          success: false,
          message: "فرمت ایمیل نامعتبر است.",
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

    if (password.length < 8) {
      return Response.json(
        {
          success: false,
          message: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
        },
        {
          status: 400,
        },
      );
    }

    // بررسی وجود کاربر
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "این ایمیل قبلاً ثبت شده است.",
        },
        {
          status: 409,
        },
      );
    }

    // هش کردن رمز عبور
    const passwordHash = await bcrypt.hash(password, 12);

    // ایجاد کاربر
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return Response.json(
      {
        success: true,
        message: "ثبت‌نام با موفقیت انجام شد.",
        user,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("خطا در ثبت‌نام:", error);

    return Response.json(
      {
        success: false,
        message: "خطایی هنگام ثبت‌نام رخ داد.",
      },
      {
        status: 500,
      },
    );
  }
}
