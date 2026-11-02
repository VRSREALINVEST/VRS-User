import type { Metadata } from "next";
import Link from "next/link";
import { requirePreview } from "@/lib/preview";
import {
  BulletList,
  ClosingBlock,
  CtaRow,
  DataTable,
  Disclaimer,
  ExternalLink,
  Faqs,
  LeadList,
  PageBody,
  PageHero,
  Para,
  Section,
  ServiceJsonLd,
  SITE_URL,
  TEXT_LINK,
} from "@/components/sections/ServicePageParts";

// Copy: Page Content v2 (30 Oct), Page 1: Buyer's Agent Sydney, with the
// fact-check corrections approved on 2 Nov (Cotality's 2 Nov index and the
// week-ending-25-Oct clearance rate; Verify NSW wording). PREVIEW ONLY:
// approved in principle; renders only in a VRS_PREVIEW_PAGES=1 build (see
// lib/preview) until Sudhesh approves the preview. Left out until he confirms
// them: the Google rating line, buyer-only representation, off-market
// sourcing and auction bidding.
const PATH = "/buyers-agent-sydney";
const TITLE = "Buyer’s Agent Sydney for Investors & Home Buyers | VRS Realinvest";
const DESCRIPTION =
  "Buyer’s agent based in Western Sydney, helping busy professionals and families buy investment property across Sydney and Australia. Schedule a One-on-One Strategy Session.";

// Official sources named in the copy (Page Content v2, Sources).
const NSW_USING_AGENT =
  "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-property-nsw/using-a-real-estate-agent-to-buy-a-property";
const NSW_LICENCE_CHECK =
  "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-property-nsw/preparing-to-purchase/property-agent-or-conveyancer-licence-check";
const COTALITY_HVI =
  "https://discover.cotality.com/hubfs/COTALITY%20HVI%20NOV%202026%20FINAL.pdf";
const COTALITY_CLEARANCE =
  "https://www.cotality.com/au/press-releases/final-clearance-rates-week-ending-25-october-2026";

