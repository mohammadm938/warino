"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowRight, CheckCircle2, MapPin, Phone, User } from "lucide-react";

import useCart from "@/app/hooks/useCart";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function CheckoutPage() {
  const { cart, totalItems, totalPrice, isLoaded, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      return;
    }

    setSubmitted(true);
  };

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">در حال بارگذاری...</p>
      </main>
    );
  }

  if (cart.length === 0 && !submitted) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100">
            <CheckCircle2 className="h-8 w-8 text-gray-400" />
          </div>

          <h1 className="mt-6 text-2xl font-black text-gray-900">
            سبد خرید خالی است
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            ابتدا یک محصول به سبد خرید اضافه کن.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-2xl bg-gray-900 px-6 py-3 font-bold text-white transition hover:bg-violet-600"
          >
            مشاهده محصولات
          </Link>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="mt-6 text-2xl font-black text-gray-900">
            سفارش شما ثبت شد 🎉
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            این بخش فعلاً نمایشی است. بعداً با اتصال Backend و دیتابیس، سفارش
            واقعی ثبت خواهد شد.
          </p>

          <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-right">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">تعداد محصولات</span>

              <span className="font-bold text-gray-900">
                {formatPrice(totalItems)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">مبلغ سفارش</span>

              <span className="font-black text-gray-900">
                {formatPrice(totalPrice)} تومان
              </span>
            </div>
          </div>

          <Link
            href="/products"
            className="mt-6 flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-4 font-bold text-white transition hover:bg-violet-600"
          >
            بازگشت به محصولات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-violet-600"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به سبد خرید
          </Link>

          <h1 className="text-3xl font-black text-gray-900">تکمیل سفارش</h1>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات دریافت سفارش را وارد کن.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-black text-gray-900">اطلاعات گیرنده</h2>

            <div className="mt-6 space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  نام و نام خانوادگی
                </label>

                <div className="relative">
                  <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="مثلاً محمد مسعودی"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-4 pr-12 text-sm outline-none transition focus:border-violet-300 focus:bg-white"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  شماره موبایل
                </label>

                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0912..."
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-4 pr-12 text-sm outline-none transition focus:border-violet-300 focus:bg-white"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  آدرس
                </label>

                <div className="relative">
                  <MapPin className="absolute right-4 top-4 h-5 w-5 text-gray-400" />

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={5}
                    placeholder="آدرس کامل برای دریافت سفارش..."
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-4 pr-12 text-sm leading-7 outline-none transition focus:border-violet-300 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-7 flex w-full items-center justify-center rounded-2xl bg-gray-900 px-6 py-4 font-bold text-white transition hover:bg-violet-600"
            >
              ثبت سفارش
            </button>
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-gray-900">خلاصه سفارش</h2>

            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-gray-100 pb-4"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-bold text-gray-900">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      تعداد: {formatPrice(item.quantity)}
                    </p>

                    <p className="mt-1 text-sm font-black text-gray-900">
                      {formatPrice(item.price * item.quantity)} تومان
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">تعداد کالا</span>

                <span className="font-bold text-gray-900">
                  {formatPrice(totalItems)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">مبلغ نهایی</span>

                <span className="text-lg font-black text-gray-900">
                  {formatPrice(totalPrice)} تومان
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-green-50 p-4 text-xs leading-6 text-green-700">
              پرداخت و ثبت سفارش واقعی بعداً با Backend و درگاه پرداخت
              پیاده‌سازی می‌شود.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
