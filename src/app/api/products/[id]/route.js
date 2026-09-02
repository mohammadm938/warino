import { products } from "../../../data/products";

export async function GET(request, { params }) {
  const { id } = await params;

  const product = products.find((product) => String(product.id) === String(id));

  if (!product) {
    return Response.json(
      {
        success: false,
        message: "محصول پیدا نشد",
      },
      {
        status: 404,
      },
    );
  }

  return Response.json({
    success: true,
    product,
  });
}
