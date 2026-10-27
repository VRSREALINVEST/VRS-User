"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { BOOKING_URL } from "@/lib/links";
import DiscoverVideo, {
  type DiscoverVideoData,
} from "@/components/sections/DiscoverVideo";

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

// discoverVideo comes from the homepage's server fetch (lib/publicContent).
export default function HeroSection({
  discoverVideo,
}: {
  discoverVideo: DiscoverVideoData | null;
}) {
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
        // The hero text renders regardless; only the background media is lost.
        console.error("Hero fetch error", err);
      }
    };

    if (API_BASE_URL) {
      fetchHero();
    } else {
      console.warn("API_BASE_URL missing");
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

  // Boolean, not the count: "{0 && …}" would render a stray "0" when the hero
  // is set to images but has none (the API's default).
  const hasImages = hero?.type === "image" && !!hero.images?.length;
  const hasVideo = hero?.type === "video" && hero.video?.url;

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[var(--background)]">
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
      {/* pt-24 clears the fixed navbar, pb-36 the Scroll indicator. Visible
          from the first paint: it never waits for the hero API or media. */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-24 pb-36">
        {/* DOM order = mobile order; from lg, text left and video right, the
            1fr rows centring them on each other. Two columns only once the
            video rendered (DiscoverVideo returns null when unavailable). */}
        <div className="grid w-full max-w-5xl mx-auto lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-12 xl:gap-x-16 lg:has-[[data-hero-video]:not(:empty)]:grid-cols-2 lg:has-[[data-hero-video]:not(:empty)]:max-w-7xl">
          <div className="lg:col-start-1 lg:row-start-2">
            {/* Divider */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#E7C89C] to-transparent mb-12 mx-auto opacity-80" />

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium leading-[1.1] tracking-[-0.015em] text-gold-gradient">
              Investment Property Buyer’s Agent, Australia-Wide
            </h1>
          </div>

          {/* Video — after the subtitle on mobile, right column from lg */}
          <div
            data-hero-video
            className="w-full max-w-2xl mx-auto mt-10 mb-4 lg:my-0 lg:max-w-none lg:col-start-2 lg:row-[1/-1] lg:self-center empty:hidden"
          >
            <DiscoverVideo video={discoverVideo} />
          </div>

          {/* Description: the Page Copy v2 §1 hero, without the client range
              sentence, which waits on Sudhesh. */}
          <p className="mt-6  text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed tracking-wide lg:col-start-1 lg:row-start-3">
            VRS Realinvest helps busy professionals and families research and
            purchase investment properties across Australia. We combine
            education, property research and buyer representation to help you
            make informed decisions and work towards long-term wealth. Our
            mission is Create Real Freedom™.
          </p>

          {/* CTA: v2 gives the hero one button; the homepage's one webinar
              button sits in "How we help you buy". Under it, the confirmed
              part of the v2 proof line (rating and buyer-only wait on Sudhesh). */}
          <div className="mt-14 lg:col-start-1 lg:row-start-4">
            {/* The link carries the button styling directly. inline-block
                matches the other CTA links in the app; tighter on phones so
                the label stays on one line. */}
            <Link
              href={BOOKING_URL}
              className="inline-block px-6 sm:px-9 py-3 text-[11px]  font-medium tracking-[0.16em] sm:tracking-[0.22em] uppercase rounded-md border border-[#E7C89C] text-[#E7C89C]
              hover:bg-[#E7C89C] hover:text-[#221F1F]
              transition-all duration-300 hover:scale-[1.03]"
            >
              Schedule a One-on-One Session
            </Link>

            <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Licence no. 20496430
            </p>
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
