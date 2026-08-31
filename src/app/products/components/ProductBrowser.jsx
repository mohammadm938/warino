"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, PackageSearch } from "lucide-react";

import ProductGrid from "./ProductGrid";

import { shops } from "../../data/shops";
import { categories } from "../../data/categories";

const sortOptions = [
  {
    value: "default",
    label: "جدیدترین",
  },
  {
    value: "price-low",
    label: "ارزان‌ترین",
  },
  {
    value: "price-high",
    label: "گران‌ترین",
  },
];

export default function ProductBrowser({ products }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const selectedCategoryObject = categories.find(
      (category) => category.name === selectedCategory,
    );

    let result = products.filter((product) => {
      const shop = shops.find((item) => item.id === product.shopId);

      const category = categories.find(
        (item) => item.id === product.categoryId,
      );

      const productTitle = product.title?.toLowerCase() || "";

      const shopName = shop?.name?.toLowerCase() || "";

      const shopUsername = shop?.username?.toLowerCase() || "";

      const categoryName = category?.name?.toLowerCase() || "";

      /*
       * Search
       */
      const matchesSearch =
        normalizedSearch === "" ||
        productTitle.includes(normalizedSearch) ||
        shopName.includes(normalizedSearch) ||
        shopUsername.includes(normalizedSearch) ||
        categoryName.includes(normalizedSearch);

      /*
       * Category
       */
      const matchesCategory =
        selectedCategory === "همه" ||
        product.categoryId === selectedCategoryObject?.id;

      return matchesSearch && matchesCategory;
    });

    /*
     * Sorting
     */
    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, selectedCategory, sort]);

  const hasFilters =
    search.trim() !== "" || selectedCategory !== "همه" || sort !== "default";

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("همه");
    setSort("default");
  };

  return (
    <>
      {/* Filters */}
      <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Search + Sort */}
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="نام محصول، فروشگاه یا دسته‌بندی را جستجو کن..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:bg-white"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-semibold text-gray-700 outline-none transition focus:border-violet-400 focus:bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  مرتب‌سازی: {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-gray-100 pt-4">
            <SlidersHorizontal className="ml-2 h-5 w-5 shrink-0 text-gray-400" />

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
            {filteredProducts.length}
          </span>{" "}
          محصول پیدا شد
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

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <PackageSearch className="h-7 w-7 text-gray-400" />
          </div>

          <h2 className="mt-5 text-lg font-black text-gray-900">
            محصولی پیدا نشد
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-500">
            عبارت جستجو یا فیلتر دیگری را امتحان کن.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-600"
          >
            نمایش همه محصولات
          </button>
        </div>
      )}
    </>
  );
}
