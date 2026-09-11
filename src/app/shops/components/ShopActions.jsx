"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export default function ShopActions({ shop }) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shop.name,
          text: `فروشگاه ${shop.name} در وارینو`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);

        setShared(true);

        setTimeout(() => {
          setShared(false);
        }, 1500);
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("خطا در اشتراک‌گذاری:", error);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
      aria-label="اشتراک‌گذاری فروشگاه"
    >
      {shared ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <Share2 className="h-4 w-4" />
      )}
    </button>
  );
}
