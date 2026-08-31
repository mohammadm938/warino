"use client";

import Link from "next/link";
import { ArrowRight, Heart, Trash2 } from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import ProductGrid from "../products/components/ProductGrid";

import useFavorites from "../hooks/useFavorites";

import { products } from "../data/products";

export default function FavoritesPage() {
  const { favorites, clearFavorites, loaded } = useFavorites();

  if (!loaded) {
    return (
      <>
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center bg-gray-50">
          <div className="text-sm text-gray-400">در حال بارگذاری...</div>
        </main>

        <Footer />
      </>
    );
  }

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id),
  );

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

            <span className="font-medium text-gray-700">علاقه‌مندی‌ها</span>
          </div>

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                <Heart className="h-7 w-7 fill-red-500 text-red-500" />
              </div>

              <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
                علاقه‌مندی‌های من
              </h1>

              <p className="mt-3 text-sm text-gray-500">
                {favoriteProducts.length} محصول ذخیره شده
              </p>
            </div>

            {favoriteProducts.length > 0 && (
              <button
                type="button"
                onClick={clearFavorites}
                className="flex w-fit items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                حذف همه
              </button>
            )}
          </div>

          {/* Products */}
          {favoriteProducts.length > 0 ? (
            <ProductGrid products={favoriteProducts} />
          ) : (
            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50">
                <Heart className="h-9 w-9 text-red-300" />
              </div>

              <h2 className="mt-6 text-xl font-black text-gray-900">
                هنوز محصولی ذخیره نکردی
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-500">
                محصولاتی که دوست داری رو با ❤️ ذخیره کن تا بعداً راحت پیداشون
                کنی.
              </p>

              <Link
                href="/products"
                className="mt-6 inline-flex rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
              >
                کشف محصولات
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
