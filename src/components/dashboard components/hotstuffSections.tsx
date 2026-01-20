"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useCart, type Product } from "@/contexts/cartContext";
import { Star, Heart } from "lucide-react";
import ProductDetailModal, {
  type ProductForModal,
} from "@/components/dashboard components/productDetailModal";
import { useFynaroToast } from "@/components/dashboard components/common/fynaroToast";
import { useWishlist } from "@/contexts/wishlistContext";

/* ───────────────── Types ───────────────── */

type Spec = {
  label: string;
  value: string;
};

type ExtendedProduct = Product & {
  hoverImage?: string;
  images: string[];
  description: string;
  specs: Spec[];
  rating?: number;
  tag?: string;
  stockLabel?: string;
};

/* ───────────────── Star Rating ───────────────── */

const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center justify-center gap-1 mt-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"
        }
      />
    ))}
  </div>
);

/* ───────────────── Hot Products Data ───────────────── */

const hotProducts: ExtendedProduct[] = [
  {
    id: 101,
    name: "Fynaro Limited Edition Hoodie",
    price: "₦65,000.00",
    image: "/images/hoodie.jpg",
    hoverImage: "/images/hoodie-alt.png",
    tag: "🔥 Trending",
    description:
      "A rare drop featuring smooth fleece cotton with sleek finish — designed for those who move bold.",
    images: ["/images/hoodie-alt.png", "/images/hoodie.png"],
    specs: [
      { label: "Material", value: "Fleece Cotton" },
      { label: "Fit", value: "Relaxed" },
    ],
    rating: 5,
  },
  {
    id: 102,
    name: "Fynaro Premium Tote Bag",
    price: "₦25,000.00",
    image: "/images/coolTee_shirt.jpg",
    hoverImage: "/images/placeholder-bag.png",
    tag: "✨ Bestseller",
    description:
      "A minimalist tote made from eco-friendly canvas — reliable for everyday essentials.",
    images: ["/images/placeholder-bag.png", "/images/placeholder-bag-alt.png"],
    specs: [
      { label: "Material", value: "Canvas" },
      { label: "Size", value: "38cm x 42cm" },
    ],
    rating: 4,
  },
  {
    id: 103,
    name: "Fynaro Air Cap – Limited Drop",
    price: "₦18,500.00",
    image: "/images/tot-bag-laid.jpg",
    hoverImage: "/images/black-cap.png",
    tag: "💎 Collector’s Pick",
    description:
      "Limited run — sleek matte finish, adjustable strap, and breathable comfort.",
    images: ["/images/black-cap.png", "/images/black-cap-alt.png"],
    specs: [
      { label: "Material", value: "Cotton Blend" },
      { label: "Color", value: "Matte Black" },
    ],
    rating: 4,
  },
];

/* ───────────────── Main Component ───────────────── */

