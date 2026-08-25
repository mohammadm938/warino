import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata = {
  title: "Warino | وارینو",
  description: "وارینو؛ ویترین آنلاین فروشگاه‌های اینستاگرامی و محصولات ترند.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} antialiased`}>{children}</body>
    </html>
  );
}
