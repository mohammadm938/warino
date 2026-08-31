import Link from "next/link";
import { ArrowRight, Search, Store, PackageSearch } from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { products } from "../data/products";
import { shops } from "../data/shops";
import { categories } from "../data/categories";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";

  const normalizedQuery = query.trim().toLowerCase();

  const matchedProducts = products.filter((product) => {
    const shop = shops.find((item) => item.id === product.shopId);

    const category = categories.find((item) => item.id === product.categoryId);

    const title = product.title?.toLowerCase() || "";

    const description = product.description?.toLowerCase() || "";

    const shopName = shop?.name?.toLowerCase() || "";

    const categoryName = category?.name?.toLowerCase() || "";

    return (
      title.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      shopName.includes(normalizedQuery) ||
      categoryName.includes(normalizedQuery)
    );
  });

  const matchedShops = shops.filter((shop) => {
    const name = shop.name?.toLowerCase() || "";

    const username = shop.username?.toLowerCase() || "";

    const description = shop.description?.toLowerCase() || "";

    const location = shop.location?.toLowerCase() || "";

    return (
      name.includes(normalizedQuery) ||
      username.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      location.includes(normalizedQuery)
    );
  });

  const hasResults = matchedProducts.length > 0 || matchedShops.length > 0;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition hover:text-violet-600">
              خانه
            </Link>

            <ArrowRight className="h-4 w-4" />

            <span className="font-medium text-gray-700">جستجو</span>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Search className="h-7 w-7" />
            </div>

            <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
              نتایج جستجو
            </h1>

            {query ? (
              <p className="mt-3 text-sm text-gray-500 sm:text-base">
                نتایج برای:
                <span className="mr-2 font-black text-gray-900">«{query}»</span>
              </p>
            ) : (
              <p className="mt-3 text-sm text-gray-500">
                برای پیدا کردن محصول یا فروشگاه جستجو کن.
              </p>
            )}
          </div>

          {!query ? (
            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center">
              <Search className="mx-auto h-10 w-10 text-gray-300" />

              <h2 className="mt-5 text-lg font-black text-gray-900">
                چی می‌خوای پیدا کنی؟
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                اسم محصول، فروشگاه یا دسته‌بندی رو جستجو کن.
              </p>
            </div>
          ) : !hasResults ? (
            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center">
              <PackageSearch className="mx-auto h-12 w-12 text-gray-300" />

              <h2 className="mt-5 text-xl font-black text-gray-900">
                نتیجه‌ای پیدا نشد
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                عبارت دیگری را امتحان کن.
              </p>

              <Link
                href="/products"
                className="mt-6 inline-flex rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
              >
                مشاهده محصولات
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Products */}
              {matchedProducts.length > 0 && (
                <section>
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-gray-900">
                        محصولات
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {matchedProducts.length} محصول مرتبط
                      </p>
                    </div>

                    <Link
                      href={`/products?search=${encodeURIComponent(query)}`}
                      className="text-sm font-bold text-violet-600"
                    >
                      مشاهده همه
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {matchedProducts.map((product) => {
                      const shop = shops.find(
                        (item) => item.id === product.shopId,
                      );

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div className="aspect-square overflow-hidden bg-gray-100">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="p-4">
                            <h3 className="line-clamp-1 font-bold text-gray-900">
                              {product.title}
                            </h3>

                            {shop && (
                              <p className="mt-2 text-xs text-gray-400">
                                {shop.name}
                              </p>
                            )}

                            <p className="mt-3 font-black text-violet-600">
                              {formatPrice(product.price)} تومان
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Shops */}
              {matchedShops.length > 0 && (
                <section>
                  <div className="mb-5">
                    <h2 className="text-xl font-black text-gray-900">
                      فروشگاه‌ها
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {matchedShops.length} فروشگاه مرتبط
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {matchedShops.map((shop) => (
                      <Link
                        key={shop.id}
                        href={`/shops/${shop.slug}`}
                        className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-black text-white">
                            {shop.initials}
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate font-black text-gray-900 transition group-hover:text-violet-600">
                              {shop.name}
                            </h3>

                            <p className="mt-1 truncate text-xs text-gray-400">
                              {shop.username}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                          <Store className="h-4 w-4" />
                          {shop.location}
                        </div>

                        <p className="mt-3 line-clamp-2 text-xs leading-6 text-gray-400">
                          {shop.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
