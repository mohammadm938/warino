import { categories } from "../../../data/categories";

export async function GET(request, { params }) {
  const { id } = await params;

  const category = categories.find(
    (category) => String(category.id) === String(id),
  );

  if (!category) {
    return Response.json(
      {
        success: false,
        message: "دسته‌بندی پیدا نشد",
      },
      {
        status: 404,
      },
    );
  }

  return Response.json({
    success: true,
    category,
  });
}
