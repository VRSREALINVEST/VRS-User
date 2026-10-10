"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import useNearViewport from "@/lib/useNearViewport";

interface SecuredProperty {
  _id: string;
  title: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  securedPrice: string;
  marketPrice: string;
  currentPrice: string;
}

// ponytail: module-level cache — the section renders on both / and /properties,
// so navigating between them reuses the data instead of refetching. Refreshes on
// full page load; fine for admin-curated data that changes rarely.
let propertiesCache: SecuredProperty[] | null = null;

export default function SecuredProperties() {
  const [securedProperties, setSecuredProperties] = useState<SecuredProperty[]>(
    propertiesCache ?? [],
  );
  const [loading, setLoading] = useState(propertiesCache === null);
  const [selectedProperty, setSelectedProperty] =
    useState<SecuredProperty | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Directly below the hero on "/": wait for an actual scroll (margin 0),
  // since the cover images are large and would compete with the hero.
  const [sectionRef, near] = useNearViewport<HTMLElement>("0px");

  // ================= FETCH =================
  useEffect(() => {
    if (propertiesCache || !near) return;

    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API}/api/secured-properties`);
        propertiesCache = res.data;
        setSecuredProperties(res.data);
      } catch (error) {
        console.error("Error fetching secured properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [API, near]);

  // ================= AUTO SCROLL =================
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const speed = 0.3;

    const animate = () => {
      if (!isPausedRef.current) {
        container.scrollLeft += speed;

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
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

      container.removeEventListener("wheel", pauseScroll);
      container.removeEventListener("touchstart", pauseScroll);
      container.removeEventListener("mousedown", pauseScroll);
    };
  }, [securedProperties]);

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
      <section ref={sectionRef} className="relative py-20 overflow-hidden">
        {/* ✅ FULL WIDTH GLOW */}
        <div className="absolute inset-0 bg-gradient-to-t  via-black/20 to-transparent" />

        <div className="relative px-6 md:px-10 lg:px-20">
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-medium text-white tracking-[-0.01em]">
              Secured Properties
            </h1>

            <p className=" text-gray-400 mt-3 text-[11px] tracking-[0.2em] uppercase">
              Successfully secured for our valued clients
            </p>
          </div>

          {/* SCROLLER */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pl-6 pr-6 md:pl-10 md:pr-10"
          >
            {/* Skeletons match the card dimensions exactly, so the section
                keeps its height and nothing shifts when data arrives. */}
            {loading &&
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="min-w-[320px] md:min-w-[340px] h-[300px] md:h-[320px] rounded-2xl flex-shrink-0 border border-[var(--card-border)] bg-white/5 animate-pulse"
                />
              ))}

            {securedProperties.map((property) => (
              <div
                key={property._id}
                className="relative min-w-[320px] md:min-w-[340px] h-[300px] md:h-[320px] rounded-2xl overflow-hidden group flex-shrink-0"
              >
                {/* IMAGE */}
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-700"
                  style={{ backgroundImage: `url(${property.coverImage})` }}
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* BADGE */}
                <div className="absolute top-4 right-4 bg-[var(--primary-gold)] text-[#221F1F] px-3 py-1 rounded-full text-[10px]  font-medium tracking-wide uppercase flex items-center gap-1 shadow-md">
                  <CheckCircle size={12} />
                  Secured
                </div>

                {/* CONTENT */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className=" text-base font-medium tracking-tight">
                    {property.title}
                  </h3>

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
            {/* CLOSE */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl backdrop-blur-md transition"
            >
              ✕
            </button>

            {/* IMAGE */}
            <div className="relative h-[320px] md:h-[360px]">
              <img
                src={selectedProperty.galleryImages[currentImage]}
                className="w-full h-full object-cover"
                alt="property"
              />

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
