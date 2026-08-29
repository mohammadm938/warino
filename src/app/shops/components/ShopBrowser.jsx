"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Store } from "lucide-react";

import ShopGrid from "./ShopGrid";

const categories = [
  "همه",
  "زیورآلات",
  "اکسسوری",
  "ساعت",
  "پوشاک",
  "خانه و دکور",
];

export default function ShopBrowser({ shops }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");

  const filteredShops = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return shops.filter((shop) => {
      const matchesSearch =
        normalizedSearch === "" ||
        shop.name.toLowerCase().includes(normalizedSearch) ||
        shop.username.toLowerCase().includes(normalizedSearch) ||
        shop.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory = category === "همه" || shop.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [shops, search, category]);

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
              placeholder="نام فروشگاه را جستجو کن..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:bg-white"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="ml-2 h-5 w-5 shrink-0 text-gray-400" />

            {categories.map((item) => {
              const isActive = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-900">
            {filteredShops.length}
          </span>{" "}
          فروشگاه پیدا شد
        </p>

        {(search || category !== "همه") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("همه");
            }}
            className="text-xs font-bold text-violet-600 transition hover:text-violet-700"
          >
            حذف فیلترها
          </button>
        )}
      </div>

      {/* Results */}
      {filteredShops.length > 0 ? (
        <ShopGrid shops={filteredShops} />
      ) : (
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
            onClick={() => {
              setSearch("");
              setCategory("همه");
            }}
            className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-600"
          >
            نمایش همه فروشگاه‌ها
          </button>
        </div>
      )}
    </>
  );
}
