// src/app/login/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("ورود با:", formData.email, formData.password);
    } else {
      console.log("ثبت‌نام با:", formData);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-fuchsia-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* افکت‌های پس‌زمینه بنفش‌تر */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-400/30 blur-3xl"></div>
        <div className="absolute -bottom-48 left-0 h-[600px] w-[600px] rounded-full bg-fuchsia-300/25 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-violet-300/20 blur-3xl"></div>

        {/* کارت شیشه‌ای بنفش */}
        <div className="relative w-full max-w-md">
          {/* افکت شیشه‌ای */}
          <div className="bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl shadow-violet-500/20 p-8">
            {/* لوگو/عنوان */}
            <div className="text-center">
              <div className="text-3xl font-black tracking-tight text-gray-900">
                Warino<span className="text-violet-600">.</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {isLogin ? "خوش آمدید!" : "به وارینو خوش آمدید!"}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {isLogin
                  ? "وارد حساب کاربری خود شوید"
                  : "ثبت‌نام کنید و از امکانات وارینو لذت ببرید"}
              </p>
            </div>

            {/* تب‌های ورود/ثبت‌نام با استایل شیشه‌ای بنفش */}
            <div className="mt-6 flex rounded-2xl bg-white/50 backdrop-blur-sm p-1 border border-white/30">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                  isLogin
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ورود
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                  !isLogin
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ثبت‌نام
              </button>
            </div>

            {/* فرم */}
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    نام کامل
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:bg-white/80 focus:shadow-lg focus:shadow-violet-500/20"
                    placeholder="مثال: محمد رضایی"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}

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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700">
                  رمز عبور
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:bg-white/80 focus:shadow-lg focus:shadow-violet-500/20"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    تکرار رمز عبور
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    className="mt-1 block w-full rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:bg-white/80 focus:shadow-lg focus:shadow-violet-500/20"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm text-gray-700"
                    >
                      مرا به خاطر بسپار
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-bold text-violet-600 hover:text-violet-700 transition"
                  >
                    رمز را فراموش کردی؟
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02]"
              >
                {isLogin ? "ورود" : "ثبت‌نام"}
              </button>
            </form>

            {/* لینک پایین */}
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">
                {isLogin ? "حساب کاربری نداری؟" : "حساب کاربری داری؟"}
              </span>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="mr-1 font-bold text-violet-600 hover:text-violet-700 transition"
              >
                {isLogin ? "ثبت‌نام کن" : "وارد شو"}
              </button>
            </div>
          </div>

          {/* زیرنویس شیشه‌ای */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500/80 backdrop-blur-sm bg-white/20 rounded-full px-4 py-2 inline-block border border-white/20">
              🔒 امنیت اطلاعات شما برای ما مهم است
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
