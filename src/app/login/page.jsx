"use client";

import { useState } from "react";

import Link from "next/link";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  ShieldCheck,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("رمز عبور و تکرار رمز عبور یکسان نیستند.");
      return;
    }

    if (isLogin) {
      console.log("ورود با:", {
        email: formData.email,
        password: formData.password,
      });

      return;
    }

    console.log("ثبت‌نام با:", formData);
  };

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-[#faf9ff] px-4 py-12 sm:px-6 lg:px-8">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-400/20 blur-3xl" />

          <div className="absolute -bottom-48 -left-40 h-[600px] w-[600px] rounded-full bg-fuchsia-300/20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
          <div className="w-full">
            {/* Back */}
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-violet-600"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به خانه
            </Link>

            {/* Card */}
            <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-2xl shadow-violet-500/10 backdrop-blur-2xl sm:p-8">
              {/* Logo */}
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-block text-3xl font-black tracking-tight text-gray-900"
                >
                  Warino
                  <span className="text-violet-600">.</span>
                </Link>

                <h1 className="mt-5 text-2xl font-black text-gray-900">
                  {isLogin
                    ? "خوش برگشتی 👋"
                    : "به وارینو خوش آمدی 👋"}
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {isLogin
                    ? "وارد حساب کاربری خودت شو"
                    : "حساب خودت را بساز و وارد دنیای وارینو شو"}
                </p>
              </div>

              {/* Tabs */}
              <div className="mt-7 flex rounded-2xl border border-gray-100 bg-gray-100/80 p-1">
                <button
                  type="button"
                  onClick={() => switchMode(true)}
                  className={`flex-1 rounded-xl py-3 text-sm font-black transition-all ${
                    isLogin
                      ? "bg-white text-violet-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  ورود
                </button>

                <button
                  type="button"
                  onClick={() => switchMode(false)}
                  className={`flex-1 rounded-xl py-3 text-sm font-black transition-all ${
                    !isLogin
                      ? "bg-white text-violet-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  ثبت‌نام
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                {/* Name */}
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      نام و نام خانوادگی
                    </label>

                    <div className="relative">
                      <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="مثلاً محمد رضایی"
                        required
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    ایمیل
                  </label>

                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-bold text-gray-700"
                    >
                      رمز عبور
                    </label>

                    {isLogin && (
                      <Link
                        href="/forgot-password"
                        className="text-xs font-bold text-violet-600 transition hover:text-violet-700"
                      >
                        رمز را فراموش کردی؟
                      </Link>
                    )}
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="رمز عبور خود را وارد کنید"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600"
                      aria-label={
                        showPassword
                          ? "مخفی کردن رمز"
                          : "نمایش رمز"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      تکرار رمز عبور
                    </label>

                    <div className="relative">
                      <LockKeyhole className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="رمز عبور را دوباره وارد کنید"
                        required
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (current) => !current
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600"
                        aria-label={
                          showConfirmPassword
                            ? "مخفی کردن رمز"
                            : "نمایش رمز"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Remember */}
                {isLogin && (
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                    />

                    <span className="text-xs text-gray-500">
                      مرا به خاطر بسپار
                    </span>
                  </label>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gray-900 py-4 text-sm font-black text-white shadow-lg shadow-gray-900/10 transition hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-violet-500/20"
                >
                  {isLogin ? "ورود به حساب" : "ساخت حساب کاربری"}
                </button>
              </form>

              {/* Switch */}
              <div className="mt-7 border-t border-gray-100 pt-6 text-center">
                <span className="text-sm text-gray-500">
                  {isLogin
                    ? "حساب کاربری نداری؟"
                    : "قبلاً ثبت‌نام کردی؟"}
                </span>

                <button
                  type="button"
                  onClick={() => switchMode(!isLogin)}
                  className="mr-1 text-sm font-black text-violet-600 transition hover:text-violet-700"
                >
                  {isLogin ? "ثبت‌نام کن" : "وارد شو"}
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="h-4 w-4" />

              <span>
                امنیت اطلاعات شما برای ما مهم است
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}