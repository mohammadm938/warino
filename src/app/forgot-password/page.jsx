// src/app/forgot-password/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("درخواست بازیابی رمز برای:", email);
    setIsSubmitted(true);
    // منطق ارسال ایمیل بازیابی
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-fuchsia-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* افکت‌های پس‌زمینه بنفش */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-400/30 blur-3xl"></div>
        <div className="absolute -bottom-48 left-0 h-[600px] w-[600px] rounded-full bg-fuchsia-300/25 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-violet-300/20 blur-3xl"></div>

        {/* کارت شیشه‌ای */}
        <div className="relative w-full max-w-md">
          <div className="bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl shadow-violet-500/20 p-8">
            {/* لوگو/عنوان */}
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-gray-900">
                Warino<span className="text-violet-600">.</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                رمز عبور را فراموش کردی؟
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال
                شود
              </p>
            </div>

            {/* فرم */}
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-bold text-gray-700">
                  ایمیل
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:bg-white/80 focus:shadow-lg focus:shadow-violet-500/20"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02]"
              >
                ارسال لینک بازیابی
              </button>
            </form>

            {/* پیام موفقیت */}
            {isSubmitted && (
              <div className="mt-4 p-4 rounded-2xl bg-green-50/80 backdrop-blur-sm border border-green-200 text-center">
                <p className="text-sm font-medium text-green-700">
                  ✅ لینک بازیابی به ایمیل شما ارسال شد
                </p>
                <p className="mt-1 text-xs text-green-600">
                  لطفاً صندوق ورودی و اسپم خود را بررسی کنید
                </p>
              </div>
            )}

            {/* لینک بازگشت به ورود */}
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">
                رمز عبور خود را به خاطر آوردی؟
              </span>
              <Link
                href="/login"
                className="mr-1 font-bold text-violet-600 hover:text-violet-700 transition"
              >
                وارد شو
              </Link>
            </div>
          </div>

          {/* زیرنویس شیشه‌ای */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500/80 backdrop-blur-sm bg-white/20 rounded-full px-4 py-2 inline-block border border-white/20">
              🔐 لینک بازیابی تا ۲۴ ساعت اعتبار دارد
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
