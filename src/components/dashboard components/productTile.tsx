// src/components/dashboard components/productTile.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { useCart, Product } from "../../contexts/cartContext";
import ProductDetailModal from "@/components/dashboard components/productDetailModal";
import { useFynaroToast } from "@/components/dashboard components/common/fynaroToast";
import { useWishlist } from "@/contexts/wishlistContext";

// ----- Types -----
type Spec = { label: string; value: string };

export type DetailedProduct = Product & {
  hoverImage?: string;
  images: string[];
  description: string;
  specs: Spec[];
  rating: number;
  reviewsCount: number;
  isFulfilled: boolean;
};

// ----- Sample Products -----
const baseProducts: DetailedProduct[] = [
  {
    id: 1,
    name: "Fynaro Classic White Tee",
    price: "₦25,000.00",
    image: "/images/coolTee.jpg",
    hoverImage: "/images/coolTee_shirt.jpg",
    images: [
      "/images/white-tshirt.png",
      "/images/white-tshirt-alt.png",
      "/images/white-tshirt-side.png",
      "/images/white-tshirt-back.png",
      "/images/white-tshirt-detail.png",
    ],
    description:
      "The Fynaro Classic White Tee is crafted from 100% premium cotton — breathable, soft, and built to last. Perfect for everyday wear or branding for your business.",
    specs: [
      { label: "Material", value: "100% Cotton" },
      { label: "Fit", value: "Regular Fit" },
      { label: "Color", value: "White" },
      { label: "Sizes", value: "S, M, L, XL, XXL" },
    ],
    rating: 4.7,
    reviewsCount: 214,
    isFulfilled: true,
  },
  {
    id: 2,
    name: "Fynaro Urban Cap (Black)",
    price: "₦15,000.00",
    image: "/images/greycap.jpg",
    hoverImage: "/images/greyhat.jpg",
    images: ["/images/greyhat.jpg", "/images/black-cap-alt.png", "/images/black-cap-side.png"],
    description:
      "Our Urban Cap is a stylish streetwear essential — durable, lightweight, and perfect for brand customization.",
    specs: [
      { label: "Material", value: "Cotton Blend" },
      { label: "Adjustable Strap", value: "Yes" },
      { label: "Color", value: "Matte Black" },
    ],
    rating: 4.4,
    reviewsCount: 128,
    isFulfilled: true,
  },
];

// ----- Helpers -----
const parsePrice = (price: string): number => Number(price.replace(/[^\d.]/g, "") || 0);
const PAGE_SIZE = 8;
const MAX_PRODUCTS = 40;

// ----- Generate Products -----
const products: DetailedProduct[] = [
  ...baseProducts,
  ...Array.from({ length: 74 }).map((_, i) => {
    const base = baseProducts[i % baseProducts.length];
    const basePrice = parsePrice(base.price);
    return {
      ...base,
      id: baseProducts.length + i + 1,
      name: `${base.name} v${i + 1}`,
      price: `₦${(basePrice + (i % 5) * 1500).toLocaleString()}.00`,
      specs: [...base.specs, { label: "Edition", value: `v${i + 1}` }],
      rating: Math.min(5, base.rating - 0.3 + (i % 4) * 0.1),
      reviewsCount: base.reviewsCount + i * 3,
    };
  }),
];

// ----- Stars Renderer -----
const renderStars = (rating: number) => {
  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < Math.floor(rating)) {
          return <Star key={i} className="w-3.5 h-3.5 fill-[#F5B400] text-[#F5B400]" />;
        } else if (i < rating) {
          return <Star key={i} className="w-3.5 h-3.5 text-[#F5B400]" style={{ fill: "url(#half-star-gradient)" }} />;
        } else {
          return <Star key={i} className="w-3.5 h-3.5 text-gray-300" />;
        }
      })}
    </span>
  );
};

// ----- Main Component -----
const ProductTileGrid: React.FC = () => {
  const { addToCart } = useCart();
  const { notifyAddToCart, notifyWishlistToggle } = useFynaroToast();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const [sparkId, setSparkId] = useState<number | string | null>(null);
  const [selected, setSelected] = useState<DetailedProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortKey, setSortKey] = useState<"featured" | "priceAsc" | "priceDesc" | "rating">("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // ----- Handlers -----
  const handleAddToCart = (product: DetailedProduct) => {
    const normalized: Product = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? product.images?.[0] ?? "",
    };
    addToCart(normalized);
    setSparkId(product.id);
    setTimeout(() => setSparkId(null), 800);
    notifyAddToCart(normalized.name);
  };

  const handleToggleWishlist = (product: DetailedProduct) => {
    const payload: Product = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? product.images?.[0] ?? "",
    };
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
      notifyWishlistToggle(product.name, false);
    } else {
      addToWishlist(payload);
      notifyWishlistToggle(product.name, true);
    }
  };

  // ----- Filter & Sort -----
  const filteredProducts = useMemo<DetailedProduct[]>(() => {
    let list = products;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.some((s) => s.value.toLowerCase().includes(q))
      );
    }
    switch (sortKey) {
      case "priceAsc":
        return [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price)).slice(0, MAX_PRODUCTS);
      case "priceDesc":
        return [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price)).slice(0, MAX_PRODUCTS);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating).slice(0, MAX_PRODUCTS);
      default:
        return list.slice(0, MAX_PRODUCTS);
    }
  }, [searchQuery, sortKey]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  useEffect(() => setCurrentPage(1), [searchQuery, sortKey]);
  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [currentPage, pageCount]);

  const pageProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {pageProducts.map((product) => {
          const wished = isWishlisted(product.id);
          return (
            <motion.article
              key={product.id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/95 border border-neutral-200/80 hover:border-[#111014]/45 shadow-sm hover:shadow-[0_20px_45px_rgba(0,0,0,0.16)] transition-all duration-300"
            >
              {/* Images */}
              <div className="relative w-full h-40 sm:h-44 md:h-48 bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain transition-opacity duration-500 ease-out group-hover:opacity-0"
                />
                <Image
                  src={product.hoverImage ?? product.image}
                  alt={`${product.name} alternate`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleToggleWishlist(product)}
                  aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
                  className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <Heart
                    size={16}
                    className={`${wished ? "fill-[#ff7ab8] text-[#ff7ab8]" : "text-white/80"} transition-colors`}
                  />
                </motion.button>
              </div>

              {/* Content */}
              {/* Content */}
              <div className="flex flex-1 flex-col px-3.5 pt-2.5 pb-3 sm:px-4 sm:pt-3.5 sm:pb-4">
                <h3 className="text-[12px] sm:text-[13px] font-medium text-neutral-900 leading-snug line-clamp-2 min-h-[2.2em]">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-[9px] sm:text-[11px]">
                  {renderStars(product.rating)}
                  <span className="text-gray-500 hidden sm:inline">{product.reviewsCount.toLocaleString()} ratings</span>
                </div>

                {/* Buttons */}
                <div className="mt-3 flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 rounded-full bg-[#111014] text-white text-[11px] sm:text-xs font-semibold py-2 sm:py-2.5 tracking-wide hover:bg-[#1b1813] transition-colors"
                  >
                    Add to Cart
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelected(product)}
                    className="flex-1 rounded-full border border-[#c8a96a]/70 text-[#f5e4b5] text-[11px] sm:text-xs font-medium py-2 sm:py-2.5 hover:bg-[#1b1813] hover:border-[#f0d48b] transition-all"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>

            </motion.article>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductTileGrid;
