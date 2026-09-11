"use client";

import { useState } from "react";
import Link from "next/link";

import { ArrowRight, ImagePlus, PackagePlus, Save, X } from "lucide-react";

import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

import { categories } from "../../../data/categories";

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
    instagram: "",
    status: "active",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImagePreview(imageUrl);
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("محصول جدید:", {
      ...formData,
      price: Number(formData.price),
    });

    setMessage(
      "محصول با موفقیت آماده ثبت شد. اتصال به API را در مرحله Backend انجام می‌دهیم.",
    );
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#faf9ff] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/seller/products"
              className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-violet-600"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به محصولات
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <PackagePlus className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm font-bold text-violet-600">
                  مدیریت محصولات
                </p>

                <h1 className="mt-1 text-3xl font-black text-gray-900">
                  افزودن محصول جدید
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              اطلاعات محصول جدید را وارد کن تا در فروشگاه نمایش داده شود.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-green-100 bg-green-50 px-5 py-4 text-sm font-bold text-green-700">
              <span>{message}</span>

              <button
                type="button"
                onClick={() => setMessage("")}
                className="shrink-0 text-green-500 transition hover:text-green-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              {/* Main Form */}
              <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7">
                  <h2 className="text-xl font-black text-gray-900">
                    اطلاعات محصول
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    اطلاعات اصلی محصول را وارد کن.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      نام محصول
                    </label>

                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="مثلاً گردنبند استیل زنانه"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      توضیحات محصول
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="توضیحات کامل محصول را بنویس..."
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm leading-7 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                    />
                  </div>

                  {/* Price + Category */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="price"
                        className="mb-2 block text-sm font-bold text-gray-700"
                      >
                        قیمت
                      </label>

                      <div className="relative">
                        <input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          placeholder="2500000"
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-16 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                          تومان
                        </span>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="categoryId"
                        className="mb-2 block text-sm font-bold text-gray-700"
                      >
                        دسته‌بندی
                      </label>

                      <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-bold text-gray-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                      >
                        <option value="">انتخاب دسته‌بندی</option>

                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div>
                    <label
                      htmlFor="instagram"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      لینک اینستاگرام محصول
                    </label>

                    <input
                      id="instagram"
                      name="instagram"
                      type="url"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="https://instagram.com/..."
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                    />

                    <p className="mt-2 text-xs text-gray-400">
                      کاربر از این لینک برای خرید مستقیم از فروشنده استفاده
                      می‌کند.
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      وضعیت محصول
                    </label>

                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-bold text-gray-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                    >
                      <option value="active">فعال و قابل نمایش</option>

                      <option value="inactive">غیرفعال</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Image */}
                <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-black text-gray-900">
                    تصویر محصول
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    یک تصویر مناسب برای محصول انتخاب کن.
                  </p>

                  <div className="mt-5">
                    {imagePreview ? (
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                        <img
                          src={imagePreview}
                          alt="پیش‌نمایش محصول"
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-red-500 shadow-sm backdrop-blur transition hover:bg-red-50"
                          aria-label="حذف تصویر"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-center transition hover:border-violet-300 hover:bg-violet-50">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
                          <ImagePlus className="h-7 w-7" />
                        </div>

                        <p className="mt-4 text-sm font-bold text-gray-700">
                          انتخاب تصویر
                        </p>

                        <p className="mt-1 text-xs text-gray-400">JPG یا PNG</p>

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </section>

                {/* Publish */}
                <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-black text-gray-900">
                    انتشار محصول
                  </h2>

                  <p className="mt-2 text-xs leading-6 text-gray-400">
                    بعداً با اتصال Backend، این دکمه محصول را در دیتابیس ثبت و
                    در فروشگاه منتشر خواهد کرد.
                  </p>

                  <button
                    type="submit"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-violet-600"
                  >
                    <Save className="h-5 w-5" />
                    ثبت محصول
                  </button>

                  <Link
                    href="/seller/products"
                    className="mt-3 flex w-full items-center justify-center rounded-2xl border border-gray-200 px-5 py-3.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                  >
                    انصراف
                  </Link>
                </section>
              </aside>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
