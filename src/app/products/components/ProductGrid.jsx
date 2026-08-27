import Link from "next/link";
import { ExternalLink, Heart } from "lucide-react";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="group overflow-hidden rounded-3xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50"
        >
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <button
              type="button"
              aria-label="افزودن به علاقه‌مندی‌ها"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur transition hover:text-red-500"
            >
              <Heart className="h-5 w-5" />
            </button>

            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-700 backdrop-blur">
              {product.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-5">
            <h2 className="line-clamp-1 font-bold text-gray-900">
              {product.title}
            </h2>

            <Link
              href={`/shops/${product.shopId}`}
              className="mt-2 block text-sm text-gray-400 transition hover:text-violet-600"
            >
              {product.shop}
            </Link>

            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-gray-400">قیمت</p>

                <p className="mt-1 text-sm font-black text-gray-900">
                  {formatPrice(product.price)} تومان
                </p>
              </div>

              <Link
                href={`/products/${product.id}`}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white transition hover:bg-violet-600"
                aria-label="مشاهده محصول"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
