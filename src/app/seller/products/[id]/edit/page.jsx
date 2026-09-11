"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { ArrowRight, Image as ImageIcon, Save, Store, X } from "lucide-react";

import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";

import { products } from "../../../../data/products";
import { categories } from "../../../../data/categories";
import { shops } from "../../../../data/shops";

const CURRENT_SELLER_SHOP_ID = 1;
const SELLER_PRODUCTS_KEY = "warino_seller_products";

function formatPrice(price) {
  if (!price) return "";

  return new Intl.NumberFormat("fa-IR").format(Number(price));
}

export default function EditSellerProductPage() {
  const params = useParams();
  const router = useRouter();

  const productId = String(params.id);

  const currentShop = shops.find(
    (shop) => String(shop.id) === String(CURRENT_SELLER_SHOP_ID),
  );

  const [product, setProduct] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    categoryId: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /*
   * پیدا کردن محصول
   *
   * اول localStorage را بررسی می‌کنیم.
   * اگر محصول جدید فروشنده نبود، از products.js می‌خوانیم.
   */
  useEffect(() => {
    try {
      const savedProducts = JSON.parse(
        localStorage.getItem(SELLER_PRODUCTS_KEY) || "[]",
      );

      const localProduct = savedProducts.find(
        (item) => String(item.id) === productId,
      );

      if (localProduct) {
        setProduct(localProduct);

        setForm({
          title: localProduct.title || "",
          price: localProduct.price || "",
          categoryId: localProduct.categoryId || "",
          description: localProduct.description || "",
          image: localProduct.image || "",
        });

        setIsLoaded(true);
        return;
      }

      const defaultProduct = products.find(
        (item) =>
          String(item.id) === productId &&
          String(item.shopId) === String(CURRENT_SELLER_SHOP_ID),
      );

      if (defaultProduct) {
        setProduct(defaultProduct);

        setForm({
          title: defaultProduct.title || "",
          price: defaultProduct.price || "",
          categoryId: defaultProduct.categoryId || "",
          description: defaultProduct.description || "",
          image: defaultProduct.image || "",
        });
      }
    } catch (error) {
      console.error("خطا در خواندن محصول:", error);
    } finally {
      setIsLoaded(true);
    }
  }, [productId]);

  const imagePreview = useMemo(() => {
    return form.image.trim();
  }, [form.image]);

  const selectedCategory = useMemo(() => {
    return categories.find(
      (item) => String(item.id) === String(form.categoryId),
    );
  }, [form.categoryId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "نام محصول را وارد کنید.";
    }

    if (!form.price) {
      newErrors.price = "قیمت محصول را وارد کنید.";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "قیمت باید بیشتر از صفر باشد.";
    }

    if (!form.categoryId) {
      newErrors.categoryId = "دسته‌بندی محصول را انتخاب کنید.";
    }

    if (!form.description.trim()) {
      newErrors.description = "توضیحات محصول را وارد کنید.";
    }

    if (!form.image.trim()) {
      newErrors.image = "آدرس تصویر محصول را وارد کنید.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!product) return;

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const savedProducts = JSON.parse(
        localStorage.getItem(SELLER_PRODUCTS_KEY) || "[]",
      );

      const isLocalProduct = savedProducts.some(
        (item) => String(item.id) === productId,
      );

      const updatedProduct = {
        ...product,
        title: form.title.trim(),
        price: Number(form.price),
        categoryId: Number(form.categoryId),
        description: form.description.trim(),
        image: form.image.trim(),
      };

      if (isLocalProduct) {
        const updatedProducts = savedProducts.map((item) =>
          String(item.id) === productId ? updatedProduct : item,
        );

        localStorage.setItem(
          SELLER_PRODUCTS_KEY,
          JSON.stringify(updatedProducts),
        );
      } else {
        /*
         * محصولات اولیه داخل products.js هستند و قابل تغییر مستقیم نیستند.
         *
         * برای اینکه تغییراتشان را هم فعلاً نگه داریم،
         * یک نسخه‌ی ویرایش‌شده در localStorage ذخیره می‌کنیم.
         */
        const existingOverrides = JSON.parse(
          localStorage.getItem("warino_product_overrides") || "[]",
        );

        const hasOverride = existingOverrides.some(
          (item) => String(item.id) === productId,
        );

        let updatedOverrides;

        if (hasOverride) {
          updatedOverrides = existingOverrides.map((item) =>
            String(item.id) === productId ? updatedProduct : item,
          );
        } else {
          updatedOverrides = [...existingOverrides, updatedProduct];
        }

        localStorage.setItem(
          "warino_product_overrides",
          JSON.stringify(updatedOverrides),
        );
      }

      router.push("/seller/products");
    } catch (error) {
      console.error("خطا در ذخیره تغییرات:", error);

      setErrors({
        submit: "ذخیره تغییرات انجام نشد. دوباره تلاش کنید.",
      });

      setIsSaving(false);
    }
  };

  /*
   * Loading
   */
  if (!isLoaded) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-[#faf9ff] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600" />

              <p className="mt-4 text-sm font-bold text-gray-400">
                در حال بارگذاری محصول...
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  /*
   * Product Not Found
   */
  if (!product) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-[#faf9ff] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-gray-100 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-400">
              <PackageIcon />
            </div>

            <h1 className="mt-5 text-xl font-black text-gray-900">
              محصول پیدا نشد
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              محصول موردنظر وجود ندارد یا متعلق به این فروشگاه نیست.
            </p>

            <Link
              href="/seller/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-black text-white transition hover:bg-violet-600"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به محصولات
            </Link>
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
        <div className="mx-auto max-w-6xl">
          {/* Top */}
          <div className="mb-8">
            <Link
              href="/seller/products"
              className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-violet-600"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به محصولات
            </Link>

            <p className="text-sm font-bold text-violet-600">مدیریت فروشگاه</p>

            <h1 className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">
              ویرایش محصول
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              اطلاعات محصول را تغییر بده و تغییرات را ذخیره کن.
            </p>
          </div>

          {/* Shop */}
          <div className="mb-6 rounded-[2rem] border border-violet-100 bg-violet-50/60 p-5 sm:p-6">
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
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              {/* Form */}
              <div className="rounded-[2rem] border border-gray-100 bg-white p-5 sm:p-7">
                <div className="mb-7">
                  <h2 className="text-lg font-black text-gray-900">
                    اطلاعات محصول
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    اطلاعات محصول را ویرایش کنید.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-black text-gray-700"
                    >
                      نام محصول
                    </label>

                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={form.title}
                      onChange={handleChange}
                      className={`w-full rounded-2xl border bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-violet-500/5 ${
                        errors.title
                          ? "border-red-300"
                          : "border-gray-200 focus:border-violet-300"
                      }`}
                    />

                    {errors.title && (
                      <p className="mt-2 text-xs font-bold text-red-500">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Price + Category */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="price"
                        className="mb-2 block text-sm font-black text-gray-700"
                      >
                        قیمت
                      </label>

                      <div className="relative">
                        <input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          value={form.price}
                          onChange={handleChange}
                          className={`w-full rounded-2xl border bg-gray-50 px-4 py-3.5 pl-16 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-violet-500/5 ${
                            errors.price
                              ? "border-red-300"
                              : "border-gray-200 focus:border-violet-300"
                          }`}
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                          تومان
                        </span>
                      </div>

                      {errors.price && (
                        <p className="mt-2 text-xs font-bold text-red-500">
                          {errors.price}
                        </p>
                      )}

                      {form.price && Number(form.price) > 0 && (
                        <p className="mt-2 text-xs text-gray-400">
                          {formatPrice(form.price)} تومان
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="categoryId"
                        className="mb-2 block text-sm font-black text-gray-700"
                      >
                        دسته‌بندی
                      </label>

                      <select
                        id="categoryId"
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className={`w-full rounded-2xl border bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-violet-500/5 ${
                          errors.categoryId
                            ? "border-red-300"
                            : "border-gray-200 focus:border-violet-300"
                        }`}
                      >
                        <option value="">انتخاب دسته‌بندی</option>

                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>

                      {errors.categoryId && (
                        <p className="mt-2 text-xs font-bold text-red-500">
                          {errors.categoryId}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-black text-gray-700"
                    >
                      توضیحات محصول
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full resize-none rounded-2xl border bg-gray-50 px-4 py-3.5 text-sm leading-7 outline-none transition focus:bg-white focus:ring-4 focus:ring-violet-500/5 ${
                        errors.description
                          ? "border-red-300"
                          : "border-gray-200 focus:border-violet-300"
                      }`}
                    />

                    {errors.description && (
                      <p className="mt-2 text-xs font-bold text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Image */}
                  <div>
                    <label
                      htmlFor="image"
                      className="mb-2 block text-sm font-black text-gray-700"
                    >
                      آدرس تصویر
                    </label>

                    <div className="relative">
                      <ImageIcon className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="image"
                        name="image"
                        type="url"
                        value={form.image}
                        onChange={handleChange}
                        dir="ltr"
                        className={`w-full rounded-2xl border bg-gray-50 py-3.5 pl-4 pr-12 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-violet-500/5 ${
                          errors.image
                            ? "border-red-300"
                            : "border-gray-200 focus:border-violet-300"
                        }`}
                      />
                    </div>

                    {errors.image && (
                      <p className="mt-2 text-xs font-bold text-red-500">
                        {errors.image}
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 border-t border-gray-100 pt-6">
                  {errors.submit && (
                    <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                      {errors.submit}
                    </p>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Save className="h-5 w-5" />

                      {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
                    </button>

                    <Link
                      href="/seller/products"
                      className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-5 py-4 text-sm font-black text-gray-600 transition hover:bg-gray-50"
                    >
                      <X className="h-5 w-5" />
                      انصراف
                    </Link>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div>
                <div className="sticky top-24 rounded-[2rem] border border-gray-100 bg-white p-5 sm:p-6">
                  <div className="mb-5">
                    <h2 className="text-lg font-black text-gray-900">
                      پیش‌نمایش
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      نتیجه تغییرات را قبل از ذخیره ببین.
                    </p>
                  </div>

                  <div className="aspect-square overflow-hidden rounded-[1.5rem] bg-gray-100">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt={form.title || "پیش‌نمایش محصول"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center text-gray-300">
                        <ImageIcon className="h-12 w-12" />

                        <p className="mt-3 text-xs font-bold">تصویر محصول</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-black leading-7 text-gray-900">
                        {form.title || "نام محصول"}
                      </h3>

                      {selectedCategory && (
                        <span className="shrink-0 rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold text-violet-600">
                          {selectedCategory.name}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                      {form.description ||
                        "توضیحات محصول در این قسمت نمایش داده می‌شود."}
                    </p>

                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <p className="text-lg font-black text-gray-900">
                        {form.price
                          ? `${formatPrice(form.price)} تومان`
                          : "قیمت محصول"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-[10px] font-black text-white">
                        {currentShop?.initials || "SJ"}
                      </div>

                      <div>
                        <p className="text-xs font-black text-gray-800">
                          {currentShop?.name || "فروشگاه"}
                        </p>

                        <p className="mt-0.5 text-[10px] text-gray-400">
                          {currentShop?.username || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

function PackageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-8 w-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3.27 6.96 8.73 5.05 8.73-5.05M12 22.08V12"
      />
    </svg>
  );
}
