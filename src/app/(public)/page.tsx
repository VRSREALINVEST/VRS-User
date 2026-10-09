"use client";

import { useEffect, useState } from "react";
import PageLoader from "@/components/common/PageLoader";
import HeroSection from "@/components/sections/HeroSection";
import SecuredProperties from "@/components/sections/SecuredProperties";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TeamSection from "@/components/sections/TeamSection";
import NationwideCoverage from "@/components/sections/NationwideCoverage";

export default function HomePage() {
  const [heroReady, setHeroReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // ✅ When hero is ready → delay + fade loader out
  useEffect(() => {
    if (heroReady) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 600); // smooth overlap

      return () => clearTimeout(timer);
    }
  }, [heroReady]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Manual homepage canonical: Next strips the root-path trailing slash
          (metadata resolver returns origin for pathname "/"), so it's rendered
          directly here. Root layout's alternates.canonical was removed to avoid
          a duplicate. */}
      <link rel="canonical" href="https://www.vrsrealinvest.com.au/" />
      <PageLoader visible={showLoader} />

      <HeroSection onLoaded={() => setHeroReady(true)} />
      <SecuredProperties />
      <NationwideCoverage />
      <TeamSection />
      <TestimonialsSection />

      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h3 className="text-xl md:text-3xl text-white font-semibold mb-4">
              Ready to Start Your Investment Journey?
            </h3>

            <p className="text-gray-400 mb-6 text-sm md:text-base max-w-xl mx-auto">
              Partner with VRS Real Invest and secure premium real estate
              opportunities today.
            </p>

            <a
              href="https://calendly.com/sudhesh-vrsrealinvest/one-on-one-session"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--primary-gold)] text-[#221F1F] px-7 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition duration-300"
            >
              Get Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
