import Link from "next/link";
import { ArrowLeft, Sparkles, Store } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      {/* Background decorations */}
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-fuchsia-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-semibold text-violet-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            کشف فروشگاه‌های جذاب
          </div>

          <h1 className="text-4xl font-black leading-[1.35] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            فروشگاه‌های خوب اینستاگرامی،
            <span className="block text-violet-600">اینجا پیدا میشن.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-500 sm:text-lg">
            وارینو کمک می‌کنه فروشگاه‌های جذاب اینستاگرامی و محصولات ترند رو
            راحت‌تر پیدا کنی و مستقیم به فروشنده برسی.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-7 py-3.5 font-bold text-white transition hover:bg-violet-600"
            >
              کشف محصولات
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-7 py-3.5 font-bold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
            >
              <Store className="h-5 w-5" />
              فروشنده شوید
            </Link>
          </div>
        </div>

        {/* Visual */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-[2.5rem] bg-gray-900 p-8 shadow-2xl">
            <div className="flex h-full flex-col justify-between rounded-[2rem] bg-gradient-to-br from-violet-600 to-fuchsia-500 p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                  WARINO
                </span>

                <Sparkles className="h-6 w-6 text-white" />
              </div>

              <div>
                <p className="text-sm font-medium text-white/70">
                  محصولات ترند
                </p>

                <h2 className="mt-2 text-4xl font-black text-white">
                  کشف کن.
                  <br />
                  انتخاب کن.
                </h2>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-white/80">
                  بهترین فروشگاه‌های اینستاگرامی در یکجا
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
