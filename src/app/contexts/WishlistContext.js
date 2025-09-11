// app/contexts/WishlistContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (school) => {
    // Check if school is already in wishlist
    if (!wishlist.some((item) => item.id === school.id)) {
      setWishlist((prev) => [...prev, school]);
    }
  };

  const removeFromWishlist = (schoolId) => {
    setWishlist((prev) => prev.filter((school) => school.id !== schoolId));
  };

  const isWishlisted = (schoolId) => {
    return wishlist.some((school) => school.id === schoolId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
