import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import ShopFilters from "./components/ShopFilters";
import ShopGrid from "./components/ShopGrid";

import { shops } from "../data/mockData";

export default function ShopsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition hover:text-violet-600">
              خانه
            </Link>

            <ArrowRight className="h-4 w-4" />

            <span className="font-medium text-gray-700">فروشگاه‌ها</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Store className="h-6 w-6" />
            </div>

            <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
              فروشگاه‌های وارینو
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              فروشگاه‌های جذاب اینستاگرامی را پیدا کن، محصولاتشان را ببین و
              مستقیم با خودشان ارتباط بگیر.
            </p>
          </div>

          {/* Filters */}
          <ShopFilters />

          {/* Count */}
          <div className="mb-5">
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">{shops.length}</span>{" "}
              فروشگاه در وارینو
            </p>
          </div>

          {/* Grid */}
          <ShopGrid shops={shops} />
        </div>
      </main>

      <Footer />
    </>
  );
}
