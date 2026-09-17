import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        _count: {
          select: {
            products: true,
            shops: true,
          },
        },
      },
    });

    return Response.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("خطا در دریافت دسته‌بندی‌ها:", error);

    return Response.json(
      {
        success: false,
        message: "خطا در دریافت دسته‌بندی‌ها",
      },
      {
        status: 500,
      },
    );
  }
}
