"use client";

import Link from "next/link";

import {
  Store,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  ArrowLeft,
  TrendingUp,
  Eye,
  Settings,
  LogOut,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function SellerDashboardPage() {
  const stats = [
    {
      title: "محصولات",
      value: "12",
      description: "محصول فعال",
      icon: Package,
      href: "/seller/products",
    },
    {
      title: "سفارش‌ها",
      value: "24",
      description: "سفارش ثبت‌شده",
      icon: ShoppingBag,
      href: "/seller/orders",
    },
    {
      title: "فروش",
      value: "8.4M",
      description: "تومان این ماه",
      icon: DollarSign,
      href: "/seller/orders",
    },
    {
      title: "بازدید",
      value: "1,284",
      description: "بازدید فروشگاه",
      icon: Eye,
      href: "/seller",
    },
  ];

  const recentOrders = [
    {
      id: "#1024",
      product: "گردنبند استیل",
      customer: "مریم رضایی",
      price: "850,000 تومان",
      status: "در انتظار بررسی",
    },
    {
      id: "#1023",
      product: "ساعت کلاسیک",
      customer: "علی محمدی",
      price: "2,400,000 تومان",
      status: "تأیید شده",
    },
    {
      id: "#1022",
      product: "کیف دستی زنانه",
      customer: "سارا احمدی",
      price: "1,750,000 تومان",
      status: "ارسال شده",
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#faf9ff] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-violet-600">پنل فروشنده</p>

              <h1 className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">
                سلام، فروشگاه آریا 👋
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                وضعیت فروشگاه و سفارش‌های خودت را مدیریت کن.
              </p>
            </div>

            <Link
              href="/seller/products/new"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-violet-600"
            >
              <Plus className="h-5 w-5" />
              افزودن محصول
            </Link>
          </div>

          {/* Store Banner */}
          <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-gray-900 p-7 text-white shadow-xl shadow-gray-900/10 sm:p-8">
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Store className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm font-bold text-violet-300">
                    فروشگاه شما در وارینو
                  </p>

                  <h2 className="mt-1 text-xl font-black">فروشگاه آریا</h2>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-gray-300">
                فروشگاهت را مدیریت کن، محصولات جدید اضافه کن و سفارش‌های
                مشتری‌ها را پیگیری کن.
              </p>

              <Link
                href="/shops/aria"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-violet-50"
              >
                مشاهده فروشگاه
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            <div className="pointer-events-none absolute -left-20 -top-32 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 right-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Link
                  key={stat.title}
                  href={stat.href}
                  className="group rounded-3xl border border-gray-100 bg-white p-5 transition hover:-translate-y-1 hover:border-violet-100 hover:shadow-lg hover:shadow-violet-500/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <Icon className="h-5 w-5" />
                    </div>

                    <ArrowLeft className="h-4 w-4 text-gray-300 transition group-hover:-translate-x-1 group-hover:text-violet-600" />
                  </div>

                  <p className="mt-5 text-2xl font-black text-gray-900">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    {stat.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {stat.description}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Recent Orders */}
            <section className="rounded-[2rem] border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-gray-900">
                    سفارش‌های اخیر
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    آخرین سفارش‌های فروشگاه
                  </p>
                </div>

                <Link
                  href="/seller/orders"
                  className="text-xs font-bold text-violet-600 transition hover:text-violet-700"
                >
                  مشاهده همه
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                      <ShoppingBag className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-violet-600">
                          {order.id}
                        </span>

                        <h3 className="truncate text-sm font-bold text-gray-900">
                          {order.product}
                        </h3>
                      </div>

                      <p className="mt-1 text-xs text-gray-400">
                        مشتری: {order.customer}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <p className="text-sm font-black text-gray-900">
                        {order.price}
                      </p>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold text-gray-500">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-[2rem] border border-gray-100 bg-white p-5">
                <h2 className="text-lg font-black text-gray-900">
                  دسترسی سریع
                </h2>

                <div className="mt-4 space-y-2">
                  <Link
                    href="/seller/products"
                    className="flex items-center gap-3 rounded-2xl p-3 text-sm font-bold text-gray-600 transition hover:bg-violet-50 hover:text-violet-600"
                  >
                    <Package className="h-5 w-5" />
                    مدیریت محصولات
                  </Link>

                  <Link
                    href="/seller/products/new"
                    className="flex items-center gap-3 rounded-2xl p-3 text-sm font-bold text-gray-600 transition hover:bg-violet-50 hover:text-violet-600"
                  >
                    <Plus className="h-5 w-5" />
                    افزودن محصول جدید
                  </Link>

                  <Link
                    href="/seller/orders"
                    className="flex items-center gap-3 rounded-2xl p-3 text-sm font-bold text-gray-600 transition hover:bg-violet-50 hover:text-violet-600"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    مدیریت سفارش‌ها
                  </Link>

                  <Link
                    href="/seller/settings"
                    className="flex items-center gap-3 rounded-2xl p-3 text-sm font-bold text-gray-600 transition hover:bg-violet-50 hover:text-violet-600"
                  >
                    <Settings className="h-5 w-5" />
                    تنظیمات فروشگاه
                  </Link>
                </div>
              </div>

              {/* Store Status */}
              <div className="rounded-[2rem] border border-green-100 bg-green-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-green-800">
                      فروشگاه فعال است
                    </p>

                    <p className="mt-1 text-xs text-green-700">
                      فروشگاه شما برای کاربران قابل مشاهده است.
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={() =>
                  alert(
                    "خروج از حساب بعد از پیاده‌سازی احراز هویت فعال می‌شود.",
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white px-4 py-3.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                خروج از پنل
              </button>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
