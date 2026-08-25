"use client";
import Link from "next/link";
import { Instagram, Send, ArrowUp, Store, Mail } from "lucide-react";

const footerLinks = {
  explore: [
    { title: "محصولات", href: "/products" },
    { title: "فروشگاه‌ها", href: "/shops" },
    { title: "دسته‌بندی‌ها", href: "/categories" },
  ],
  seller: [
    { title: "ثبت فروشگاه", href: "/register" },
    { title: "ورود فروشندگان", href: "/login" },
    { title: "راهنمای فروشندگان", href: "/seller-guide" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-3xl font-black tracking-tight"
            >
              وارینو<span className="text-violet-500">.</span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-8 text-gray-400">
              وارینو جایی برای کشف فروشگاه‌های جذاب اینستاگرامی و محصولاتی است
              که ارزش دیده شدن دارند.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition hover:bg-violet-600 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="#"
                aria-label="Telegram"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition hover:bg-violet-600 hover:text-white"
              >
                <Send className="h-5 w-5" />
              </a>

              <a
                href="mailto:hello@warino.ir"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition hover:bg-violet-600 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-bold">کاوش در وارینو</h3>

            <ul className="mt-5 space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Seller */}
          <div>
            <h3 className="flex items-center gap-2 font-bold">
              <Store className="h-4 w-4 text-violet-500" />
              برای فروشندگان
            </h3>

            <ul className="mt-5 space-y-4">
              {footerLinks.seller.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Warino. تمامی حقوق محفوظ است.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs font-medium text-gray-500 transition hover:text-white"
          >
            بازگشت به بالا
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
