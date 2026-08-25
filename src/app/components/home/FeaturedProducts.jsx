import Link from "next/link";
import { ArrowLeft, Heart, ExternalLink } from "lucide-react";

const products = [
  {
    id: 1,
    title: "گردنبند مینیمال طلایی",
    shop: "Sara Jewelry",
    price: "۴۹۸,۰۰۰ تومان",
    category: "زیورآلات",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg4xHIsLAEVvXpcTAStpnidsZSED94h52mG_7py4_wLzJsjLPj3oH7hy9Z&s=10",
  },
  {
    id: 2,
    title: "کیف دوشی مینیمال",
    shop: "Mona Store",
    price: "۷۸۰,۰۰۰ تومان",
    category: "اکسسوری",
    image:
      "https://dilipo.com/wp-content/uploads/2024/02/%DA%A9%DB%8C%D9%81-%D8%AF%D9%88%D8%B4%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%D8%B2%D9%86%D8%A7%D9%86%D9%87-%D8%A2%D9%86%D8%B1%DB%8C%D8%A7-%D8%B3%D8%A8%D8%B2-%D9%BE%D8%A7%D8%B3%D8%AA%D9%84%DB%8C.webp",
  },
  {
    id: 3,
    title: "ساعت کلاسیک زنانه",
    shop: "Time Gallery",
    price: "۱,۲۵۰,۰۰۰ تومان",
    category: "ساعت",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABujmGcjIG1jPEvM_er7c4wQgtbEklqaEVrIhregQMw&s=10",
  },
  {
    id: 4,
    title: "دستبند استیل مینیمال",
    shop: "Nika Accessories",
    price: "۳۹۰,۰۰۰ تومان",
    category: "زیورآلات",
    image:
      "https://charkhegallery.com/storage/products/23/03/01/1677698067D415211A-0452-4891-A9CD-55C4CC314981.jpeg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-20" id="products">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold text-violet-600">
              محصولات منتخب
            </p>

            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
              چیزهایی که ارزش دیدن دارن
            </h2>

            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              محصولات جذاب از فروشگاه‌های منتخب وارینو
            </p>
          </div>

          <Link
            href="/products"
            className="hidden items-center gap-2 text-sm font-bold text-gray-700 transition hover:text-violet-600 sm:flex"
          >
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500"
                >
                  <Heart className="h-5 w-5" />
                </button>

                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-700 backdrop-blur">
                  {product.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="line-clamp-1 font-bold text-gray-900">
                  {product.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">{product.shop}</p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-400">قیمت</p>
                    <p className="mt-1 text-sm font-black text-gray-900">
                      {product.price}
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

        {/* Mobile link */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/products"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3.5 text-sm font-bold text-gray-700"
          >
            مشاهده همه محصولات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
