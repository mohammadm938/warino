import prisma from "@/app/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.trim() || "";
    const categoryParam = searchParams.get("category")?.trim() || "";

    const where = {};

    // جستجوی فروشگاه
    if (query) {
      where.OR = [
        {
          name: {
            contains: query,
          },
        },
        {
          username: {
            contains: query,
          },
        },
        {
          description: {
            contains: query,
          },
        },
        {
          location: {
            contains: query,
          },
        },
      ];
    }

    // فیلتر دسته‌بندی
    if (categoryParam) {
      const categoryId = Number(categoryParam);

      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        return Response.json(
          {
            success: false,
            message: "شناسه دسته‌بندی نامعتبر است.",
          },
          {
            status: 400,
          },
        );
      }

      where.categoryId = categoryId;
    }

    const shops = await prisma.shop.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,

        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    const formattedShops = shops.map((shop) => {
      const { _count, ...shopData } = shop;

      return {
        ...shopData,
        productsCount: _count.products,
      };
    });

    return Response.json({
      success: true,
      count: formattedShops.length,
      filters: {
        query,
        category: categoryParam,
      },
      shops: formattedShops,
    });
  } catch (error) {
    console.error("خطا در دریافت فروشگاه‌ها:", error);

    return Response.json(
      {
        success: false,
        message: "خطا در دریافت فروشگاه‌ها",
      },
      {
        status: 500,
      },
    );
  }
}
