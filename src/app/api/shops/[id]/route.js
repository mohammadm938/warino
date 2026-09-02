import { shops } from "../../../data/shops";

export async function GET(request, { params }) {
  const { id } = await params;

  const shop = shops.find((shop) => String(shop.id) === String(id));

  if (!shop) {
    return Response.json(
      {
        success: false,
        message: "فروشگاه پیدا نشد",
      },
      {
        status: 404,
      },
    );
  }

  return Response.json({
    success: true,
    shop,
  });
}
