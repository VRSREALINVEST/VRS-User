"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FREE_WEBINAR_URL } from "@/lib/links";
import DiscoverVideo from "@/components/sections/DiscoverVideo";

interface ImageItem {
  _id: string;
  url: string;
  public_id: string;
}

interface HeroData {
  type?: "image" | "video";
  video?: {
    url: string;
    public_id: string;
  };
  images?: ImageItem[];
}

export default function HeroSection({ onLoaded }: { onLoaded?: () => void }) {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [current, setCurrent] = useState(0);
  const [mediaReady, setMediaReady] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // ================= FETCH =================
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/hero`);
        const data = await res.json();
        setHero(data);
      } catch (err) {
        console.error("Hero fetch error", err);
        onLoaded && onLoaded();
      }
    };

    if (API_BASE_URL) {
      fetchHero();
    } else {
      console.warn("API_BASE_URL missing");
      onLoaded && onLoaded();
    }
  }, [API_BASE_URL]);

  // ================= IMAGE SLIDER =================
  useEffect(() => {
    if (hero?.type === "image" && hero.images?.length) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % hero.images!.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [hero]);

  // ================= MEDIA READY =================
  useEffect(() => {
    if (mediaReady) {
      onLoaded && onLoaded();
    }
  }, [mediaReady]);

  const hasImages = hero?.type === "image" && hero.images?.length;
  const hasVideo = hero?.type === "video" && hero.video?.url;

  return (
    // data-hide-webinar-cta: the floating webinar CTA (WebinarCtaShell) stays
    // hidden while this is on screen; it would cover the hero's video/CTAs
    // and the hero has its own Free Webinar button.
    <section
      data-hide-webinar-cta
      className="relative w-full min-h-screen overflow-hidden bg-[var(--background)]"
    >
      {/* ================= IMAGES ================= */}
      {hasImages &&
        hero!.images!.map((img, index) => (
          <img
            key={img._id}
            src={img.url}
            alt="hero"
            // First slide is the LCP once data arrives; later slides can wait.
            fetchPriority={index === 0 ? "high" : "low"}
            decoding="async"
            onLoad={() => setMediaReady(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2200ms] ease-out ${
              index === current
                ? "opacity-100 scale-110 blur-0"
                : "opacity-0 scale-100 blur-sm"
            }`}
          />
        ))}

      {/* ================= VIDEO ================= */}
      {hasVideo && (
        <video
          src={hero!.video!.url}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setMediaReady(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-110 transition-all duration-1000 ${
            mediaReady ? "opacity-100 blur-0" : "opacity-0 blur-xl"
          }`}
        />
      )}

      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(231,200,156,0.18),transparent_70%)]" />

      {/* ================= CONTENT ================= */}
      {/* pt-24 clears the fixed navbar, pb-36 the Scroll indicator */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-24 pb-36 transition-all duration-[1200ms] ease-out ${
          mediaReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* DOM order = mobile order; from lg, text left and video right, the
            1fr rows centring them on each other. Two columns only once the
            video rendered (DiscoverVideo returns null when unavailable). */}
        <div className="grid w-full max-w-5xl mx-auto lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-12 xl:gap-x-16 lg:has-[[data-hero-video]:not(:empty)]:grid-cols-2 lg:has-[[data-hero-video]:not(:empty)]:max-w-7xl">
          <div className="lg:col-start-1 lg:row-start-2">
            {/* Divider */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#E7C89C] to-transparent mb-12 mx-auto opacity-80" />

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium leading-[1.1] tracking-[-0.015em] text-gold-gradient">
              Buy Investment Property in Australia with the Right Strategy
            </h1>

            {/* Subtitle */}
            <p className="mt-8  text-[#E7C89C] text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-balance">
              Create real freedom through smart property investing
            </p>
          </div>

          {/* Video — after the subtitle on mobile, right column from lg */}
          <div
            data-hero-video
            className="w-full max-w-2xl mx-auto mt-10 mb-4 lg:my-0 lg:max-w-none lg:col-start-2 lg:row-[1/-1] lg:self-center empty:hidden"
          >
            <DiscoverVideo />
          </div>

          {/* Description */}
          <p className="mt-6  text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed tracking-wide lg:col-start-1 lg:row-start-3">
            We help busy professionals buy high-growth investment properties in
            Australia with strategy, clarity, and confidence
          </p>

          {/* CTA */}
          <div className="mt-14 flex gap-6 flex-wrap justify-center lg:col-start-1 lg:row-start-4">
            <button
              onClick={() =>
                window.open(FREE_WEBINAR_URL, "_blank", "noopener,noreferrer")
              }
              className="px-9 py-3 text-[11px] font-medium tracking-[0.22em] uppercase rounded-md border border-[#E7C89C] text-[#E7C89C] 
  hover:bg-[#E7C89C] hover:text-[#221F1F] 
  transition-all duration-300 hover:scale-[1.03]"
            >
              Free Webinar
            </button>

            {/* The anchor carries the button styling directly. <a><button> is
                invalid interactive nesting, which the HTML parser re-parents,
                so the hydrated DOM never matched the server HTML. inline-block
                matches the other CTA anchors in the app. */}
            <a
              href="https://calendly.com/sudhesh-vrsrealinvest/one-on-one-session"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-9 py-3 text-[11px]  font-medium tracking-[0.22em] uppercase rounded-md border border-[#E7C89C] text-[#E7C89C]
              hover:bg-[#E7C89C] hover:text-[#221F1F]
              transition-all duration-300 hover:scale-[1.03]"
            >
              Consultation
            </a>
          </div>
        </div>

        {/* SCROLL */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-[#E7C89C]/70 animate-pulse">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#E7C89C] to-transparent opacity-70" />
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}
