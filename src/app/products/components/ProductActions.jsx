"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";

import useCart from "@/app/hooks/useCart";

export default function ProductActions({ product, shop }) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => (current > 1 ? current - 1 : 1));
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* تعداد */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-2 sm:w-36">
          <button
            type="button"
            onClick={increaseQuantity}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold text-gray-700 transition hover:bg-gray-100"
            aria-label="افزایش تعداد"
          >
            +
          </button>

          <span className="min-w-8 text-center font-black text-gray-900">
            {quantity}
          </span>

          <button
            type="button"
            onClick={decreaseQuantity}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold text-gray-700 transition hover:bg-gray-100"
            aria-label="کاهش تعداد"
          >
            −
          </button>
        </div>

        {/* افزودن به سبد */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 font-bold text-white transition ${
            added ? "bg-green-600" : "bg-gray-900 hover:bg-violet-600"
          }`}
        >
          {added ? (
            <>
              <Check className="h-5 w-5" />
              به سبد اضافه شد
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              افزودن به سبد
            </>
          )}
        </button>
      </div>

      {/* مشاهده سبد */}
      {added && (
        <Link
          href="/cart"
          className="mt-3 flex items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 px-5 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-100"
        >
          مشاهده سبد خرید
        </Link>
      )}
    </div>
  );
}
