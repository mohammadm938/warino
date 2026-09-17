"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, Store } from "lucide-react";

import ShopGrid from "./ShopGrid";
import { categories } from "../../data/categories";

export default function ShopBrowser({ initialShops = [] }) {
  const [shops, setShops] = useState(
    Array.isArray(initialShops) ? initialShops : [],
  );

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (search.trim()) {
          params.set("q", search.trim());
        }

        if (selectedCategory !== "همه") {
          const category = categories.find(
            (item) => item.name === selectedCategory,
          );

          if (category) {
            params.set("category", String(category.id));
          }
        }

        const queryString = params.toString();

        const url = queryString ? `/api/shops?${queryString}` : "/api/shops";

        const response = await fetch(url, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("خطا در دریافت فروشگاه‌ها");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "خطا در دریافت فروشگاه‌ها");
        }

        setShops(Array.isArray(data.shops) ? data.shops : []);
      } catch (error) {
        console.error("Shops fetch error:", error);

        setShops([]);
        setError("دریافت فروشگاه‌ها با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search, selectedCategory]);

  const hasFilters = search.trim() !== "" || selectedCategory !== "همه";

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("همه");
    setError("");
  };

  return (
    <>
      {/* Filters */}
      <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="نام فروشگاه، آیدی یا شهر را جستجو کن..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:bg-white"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="ml-2 h-5 w-5 shrink-0 text-gray-400" />

            {/* All */}
            <button
              type="button"
              onClick={() => setSelectedCategory("همه")}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                selectedCategory === "همه"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600"
              }`}
            >
              همه
            </button>

            {/* Categories */}
            {categories.map((category) => {
              const isActive = selectedCategory === category.name;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-900">
            {shops.length.toLocaleString("fa-IR")}
          </span>{" "}
          فروشگاه پیدا شد
        </p>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-bold text-violet-600 transition hover:text-violet-700"
          >
            حذف فیلترها
          </button>
        )}
      </div>

      {/* Error */}
      {error ? (
        <div className="rounded-3xl border border-red-100 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <Store className="h-7 w-7 text-red-400" />
          </div>

          <h2 className="mt-5 text-lg font-black text-gray-900">
            مشکلی پیش آمد
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-600"
          >
            تلاش مجدد
          </button>
        </div>
      ) : loading ? (
        /* Loading */
        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center">
          <p className="text-sm font-semibold text-gray-500">
            در حال دریافت فروشگاه‌ها...
          </p>
        </div>
      ) : shops.length > 0 ? (
        /* Shops */
        <ShopGrid shops={shops} />
      ) : (
        /* Empty */
        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <Store className="h-7 w-7 text-gray-400" />
          </div>

          <h2 className="mt-5 text-lg font-black text-gray-900">
            فروشگاهی پیدا نشد
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-500">
            عبارت جستجو یا دسته‌بندی دیگری را امتحان کن.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-600"
          >
            نمایش همه فروشگاه‌ها
          </button>
        </div>
      )}
    </>
  );
}
