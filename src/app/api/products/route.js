import { products } from "../../data/products";
import { shops } from "../../data/shops";
import { categories } from "../../data/categories";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  const category = searchParams.get("category") || "";

  const sort = searchParams.get("sort") || "default";

  let result = [...products];

  // Search
  if (query) {
    result = result.filter((product) => {
      const shop = shops.find((shop) => shop.id === product.shopId);

      const categoryObject = categories.find(
        (item) => item.id === product.categoryId,
      );

      const title = product.title?.toLowerCase() || "";

      const description = product.description?.toLowerCase() || "";

      const shopName = shop?.name?.toLowerCase() || "";

      const shopUsername = shop?.username?.toLowerCase() || "";

      const categoryName = categoryObject?.name?.toLowerCase() || "";

      return (
        title.includes(query) ||
        description.includes(query) ||
        shopName.includes(query) ||
        shopUsername.includes(query) ||
        categoryName.includes(query)
      );
    });
  }

  // Category
  if (category) {
    result = result.filter(
      (product) => String(product.categoryId) === String(category),
    );
  }

  // Sorting
  if (sort === "price-low") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    result.sort((a, b) => b.price - a.price);
  }

  return Response.json({
    success: true,
    count: result.length,
    filters: {
      query,
      category,
      sort,
    },
    products: result,
  });
}
