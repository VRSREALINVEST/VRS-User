import HeroSection from "@/components/sections/HeroSection";
import SecuredProperties from "@/components/sections/SecuredProperties";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TeamSection from "@/components/sections/TeamSection";
import NationwideCoverage from "@/components/sections/NationwideCoverage";
import { CONSULTATION_URL } from "@/lib/links";
import {
  getDiscoverVideo,
  getSecuredProperties,
  getTeam,
  getTextTestimonials,
  getVideoTestimonials,
} from "@/lib/publicContent";
import type { Metadata } from "next";

// Page Copy v2 §1. The title already ends with the brand, so the root
// layout's "%s | VRS Real Invest" template must not add it again. The
// canonical stays the manual <link> below.
const TITLE = "Buyers Agent Australia for Investors | VRS Realinvest";
const DESCRIPTION =
  "Buyer’s agent helping busy professionals and families research and buy investment property across Australia. Schedule a free One-on-One Session.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.vrsrealinvest.com.au/",
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },
};

// Server component: the Discover video, properties, team and testimonials are
// fetched here and rendered into the initial HTML. The page is static and
// regenerated at most once a minute (see lib/publicContent), so visitors never
// wait on the API.
export default async function HomePage() {
  const [discoverVideo, properties, team, reviews, videos] = await Promise.all([
    getDiscoverVideo(),
    getSecuredProperties(),
    getTeam(),
    getTextTestimonials(),
    getVideoTestimonials(),
  ]);

  return (
    <>
      {/* Manual homepage canonical: Next strips the root-path trailing slash
          (metadata resolver returns origin for pathname "/"), so it's rendered
          directly here. Root layout's alternates.canonical was removed to avoid
          a duplicate. */}
      <link rel="canonical" href="https://www.vrsrealinvest.com.au/" />
      <HeroSection discoverVideo={discoverVideo} />
      <SecuredProperties properties={properties} />
      <NationwideCoverage />
      <TeamSection members={team} />
      <TestimonialsSection reviews={reviews} videos={videos} />

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
              href={CONSULTATION_URL}
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
