import { products } from "../../data/products";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  const category = searchParams.get("category") || "";

  const sort = searchParams.get("sort") || "default";

  let result = [...products];

  // -------------------------
  // Search
  // -------------------------

  if (query) {
    result = result.filter((product) => {
      const title = product.title?.toLowerCase() || "";

      const description = product.description?.toLowerCase() || "";

      return title.includes(query) || description.includes(query);
    });
  }

  // -------------------------
  // Category
  // -------------------------

  if (category) {
    result = result.filter(
      (product) => String(product.categoryId) === String(category),
    );
  }

  // -------------------------
  // Sorting
  // -------------------------

  if (sort === "price-low") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    result.sort((a, b) => b.price - a.price);
  }

  // -------------------------
  // Response
  // -------------------------

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
