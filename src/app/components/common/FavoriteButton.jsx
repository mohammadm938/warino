"use client";

import { Heart } from "lucide-react";

import useFavorites from "../../hooks/useFavorites";

export default function FavoriteButton({ productId, className = "" }) {
  const { isFavorite, toggleFavorite, loaded } = useFavorites();

  const active = isFavorite(productId);

  if (!loaded) {
    return (
      <button
        type="button"
        aria-label="افزودن به علاقه‌مندی‌ها"
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur transition hover:text-red-500"
      >
        <Heart className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        toggleFavorite(productId);
      }}
      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur transition hover:text-red-500"
    >
      <Heart
        className={`h-5 w-5 transition ${
          active ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
    </button>
  );
}
