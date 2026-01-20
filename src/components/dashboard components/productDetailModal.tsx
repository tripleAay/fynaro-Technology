// src/components/dashboard components/productDetailModal.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { DetailedProduct } from "@/components/dashboard components/productTile"; // correct import

// ----- Props -----
interface ProductDetailModalProps {
  product: DetailedProduct | null;
  open: boolean;
  onClose: () => void;
  onAddToCart?: (product: DetailedProduct) => void;
}

// ----- Stars Renderer -----
const renderStars = (rating: number): JSX.Element => {
  const stars: JSX.Element[] = [];
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  for (let i = 0; i < full; i++) {
    stars.push(
      <span key={`full-${i}`} className="text-[#F5B400] text-sm">
        ★
      </span>
    );
  }

  if (half) {
    stars.push(
      <span key="half" className="text-[#F5B400] text-sm">
        ☆
      </span>
    );
  }

  while (stars.length < 5) {
    stars.push(
      <span key={`empty-${stars.length}`} className="text-gray-300 text-sm">
        ★
      </span>
    );
  }

  return <div className="inline-flex items-center gap-1">{stars}</div>;
};

// ----- Modal Component -----
export default function ProductDetailModal({
  product,
  open,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [product?.id]);

  if (!product) return null;

  const mainImage = product.images?.[activeIndex] ?? product.image ?? "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close product details"
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            layout
            className="relative z-10 w-full max-w-lg md:max-w-3xl bg-white/96 rounded-2xl md:rounded-[1.75rem] border border-neutral-200/70 shadow-[0_22px_65px_rgba(0,0,0,0.35)] overflow-hidden p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.97,
              filter: "blur(4px)",
              transition: { duration: 0.35, ease: "easeInOut" },
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-neutral-400 hover:text-neutral-800 transition"
              onClick={onClose}
              aria-label="Close product details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid gap-5 md:gap-7 md:grid-cols-2 items-center">
              {/* Main Image */}
              <div className="relative w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-neutral-50 shadow-inner">
                {mainImage && (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="object-contain"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="mt-2 md:mt-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#111014] mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-3">
                  {renderStars(product.rating)}
                  <span className="text-xs text-gray-500">
                    {product.reviewsCount.toLocaleString()} ratings
                  </span>
                </div>

                <p className="text-neutral-600 mb-3 md:mb-4 leading-relaxed text-sm sm:text-[0.95rem]">
                  {product.description}
                </p>

                <ul className="space-y-1.5 text-sm text-neutral-700 mb-4 md:mb-5">
                  {product.specs.map((spec) => (
                    <li key={spec.label}>
                      <strong>{spec.label}:</strong> {spec.value}
                    </li>
                  ))}
                </ul>

                <p className="text-xl sm:text-2xl font-semibold text-[#111014] mb-4">
                  {product.price}
                </p>

                {onAddToCart && (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onAddToCart(product)}
                    className="w-full sm:w-auto px-7 sm:px-9 py-2.5 sm:py-3 bg-[#111014] text-white rounded-full hover:bg-neutral-800 transition-all font-medium shadow-md hover:shadow-xl text-sm"
                  >
                    Add to Cart
                  </motion.button>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-4 md:mt-5 flex gap-2.5 sm:gap-3 justify-center flex-wrap">
                {product.images.map((img, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={img + i}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border transition ${
                        isActive ? "border-[#111014]" : "border-neutral-200 hover:border-neutral-500"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
