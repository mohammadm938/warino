"use client";

import { Search, SlidersHorizontal, PackageSearch } from "lucide-react";
import { useMemo, useState } from "react";

import ShopProductCard from "./ShopProductCard";

export default function ShopProductBrowser({ products = [] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
      result = result.filter((product) => {
        const title = product.title?.toLowerCase() || "";
        const description = product.description?.toLowerCase() || "";

        return (
          title.includes(normalizedQuery) ||
          description.includes(normalizedQuery)
        );
      });
    }

    if (sort === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sort === "newest") {
      result.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return result;
  }, [products, query, sort]);

  return (
    <div>
      {/* Search & Sort */}
      <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جستجو در محصولات این فروشگاه..."
              className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pr-12 pl-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {/* Sort */}
          <div className="relative lg:w-56">
            <SlidersHorizontal className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 pr-11 pl-4 text-sm font-bold text-gray-700 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            >
              <option value="newest">جدیدترین</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-black text-gray-900">
            {filteredProducts.length.toLocaleString("fa-IR")}
          </span>{" "}
          محصول
        </p>

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-xs font-bold text-violet-600 transition hover:text-violet-800"
          >
            پاک کردن جستجو
          </button>
        )}
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <PackageSearch className="h-8 w-8 text-gray-400" />
          </div>

          <h3 className="mt-5 text-lg font-black text-gray-900">
            محصولی پیدا نشد
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            عبارت جستجو یا نحوه مرتب‌سازی را تغییر بده.
          </p>

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-5 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
            >
              نمایش همه محصولات
            </button>
          )}
        </div>
      )}
    </div>
  );
}
