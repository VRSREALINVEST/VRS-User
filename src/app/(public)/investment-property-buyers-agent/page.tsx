import type { Metadata } from "next";
import Link from "next/link";
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/links";

// Copy: Page Copy v2 §2, plus the intro sentence from the client's 26 Oct
// review. Left off until Sudhesh confirms them: buyer-only representation,
// the $350K–$700K range (intro and one FAQ), off-market sourcing, auction
// bidding and who pays third-party providers. The 10 factors guide link, the
// property cards and the testimonials wait for a live guide page and
// client-approved data.
const TITLE = "Investment Property Buyer’s Agent Australia | VRS Realinvest";
const DESCRIPTION =
  "Research-led buyer’s agent for investment property across Australia: buying brief, research, sourcing, due diligence and negotiation. Schedule a One-on-One Session.";
const NAME = "Investment Property Buyer’s Agent";
const SITE_URL = "https://www.vrsrealinvest.com.au";
const PAGE_URL = `${SITE_URL}/investment-property-buyers-agent`;

export const metadata: Metadata = {
  // The v2 title already ends with the brand, so the root layout's
  // "%s | VRS Real Invest" template must not add it again.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/investment-property-buyers-agent" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },
};

// No offers, price, priceRange or rating markup: fees stay private and the
// Google rating is unconfirmed. The provider is the root layout's Organization.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      serviceType: "Buyer's agent – investment property",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Australia" },
      url: PAGE_URL,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: NAME, item: PAGE_URL },
      ],
    },
  ],
};

const SUITS = [
  "Busy professionals and families who want an investment property but can’t spend weekends researching suburbs",
  "First-time investors who want to understand each decision, not just be handed a property",
  "Homeowners adding their first investment property",
  "Investors buying interstate, in a market they don’t know well",
  "SMSF trustees, once their licensed adviser has confirmed an SMSF purchase suits them",
];

const STEPS = [
  [
    "Goals and buying brief",
    "We start with your goals, budget, timeframe and how hands-on you want to be, then agree a written buying brief.",
  ],
  [
    "Market and suburb research",
    "We compare locations on rental demand, vacancy, affordability, local supply and ownership costs, using dated data you can see.",
  ],
  [
    "Property sourcing",
    "We search listed properties that fit the brief, and rule out the ones that don’t, with reasons.",
  ],
  [
    "Due diligence",
    "We review comparable sales, likely rent, condition, strata or building records where relevant, and the full cost of owning the property.",
  ],
  ["Negotiation", "We negotiate price and terms on your behalf."],
  [
    "Coordination to settlement",
    "We coordinate with your conveyancer or solicitor, building and pest inspectors, mortgage broker and property manager. They advise you in their own areas; we keep everything moving.",
  ],
];

const CHECKS = [
  [
    "Rental demand and vacancy",
    "how quickly similar properties lease, and current vacancy in the area",
  ],
  [
    "Affordability",
    "whether local renters can afford the likely rent, and local buyers the likely resale price",
  ],
  [
    "New supply",
    "approved and planned housing that could compete for tenants or buyers",
  ],
  [
    "Comparable sales",
    "recent sales of similar properties, to test the asking price",
  ],
  [
    "Ownership costs",
    "strata, council rates, insurance, management, maintenance and a vacancy allowance on top of the purchase price",
  ],
  [
    "Condition",
    "building and pest reports from your inspector, and strata or building records where relevant",
  ],
];

const INCLUDED = [
  "A written buying brief based on your goals, budget, timeframe and how involved you want to be",
  "Market and suburb research, with dated data sources",
  "A shortlist of properties that fit the brief, with reasons for the ones we rule out",
  "A due-diligence review of each property you’re seriously considering",
  "Negotiation of price and terms",
  "Coordination with your conveyancer, inspectors, broker and property manager through to settlement",
];

const FAQS = [
  [
    "What does a buyer’s agent do?",
    "A buyer’s agent represents the person buying a property, not the seller. For an investment purchase, that usually means defining the brief, researching markets and properties, assessing value, negotiating the price and terms, and coordinating the purchase through to settlement. A selling agent works for the vendor; a buyer’s agent works for you.",
  ],
  [
    "Is a buyer’s agent worth it for an investment property?",
    "It depends on your time, your experience and how well you know the market you’re buying in. A buyer’s agent can save research time, widen your options and negotiate on your behalf, but it only makes sense if those benefits matter to you. The One-on-One Session is there to help you decide.",
  ],
  [
    "Do you only buy in Sydney?",
    "No. We’re based in Jordan Springs, near Penrith in Sydney’s west, but we buy across Australia wherever your brief and our research point.",
  ],
  [
    "Do you give financial, tax or lending advice?",
    "No. We help you research and buy a property. Loans, tax, financial advice and SMSF suitability sit with your licensed broker, accountant or financial adviser, and we work alongside them.",
  ],
];

const BODY = "text-sm md:text-base leading-relaxed tracking-wide text-gray-400";
const H2 = "text-2xl md:text-3xl font-medium tracking-[-0.01em] text-white";
const H3 = "text-base md:text-lg font-medium tracking-wide text-white";
const TEXT_LINK =
  "text-[var(--primary-gold)] underline underline-offset-4 transition hover:opacity-80";

function BookingButton() {
  return (
    <Link
      href={BOOKING_URL}
      className="inline-block rounded-lg bg-[var(--primary-gold)] px-7 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[#221F1F] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary-gold)]"
    >
      Schedule a One-on-One Session
    </Link>
  );
}

