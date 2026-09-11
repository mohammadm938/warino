"use client";

import Link from "next/link";
import { ShoppingCart, Check, Store } from "lucide-react";
import { useState } from "react";

import { categories } from "@/app/data/categories";
import { shops } from "@/app/data/shops";
import useCart from "@/app/hooks/useCart";

export default function ProductGrid({ products }) {
  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedProductId(product.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  if (!products || products.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <ShoppingCart className="h-8 w-8 text-gray-400" />
        </div>

        <h3 className="mt-5 text-lg font-black text-gray-900">
          محصولی پیدا نشد
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          فیلترها یا عبارت جستجو را تغییر بده.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const category = categories.find(
          (item) => String(item.id) === String(product.categoryId),
        );

        const shop = shops.find(
          (item) => String(item.id) === String(product.shopId),
        );

        const isAdded = addedProductId === product.id;

        return (
          <div
            key={product.id}
            className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* تصویر */}
            <Link href={`/products/${product.slug}`}>
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {category && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm backdrop-blur">
                    {category.name}
                  </span>
                )}
              </div>
            </Link>

            {/* محتوا */}
            <div className="p-4">
              <Link href={`/products/${product.slug}`}>
                <h3 className="line-clamp-1 text-base font-black text-gray-900 transition hover:text-violet-600">
                  {product.title}
                </h3>
              </Link>

              {product.description && (
                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>
              )}

              {/* فروشگاه */}
              {shop && (
                <Link
                  href={`/shops/${shop.slug}`}
                  className="mt-3 flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-violet-600"
                >
                  <Store className="h-4 w-4" />

                  <span className="truncate">{shop.name}</span>
                </Link>
              )}

              {/* قیمت */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <span className="text-lg font-black text-gray-900">
                    {Number(product.price).toLocaleString("fa-IR")}
                  </span>

                  <span className="mr-1 text-xs text-gray-500">تومان</span>
                </div>
              </div>

              {/* دکمه */}
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-bold text-white transition ${
                  isAdded ? "bg-green-600" : "bg-gray-900 hover:bg-violet-600"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4" />
                    اضافه شد
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    افزودن به سبد
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
