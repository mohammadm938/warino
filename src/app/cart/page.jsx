"use client";

import Link from "next/link";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  PackageOpen,
} from "lucide-react";

import useCart from "@/app/hooks/useCart";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isLoaded,
  } = useCart();

  if (!isLoaded) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 px-4 py-16">
          <div className="mx-auto max-w-7xl text-center text-sm text-gray-500">
            در حال بارگذاری سبد خرید...
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-gray-50 px-4 py-16">
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100">
              <ShoppingCart className="h-9 w-9 text-gray-400" />
            </div>

            <h1 className="mt-6 text-2xl font-black text-gray-900">
              سبد خریدت خالیه
            </h1>

            <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
              هنوز محصولی به سبد خرید اضافه نکردی. از بین محصولات وارینو چیزی که
              دوست داری انتخاب کن.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
            >
              مشاهده محصولات
              <ArrowLeft className="h-4 w-4" />
            </Link>
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
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900">سبد خرید</h1>

              <p className="mt-2 text-sm text-gray-500">
                {totalItems} کالا در سبد خرید شما قرار دارد
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="flex w-fit items-center gap-2 text-sm font-bold text-red-500 transition hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              خالی کردن سبد
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <PackageOpen className="h-7 w-7 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <h2 className="truncate text-base font-black text-gray-900">
                          {product.title}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          {Number(product.price).toLocaleString("fa-IR")} تومان
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex items-center rounded-xl border border-gray-200">
                          <button
                            type="button"
                            onClick={() => increaseQuantity(product.id)}
                            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>

                          <span className="min-w-8 text-center text-sm font-bold text-gray-900">
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => decreaseQuantity(product.id)}
                            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-red-400 transition hover:bg-red-50 hover:text-red-500"
                          aria-label="حذف محصول"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-4 text-left">
                    <span className="text-sm text-gray-500">مجموع:</span>

                    <span className="mr-2 text-base font-black text-gray-900">
                      {Number(product.price * product.quantity).toLocaleString(
                        "fa-IR",
                      )}{" "}
                      تومان
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-black text-gray-900">خلاصه سفارش</h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">تعداد کالا</span>

                  <span className="font-bold text-gray-900">{totalItems}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">مبلغ محصولات</span>

                  <span className="font-bold text-gray-900">
                    {Number(totalPrice).toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-700">مبلغ نهایی</span>

                    <span className="text-lg font-black text-gray-900">
                      {Number(totalPrice).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center mt-6 w-full rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-violet-600"
              >
                ادامه فرایند خرید
              </Link>

              <Link
                href="/products"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-100 px-5 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-200"
              >
                ادامه خرید
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
