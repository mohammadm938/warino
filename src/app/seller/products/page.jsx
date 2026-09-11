"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Edit3,
  Package,
  Plus,
  Search,
  Store,
  Trash2,
} from "lucide-react";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { shops } from "../../data/shops";

const CURRENT_SELLER_SHOP_ID = 1;
const SELLER_PRODUCTS_KEY = "warino_seller_products";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function SellerProductsPage() {
  const currentShop = shops.find(
    (shop) => String(shop.id) === String(CURRENT_SELLER_SHOP_ID),
  );

  // محصولات پیش‌فرض همین فروشنده
  const defaultSellerProducts = useMemo(() => {
    return products.filter(
      (product) => String(product.shopId) === String(CURRENT_SELLER_SHOP_ID),
    );
  }, []);

  const [productList, setProductList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // خواندن محصولات ذخیره‌شده
  useEffect(() => {
    try {
      const savedProducts = JSON.parse(
        localStorage.getItem(SELLER_PRODUCTS_KEY) || "[]",
      );

      setProductList([...defaultSellerProducts, ...savedProducts]);
    } catch (error) {
      console.error("خطا در خواندن محصولات فروشنده:", error);

      setProductList(defaultSellerProducts);
    } finally {
      setIsLoaded(true);
    }
  }, [defaultSellerProducts]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return productList.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";

      const matchesSearch =
        !query || title.includes(query) || description.includes(query);

      const matchesCategory =
        !category || String(product.categoryId) === String(category);

      return matchesSearch && matchesCategory;
    });
  }, [productList, search, category]);

  const handleDelete = (productId) => {
    const product = productList.find((item) => item.id === productId);

    if (!product) return;

    const confirmed = window.confirm(
      `آیا از حذف «${product.title}» مطمئن هستید؟`,
    );

    if (!confirmed) return;

    /*
      اگر محصول از localStorage آمده باشد،
      آن را از localStorage هم حذف می‌کنیم.
    */
    const isLocalProduct = !products.some((item) => item.id === productId);

    if (isLocalProduct) {
      try {
        const savedProducts = JSON.parse(
          localStorage.getItem(SELLER_PRODUCTS_KEY) || "[]",
        );

        const updatedProducts = savedProducts.filter(
          (item) => item.id !== productId,
        );

        localStorage.setItem(
          SELLER_PRODUCTS_KEY,
          JSON.stringify(updatedProducts),
        );
      } catch (error) {
        console.error("خطا در حذف محصول:", error);
      }
    }

    setProductList((current) =>
      current.filter((item) => item.id !== productId),
    );
  };

  if (!isLoaded) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-[#faf9ff] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600" />

              <p className="mt-4 text-sm font-bold text-gray-400">
                در حال بارگذاری محصولات...
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

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
                className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-violet-600"
              >
                <ArrowRight className="h-4 w-4" />
                بازگشت به داشبورد
              </Link>

              <p className="text-sm font-bold text-violet-600">
                مدیریت فروشگاه
              </p>

              <h1 className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">
                محصولات من
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                محصولات فروشگاهت را مدیریت کن.
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

          {/* Current Shop */}
          <div className="mb-6 rounded-[2rem] border border-violet-100 bg-violet-50/60 p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-sm font-black text-white">
                  {currentShop?.initials || "SJ"}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-violet-600" />

                    <p className="text-xs font-bold text-violet-600">
                      فروشگاه فعلی
                    </p>
                  </div>

                  <h2 className="mt-1 text-base font-black text-gray-900">
                    {currentShop?.name || "فروشگاه"}
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    {currentShop?.username || ""}
                  </p>
                </div>
              </div>

              <Link
                href={`/shops/${currentShop?.slug || ""}`}
                className="text-sm font-bold text-violet-600 transition hover:text-violet-700"
              >
                مشاهده فروشگاه
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-[2rem] border border-gray-100 bg-white p-5 sm:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="جستجوی محصول..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                />
              </div>

              {/* Category */}
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-bold text-gray-700 outline-none transition focus:border-violet-300 focus:bg-white"
              >
                <option value="">همه دسته‌بندی‌ها</option>

                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Count */}
          <div className="mb-4 flex items-center justify-between px-1">
            <p className="text-sm text-gray-500">
              <span className="font-black text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              محصول
            </p>

            {(search || category) && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
                className="text-xs font-bold text-violet-600 transition hover:text-violet-700"
              >
                پاک کردن فیلترها
              </button>
            )}
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-4">
              {filteredProducts.map((product) => {
                const categoryObject = categories.find(
                  (item) => String(item.id) === String(product.categoryId),
                );

                return (
                  <article
                    key={product.id}
                    className="rounded-[2rem] border border-gray-100 bg-white p-4 transition hover:shadow-lg hover:shadow-gray-200/40 sm:p-5"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                      {/* Image */}
                      <div className="h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 md:w-28">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base font-black text-gray-900">
                            {product.title}
                          </h2>

                          <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-600">
                            {categoryObject?.name || "بدون دسته"}
                          </span>

                          {/* New Product Badge */}
                          {!products.some((item) => item.id === product.id) && (
                            <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-600">
                              جدید
                            </span>
                          )}
                        </div>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
                          {product.description}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <span className="text-sm font-black text-gray-900">
                            {formatPrice(product.price)} تومان
                          </span>

                          <span className="flex items-center gap-1.5 text-xs text-green-600">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            فعال
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 md:shrink-0">
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex h-11 items-center justify-center rounded-xl border border-gray-200 px-4 text-sm font-bold text-gray-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                        >
                          مشاهده
                        </Link>

                        <Link
                          href={`/seller/products/${product.id}/edit`}
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                          aria-label="ویرایش محصول"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                          aria-label="حذف محصول"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-gray-100 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <Package className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-lg font-black text-gray-900">
                محصولی پیدا نشد
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                جستجو یا فیلترهای انتخابی را تغییر بده.
              </p>

              <Link
                href="/seller/products/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-black text-white transition hover:bg-violet-600"
              >
                <Plus className="h-4 w-4" />
                افزودن محصول جدید
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
