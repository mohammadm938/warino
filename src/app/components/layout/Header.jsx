"use client";

import Link from "next/link";
import { Search, Store, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-gray-900"
        >
          وارینو<span className="text-violet-600">.</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-600 transition hover:text-violet-600"
          >
            محصولات
          </Link>

          <Link
            href="/shops"
            className="text-sm font-medium text-gray-600 transition hover:text-violet-600"
          >
            فروشگاه‌ها
          </Link>

          <Link
            href="/categories"
            className="text-sm font-medium text-gray-600 transition hover:text-violet-600"
          >
            دسته‌بندی‌ها
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const value = search.trim();

              if (!value) return;

              router.push(`/search?q=${encodeURIComponent(value)}`);
            }}
          >
            <input
              className="focus:outline-none"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="چی می‌خوای پیدا کنی؟"
            />
          </form>

          <Link
            href="/register"
            className="hidden items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 sm:flex"
          >
            <Store className="h-4 w-4" />
            فروشنده شوید
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600"
          >
            <UserRound className="h-4 w-4" />
            ورود
          </Link>
        </div>
      </div>
    </header>
  );
}
