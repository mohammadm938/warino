import prisma from "@/app/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.trim() || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "";

    const where = {};

    // جستجو
    if (query) {
      where.OR = [
        {
          title: {
            contains: query,
          },
        },
        {
          description: {
            contains: query,
          },
        },
      ];
    }

    // فیلتر دسته‌بندی
    if (category) {
      where.categoryId = Number(category);
    }

    // مرتب‌سازی
    let orderBy = {
      createdAt: "desc",
    };

    if (sort === "price-low") {
      orderBy = {
        price: "asc",
      };
    }

    if (sort === "price-high") {
      orderBy = {
        price: "desc",
      };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        shop: true,
        category: true,
      },
    });

    return Response.json({
      success: true,
      count: products.length,
      filters: {
        query,
        category,
        sort,
      },
      products,
    });
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);

    return Response.json(
      {
        success: false,
        message: "خطا در دریافت محصولات",
      },
      {
        status: 500,
      },
    );
  }
}
