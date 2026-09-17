import prisma from "@/app/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "شناسه محصول ارسال نشده است.",
        },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        slug: id,
      },
      include: {
        shop: true,
        category: true,
      },
    });

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "محصول پیدا نشد.",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("خطا در دریافت محصول:", error);

    return Response.json(
      {
        success: false,
        message: "خطا در دریافت محصول",
      },
      { status: 500 },
    );
  }
}
