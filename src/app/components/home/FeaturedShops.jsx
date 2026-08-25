import Link from "next/link";
import { ArrowLeft, Instagram, MapPin, Package, Store } from "lucide-react";

const shops = [
  {
    id: 1,
    name: "Sara Jewelry",
    username: "@sara_jewelry",
    description: "زیورآلات مینیمال و دست‌ساز",
    category: "زیورآلات",
    location: "تهران",
    products: 48,
    initials: "SJ",
  },
  {
    id: 2,
    name: "Mona Store",
    username: "@mona_store",
    description: "اکسسوری و محصولات ترند",
    category: "اکسسوری",
    location: "مشهد",
    products: 72,
    initials: "MS",
  },
  {
    id: 3,
    name: "Time Gallery",
    username: "@time_gallery",
    description: "ساعت‌های خاص و کلاسیک",
    category: "ساعت",
    location: "اصفهان",
    products: 36,
    initials: "TG",
  },
  {
    id: 4,
    name: "Nika Accessories",
    username: "@nika_accessories",
    description: "اکسسوری‌های روزمره و خاص",
    category: "اکسسوری",
    location: "رشت",
    products: 61,
    initials: "NA",
  },
];

export default function FeaturedShops() {
  return (
    <section className="bg-white py-20" id="shops">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold text-violet-600">
              فروشگاه‌های منتخب
            </p>

            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
              فروشگاه‌های جذاب رو کشف کن
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
              فروشگاه‌هایی که ارزش دنبال کردن و دیدن محصولاتشون رو دارن.
            </p>
          </div>

          <Link
            href="/shops"
            className="hidden items-center gap-2 text-sm font-bold text-gray-700 transition hover:text-violet-600 sm:flex"
          >
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {/* Shops */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shops.map((shop) => (
            <article
              key={shop.id}
              className="group rounded-3xl border border-gray-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-100 hover:shadow-xl hover:shadow-gray-200/50"
            >
              {/* Shop Header */}
              <div className="flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-black text-white">
                  {shop.initials}
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-600">
                  {shop.category}
                </span>
              </div>

              {/* Shop Info */}
              <div className="mt-5">
                <h3 className="font-black text-gray-900">{shop.name}</h3>

                <p className="mt-1 text-sm text-violet-600">{shop.username}</p>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                  {shop.description}
                </p>
              </div>

              {/* Meta */}
              <div className="mt-5 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Package className="h-4 w-4" />
                  {shop.products} محصول
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {shop.location}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-2">
                <Link
                  href={`/shops/${shop.id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-bold text-white transition hover:bg-violet-600"
                >
                  <Store className="h-4 w-4" />
                  فروشگاه
                </Link>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500"
                  aria-label={`اینستاگرام ${shop.name}`}
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/shops"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3.5 text-sm font-bold text-gray-700"
          >
            مشاهده همه فروشگاه‌ها
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