export async function generateMetadata(): Promise<Metadata> {
  requirePreview();
  return {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: PATH },
    // Preview: never indexed until Sudhesh approves publication.
    robots: { index: false, follow: false },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${SITE_URL}${PATH}`,
      siteName: "VRS Real Invest",
      locale: "en_AU",
      type: "website",
    },
  };
}

const FAQS: [string, string][] = [
  [
    "Is it worth paying for a buyer’s agent in Sydney?",
    "It can be if you’re short on time, buying an investment, or buying in an unfamiliar area. If you know the street, have time to research and are comfortable negotiating, you may not need one.",
  ],
  [
    "Who is the best buyer’s agent in Sydney?",
    "The one who fits your brief and can show it. Check their NSW licence on Verify NSW, ask who pays them besides you, ask for recent purchases similar to yours, and read the agreement before signing.",
  ],
  [
    "What is the difference between a buyer’s agent and a real estate agent?",
    "Both hold a real estate licence in NSW. A selling agent is engaged by the seller to get the highest price. A buyer’s agent is engaged by the buyer to find the right property and negotiate the best price and terms.",
  ],
  [
    "Do buyer’s agents need a licence in NSW?",
    "Yes. Acting for a buyer in NSW requires a real estate agent licence, class 1 or class 2, or a certificate of registration while working under a licensee (NSW Government).",
  ],
  [
    "How do I check a buyer’s agent’s licence in NSW?",
    "Use the Verify NSW licence check on the NSW Government website or call 13 32 20. It shows the licence or certificate number, its category, any conditions, the issue and expiry dates and any disciplinary action since 1 September 2003.",
  ],
  [
    "What should I ask a buyer’s agent before signing?",
    "How long they’ve been licensed, who else pays them, what you pay if no property is found, how to end the agreement, whether they hold professional indemnity insurance, and what is included in their service.",
  ],
  [
    "Who reviews the contract when I buy through a buyer’s agent?",
    "Your solicitor or conveyancer reviews the contract and advises you on it. A buyer’s agent coordinates the process and can flag matters for their attention, but doesn’t give legal advice.",
  ],
  [
    "Is there a cooling-off period when buying in Sydney?",
    "For most private sales of established residential property in NSW, it’s 5 business days after exchange; for off-the-plan purchases it’s 10 business days. Withdrawing in the 5-day period costs 0.25% of the price. There is no cooling-off at auction or for a same-day purchase after a pass-in, and it can be waived with a 66W certificate.",
  ],
  [
    "Is now a good time to buy in Sydney?",
    "Sydney values were 10.1% below their February 2026 peak in October and the final clearance rate was 41.7% in the week ending 25 October, so buyers have more room to negotiate. That doesn’t make every home good value, and nobody can call the bottom. Buy when the property, price and your finances line up.",
  ],
  [
    "Do you only work with investors, and only in Sydney?",
    "Our service focuses on investment property for busy professionals and families, and we buy across Sydney and Australia-wide. First home buyers are welcome to enquire, and we’ll tell you whether our service suits you.",
  ],
];

export default function BuyersAgentSydneyPage() {
  requirePreview();

  return (
    <div className="text-white">
      <ServiceJsonLd
        path={PATH}
        crumb="Buyer’s Agent Sydney"
        serviceType="Buyer's agent"
        areaServed={[
          { "@type": "City", name: "Sydney" },
          { "@type": "Country", name: "Australia" },
        ]}
      />

      <PageHero crumb="Buyer’s Agent Sydney" title="Buyer’s Agent Sydney, Buying Across Australia">
        <Para className="mt-6">
          VRS Realinvest is a buyer’s agency and property-education business
          based in Jordan Springs, near Penrith in Sydney’s west. We help busy
          professionals and families research and buy investment property, in
          Sydney when it suits their goals and across Australia when a better
          fit is elsewhere. We act for you, the buyer, in the purchase: setting
          your brief, researching the market, assessing properties and
          negotiating, with your solicitor or conveyancer and other local
          professionals supporting each purchase. It’s how we help people work
          towards our mission, Create Real Freedom™.
        </Para>
        <Para className="mt-4">
          Start with a One-on-One Strategy Session to talk through your goals,
          budget and timing.
        </Para>
        <CtaRow />
        <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          Licence no. 20496430 · VRS Realinvest Pty Ltd · ABN 21 688 632 760
        </p>
      </PageHero>

      <PageBody>
        <Section title="Who we help">
          <BulletList
            items={[
              "Busy professionals and families who want an investment property but can’t spend every weekend at open homes",
              "First-time investors who want to understand each decision, not just be handed a property",
              "Homeowners adding their first investment property",
              "Sydney investors weighing a purchase here against other Australian markets",
            ]}
          />
          <Para>
            Buying your first home? You’re welcome to enquire too. We’ll tell
            you honestly whether our service suits what you need.
          </Para>
        </Section>

        <Section title="What we do for you">
          <LeadList
            ordered
            items={[
              ["Set your brief.", "Your goals, budget, finance position, must-haves and how long you plan to hold. For investors, we test the brief against likely rent and holding costs before looking at listings."],
              ["Research suburbs and streets.", "Rental demand, vacancy, affordability, new supply, comparable sales and ownership costs. We give you the source and date for the figures we use."],
              ["Shortlist properties.", "We search listed properties that fit the brief and explain why each one made the list, and why others didn’t."],
              ["Check the property you choose.", "Before you commit, we help you arrange a building and pest inspection with an independent inspector on the property you decide to buy, timed to suit the contract conditions or the auction date. For units and townhouses we help you get the strata records."],
              ["Coordinate the contract review.", "Your solicitor or conveyancer reviews the contract and advises you on it. We coordinate the process and flag anything we think needs their attention."],
              ["Negotiate.", "We negotiate on price and terms within the limit you set in writing."],
              ["Through to settlement.", "We keep your solicitor or conveyancer, inspector, broker and property manager moving together until the keys change hands."],
            ]}
          />
          <Para>
            These checks reduce risk but can’t remove it. Data dates, rents move
            and an inspection can miss a hidden defect. We tell you what we
            couldn’t verify, so you decide with the evidence in front of you.
          </Para>
        </Section>

        <Section title="Based in Western Sydney, buying across Australia">
          <Para>
            Our office is in Jordan Springs, near Penrith. We help clients buy
            across Sydney’s regions, and because our service is nationwide, we
            can compare a Sydney purchase with other cities and regional centres
            in the same brief. When a client’s budget or rental target fits
            another market better, we say so, with the appropriate local
            professionals supporting that purchase. Read how we approach{" "}
            <Link href="/interstate-buyers-agent" className={TEXT_LINK}>
              buying property interstate
            </Link>
            , or see the full{" "}
            <Link href="/investment-property-buyers-agent" className={TEXT_LINK}>
              investment property buyer’s agent
            </Link>{" "}
            service.
          </Para>
        </Section>

        <Section title="Buyer’s agent vs selling agent: who works for whom">
          <DataTable
            id="agent-comparison"
            caption="Buyer’s agent vs selling agent: who works for whom"
            minWidth="min-w-[34rem]"
            head={["", "Selling agent", "Buyer’s agent"]}
            rows={[
              ["Engaged and paid by", "The seller", "You"],
              ["Their goal", "Highest price and best terms for the seller", "The right property at the best price and terms for you"],
              ["Licence in NSW", "Real estate agent licence", "Real estate agent licence (class 1 or class 2), or a certificate of registration working under a licensee"],
              ["Can they take a payment for referring you to a selling agent?", "Not applicable", "No"],
              ["Can they go above your price limit?", "Not applicable", "No, not without your written authority"],
            ]}
          />
          <Para>
            Source: NSW Government,{" "}
            <ExternalLink href={NSW_USING_AGENT}>
              Using a real estate agent to buy a property
            </ExternalLink>
            . Under those rules a buyer’s agent must declare any conflict of
            interest, try to get you the best possible price, keep you informed
            and tell you about later offers.
          </Para>
        </Section>

        <Section title="How to check a buyer’s agent in NSW">
          <Para>
            In NSW, acting for a buyer requires a real estate agent licence
            (class 1 or class 2), or a certificate of registration while working
            under a licensee. Before you sign with any buyer’s agent, including
            us:
          </Para>
          <LeadList
            items={[
              [
                "Look up the licence",
                <>
                  with the{" "}
                  <ExternalLink href={NSW_LICENCE_CHECK}>Verify NSW licence check</ExternalLink>{" "}
                  on the NSW Government website, or call 13 32 20. It shows the
                  licence or certificate number, its category, any conditions,
                  the issue and expiry dates and any disciplinary action since
                  1 September 2003.
                </>,
              ],
              ["Ask who else pays them,", "including rebates or commissions from developers, selling agents or other third parties."],
              ["Ask what happens if no property is found,", "and how you can end the agreement."],
              ["Ask about professional indemnity insurance", "and any industry association membership."],
              ["Read the agency agreement", "and make sure the fee, the term and your price limit are in writing."],
            ]}
          />
        </Section>

        <Section title="Is a buyer’s agent worth it in Sydney?">
          <Para>
            It depends on what your time and a mistake would cost you. A buyer’s
            agent tends to earn their keep when you’re short on time, buying an
            investment where the numbers matter more than the kitchen, or buying
            in a part of Sydney you don’t know. You may not need one if you
            already know the street, have time to research and are comfortable
            negotiating. We’d rather tell you that in the first session than
            sign you up for a service you won’t use.
          </Para>
        </Section>

        <Section title="What Sydney’s market looks like now">
          <Para>
            <ExternalLink href={COTALITY_HVI}>Cotality’s Home Value Index</ExternalLink>{" "}
            (published 2 November 2026, October data) shows Sydney dwelling
            values fell 1.6% in October and 9.4% over the year, and sit 10.1%
            below their February 2026 peak. In the week ending 25 October 2026,
            Sydney’s final auction clearance rate was 41.7% across 623 auctions,
            against 65.3% a year earlier (
            <ExternalLink href={COTALITY_CLEARANCE}>Cotality, published 29 October</ExternalLink>
            ). Sydney’s gross rental yield was about 3.5% in October, the
            lowest of the capital cities.
          </Para>
          <Para>
            More stock and fewer bidders give buyers more room to negotiate, but
            a softer market doesn’t make every home good value. We explain how
            we read these numbers in{" "}
            <Link
              href="/blog/sydney-auction-clearance-rate-october-2026-what-below-50percent-means"
              className={TEXT_LINK}
            >
              Sydney auction clearance rate October 2026
            </Link>{" "}
            and{" "}
            <Link
              href="/blog/buying-property-in-sydney-2026-is-october-a-better-time"
              className={TEXT_LINK}
            >
              buying property in Sydney in 2026
            </Link>
            .
          </Para>
        </Section>

        <Faqs items={FAQS} />

        <ClosingBlock lead="Buying in Sydney, or weighing Sydney against other markets?">
          Schedule a One-on-One Strategy Session. Tell us your goals, budget and
          timing, and we’ll explain how we’d approach your purchase, what our
          service includes and whether we’re a good fit.
        </ClosingBlock>

        <Disclaimer>
          General information only. This page is not financial, legal or tax
          advice. Market figures current as at 2 November 2026.
        </Disclaimer>
      </PageBody>
    </div>
  );
}
