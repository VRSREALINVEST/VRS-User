import HeroSection from "@/components/sections/HeroSection";
import SecuredProperties from "@/components/sections/SecuredProperties";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TeamSection from "@/components/sections/TeamSection";
import NationwideCoverage from "@/components/sections/NationwideCoverage";
import Link from "next/link";
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/links";
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

const DIVIDER =
  "w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mb-5 opacity-80";
const H2 = "text-2xl md:text-3xl font-medium text-white tracking-[-0.01em]";
const BODY = "text-gray-300 text-sm md:text-base leading-relaxed tracking-wide";
const CARD =
  "flex flex-col rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 md:p-8";
const TEXT_LINK =
  "text-[var(--primary-gold)] underline underline-offset-4 transition hover:opacity-80";

// Server component: the Discover video, properties, team and testimonials are
// fetched here and rendered into the initial HTML. The page is static and
// regenerated at most once a minute (see lib/publicContent), so visitors never
// wait on the API. Section order and copy: Page Copy v2 §1.
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

      {/* ================= HOW WE HELP YOU BUY ================= */}
      {/* Holds the site's main internal link to the service page, and the
          homepage's one webinar button. */}
      <section className="px-6 py-14 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className={DIVIDER} />
            <h2 className={H2}>How we help you buy</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className={CARD}>
              <h3 className="text-lg font-medium text-white">
                Investment property buyer’s agent
              </h3>
              <p className={`mt-3 ${BODY}`}>
                We set your goals and buying brief, research suburbs and
                properties, source options, negotiate for you and coordinate
                with your conveyancer, inspectors, broker and property manager.
              </p>
              <p className={`mt-auto pt-5 ${BODY}`}>
                <Link href="/investment-property-buyers-agent" className={TEXT_LINK}>
                  How our buyer’s agent service works
                </Link>
              </p>
            </div>

            <div className={CARD}>
              <h3 className="text-lg font-medium text-white">
                Property investment education
              </h3>
              <p className={`mt-3 ${BODY}`}>
                Free webinars that explain how we assess rental demand, vacancy,
                affordability, supply, ownership costs and property condition.
              </p>
              <div className="mt-auto pt-5">
                <Link
                  href="/webinar"
                  className="inline-block px-6 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase rounded-md border border-[#E7C89C] text-[#E7C89C] hover:bg-[#E7C89C] hover:text-[#221F1F] transition-all duration-300"
                >
                  Register for a free webinar
                </Link>
              </div>
            </div>

            {/* Text only: the interstate and SMSF pages aren't built. */}
            <div className={CARD}>
              <h3 className="text-lg font-medium text-white">
                Interstate and SMSF purchases
              </h3>
              <p className={`mt-3 ${BODY}`}>
                We also represent investors buying outside their home state, and
                SMSF trustees once their own licensed advisers have confirmed an
                SMSF purchase suits them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW WE CHOOSE A PROPERTY ================= */}
      <section className="px-6 py-14 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className={DIVIDER} />
          <h2 className={H2}>How we choose a property</h2>
          <p className={`mt-6 ${BODY}`}>
            Every recommendation starts with evidence, not hype. Before we put a
            property forward, we check rental demand and vacancy, affordability
            for local renters and buyers, new supply in the area, recent
            comparable sales, the full cost of owning the property, and its
            condition. We call this lower-risk selection. These checks reduce
            risk but can’t remove it, because rents, vacancy, interest rates,
            values and a building’s condition can all change after you buy. So
            we show you what we checked, what we found and anything we couldn’t
            confirm.
          </p>
        </div>
      </section>

      <NationwideCoverage />
      <SecuredProperties properties={properties} />
      <TeamSection members={team} />
      <TestimonialsSection reviews={reviews} videos={videos} />

      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 md:p-12 text-center shadow-xl">
            {/* A lead line, not a heading: v2 gives the closing block none. */}
            <p className="text-xl md:text-3xl text-white font-semibold mb-4 font-[family-name:var(--font-heading)]">
              Ready to talk through your plans?
            </p>

            <p className="text-gray-400 mb-6 text-sm md:text-base max-w-xl mx-auto">
              A free One-on-One Session is a no-pressure conversation about your
              goals, budget and timing. You’ll leave knowing whether our
              buyer’s agent service suits you and what it includes. Prefer to
              start with a quick question?{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={TEXT_LINK}
              >
                Message us on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>

            <Link
              href={BOOKING_URL}
              className="inline-block bg-[var(--primary-gold)] text-[#221F1F] px-7 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition duration-300"
            >
              Schedule a One-on-One Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
