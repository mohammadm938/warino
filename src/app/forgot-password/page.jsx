"use client";

import { useState } from "react";

import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("درخواست بازیابی رمز برای:", email);

    setIsSubmitted(true);
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
              href="/login"
              className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-violet-600"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به ورود
            </Link>

            {/* Card */}
            <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-2xl shadow-violet-500/10 backdrop-blur-2xl sm:p-8">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  {isSubmitted ? (
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  ) : (
                    <KeyRound className="h-8 w-8" />
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="mt-5 text-center">
                <div className="text-3xl font-black tracking-tight text-gray-900">
                  Warino
                  <span className="text-violet-600">.</span>
                </div>

                <h1 className="mt-5 text-2xl font-black text-gray-900">
                  {isSubmitted ? "ایمیل ارسال شد" : "بازیابی رمز عبور"}
                </h1>

                <p className="mt-2 text-sm leading-7 text-gray-500">
                  {isSubmitted
                    ? "اگر این ایمیل در وارینو ثبت شده باشد، لینک بازیابی برای شما ارسال خواهد شد."
                    : "ایمیل حساب کاربری خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود."}
                </p>
              </div>

              {!isSubmitted ? (
                <>
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
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
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="your@email.com"
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-500/5"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-gray-900 py-4 text-sm font-black text-white shadow-lg shadow-gray-900/10 transition hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-violet-500/20"
                    >
                      ارسال لینک بازیابی
                    </button>
                  </form>
                </>
              ) : (
                /* Success */
                <div className="mt-7 rounded-2xl border border-green-100 bg-green-50 p-5 text-center">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-7 w-7 text-green-600" />
                  </div>

                  <p className="mt-3 text-sm font-bold text-green-800">
                    درخواست شما با موفقیت ثبت شد
                  </p>

                  <p className="mt-2 text-xs leading-6 text-green-700">
                    صندوق ورودی و پوشه Spam ایمیل خود را بررسی کنید.
                  </p>
                </div>
              )}

              {/* Login */}
              <div className="mt-7 border-t border-gray-100 pt-6 text-center">
                <span className="text-sm text-gray-500">
                  رمز عبورت یادت اومد؟
                </span>

                <Link
                  href="/login"
                  className="mr-1 text-sm font-black text-violet-600 transition hover:text-violet-700"
                >
                  وارد شو
                </Link>
              </div>
            </div>

            {/* Security */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="h-4 w-4" />

              <span>اطلاعات شما با امنیت کامل محافظت می‌شود</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
