import Link from "next/link";
import {
  ArrowRight,
  Instagram,
  MapPin,
  Package,
  Share2,
  Star,
  Store,
} from "lucide-react";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

import { products, shops } from "../../data/mockData";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default async function ShopPage({ params }) {
  const { id } = await params;

  const shop = shops.find((item) => item.id === Number(id));

  if (!shop) {
    return (
      <>
        <Header />

        <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100">
              <Store className="h-8 w-8 text-gray-400" />
            </div>

            <h1 className="mt-6 text-2xl font-black text-gray-900">
              فروشگاه پیدا نشد
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              این فروشگاه وجود ندارد یا ممکن است حذف شده باشد.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-2xl bg-gray-900 px-6 py-3 font-bold text-white transition hover:bg-violet-600"
            >
              بازگشت به خانه
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const shopProducts = products.filter((product) => product.shopId === shop.id);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition hover:text-violet-600">
              خانه
            </Link>

            <ArrowRight className="h-4 w-4" />

            <Link href="/shops" className="transition hover:text-violet-600">
              فروشگاه‌ها
            </Link>

            <ArrowRight className="h-4 w-4" />

            <span className="font-medium text-gray-700">{shop.name}</span>
          </div>

          {/* Shop Hero */}
          <section className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
            <div className="h-32 bg-gradient-to-l from-violet-600 via-fuchsia-500 to-violet-400 sm:h-44" />

            <div className="px-5 pb-7 sm:px-8">
              <div className="-mt-12 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                {/* Identity */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.75rem] border-4 border-white bg-gray-900 text-2xl font-black text-white shadow-xl sm:h-32 sm:w-32 sm:text-3xl">
                    {shop.initials}
                  </div>

                  <div className="pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
                        {shop.name}
                      </h1>

                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600">
                        منتخب وارینو
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-violet-600">
                      {shop.username}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={shop.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600 sm:flex-none"
                  >
                    <Instagram className="h-4 w-4" />
                    اینستاگرام
                  </a>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                    aria-label="اشتراک‌گذاری"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mt-7 max-w-2xl">
                <p className="text-sm leading-8 text-gray-500">
                  {shop.description}
                </p>
              </div>

              {/* Stats */}
              <div className="mt-7 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6 sm:grid-cols-4">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <Package className="h-5 w-5 text-violet-600" />

                  <p className="mt-3 text-lg font-black text-gray-900">
                    {shop.productsCount}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">محصول</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <Instagram className="h-5 w-5 text-violet-600" />

                  <p className="mt-3 text-lg font-black text-gray-900">
                    {shop.followers}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">دنبال‌کننده</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <MapPin className="h-5 w-5 text-violet-600" />

                  <p className="mt-3 text-sm font-black text-gray-900">
                    {shop.location}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">محل فعالیت</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <Star className="h-5 w-5 text-amber-500" />

                  <p className="mt-3 text-lg font-black text-gray-900">۴.۹</p>

                  <p className="mt-1 text-xs text-gray-400">امتیاز</p>
                </div>
              </div>
            </div>
          </section>

          {/* Products */}
          <section className="mt-12">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="mb-2 text-sm font-bold text-violet-600">
                  محصولات فروشگاه
                </p>

                <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
                  محصولات {shop.name}
                </h2>
              </div>

              <span className="text-sm text-gray-400">
                {shopProducts.length} محصول
              </span>
            </div>

            {shopProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {shopProducts.map((product) => (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-3xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50"
                  >
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    <div className="p-5">
                      <p className="text-xs font-semibold text-violet-600">
                        {product.category}
                      </p>

                      <Link
                        href={`/products/${product.id}`}
                        className="mt-2 block font-bold text-gray-900 transition hover:text-violet-600"
                      >
                        {product.title}
                      </Link>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm font-black text-gray-900">
                          {formatPrice(product.price)} تومان
                        </p>

                        <Link
                          href={`/products/${product.id}`}
                          className="text-xs font-bold text-gray-400 transition hover:text-violet-600"
                        >
                          مشاهده
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center">
                <Package className="mx-auto h-10 w-10 text-gray-300" />

                <p className="mt-4 font-bold text-gray-700">
                  هنوز محصولی برای این فروشگاه ثبت نشده.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
