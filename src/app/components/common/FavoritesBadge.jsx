"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import useFavorites from "../../hooks/useFavorites";

export default function FavoritesBadge() {
  const { favorites, loaded } = useFavorites();

  const count = loaded ? favorites.length : 0;

  return (
    <Link
      href="/favorites"
      aria-label="علاقه‌مندی‌ها"
      className="relative flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition hover:bg-red-50 hover:text-red-500"
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
