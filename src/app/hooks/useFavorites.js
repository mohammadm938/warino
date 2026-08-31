"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "warino_favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  /*
   * Load favorites
   */
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEY);

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  /*
   * Save favorites
   */
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favorites, loaded]);

  /*
   * Check favorite
   */
  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  /*
   * Toggle favorite
   */
  const toggleFavorite = (productId) => {
    setFavorites((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      }

      return [...current, productId];
    });
  };

  /*
   * Remove favorite
   */
  const removeFavorite = (productId) => {
    setFavorites((current) => current.filter((id) => id !== productId));
  };

  /*
   * Clear all
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    loaded,
  };
}
