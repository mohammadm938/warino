"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  PackageCheck,
  Search,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

const initialOrders = [
  {
    id: 1024,
    product: "گردنبند استیل",
    customer: "مریم رضایی",
    phone: "09123456789",
    price: 850000,
    quantity: 1,
    date: "۱۴۰۵/۰۶/۱۸",
    status: "pending",
  },
  {
    id: 1023,
    product: "ساعت کلاسیک",
    customer: "علی محمدی",
    phone: "09121234567",
    price: 2400000,
    quantity: 1,
    date: "۱۴۰۵/۰۶/۱۷",
    status: "confirmed",
  },
  {
    id: 1022,
    product: "کیف دستی زنانه",
    customer: "سارا احمدی",
    phone: "09351234567",
    price: 1750000,
    quantity: 1,
    date: "۱۴۰۵/۰۶/۱۶",
    status: "shipped",
  },
  {
    id: 1021,
    product: "دستبند سنگی",
    customer: "نگار کریمی",
    phone: "09119876543",
    price: 620000,
    quantity: 2,
    date: "۱۴۰۵/۰۶/۱۵",
    status: "delivered",
  },
  {
    id: 1020,
    product: "کیف دوشی",
    customer: "رضا احمدی",
    phone: "09105554433",
    price: 1320000,
    quantity: 1,
    date: "۱۴۰۵/۰۶/۱۴",
    status: "cancelled",
  },
];

const statusConfig = {
  pending: {
    label: "در انتظار بررسی",
    className: "bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  confirmed: {
    label: "تأیید شده",
    className: "bg-blue-50 text-blue-700",
    icon: CheckCircle2,
  },
  shipped: {
    label: "ارسال شده",
    className: "bg-violet-50 text-violet-700",
    icon: Truck,
  },
  delivered: {
    label: "تحویل شده",
    className: "bg-green-50 text-green-700",
    icon: PackageCheck,
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-red-50 text-red-600",
    icon: XCircle,
  },
};

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        String(order.id).includes(query) ||
        order.product.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query);

      const matchesStatus = !status || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  const changeStatus = (orderId, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order,
      ),
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#faf9ff] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link
                href="/seller"
                className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-violet-600"
              >
                <ArrowRight className="h-4 w-4" />
                بازگشت به داشبورد
              </Link>

              <p className="text-sm font-bold text-violet-600">
                مدیریت فروشگاه
              </p>

              <h1 className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">
                سفارش‌ها
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                سفارش‌های مشتریان را بررسی و وضعیت آن‌ها را مدیریت کن.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-3xl border border-gray-100 bg-white p-5">
              <p className="text-xs font-bold text-gray-400">کل سفارش‌ها</p>

              <p className="mt-2 text-2xl font-black text-gray-900">
                {orders.length}
              </p>
            </div>

            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
              <p className="text-xs font-bold text-amber-700">
                در انتظار بررسی
              </p>

              <p className="mt-2 text-2xl font-black text-amber-800">
                {orders.filter((order) => order.status === "pending").length}
              </p>
            </div>

            <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
              <p className="text-xs font-bold text-violet-700">ارسال شده</p>

              <p className="mt-2 text-2xl font-black text-violet-800">
                {orders.filter((order) => order.status === "shipped").length}
              </p>
            </div>

            <div className="rounded-3xl border border-green-100 bg-green-50 p-5">
              <p className="text-xs font-bold text-green-700">تحویل شده</p>

              <p className="mt-2 text-2xl font-black text-green-800">
                {orders.filter((order) => order.status === "delivered").length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-[2rem] border border-gray-100 bg-white p-5 sm:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="جستجو بر اساس شماره سفارش، محصول یا مشتری..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                />
              </div>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-bold text-gray-700 outline-none transition focus:border-violet-300 focus:bg-white"
              >
                <option value="">همه وضعیت‌ها</option>

                <option value="pending">در انتظار بررسی</option>

                <option value="confirmed">تأیید شده</option>

                <option value="shipped">ارسال شده</option>

                <option value="delivered">تحویل شده</option>

                <option value="cancelled">لغو شده</option>
              </select>

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-2xl border border-gray-200 px-5 py-3.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
              >
                پاک کردن
              </button>
            </div>
          </div>

          {/* Result Count */}
          <div className="mb-4 px-1">
            <p className="text-sm text-gray-500">
              نمایش{" "}
              <span className="font-black text-gray-900">
                {filteredOrders.length}
              </span>{" "}
              سفارش
            </p>
          </div>

          {/* Orders */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const config = statusConfig[order.status];

                const StatusIcon = config.icon;

                return (
                  <article
                    key={order.id}
                    className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-lg hover:shadow-gray-200/40 sm:p-6"
                  >
                    <div className="flex flex-col gap-5">
                      {/* Top */}
                      <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                            <ShoppingBag className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-xs text-gray-400">شماره سفارش</p>

                            <h2 className="mt-1 font-black text-gray-900">
                              #{order.id}
                            </h2>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${config.className}`}
                          >
                            <StatusIcon className="h-4 w-4" />
                            {config.label}
                          </span>

                          <span className="text-xs text-gray-400">
                            {order.date}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid gap-5 md:grid-cols-3">
                        <div>
                          <p className="text-xs text-gray-400">محصول</p>

                          <p className="mt-2 text-sm font-black text-gray-900">
                            {order.product}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            تعداد: {order.quantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">مشتری</p>

                          <p className="mt-2 text-sm font-bold text-gray-900">
                            {order.customer}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {order.phone}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400">مبلغ سفارش</p>

                          <p className="mt-2 text-sm font-black text-gray-900">
                            {formatPrice(order.price)} تومان
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-400">
                          وضعیت سفارش را می‌توانی از اینجا تغییر دهی.
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {order.status === "pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  changeStatus(order.id, "confirmed")
                                }
                                className="rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-violet-600"
                              >
                                تأیید سفارش
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  changeStatus(order.id, "cancelled")
                                }
                                className="rounded-xl border border-red-100 px-4 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-50"
                              >
                                لغو سفارش
                              </button>
                            </>
                          )}

                          {order.status === "confirmed" && (
                            <button
                              type="button"
                              onClick={() => changeStatus(order.id, "shipped")}
                              className="rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-violet-600"
                            >
                              ثبت ارسال
                            </button>
                          )}

                          {order.status === "shipped" && (
                            <button
                              type="button"
                              onClick={() =>
                                changeStatus(order.id, "delivered")
                              }
                              className="rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-violet-600"
                            >
                              ثبت تحویل
                            </button>
                          )}

                          {order.status === "delivered" && (
                            <span className="rounded-xl bg-green-50 px-4 py-2.5 text-xs font-bold text-green-700">
                              سفارش تکمیل شده
                            </span>
                          )}

                          {order.status === "cancelled" && (
                            <span className="rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600">
                              سفارش لغو شده
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-gray-100 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <ShoppingBag className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-lg font-black text-gray-900">
                سفارشی پیدا نشد
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                فیلترها یا عبارت جستجو را تغییر بده.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
