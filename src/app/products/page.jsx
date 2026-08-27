import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import ProductFilters from "./components/ProductFilters";
import ProductGrid from "./components/ProductGrid";

import { products } from "../data/mockData";

export default function ProductsPage() {
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

            <span className="font-medium text-gray-700">محصولات</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-bold text-violet-600">کشف کن</p>

            <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
              همه محصولات
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              محصولات جذاب فروشگاه‌های اینستاگرامی را پیدا کن.
            </p>
          </div>

          <ProductFilters />

          {/* Result count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">{products.length}</span>{" "}
              محصول پیدا شد
            </p>
          </div>

          <ProductGrid products={products} />
        </div>
      </main>

      <Footer />
    </>
  );
}
