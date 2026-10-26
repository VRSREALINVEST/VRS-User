"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export interface SecuredProperty {
  _id: string;
  title: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  securedPrice: string;
  marketPrice: string;
  currentPrice: string;
}

// The page fetches the list on the server (lib/publicContent) and passes it in,
// so the cards are in the initial HTML; null (the API failed) leaves the
// heading without cards. The section heading is an h2 under the homepage's own
// h1; /properties has no other heading, so it passes headingLevel="h1" there.
export default function SecuredProperties({
  properties,
  headingLevel: Heading = "h2",
  eagerImages = 0,
}: {
  properties: SecuredProperty[] | null;
  headingLevel?: "h1" | "h2";
  // Covers that load straight away; only where the cards are above the fold.
  eagerImages?: number;
}) {
  const securedProperties = properties ?? [];
  // Card titles sit one level below the section heading.
  const CardHeading = Heading === "h1" ? "h2" : "h3";
  const [selectedProperty, setSelectedProperty] =
    useState<SecuredProperty | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);

  // ================= AUTO SCROLL =================
  // 18 px a second, rightwards, wrapping to the start at the end: the old
  // 0.3 px per frame at 60 fps. Chrome drops scrollLeft changes under a pixel,
  // so that never moved; distance now builds up from elapsed time and is
  // applied in whole pixels. Moves only while the carousel is on screen, never
  // for visitors who prefer reduced motion, and pauses 2 s after any wheel,
  // touch or mouse interaction.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const pxPerSecond = 18;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;
    let pending = 0;
    let last: number | null = null;

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    observer.observe(container);

    const animate = (now: number) => {
      // Capped, so a frame after the tab was hidden doesn't jump ahead.
      const elapsed = last === null ? 0 : Math.min(now - last, 100);
      last = now;

      if (onScreen && !isPausedRef.current && !reducedMotion.matches) {
        pending += (pxPerSecond * elapsed) / 1000;
        const step = Math.floor(pending);

        if (step > 0) {
          pending -= step;

          if (
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 1
          ) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += step;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const pauseScroll = () => {
      isPausedRef.current = true;

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      pauseTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, 2000);
    };

    container.addEventListener("wheel", pauseScroll);
    container.addEventListener("touchstart", pauseScroll);
    container.addEventListener("mousedown", pauseScroll);

    return () => {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      observer.disconnect();

      container.removeEventListener("wheel", pauseScroll);
      container.removeEventListener("touchstart", pauseScroll);
      container.removeEventListener("mousedown", pauseScroll);
    };
  }, [properties]);

  // ================= ESC CLOSE =================
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProperty(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // ================= BODY SCROLL LOCK =================
  useEffect(() => {
    document.body.style.overflow = selectedProperty ? "hidden" : "auto";
  }, [selectedProperty]);

  return (
    <>
      {/* ================= SECTION ================= */}
      <section className="relative py-20 overflow-hidden">
        {/* ✅ FULL WIDTH GLOW */}
        <div className="absolute inset-0 bg-gradient-to-t  via-black/20 to-transparent" />

        <div className="relative px-6 md:px-10 lg:px-20">
          {/* HEADER */}
          <div className="text-center mb-10">
            <Heading className="text-2xl md:text-3xl font-medium text-white tracking-[-0.01em]">
              Secured Properties
            </Heading>

            <p className=" text-gray-400 mt-3 text-[11px] tracking-[0.2em] uppercase">
              Successfully secured for our valued clients
            </p>
          </div>

          {/* SCROLLER */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pl-6 pr-6 md:pl-10 md:pr-10"
          >
            {securedProperties.map((property, i) => (
              <div
                key={property._id}
                className="relative min-w-[320px] md:min-w-[340px] h-[300px] md:h-[320px] rounded-2xl overflow-hidden group flex-shrink-0"
              >
                {/* IMAGE: the originals are multi-MB PNGs, so next/image
                    serves a resized WebP for the card's fixed size, and only
                    loads it when the card nears the viewport. */}
                <div className="absolute inset-0 group-hover:scale-105 transition duration-700">
                  {property.coverImage && (
                    <Image
                      src={property.coverImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 340px, 320px"
                      loading={i < eagerImages ? "eager" : "lazy"}
                      className="object-cover"
                    />
                  )}
                </div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* BADGE */}
                <div className="absolute top-4 right-4 bg-[var(--primary-gold)] text-[#221F1F] px-3 py-1 rounded-full text-[10px]  font-medium tracking-wide uppercase flex items-center gap-1 shadow-md">
                  <CheckCircle size={12} />
                  Secured
                </div>

                {/* CONTENT */}
                <div className="absolute bottom-6 left-6 text-white">
                  <CardHeading className=" text-base font-medium tracking-tight">
                    {property.title}
                  </CardHeading>

                  <button
                    onClick={() => {
                      setSelectedProperty(property);
                      setCurrentImage(0);
                    }}
                    className="mt-3 bg-[var(--primary-gold)] text-[#221F1F] px-5 py-1.5 text-[10px] rounded-md  font-medium tracking-[0.18em] uppercase hover:opacity-90 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedProperty && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="bg-[var(--card-bg)] border border-[var(--card-border)] max-w-4xl w-full rounded-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE: z-10 keeps it above the gallery image (next/image fill is
                positioned, so it would otherwise paint over the button). */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl backdrop-blur-md transition"
            >
              ✕
            </button>

            {/* IMAGE */}
            <div className="relative h-[320px] md:h-[360px]">
              {selectedProperty.galleryImages[currentImage] && (
                <Image
                  src={selectedProperty.galleryImages[currentImage]}
                  alt={selectedProperty.title}
                  fill
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="object-cover"
                />
              )}

              {selectedProperty.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImage((prev) =>
                        prev === 0
                          ? selectedProperty.galleryImages.length - 1
                          : prev - 1,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-md"
                  >
                    ‹
                  </button>

                  <button
                    onClick={() =>
                      setCurrentImage(
                        (prev) =>
                          (prev + 1) % selectedProperty.galleryImages.length,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-md"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* DETAILS */}
            <div className="p-8 text-white space-y-6">
              <h2 className=" text-2xl font-medium tracking-tight">
                {selectedProperty.title}
              </h2>

              <p className="text-gray-300 leading-relaxed">
                {selectedProperty.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[var(--card-border)]">
                <div>
                  <p className="text-gray-400 text-sm">Secured Price</p>
                  <p className="text-[var(--primary-gold)] text-lg  font-semibold tracking-wide">
                    {selectedProperty.securedPrice}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Market Value</p>
                  <p className="text-white text-lg  font-semibold tracking-wide">
                    {selectedProperty.marketPrice}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Current Value</p>
                  <p className="text-white text-lg  font-semibold tracking-wide">
                    {selectedProperty.currentPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
