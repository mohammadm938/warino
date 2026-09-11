"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const FAVORITES_KEY = "warino_favorites";

export default function FavoriteButton({ product, className = "" }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);

      if (!savedFavorites) return;

      const favorites = JSON.parse(savedFavorites);

      setIsFavorite(
        favorites.some((item) => String(item.id) === String(product.id)),
      );
    } catch (error) {
      console.error("خطا در خواندن علاقه‌مندی‌ها:", error);
    }
  }, [product.id]);

  const toggleFavorite = () => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);

      const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

      const exists = favorites.some(
        (item) => String(item.id) === String(product.id),
      );

      let updatedFavorites;

      if (exists) {
        updatedFavorites = favorites.filter(
          (item) => String(item.id) !== String(product.id),
        );
      } else {
        updatedFavorites = [...favorites, product];
      }

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

      setIsFavorite(!exists);

      window.dispatchEvent(new Event("favorites-updated"));
    } catch (error) {
      console.error("خطا در ذخیره علاقه‌مندی:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={
        isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
      }
      className={`absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-lg transition hover:text-red-500 ${
        isFavorite
          ? "border-red-200 bg-red-50 text-red-500"
          : "border-gray-200 bg-white text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
      } ${className}`}
    >
      <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
}
