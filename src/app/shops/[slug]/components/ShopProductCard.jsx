"use client";

import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

import FavoriteButton from "@/app/components/common/FavoriteButton";
import useCart from "@/app/hooks/useCart";

export default function ShopProductCard({ product }) {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-violet-100 hover:shadow-xl hover:shadow-gray-200/50">
      {/* Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Favorite */}
          <FavoriteButton product={product} className="left-3 top-3" />

          {/* Product Label */}
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm backdrop-blur">
            محصول
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
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
            onClick={handleAddToCart}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-bold text-white transition ${
              added ? "bg-green-600" : "bg-gray-900 hover:bg-violet-600"
            }`}
          >
            {added ? (
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

          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center rounded-2xl border border-gray-200 px-4 text-sm font-bold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
          >
            مشاهده
          </Link>
        </div>
      </div>
    </article>
  );
}
