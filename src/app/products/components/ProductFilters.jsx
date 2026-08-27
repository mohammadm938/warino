"use client";

import { Search, SlidersHorizontal } from "lucide-react";

const categories = [
  "همه",
  "زیورآلات",
  "اکسسوری",
  "ساعت",
  "پوشاک",
  "خانه و دکور",
];

export default function ProductFilters() {
  return (
    <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="دنبال چه محصولی می‌گردی؟"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:bg-white"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal className="ml-2 h-5 w-5 shrink-0 text-gray-400" />

          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                index === 0
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
