"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useCart,
  type Product,
} from "@/contexts/cartContext";

import ProductDetailModal from "@/components/dashboard components/productDetailModal";

import {
  DetailedProduct,
} from "@/components/dashboard components/productTile";

import {
  useFynaroToast,
} from "@/components/dashboard components/common/fynaroToast";

import {
  useWishlist,
} from "@/contexts/wishlistContext";

import {
  products,
} from "@/data/product";

import {
  AppProduct,
} from "@/types/product";

function StarRating({
  rating = 5,
}: {
  rating?: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={10}
          className={
            index < rating
              ? "fill-[#b7963f] text-[#b7963f]"
              : "text-black/15"
          }
        />
      ))}
    </div>
  );
}

export default function PremiumProductsShowcase() {
  const {
    addToCart,
  } = useCart();

  const {
    notifyAddToCart,
    notifyWishlistToggle,
  } = useFynaroToast();

  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  /*
   * TEMPORARY:
   *
   * Your existing product dataset already uses `isHotStuff`.
   * We can reuse it for now so this component works immediately.
   *
   * Later I recommend changing your product model from:
   *
   * isHotStuff: true
   *
   * to:
   *
   * isPremiumProduct: true
   *
   * and updating this filter.
   */
  const premiumProducts =
    products.filter(
      (product) =>
        product.isHotStuff
    );

  const [
    selected,
    setSelected,
  ] =
    useState<AppProduct | null>(
      null
    );

  const [
    activeIndex,
    setActiveIndex,
  ] =
    useState(0);

  const [
    addedProductId,
    setAddedProductId,
  ] = useState<
    number | string | null
  >(null);

  const stripRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const cardRefs =
    useRef<
      (
        | HTMLDivElement
        | null
      )[]
    >([]);

  const setCardRef =
    (index: number) =>
    (
      element:
        | HTMLDivElement
        | null
    ) => {
      cardRefs.current[
        index
      ] = element;
    };

  const handleAddToCart = (
    product:
      | AppProduct
      | DetailedProduct
  ) => {
    const price =
      typeof product.price ===
      "string"
        ? product.price
        : `₦${Number(
            product.price ?? 0
          ).toLocaleString(
            "en-NG"
          )}.00`;

    const normalized: Product =
      {
        id: product.id,
        name: product.name,
        price,
        image:
          "image" in
            product &&
          product.image
            ? product.image
            : "images" in
                  product &&
                product
                  .images?.[0]
              ? product
                  .images[0]
              : "",
      };

    addToCart(normalized);

    setAddedProductId(
      product.id
    );

    window.setTimeout(
      () =>
        setAddedProductId(
          null
        ),
      900
    );

    notifyAddToCart(
      normalized.name
    );
  };

  const handleToggleWishlist =
    (
      product: AppProduct
    ) => {
      const payload = {
        id: product.id,
        name: product.name,
        price:
          product.price,
        image:
          product.image ??
          product.images?.[0] ??
          "",
      };

      if (
        isWishlisted(
          product.id
        )
      ) {
        removeFromWishlist(
          product.id
        );

        notifyWishlistToggle(
          product.name,
          false
        );

        return;
      }

      addToWishlist(
        payload
      );

      notifyWishlistToggle(
        product.name,
        true
      );
    };

  const handleScroll = () => {
    const container =
      stripRef.current;

    if (!container) {
      return;
    }

    const containerRect =
      container.getBoundingClientRect();

    const center =
      containerRect.left +
      containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance =
      Infinity;

    cardRefs.current.forEach(
      (
        element,
        index
      ) => {
        if (!element) {
          return;
        }

        const rect =
          element.getBoundingClientRect();

        const cardCenter =
          rect.left +
          rect.width / 2;

        const distance =
          Math.abs(
            cardCenter -
              center
          );

        if (
          distance <
          closestDistance
        ) {
          closestDistance =
            distance;

          closestIndex =
            index;
        }
      }
    );

    setActiveIndex(
      closestIndex
    );
  };

  const scrollToIndex = (
    index: number
  ) => {
    cardRefs.current[
      index
    ]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const scrollPrevious =
    () => {
      scrollToIndex(
        Math.max(
          0,
          activeIndex - 1
        )
      );
    };

  const scrollNext = () => {
    scrollToIndex(
      Math.min(
        premiumProducts.length -
          1,
        activeIndex + 1
      )
    );
  };

  useEffect(() => {
    handleScroll();
  }, []);

  if (
    premiumProducts.length ===
    0
  ) {
    return (
      <div className="rounded-[18px] border border-dashed border-black/[0.12] bg-[#fafaf7] p-7">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
          <Sparkles
            size={14}
          />
        </div>

        <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.03em]">
          Premium products
          are coming.
        </h3>

        <p className="mt-2 max-w-[420px] text-[10px] leading-5 text-black/40">
          Selected Fynaro
          products will appear
          here once they are
          marked for premium
          sale.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {/* CONTROLS */}

        {premiumProducts.length >
          1 && (
          <div className="mb-4 hidden justify-end gap-2 sm:flex">
            <button
              type="button"
              onClick={
                scrollPrevious
              }
              disabled={
                activeIndex ===
                0
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] text-black/45 transition hover:border-black/20 hover:text-black disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="Previous product"
            >
              <ArrowLeft
                size={12}
              />
            </button>

            <button
              type="button"
              onClick={
                scrollNext
              }
              disabled={
                activeIndex ===
                premiumProducts.length -
                  1
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] text-black/45 transition hover:border-black/20 hover:text-black disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="Next product"
            >
              <ArrowRight
                size={12}
              />
            </button>
          </div>
        )}

        {/* PRODUCTS */}

        <div
          ref={stripRef}
          onScroll={
            handleScroll
          }
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scrollbar-hide"
        >
          {premiumProducts.map(
            (
              product,
              index
            ) => {
              const wished =
                isWishlisted(
                  product.id
                );

              const added =
                addedProductId ===
                product.id;

              return (
                <motion.article
                  key={
                    product.id
                  }
                  ref={setCardRef(
                    index
                  )}
                  initial={{
                    opacity: 0,
                    y: 14,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.35,
                    delay:
                      index *
                      0.04,
                  }}
                  className="group relative w-[84vw] shrink-0 snap-center overflow-hidden rounded-[18px] border border-black/[0.08] bg-white sm:w-[440px] lg:w-[390px]"
                >
                  {/* IMAGE */}

                  <button
                    type="button"
                    onClick={() =>
                      setSelected(
                        product
                      )
                    }
                    className="relative block h-[230px] w-full overflow-hidden bg-[#f4f4ef] text-left"
                  >
                    <Image
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      fill
                      className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                    />

                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-white/90 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.13em] text-black/50 backdrop-blur">
                        <Sparkles
                          size={8}
                        />
                        Premium
                      </span>
                    </div>
                  </button>

                  {/* WISHLIST */}

                  <button
                    type="button"
                    onClick={() =>
                      handleToggleWishlist(
                        product
                      )
                    }
                    aria-label={
                      wished
                        ? "Remove from wishlist"
                        : "Save to wishlist"
                    }
                    className={[
                      "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur transition",
                      wished
                        ? "border-black bg-[#111] text-white"
                        : "border-black/[0.08] bg-white/90 text-black/45 hover:text-black",
                    ].join(
                      " "
                    )}
                  >
                    <Heart
                      size={12}
                      className={
                        wished
                          ? "fill-current"
                          : ""
                      }
                    />
                  </button>

                  {/* BODY */}

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {product.tag && (
                          <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#92772d]">
                            {
                              product.tag
                            }
                          </p>
                        )}

                        <h3 className="line-clamp-2 max-w-[250px] text-[16px] font-semibold leading-[1.15] tracking-[-0.025em]">
                          {
                            product.name
                          }
                        </h3>
                      </div>

                      <StarRating
                        rating={
                          product.rating
                        }
                      />
                    </div>

                    <p className="mt-3 line-clamp-2 min-h-[40px] text-[10px] leading-5 text-black/42">
                      {
                        product.description
                      }
                    </p>

                    <div className="mt-5 flex items-end justify-between border-t border-black/[0.07] pt-4">
                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-black/30">
                          Price
                        </p>

                        <p className="mt-1 text-[17px] font-semibold tracking-[-0.025em]">
                          {
                            product.price
                          }
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelected(
                            product
                          )
                        }
                        className="flex items-center gap-1.5 text-[9px] font-semibold text-black/42 transition hover:text-black"
                      >
                        View details
                        <ArrowRight
                          size={10}
                        />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(
                          product
                        )
                      }
                      className={[
                        "mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full text-[10px] font-semibold transition",
                        added
                          ? "bg-[#e7efe7] text-[#315d38]"
                          : "bg-[#111] text-white hover:bg-black/80",
                      ].join(
                        " "
                      )}
                    >
                      {added ? (
                        <>
                          Added to cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag
                            size={
                              11
                            }
                          />
                          Add to cart
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              );
            }
          )}
        </div>

        {/* MOBILE INDICATORS */}

        {premiumProducts.length >
          1 && (
          <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
            {premiumProducts.map(
              (
                _,
                index
              ) => (
                <button
                  key={
                    index
                  }
                  type="button"
                  aria-label={`Go to product ${
                    index + 1
                  }`}
                  onClick={() =>
                    scrollToIndex(
                      index
                    )
                  }
                  className={[
                    "h-1.5 rounded-full transition-all",
                    activeIndex ===
                    index
                      ? "w-5 bg-[#111]"
                      : "w-1.5 bg-black/15",
                  ].join(
                    " "
                  )}
                />
              )
            )}
          </div>
        )}
      </div>

      <ProductDetailModal
        product={
          selected as
            | DetailedProduct
            | null
        }
        open={Boolean(
          selected
        )}
        onClose={() =>
          setSelected(null)
        }
        onAddToCart={(
          product: DetailedProduct
        ) => {
          handleAddToCart(
            product
          );

          setSelected(null);
        }}
      />
    </>
  );
}