function WhatsAppLink() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={TEXT_LINK}
    >
      message us on WhatsApp
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function InvestmentPropertyBuyersAgentPage() {
  return (
    <div className="text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(231,200,156,0.08),transparent_60%)]" />

        <div className="relative mx-auto max-w-5xl px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-[11px] uppercase tracking-[0.2em] text-gray-400"
          >
            <ol className="flex flex-wrap items-center">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-[var(--primary-gold)]"
                >
                  Home
                </Link>
                <span aria-hidden="true" className="mx-2">
                  ›
                </span>
              </li>
              <li aria-current="page" className="text-gray-200">
                {NAME}
              </li>
            </ol>
          </nav>

          <div className="mb-5 h-[2px] w-12 bg-[var(--primary-gold)]" />

          <h1 className="text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            {NAME}
          </h1>

          <p className={`mt-6 max-w-2xl ${BODY}`}>
            Buying an investment property takes time most busy professionals
            don’t have: researching markets, comparing properties, checking the
            numbers and negotiating with selling agents who work for the seller.
          </p>
          <p className={`mt-4 max-w-2xl ${BODY}`}>
            As your investment property buyer’s agent, VRS Realinvest works for
            you, the buyer, from your first brief to settlement, in whichever
            Australian market best fits your goals.
          </p>

          <div className="mt-8">
            <BookingButton />
          </div>
        </div>
      </section>

      {/* Same left edge as the hero; the text column stays narrow to read. */}
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <div className="max-w-3xl space-y-14">
          {/* ================= WHO IT SUITS ================= */}
          <section>
            <h2 className={H2}>Who this service suits</h2>
            <ul className={`mt-5 list-disc space-y-2 pl-5 marker:text-[var(--primary-gold)] ${BODY}`}>
              {SUITS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={`mt-5 ${BODY}`}>
              Buying your first home rather than an investment? You’re welcome
              to book a free One-on-One Session too, and our{" "}
              <Link href="/webinar" className={TEXT_LINK}>
                free webinar
              </Link>{" "}
              is open to everyone. This service isn’t for anyone who wants a
              guaranteed return: nobody can honestly promise one.
            </p>
          </section>

          {/* ================= WHAT WE DO ================= */}
          <section>
            <h2 className={H2}>What we do for you</h2>
            <ol className={`mt-5 list-decimal space-y-5 pl-5 marker:text-[var(--primary-gold)] ${BODY}`}>
              {STEPS.map(([step, text]) => (
                <li key={step}>
                  <h3 className={H3}>{step}</h3>
                  <p className="mt-1">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ================= HOW WE ASSESS ================= */}
          <section>
            <h2 className={H2}>How we assess an investment property</h2>
            <p className={`mt-5 ${BODY}`}>
              We call it lower-risk selection, not risk-free buying. Before we
              recommend a property, we check:
            </p>
            <ul className={`mt-4 list-disc space-y-2 pl-5 marker:text-[var(--primary-gold)] ${BODY}`}>
              {CHECKS.map(([check, text]) => (
                <li key={check}>
                  <span className="font-medium text-white">{check}:</span>{" "}
                  {text}
                </li>
              ))}
            </ul>
            <p className={`mt-5 ${BODY}`}>
              These checks reduce risk but can’t remove it. Data is dated, rents
              and values move, interest rates change, and an inspection can miss
              hidden defects. We show you the source and date of the data we used
              and anything we couldn’t verify, so you decide with the evidence in
              front of you.
            </p>
          </section>

          {/* ================= WHAT'S INCLUDED ================= */}
          <section>
            <h2 className={H2}>What’s included</h2>
            <ul className={`mt-5 list-disc space-y-2 pl-5 marker:text-[var(--primary-gold)] ${BODY}`}>
              {INCLUDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={`mt-5 ${BODY}`}>
              <span className="font-medium text-white">Not included:</span>{" "}
              legal, conveyancing, lending, tax, financial or SMSF advice. These
              come from your own licensed professionals, and we work alongside
              them.
            </p>
            <p className={`mt-5 ${BODY}`}>
              Schedule a free One-on-One Session to discuss your buying plans and
              what our service includes, or <WhatsAppLink />.
            </p>
            <div className="mt-6">
              <BookingButton />
            </div>
          </section>

          {/* "Properties we’ve secured for clients" (H2, three cards with
              state, budget band, purchase month and why it was chosen, then a
              "See all secured properties" link to /properties) goes here once
              the client approves three properties and the property model has
              those fields. Hidden until then: a heading with no cards. */}

          {/* "What clients say about our buying service" goes here once there
              are three client-approved buying-service testimonials and a
              rechecked Google rating. */}

          {/* ================= FAQ ================= */}
          <section>
            <h2 className={H2}>Frequently asked questions</h2>
            <div className="mt-5 space-y-6">
              {FAQS.map(([question, answer]) => (
                <div key={question}>
                  <h3 className={H3}>{question}</h3>
                  <p className={`mt-2 ${BODY}`}>{answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= CLOSING ================= */}
          <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 p-6 backdrop-blur-sm md:p-10">
            {/* A lead line, not a heading: v2 gives the closing block none. */}
            <p className={`${H2} font-[family-name:var(--font-heading)]`}>
              Start with a free One-on-One Session.
            </p>
            <p className={`mt-4 ${BODY}`}>
              Tell us your goals, budget and timing. We’ll explain how we’d
              approach your purchase, what our service includes and whether we’re
              a good fit. You can also <WhatsAppLink />.
            </p>
            <div className="mt-6">
              <BookingButton />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
