"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Check,
  Instagram,
  MapPin,
  Phone,
  Save,
  Store,
  User,
} from "lucide-react";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function SellerSettingsPage() {
  const [formData, setFormData] = useState({
    name: "فروشگاه آریا",
    username: "aria_shop",
    description: "فروشگاه تخصصی اکسسوری، زیورآلات و محصولات خاص.",
    phone: "09123456789",
    location: "نوشهر، مازندران",
    instagram: "https://instagram.com/aria_shop",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("اطلاعات فروشگاه:", formData);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#faf9ff] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/seller"
              className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-violet-600"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به داشبورد
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <Store className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm font-bold text-violet-600">
                  مدیریت فروشگاه
                </p>

                <h1 className="mt-1 text-3xl font-black text-gray-900">
                  تنظیمات فروشگاه
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              اطلاعات فروشگاهت را ویرایش و مدیریت کن.
            </p>
          </div>

          {/* Saved Message */}
          {saved && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-5 py-4 text-sm font-bold text-green-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Check className="h-4 w-4" />
              </div>
              اطلاعات فروشگاه با موفقیت ذخیره شد.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
              {/* Main Form */}
              <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7">
                  <h2 className="text-xl font-black text-gray-900">
                    اطلاعات عمومی
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    این اطلاعات در صفحه عمومی فروشگاه نمایش داده می‌شوند.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Store Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      نام فروشگاه
                    </label>

                    <div className="relative">
                      <Store className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="نام فروشگاه"
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                      />
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label
                      htmlFor="username"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      نام کاربری فروشگاه
                    </label>

                    <div className="relative">
                      <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="aria_shop"
                        dir="ltr"
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-left text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                      />
                    </div>

                    <p className="mt-2 text-xs text-gray-400">
                      این نام در آدرس صفحه فروشگاه استفاده خواهد شد.
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      درباره فروشگاه
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="درباره فروشگاه خود بنویس..."
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm leading-7 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                    />
                  </div>

                  {/* Phone + Location */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-bold text-gray-700"
                      >
                        شماره تماس
                      </label>

                      <div className="relative">
                        <Phone className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="09123456789"
                          dir="ltr"
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-left text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="mb-2 block text-sm font-bold text-gray-700"
                      >
                        موقعیت فروشگاه
                      </label>

                      <div className="relative">
                        <MapPin className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <input
                          id="location"
                          name="location"
                          type="text"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="شهر، استان"
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div>
                    <label
                      htmlFor="instagram"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      لینک اینستاگرام
                    </label>

                    <div className="relative">
                      <Instagram className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="instagram"
                        name="instagram"
                        type="url"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="https://instagram.com/..."
                        dir="ltr"
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-left text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                      />
                    </div>
                  </div>
                </div>

                {/* Save */}
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-violet-600 sm:w-auto"
                  >
                    <Save className="h-5 w-5" />
                    ذخیره تغییرات
                  </button>
                </div>
              </section>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Store Preview */}
                <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-black text-gray-900">
                    پیش‌نمایش فروشگاه
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    نمایی از اطلاعات فروشگاه
                  </p>

                  <div className="mt-5 rounded-3xl bg-gray-50 p-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                      <Store className="h-7 w-7" />
                    </div>

                    <h3 className="mt-4 font-black text-gray-900">
                      {formData.name || "نام فروشگاه"}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400" dir="ltr">
                      @{formData.username || "username"}
                    </p>

                    <p className="mt-4 line-clamp-3 text-xs leading-6 text-gray-500">
                      {formData.description ||
                        "توضیحات فروشگاه شما اینجا نمایش داده می‌شود."}
                    </p>

                    {formData.location && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                        <MapPin className="h-4 w-4" />
                        {formData.location}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/shops/aria"
                    className="mt-4 flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-xs font-bold text-gray-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                  >
                    مشاهده صفحه فروشگاه
                  </Link>
                </section>

                {/* Status */}
                <section className="rounded-[2rem] border border-green-100 bg-green-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-600">
                      <Check className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-black text-green-800">
                        فروشگاه فعال است
                      </p>

                      <p className="mt-1 text-xs leading-6 text-green-700">
                        فروشگاه شما در حال حاضر برای کاربران قابل مشاهده است.
                      </p>
                    </div>
                  </div>
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
