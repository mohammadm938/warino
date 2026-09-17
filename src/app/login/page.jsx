"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // =========================
    // Register
    // =========================
    if (!isLogin) {
      if (!formData.name.trim()) {
        setError("لطفاً نام و نام خانوادگی خود را وارد کنید.");
        return;
      }

      if (!formData.email.trim()) {
        setError("لطفاً ایمیل خود را وارد کنید.");
        return;
      }

      if (formData.password.length < 8) {
        setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("رمز عبور و تکرار رمز عبور یکسان نیستند.");
        return;
      }
    }

    // =========================
    // Login
    // =========================
    if (isLogin) {
      if (!formData.email.trim()) {
        setError("لطفاً ایمیل خود را وارد کنید.");
        return;
      }

      if (!formData.password) {
        setError("لطفاً رمز عبور خود را وارد کنید.");
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

      const body = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "عملیات انجام نشد.");
        return;
      }

      // =========================
      // Successful Login
      // =========================
      if (isLogin) {
        setSuccess("ورود با موفقیت انجام شد. در حال انتقال...");

        router.push(redirect);
        router.refresh();

        return;
      }

      // =========================
      // Successful Register
      // =========================
      setSuccess("ثبت‌نام با موفقیت انجام شد. در حال انتقال به صفحه ورود...");

      setFormData({
        name: "",
        email: formData.email,
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setIsLogin(true);
        setSuccess("");
      }, 1200);
    } catch (error) {
      console.error("خطا در احراز هویت:", error);

      setError("خطایی در ارتباط با سرور رخ داد.");
    } finally {
      setLoading(false);
    }
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

    setError("");
    setSuccess("");
  };

  return (
    <>
      <Header />

      <main
        dir="rtl"
        className="relative min-h-screen overflow-hidden bg-[#faf9ff] px-4 py-12 sm:px-6 lg:px-8"
      >
        {/* =========================
            Background
        ========================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-400/20 blur-3xl" />

          <div className="absolute -bottom-48 -left-40 h-[600px] w-[600px] rounded-full bg-fuchsia-300/20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
          <div className="w-full">
            {/* =========================
                Back
            ========================== */}
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-violet-600"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به خانه
            </Link>

            {/* =========================
                Card
            ========================== */}
            <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-2xl shadow-violet-500/10 backdrop-blur-2xl sm:p-8">
              {/* =========================
                  Logo / Title
              ========================== */}
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-block text-3xl font-black tracking-tight text-gray-900"
                >
                  Warino
                  <span className="text-violet-600">.</span>
                </Link>

                <h1 className="mt-5 text-2xl font-black text-gray-900">
                  {isLogin ? "خوش برگشتی 👋" : "به وارینو خوش آمدی 👋"}
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {isLogin
                    ? "وارد حساب کاربری خودت شو"
                    : "حساب خودت را بساز و وارد دنیای وارینو شو"}
                </p>
              </div>

              {/* =========================
                  Tabs
              ========================== */}
              <div className="mt-7 flex rounded-2xl border border-gray-100 bg-gray-100/80 p-1">
                <button
                  type="button"
                  onClick={() => switchMode(true)}
                  disabled={loading}
                  className={`flex-1 rounded-xl py-3 text-sm font-black transition-all ${
                    isLogin
                      ? "bg-white text-violet-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  ورود
                </button>

                <button
                  type="button"
                  onClick={() => switchMode(false)}
                  disabled={loading}
                  className={`flex-1 rounded-xl py-3 text-sm font-black transition-all ${
                    !isLogin
                      ? "bg-white text-violet-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  ثبت‌نام
                </button>
              </div>

              {/* =========================
                  Error
              ========================== */}
              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold leading-6 text-red-600">
                  {error}
                </div>
              )}

              {/* =========================
                  Success
              ========================== */}
              {success && (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold leading-6 text-green-600">
                  {success}
                </div>
              )}

              {/* =========================
                  Form
              ========================== */}
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                {/* =========================
                    Name
                ========================== */}
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
                        autoComplete="name"
                        required
                        disabled={loading}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                  </div>
                )}

                {/* =========================
                    Email
                ========================== */}
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
                      autoComplete="email"
                      required
                      disabled={loading}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* =========================
                    Password
                ========================== */}
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
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                      required
                      disabled={loading}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      disabled={loading}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600 disabled:opacity-50"
                      aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* =========================
                    Confirm Password
                ========================== */}
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
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="رمز عبور را دوباره وارد کنید"
                        autoComplete="new-password"
                        required
                        disabled={loading}
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5 disabled:cursor-not-allowed disabled:opacity-60"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((current) => !current)
                        }
                        disabled={loading}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600 disabled:opacity-50"
                        aria-label={
                          showConfirmPassword ? "مخفی کردن رمز" : "نمایش رمز"
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

                {/* =========================
                    Remember Me
                ========================== */}
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

                {/* =========================
                    Submit
                ========================== */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-4 text-sm font-black text-white shadow-lg shadow-gray-900/10 transition hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-violet-500/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />

                      {isLogin ? "در حال ورود..." : "در حال ثبت‌نام..."}
                    </>
                  ) : (
                    <>{isLogin ? "ورود به حساب" : "ساخت حساب کاربری"}</>
                  )}
                </button>
              </form>

              {/* =========================
                  Switch
              ========================== */}
              <div className="mt-7 border-t border-gray-100 pt-6 text-center">
                <span className="text-sm text-gray-500">
                  {isLogin ? "حساب کاربری نداری؟" : "قبلاً ثبت‌نام کردی؟"}
                </span>

                <button
                  type="button"
                  onClick={() => switchMode(!isLogin)}
                  disabled={loading}
                  className="mr-1 text-sm font-black text-violet-600 transition hover:text-violet-700 disabled:opacity-50"
                >
                  {isLogin ? "ثبت‌نام کن" : "وارد شو"}
                </button>
              </div>
            </div>

            {/* =========================
                Security
            ========================== */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="h-4 w-4" />

              <span>امنیت اطلاعات شما برای ما مهم است</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
