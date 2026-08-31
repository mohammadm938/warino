import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import ProductBrowser from "./components/ProductBrowser";

import { products } from "../data/products";

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
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Package className="h-6 w-6" />
            </div>

            <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
              همه محصولات
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              بین محصولات فروشگاه‌های مختلف بگرد، مقایسه کن و چیزی که دوست داری
              پیدا کن.
            </p>
          </div>

          {/* Product Browser */}
          <ProductBrowser products={products} />
        </div>
      </main>

      <Footer />
    </>
  );
}
