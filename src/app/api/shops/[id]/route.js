import prisma from "@/app/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "شناسه فروشگاه ارسال نشده است.",
        },
        {
          status: 400,
        },
      );
    }

    const shopId = Number(id);

    if (!Number.isInteger(shopId) || shopId <= 0) {
      return Response.json(
        {
          success: false,
          message: "شناسه فروشگاه نامعتبر است.",
        },
        {
          status: 400,
        },
      );
    }

    const shop = await prisma.shop.findUnique({
      where: {
        id: shopId,
      },
      include: {
        category: true,
        products: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            category: true,
          },
        },
        _count: {
          select: {
            products: true,
            orders: true,
          },
        },
      },
    });

    if (!shop) {
      return Response.json(
        {
          success: false,
          message: "فروشگاه پیدا نشد.",
        },
        {
          status: 404,
        },
      );
    }

    const formattedShop = {
      ...shop,
      productsCount: shop._count.products,
      ordersCount: shop._count.orders,
      _count: undefined,
    };

    return Response.json({
      success: true,
      shop: formattedShop,
    });
  } catch (error) {
    console.error("خطا در دریافت فروشگاه:", error);

    return Response.json(
      {
        success: false,
        message: "خطا در دریافت فروشگاه.",
      },
      {
        status: 500,
      },
    );
  }
}
