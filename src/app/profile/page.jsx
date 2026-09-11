"use client";

import Link from "next/link";

import {
  User,
  Mail,
  ShoppingBag,
  Heart,
  ShoppingCart,
  LogOut,
  ChevronLeft,
  Settings,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import useCart from "@/app/hooks/useCart";

export default function ProfilePage() {
  const { totalItems, totalPrice, isLoaded } = useCart();

  const user = {
    name: "محمد",
    email: "mohammad@example.com",
  };

  const menuItems = [
    {
      href: "/profile/orders",
      icon: ShoppingBag,
      title: "سفارش‌های من",
      description: "مشاهده و پیگیری سفارش‌ها",
    },
    {
      href: "/favorites",
      icon: Heart,
      title: "علاقه‌مندی‌ها",
      description: "محصولاتی که ذخیره کرده‌ای",
    },
    {
      href: "/cart",
      icon: ShoppingCart,
      title: "سبد خرید",
      description: isLoaded
        ? `${totalItems} محصول در سبد خرید`
        : "در حال بررسی سبد خرید",
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#faf9ff] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-bold text-violet-600">حساب کاربری</p>

            <h1 className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">
              پروفایل من
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              اطلاعات حساب و فعالیت‌های خودت را مدیریت کن.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            {/* User Card */}
            <aside>
              <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <User className="h-10 w-10" />
                  </div>

                  <h2 className="mt-5 text-xl font-black text-gray-900">
                    {user.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                </div>

                {/* Edit Profile */}
                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                >
                  <Settings className="h-4 w-4" />
                  ویرایش اطلاعات
                </button>

                {/* Logout */}
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "خروج از حساب بعد از پیاده‌سازی احراز هویت فعال می‌شود.",
                    )
                  }
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  خروج از حساب
                </button>
              </div>
            </aside>

            {/* Main */}
            <section className="space-y-6">
              {/* Welcome */}
              <div className="overflow-hidden rounded-[2rem] bg-gray-900 p-7 text-white shadow-xl shadow-gray-900/10 sm:p-8">
                <p className="text-sm font-bold text-violet-300">خوش آمدی 👋</p>

                <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                  سلام {user.name}!
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-gray-300">
                  از اینجا می‌توانی سفارش‌ها، علاقه‌مندی‌ها و سبد خرید خودت را
                  مدیریت کنی.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-gray-100 bg-white p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <ShoppingBag className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-2xl font-black text-gray-900">0</p>

                  <p className="mt-1 text-xs text-gray-400">سفارش ثبت‌شده</p>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <Heart className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-2xl font-black text-gray-900">-</p>

                  <p className="mt-1 text-xs text-gray-400">علاقه‌مندی‌ها</p>
                </div>

                <div className="col-span-2 rounded-3xl border border-gray-100 bg-white p-5 sm:col-span-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <ShoppingCart className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-2xl font-black text-gray-900">
                    {isLoaded ? totalItems : "-"}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">محصول در سبد</p>
                </div>
              </div>

              {/* Menu */}
              <div className="rounded-[2rem] border border-gray-100 bg-white p-5 sm:p-6">
                <h2 className="mb-4 text-lg font-black text-gray-900">
                  دسترسی سریع
                </h2>

                <div className="space-y-3">
                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-violet-100 hover:bg-violet-50"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition group-hover:bg-white group-hover:text-violet-600">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-900">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            {item.description}
                          </p>
                        </div>

                        <ChevronLeft className="h-5 w-5 text-gray-300 transition group-hover:-translate-x-1 group-hover:text-violet-600" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Cart Summary */}
              {isLoaded && totalItems > 0 && (
                <div className="flex flex-col gap-4 rounded-[2rem] border border-violet-100 bg-violet-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-violet-600">
                      سبد خرید شما آماده است
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {totalItems} محصول با ارزش{" "}
                      {new Intl.NumberFormat("fa-IR").format(totalPrice)} تومان
                    </p>
                  </div>

                  <Link
                    href="/cart"
                    className="flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                  >
                    مشاهده سبد خرید
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
