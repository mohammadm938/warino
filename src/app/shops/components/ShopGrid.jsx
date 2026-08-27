import Link from "next/link";
import { Instagram, MapPin, Package, ArrowLeft } from "lucide-react";

export default function ShopGrid({ shops }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {shops.map((shop) => (
        <article
          key={shop.id}
          className="group overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-100 hover:shadow-xl hover:shadow-gray-200/50"
        >
          {/* Top */}
          <div className="flex items-start justify-between">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-black text-white">
              {shop.initials}
            </div>

            <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-600">
              {shop.category}
            </span>
          </div>

          {/* Info */}
          <div className="mt-5">
            <Link
              href={`/shops/${shop.id}`}
              className="text-lg font-black text-gray-900 transition hover:text-violet-600"
            >
              {shop.name}
            </Link>

            <p className="mt-1 text-sm text-violet-600">{shop.username}</p>

            <p className="mt-3 line-clamp-2 text-sm leading-7 text-gray-500">
              {shop.description}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-5 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Package className="h-4 w-4" />
              {shop.productsCount} محصول
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
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
            >
              مشاهده فروشگاه
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <a
              href={shop.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`اینستاگرام ${shop.name}`}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
