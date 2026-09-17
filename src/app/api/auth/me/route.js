import { getCurrentUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const sessionUser = await getCurrentUser();

    if (!sessionUser) {
      return Response.json(
        {
          success: false,
          message: "وارد حساب کاربری نشده‌اید.",
        },
        {
          status: 401,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: sessionUser.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر پیدا نشد.",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("خطا در دریافت کاربر:", error);

    return Response.json(
      {
        success: false,
        message: "خطا در دریافت اطلاعات کاربر.",
      },
      {
        status: 500,
      },
    );
  }
}
