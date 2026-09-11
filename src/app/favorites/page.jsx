"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";

import useCart from "@/app/hooks/useCart";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const FAVORITES_KEY = "warino_favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("خطا در خواندن علاقه‌مندی‌ها:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter(
      (product) => String(product.id) !== String(productId),
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

    window.dispatchEvent(new Event("favorites-updated"));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (!isLoaded) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-gray-50 px-4 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="animate-pulse">
              <div className="h-8 w-48 rounded-lg bg-gray-200" />
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-96 rounded-3xl bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <Heart className="h-6 w-6" fill="currentColor" />
                </div>

                <div>
                  <h1 className="text-3xl font-black text-gray-900">
                    علاقه‌مندی‌ها
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    محصولاتی که ذخیره کردی
                  </p>
                </div>
              </div>
            </div>

            {favorites.length > 0 && (
              <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-600 shadow-sm">
                {favorites.length.toLocaleString("fa-IR")} محصول
              </span>
            )}
          </div>

          {/* Empty State */}
          {favorites.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-400">
                <Heart className="h-9 w-9" fill="currentColor" />
              </div>

              <h2 className="mt-6 text-xl font-black text-gray-900">
                هنوز محصولی ذخیره نکردی
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                وقتی محصولی رو دوست داشتی، روی قلبش بزن تا اینجا ذخیره بشه.
              </p>

              <Link
                href="/products"
                className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-2xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-violet-600"
              >
                مشاهده محصولات
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            /* Products */
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-red-500 shadow-sm backdrop-blur">
                        محبوب شما
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <Link href={`/products/${product.slug}`}>
                      <h2 className="line-clamp-1 text-base font-black text-gray-900 transition hover:text-violet-600">
                        {product.title}
                      </h2>
                    </Link>

                    {product.description && (
                      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                        {product.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mt-4">
                      <span className="text-lg font-black text-gray-900">
                        {Number(product.price).toLocaleString("fa-IR")}
                      </span>

                      <span className="mr-1 text-xs text-gray-500">تومان</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gray-900 px-3 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        افزودن به سبد
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFavorite(product.id)}
                        aria-label="حذف از علاقه‌مندی‌ها"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
