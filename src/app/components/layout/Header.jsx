"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, Menu, X, Store, ShoppingBag } from "lucide-react";

import FavoritesBadge from "../common/FavoritesBadge";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) return;

    setMobileOpen(false);

    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const navItems = [
    {
      href: "/products",
      label: "محصولات",
      icon: ShoppingBag,
    },
    {
      href: "/shops",
      label: "فروشگاه‌ها",
      icon: Store,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <div className="text-2xl font-black tracking-tight text-gray-900">
              Warino
            </div>

            <div className="text-[10px] font-medium text-gray-400">
              خرید هوشمند، مستقیم از فروشنده
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    active
                      ? "bg-violet-50 text-violet-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 lg:block lg:max-w-md"
          >
            <div className="relative">
              <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="جستجوی محصول یا فروشگاه..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-12 text-sm outline-none transition focus:border-violet-300 focus:bg-white"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Favorites */}
            <FavoritesBadge />

            {/* Login */}
            <Link
              href="/login"
              className="hidden rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-600 sm:block"
            >
              ورود / ثبت‌نام
            </Link>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100 lg:hidden"
              aria-label="منو"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 py-4 lg:hidden">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="جستجوی محصول یا فروشگاه..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm outline-none focus:border-violet-300 focus:bg-white"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                      active
                        ? "bg-violet-50 text-violet-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/favorites"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                  isActive("/favorites")
                    ? "bg-red-50 text-red-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Heart className="h-5 w-5" />
                علاقه‌مندی‌ها
                {/*
                 * فقط لینک است؛ تعداد اصلی در FavoritesBadge
                 * نمایش داده می‌شود.
                 */}
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center rounded-2xl bg-gray-900 px-4 py-3.5 text-sm font-bold text-white"
              >
                ورود / ثبت‌نام
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
