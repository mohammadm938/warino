"use client";

import Link from "next/link";

import { ExternalLink, ShoppingCart, Check } from "lucide-react";

import { useState } from "react";

import FavoriteButton from "../../components/common/FavoriteButton";

import { categories } from "@/app/data/categories";

import useCart from "@/app/hooks/useCart";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function ProductGrid({ products }) {
  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedProductId(product.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="group overflow-hidden rounded-3xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50"
        >
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <FavoriteButton productId={product.id} />

            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-700 backdrop-blur">
              {categories[product.categoryId].name}
            </span>
          </div>

          {/* Content */}
          <div className="p-5">
            <h2 className="line-clamp-1 font-bold text-gray-900">
              {product.title}
            </h2>

            <Link
              href={`/shops/${product.shopId}`}
              className="mt-2 block text-sm text-gray-400 transition hover:text-violet-600"
            >
              {product.shop}
            </Link>

            <div className="mt-5">
              <p className="text-xs text-gray-400">قیمت</p>

              <p className="mt-1 text-sm font-black text-gray-900">
                {formatPrice(product.price)} تومان
              </p>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-white transition ${
                  addedProductId === product.id
                    ? "bg-green-600"
                    : "bg-gray-900 hover:bg-violet-600"
                }`}
              >
                {addedProductId === product.id ? (
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
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition hover:bg-violet-100 hover:text-violet-600"
                aria-label="مشاهده محصول"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
