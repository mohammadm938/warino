import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Instagram,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Star,
} from "lucide-react";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

import { products } from "../../data/products";
import { shops } from "../../data/shops";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <>
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>

            <h1 className="mt-6 text-2xl font-black text-gray-900">
              محصول پیدا نشد
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              این محصول وجود ندارد یا ممکن است حذف شده باشد.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-2xl bg-gray-900 px-6 py-3 font-bold text-white transition hover:bg-violet-600"
            >
              بازگشت به محصولات
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const shop = shops.find((item) => item.id === product.shopId);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition hover:text-violet-600">
              خانه
            </Link>

            <ArrowRight className="h-4 w-4" />

            <Link href="/products" className="transition hover:text-violet-600">
              محصولات
            </Link>

            <ArrowRight className="h-4 w-4" />

            <span className="font-medium text-gray-700">{product.title}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  aria-label="افزودن به علاقه‌مندی‌ها"
                  className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-lg transition hover:text-red-500"
                >
                  <Heart className="h-5 w-5" />
                </button>

                <span className="absolute right-5 top-5 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-gray-700 shadow-sm">
                  محصول
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <span className="w-fit rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-600">
                محصول منتخب
              </span>

              <h1 className="mt-5 text-3xl font-black leading-[1.4] text-gray-900 sm:text-4xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <span className="text-sm text-gray-400">۴.۹ از ۵</span>
              </div>

              <div className="my-7 h-px bg-gray-100" />

              {/* Description */}
              <p className="text-sm leading-8 text-gray-500">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-7">
                <p className="text-sm text-gray-400">
                  قیمت اعلام‌شده توسط فروشنده
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-black text-gray-900">
                    {formatPrice(product.price)}
                  </span>

                  <span className="mb-1 text-sm text-gray-500">تومان</span>
                </div>
              </div>

              {/* Seller */}
              {shop && (
                <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-black text-white">
                        {shop.initials}
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">فروشنده</p>

                        <Link
                          href={`/shops/${shop.slug}`}
                          className="mt-1 block font-black text-gray-900 transition hover:text-violet-600"
                        >
                          {shop.name}
                        </Link>
                      </div>
                    </div>

                    <Link
                      href={`/shops/${shop.slug}`}
                      className="text-sm font-bold text-violet-600"
                    >
                      مشاهده
                    </Link>
                  </div>

                  <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {shop.location}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Package className="h-4 w-4" />
                      ارسال توسط فروشنده
                    </span>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={shop?.instagram || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gray-900 px-6 py-4 font-bold text-white transition hover:bg-violet-600"
                >
                  <Instagram className="h-5 w-5" />
                  خرید از فروشنده
                </a>

                {shop && (
                  <Link
                    href={`/shops/${shop.slug}`}
                    className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-4 font-bold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                  >
                    فروشگاه
                  </Link>
                )}
              </div>

              {/* Trust */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-green-50 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                <div>
                  <p className="text-sm font-bold text-green-800">
                    خرید مستقیم از فروشنده
                  </p>

                  <p className="mt-1 text-xs leading-6 text-green-700">
                    وارینو فروشنده‌ها را معرفی می‌کند و خرید مستقیماً از فروشنده
                    انجام می‌شود.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