export default function ProductTileGrid() {
  const { addToCart } = useCart();
  const { notifyAddToCart, notifyWishlistToggle } = useFynaroToast();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const [sparkId, setSparkId] = useState<number | string | null>(null);
  const [selected, setSelected] = useState<ExtendedProduct | null>(null);

  const fullSubtitle =
    "Limited picks. Clean silhouettes. Designed to carry your brand like it’s on the front row.";
  const [typedSubtitle, setTypedSubtitle] = useState("");

  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Typed ref setter (safe, no any)
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  /* ───────── Typing effect ───────── */

  useEffect(() => {
    let i = 0;
    setTypedSubtitle("");

    const timer = setInterval(() => {
      i++;
      setTypedSubtitle(fullSubtitle.slice(0, i));
      if (i >= fullSubtitle.length) clearInterval(timer);
    }, 35);

    return () => clearInterval(timer);
  }, [fullSubtitle]);

  /* ───────── Add to Cart ───────── */

  const handleAddToCart = (product: ExtendedProduct | ProductForModal) => {
    // Safe price handling (no any)
    const priceStr =
      typeof product.price === "string"
        ? product.price
        : `₦${Number(product.price ?? 0).toLocaleString("en-NG")}.00`;

    const normalized: Product = {
      id: product.id,
      name: product.name,
      price: priceStr,
      image:
        "image" in product && product.image
          ? product.image
          : "images" in product && product.images?.[0]
          ? product.images[0]
          : "",
    };

    addToCart(normalized);
    setSparkId(product.id);
    setTimeout(() => setSparkId(null), 800);

    notifyAddToCart(normalized.name);
  };

  /* ───────── Wishlist toggle ───────── */

  const handleToggleWishlist = (product: ExtendedProduct) => {
    const payload = {
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

  /* ───────── Mobile scroll tracking ───────── */

  const handleStripScroll = () => {
    const container = stripRef.current;
    if (!container) return;

    const center =
      container.getBoundingClientRect().left + container.offsetWidth / 2;

    let closest = 0;
    let min = Infinity;

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - center);
      if (dist < min) {
        min = dist;
        closest = idx;
      }
    });

    setActiveIndex(closest);
  };

  useEffect(() => {
    handleStripScroll();
  }, []);

  const scrollToIndex = (idx: number) => {
    cardRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  /* ───────────────── Render ───────────────── */

  return (
    <>
      <section className="relative mt-14 mb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/80">
                Curated heat
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#c8a96a]">
                Hot Stuff <span className="align-middle">🔥</span>
              </h2>
            </div>

            {/* Typed subtitle */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] sm:text-xs md:text-sm text-white max-w-xs sm:text-right"
            >
              {typedSubtitle}
              <motion.span
                className="inline-block w-[2px] h-[1em] ml-1 bg-white/70 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.span>
          </div>

          {/* Horizontal luxury strip */}
          <div className="relative">
            {/* Thin top/bottom gold lines */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a96a] to-transparent opacity-80" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c8a96a] to-transparent opacity-80" />

            <div
              ref={stripRef}
              onScroll={handleStripScroll}
              className="mt-5 flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            >
              {hotProducts.map((product, index) => {
                const wished = isWishlisted(product.id);

                return (
                  <motion.div
                    key={product.id}
                    ref={setCardRef(index)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.6 }}
                    className="
                      snap-center shrink-0
                      w-[82vw] sm:w-[60vw] md:w-[40vw] lg:w-[30%]
                      rounded-[22px] border border-[#2a2722] bg-[radial-gradient(circle_at_top,#1b1917_0,#111014_42%,#0b0a09_100%)]
                      text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)]
                      overflow-hidden relative
                    "
                  >
                    {/* Gold corner accent */}
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -left-6 -top-6 h-16 w-16 border-t border-l border-[#c8a96a]/70 rounded-tr-full rounded-bl-full opacity-70" />
                      <div className="absolute -right-6 -bottom-6 h-16 w-16 border-b border-r border-[#c8a96a]/70 rounded-tl-full rounded-br-full opacity-70" />
                    </div>

                    {/* Image block */}
                    <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Tag */}
                      {product.tag && (
                        <div className="absolute top-3 left-3 rounded-full bg-black/70 border border-[#c8a96a]/70 px-3 py-1 text-[10px] sm:text-[11px] font-medium tracking-wide">
                          {product.tag}
                        </div>
                      )}

                      {/* Wishlist button */}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleToggleWishlist(product)}
                        aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/70 border border-white/15 flex items-center justify-center hover:bg-black/90 transition-colors"
                      >
                        <Heart
                          size={16}
                          className={`${wished ? "fill-[#ff7ab8] text-[#ff7ab8]" : "text-white/70"} transition-colors`}
                        />
                      </motion.button>

                      {/* Spark ring on add-to-cart */}
                      {sparkId === product.id && (
                        <motion.span
                          className="pointer-events-none absolute inset-3 rounded-[20px] border-2 border-[#f5e4b5]"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: [0, 1, 0], scale: [0.9, 1.05, 1] }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="px-4 sm:px-5 pt-3 pb-4 sm:pb-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold leading-tight line-clamp-2">
                          {product.name}
                        </h3>
                        <span className="text-[11px] sm:text-xs text-[#e3c985] whitespace-nowrap">
                          Limited
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-center justify-between gap-3">
                        <StarRating rating={product.rating} />
                        <p className="text-sm sm:text-base font-semibold text-[#f5e4b5]">
                          {product.price}
                        </p>
                      </div>

                      <p className="mt-2 text-[11px] sm:text-xs text-neutral-300 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 rounded-full bg-white text-[#111014] text-[11px] sm:text-xs font-semibold py-2 sm:py-2.5 tracking-wide hover:bg-[#f5e9ce] transition-colors"
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
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile navigation dots */}
            {hotProducts.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
                {hotProducts.map((_, idx) => {
                  const active = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToIndex(idx)}
                      className="relative h-3 w-3 flex items-center justify-center"
                      aria-label={`Go to product ${idx + 1}`}
                    >
                      <span
                        className={`
                          block h-3 w-3 rotate-45 rounded-[4px]
                          transition-all
                          ${
                            active
                              ? "bg-[#F5B400] shadow-[0_0_14px_rgba(245,180,0,0.9)] scale-110"
                              : "bg-white/15 border border-white/20 scale-95"
                          }
                        `}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shared Product Modal */}
      <ProductDetailModal
        product={selected as ProductForModal | null}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        onAddToCart={(p: ProductForModal) => {
          handleAddToCart(p);
          setSelected(null);
        }}
      />
    </>
  );
}