"use client";

import React, { useState } from "react";
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
    images: ["/images/white-tshirt.png", "/images/white-tshirt-alt.png", "/images/white-tshirt-side.png"],
    description: "Premium cotton tee.",
    specs: [{ label: "Material", value: "Cotton" }],
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
    description: "Stylish cap.",
    specs: [{ label: "Material", value: "Cotton Blend" }],
    rating: 4.4,
    reviewsCount: 128,
    isFulfilled: true,
  },
];

const products: DetailedProduct[] = baseProducts;

// ----- Stars -----
const renderStars = (rating: number) => (
  <span className="inline-flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < Math.floor(rating)
            ? "fill-[#F5B400] text-[#F5B400]"
            : "text-gray-300"
        }`}
      />
    ))}
  </span>
);

// ----- Component -----
const ProductTileGrid: React.FC = () => {
  const { addToCart } = useCart();
  const { notifyAddToCart } = useFynaroToast();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const [selected, setSelected] = useState<DetailedProduct | null>(null);
  const [activeAdd, setActiveAdd] = useState<number | string | null>(null);

  const handleAddToCart = (product: DetailedProduct) => {
    addToCart(product);
    notifyAddToCart(product.name);

    setActiveAdd(product.id);
    setTimeout(() => setActiveAdd(null), 1200);
  };

  const handleToggleWishlist = (product: DetailedProduct) => {
    if (isWishlisted(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <>
      {/* 4-column grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {products.map((product) => {
          const wished = isWishlisted(product.id);
          const isAdding = activeAdd === product.id;

          return (
            <motion.article
              key={product.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group flex flex-col rounded-xl overflow-hidden bg-white border border-neutral-200 hover:border-[#d6cc6d]/40 shadow-sm hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all"
            >
              {/* Image */}
              <div className="relative w-full h-36 sm:h-40 bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={product.hoverImage ?? product.image}
                  alt=""
                  fill
                  className="object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Wishlist */}
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 flex items-center justify-center"
                >
                  <Heart
                    size={14}
                    className={wished ? "fill-[#ff7ab8] text-[#ff7ab8]" : "text-white"}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="px-3 py-2 flex flex-col">
                <h3 className="text-[12px] font-medium text-neutral-900 line-clamp-2">{product.name}</h3>

                {/* Price */}
                <p className="mt-1 text-[13px] font-semibold text-[#111014] transition-all duration-300 group-hover:text-[#d6cc6d] group-hover:drop-shadow-[0_0_6px_rgba(214,204,109,0.4)]">
                  {product.price}
                </p>

                {/* Rating */}
                <div className="mt-1 flex items-center gap-1 text-[10px]">{renderStars(product.rating)}</div>

                {/* Buttons */}
                <div className="mt-2 flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 rounded-full text-[11px] py-1.5 font-medium transition-all ${
                      isAdding ? "bg-[#d6cc6d] text-black" : "bg-[#111014] text-white hover:bg-black"
                    }`}
                  >
                    {isAdding ? "Added" : "Add"}
                  </motion.button>

                  <button
                    onClick={() => setSelected(product)}
                    className="flex-1 rounded-full border border-[#d6cc6d]/60 text-[#bfb45f] text-[11px] py-1.5 hover:bg-[#111014] hover:text-[#d6cc6d]"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selected ? { ...selected, images: selected.images.slice(0, 3) } : null}
        open={!!selected}
        onClose={() => setSelected(null)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductTileGrid;