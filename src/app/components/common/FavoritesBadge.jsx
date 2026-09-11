"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const FAVORITES_KEY = "warino_favorites";

export default function FavoritesBadge() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);

      if (!savedFavorites) {
        setCount(0);
        return;
      }

      const favorites = JSON.parse(savedFavorites);

      setCount(Array.isArray(favorites) ? favorites.length : 0);
    } catch (error) {
      console.error("خطا در خواندن تعداد علاقه‌مندی‌ها:", error);

      setCount(0);
    }
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("favorites-updated", updateCount);

    return () => {
      window.removeEventListener("favorites-updated", updateCount);
    };
  }, []);

  return (
    <Link
      href="/favorites"
      className="relative flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100 hover:text-red-500"
      aria-label="علاقه‌مندی‌ها"
    >
      <Heart className="h-5 w-5" />

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
