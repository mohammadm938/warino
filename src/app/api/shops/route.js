import { shops } from "../../data/shops";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  let result = [...shops];

  if (query) {
    result = result.filter((shop) => {
      const name = shop.name?.toLowerCase() || "";

      const description = shop.description?.toLowerCase() || "";

      const username = shop.username?.toLowerCase() || "";

      return (
        name.includes(query) ||
        description.includes(query) ||
        username.includes(query)
      );
    });
  }

  return Response.json({
    success: true,
    count: result.length,
    filters: {
      query,
    },
    shops: result,
  });
}
