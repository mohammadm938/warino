import Link from "next/link";
import { MapPin, Package, Star, Store } from "lucide-react";

import { products } from "../../data/products";

export default function ShopGrid({ shops = [] }) {
  if (!shops || shops.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <Store className="h-8 w-8 text-gray-400" />
        </div>

        <h3 className="mt-5 text-lg font-black text-gray-900">
          فروشگاهی پیدا نشد
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          عبارت جستجو یا فیلتر دسته‌بندی را تغییر بده.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {shops.map((shop) => {
        const shopProductCount = products.filter(
          (product) => String(product.shopId) === String(shop.id),
        ).length;

        return (
          <article
            key={shop.id}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-100 hover:shadow-xl hover:shadow-gray-200/50"
          >
            {/* Store Header */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-black text-white">
                {shop.initials || shop.name?.slice(0, 2) || "ش"}
              </div>

              <div className="min-w-0 flex-1">
                <Link href={`/shops/${shop.slug}`}>
                  <h3 className="truncate text-base font-black text-gray-900 transition hover:text-violet-600">
                    {shop.name}
                  </h3>
                </Link>

                {shop.username && (
                  <p className="mt-1 truncate text-xs text-gray-400">
                    {shop.username.startsWith("@")
                      ? shop.username
                      : `@${shop.username}`}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            {shop.description && (
              <p className="mt-4 line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
                {shop.description}
              </p>
            )}

            {/* Location */}
            {shop.location && (
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <MapPin className="h-4 w-4 shrink-0" />

                <span className="truncate">{shop.location}</span>
              </div>
            )}

            {/* Stats */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Package className="h-4 w-4" />

                <span>{shopProductCount.toLocaleString("fa-IR")} محصول</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Star className="h-4 w-4 fill-current text-amber-500" />

                <span>{shop.rating || "۴.۹"}</span>
              </div>
            </div>

            {/* Button */}
            <Link
              href={`/shops/${shop.slug}`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-violet-600"
            >
              <Store className="h-4 w-4" />
              مشاهده فروشگاه
            </Link>
          </article>
        );
      })}
    </div>
  );
}
