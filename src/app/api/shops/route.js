import { shops } from "../../data/shops";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  const category = searchParams.get("category") || "";

  let result = [...shops];

  // Search
  if (query) {
    result = result.filter((shop) => {
      const name = shop.name?.toLowerCase() || "";

      const username = shop.username?.toLowerCase() || "";

      const description = shop.description?.toLowerCase() || "";

      const location = shop.location?.toLowerCase() || "";

      return (
        name.includes(query) ||
        username.includes(query) ||
        description.includes(query) ||
        location.includes(query)
      );
    });
  }

  // Category
  if (category) {
    result = result.filter(
      (shop) => String(shop.categoryId) === String(category),
    );
  }

  return Response.json({
    success: true,
    count: result.length,

    filters: {
      query,
      category,
    },

    shops: result,
  });
}
