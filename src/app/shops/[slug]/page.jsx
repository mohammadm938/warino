import Link from "next/link";
import { ArrowRight, MapPin, Package, Star, Store } from "lucide-react";

import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import ShopActions from "@/app/shops/components/ShopActions";

import ShopProductBrowser from "./components/ShopProductBrowser";

import { shops } from "@/app/data/shops";
import { products } from "@/app/data/products";
import { categories } from "@/app/data/categories";

export default async function ShopDetailPage({ params }) {
  const { slug } = await params;

  const shop = shops.find((item) => item.slug === slug);

  if (!shop) {
    return (
      <>
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Store className="h-8 w-8" />
            </div>

            <h1 className="mt-5 text-2xl font-black text-gray-900">
              فروشگاه پیدا نشد
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              فروشگاهی که دنبال آن هستید وجود ندارد یا حذف شده است.
            </p>

            <Link
              href="/shops"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-violet-600"
            >
              بازگشت به فروشگاه‌ها
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const shopProducts = products.filter(
    (product) => String(product.shopId) === String(shop.id),
  );

  const category = categories.find(
    (item) => String(item.id) === String(shop.categoryId),
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition hover:text-violet-600">
              خانه
            </Link>

            <ArrowRight className="h-4 w-4" />

            <Link href="/shops" className="transition hover:text-violet-600">
              فروشگاه‌ها
            </Link>

            <ArrowRight className="h-4 w-4" />

            <span className="font-medium text-gray-700">{shop.name}</span>
          </div>

          {/* Shop Header */}
          <section className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
            <div className="h-32 bg-gradient-to-l from-violet-700 via-violet-600 to-fuchsia-500 sm:h-40" />

            <div className="px-5 pb-6 sm:px-8 sm:pb-8">
              <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                {/* Identity */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-violet-600 to-fuchsia-500 text-2xl font-black text-white shadow-lg sm:h-28 sm:w-28 sm:text-3xl">
                    {shop.initials || shop.name?.slice(0, 2) || "ش"}
                  </div>

                  <div className="pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
                        {shop.name}
                      </h1>

                      {category && (
                        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600">
                          {category.name}
                        </span>
                      )}
                    </div>

                    {shop.username && (
                      <p className="mt-2 text-sm font-medium text-gray-400">
                        {shop.username.startsWith("@")
                          ? shop.username
                          : `@${shop.username}`}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {shop.instagram && (
                    <a
                      href={shop.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 px-5 text-sm font-bold text-white transition hover:scale-[1.02] hover:shadow-lg"
                    >
                      اینستاگرام
                    </a>
                  )}

                  <ShopActions shop={shop} />
                </div>
              </div>

              {/* Description */}
              {shop.description && (
                <p className="mt-6 max-w-3xl text-sm leading-7 text-gray-500 sm:text-base">
                  {shop.description}
                </p>
              )}

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Package className="h-4 w-4" />
                    <span className="text-xs font-medium">محصولات</span>
                  </div>

                  <p className="mt-2 text-lg font-black text-gray-900">
                    {shopProducts.length.toLocaleString("fa-IR")}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-medium">موقعیت</span>
                  </div>

                  <p className="mt-2 truncate text-sm font-black text-gray-900">
                    {shop.location || "ثبت نشده"}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star className="h-4 w-4 fill-current text-amber-500" />
                    <span className="text-xs font-medium">امتیاز</span>
                  </div>

                  <p className="mt-2 text-lg font-black text-gray-900">
                    {shop.rating || "۴.۹"}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Store className="h-4 w-4" />
                    <span className="text-xs font-medium">دنبال‌کننده</span>
                  </div>

                  <p className="mt-2 text-lg font-black text-gray-900">
                    {shop.followers || "—"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Products */}
          <section className="mt-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-violet-600">محصولات</p>

                <h2 className="mt-1 text-2xl font-black text-gray-900 sm:text-3xl">
                  محصولات {shop.name}
                </h2>
              </div>

              <span className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-500 shadow-sm ring-1 ring-gray-100">
                {shopProducts.length.toLocaleString("fa-IR")} محصول
              </span>
            </div>

            <ShopProductBrowser products={shopProducts} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
