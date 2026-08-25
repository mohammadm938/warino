import { Gem, Shirt, Watch, Heart, Smartphone, Home } from "lucide-react";

const categories = [
  {
    title: "زیورآلات",
    icon: Gem,
    count: "۱۲۴ فروشگاه",
  },
  {
    title: "پوشاک",
    icon: Shirt,
    count: "۸۶ فروشگاه",
  },
  {
    title: "ساعت",
    icon: Watch,
    count: "۴۲ فروشگاه",
  },
  {
    title: "اکسسوری",
    icon: Heart,
    count: "۷۸ فروشگاه",
  },
  {
    title: "دیجیتال",
    icon: Smartphone,
    count: "۳۵ فروشگاه",
  },
  {
    title: "خانه و دکور",
    icon: Home,
    count: "۵۴ فروشگاه",
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-20" id="categories">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-bold text-violet-600">
              دسته‌بندی‌ها
            </p>

            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
              دنبال چی می‌گردی؟
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.title}
                type="button"
                className="group rounded-3xl border border-gray-100 bg-gray-50 p-5 text-right transition hover:-translate-y-1 hover:border-violet-100 hover:bg-violet-50 hover:shadow-lg hover:shadow-violet-100/50"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm transition group-hover:bg-violet-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-bold text-gray-900">{category.title}</h3>

                <p className="mt-1 text-xs text-gray-400">{category.count}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
