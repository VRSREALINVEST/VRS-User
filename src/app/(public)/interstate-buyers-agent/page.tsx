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
  H3,
  LeadList,
  PageBody,
  PageHero,
  Para,
  Section,
  ServiceJsonLd,
  SITE_URL,
  TEXT_LINK,
} from "@/components/sections/ServicePageParts";

// Copy: Page Content v2 (30 Oct), Page 2: Interstate Buyer's Agent, with the
// fact-check corrections approved on 2 Nov (Cotality's 2 Nov index, FIRB's
// ban dates, the NSW/WA land tax, ACT/SA/VIC cooling-off and QLD wording, and
// settlement). PREVIEW ONLY: approved in principle; renders only in a
// VRS_PREVIEW_PAGES=1 build (see lib/preview) until Sudhesh approves the
// preview. Left out until he confirms
// them: who inspects in each state, off-market sourcing, auction bidding, and
// the interstate licence arrangement (so no licence line under the intro).
// Tasmania and the Northern Territory are deliberately not in the tables.
const PATH = "/interstate-buyers-agent";
const TITLE = "Interstate Buyer’s Agent: Buying Property Interstate | VRS Realinvest";
const DESCRIPTION =
  "Buying an investment property in another state? See how the rules differ by state and how we buy Australia-wide. Schedule a One-on-One Strategy Session.";

const COTALITY_HVI =
  "https://discover.cotality.com/hubfs/COTALITY%20HVI%20NOV%202026%20FINAL.pdf";

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

// The two state tables, each row checked on the linked official page (Page
// Content v2, 29 Oct; rechecked 2 Nov). Keep every source link.
type StateRow = [state: string, a: string, b: string, source: [name: string, href: string]];

const COOLING_OFF: StateRow[] = [
  [
    "NSW",
    "5 business days after exchange for established residential property; 10 business days for off-the-plan. Withdrawing in the 5-day period costs 0.25% of the price.",
    "Bought at auction, or exchanged the same day after a pass-in; waived with a 66W certificate",
    ["NSW Government", "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-property-nsw/contracts-and-deposits"],
  ],
  [
    "VIC",
    "3 clear business days after you sign. The seller can keep $100 or 0.2% of the price, whichever is more.",
    "Bought at, or within 3 clear business days before or after, a public auction; the buyer is an estate agent or corporate body; the property is used mainly for industrial or commercial purposes, or is more than 20 hectares and used mainly for farming; or you previously signed a contract for the same property with the same terms",
    ["Consumer Affairs Victoria", "https://www.consumer.vic.gov.au/housing/buying-and-selling-property/buying-property/buying-property-by-private-sale"],
  ],
  [
    "QLD",
    "5 business days from the day you receive a copy of the contract signed by both parties. The seller can keep up to 0.25% of the price.",
    "Bought at auction, or by a registered bidder before 5pm on the second business day after an unsuccessful auction; waived or shortened in writing",
    ["Queensland Government", "https://www.qld.gov.au/law/housing-and-neighbours/buying-and-selling-a-property/buying-a-home/making-an-offer-on-a-home/cooling-off-period"],
  ],
  [
    "WA",
    "No statutory cooling-off period. Any right to withdraw must be written into the contract, such as a finance condition.",
    "Not applicable",
    ["WA Government", "https://www.wa.gov.au/government/announcements/commissioners-blog-dont-be-hasty-when-buying-home"],
  ],
  [
    "SA",
    "Until the end of the second clear business day, counted from the later of the day the contract is made and the day you receive the Form 1 vendor’s statement.",
    "Bought at auction, or on the auction day after a pass-in by someone who bid (or was bid for) at that auction; a tender or option sale where the contract is made at least 5 clear business days after tenders close or the option is granted, and at least 2 clear business days after you receive the Form 1; waived with a legal practitioner’s certificate",
    ["SA Government", "https://www.sa.gov.au/topics/housing-and-property/buying-building-selling/building-or-buying-home/home-sales"],
  ],
  [
    "ACT",
    "5 working days from when the contract is made. The buyer forfeits 0.25% of the price.",
    "The buyer is a corporation; bought at auction or by tender; bought on the auction day after a pass-in by a recorded bidder (or someone a recorded bidder was bidding for); waived with a lawyer’s certificate",
    ["Civil Law (Sale of Residential Property) Act 2003", "https://www.legislation.act.gov.au/DownloadFile/a/2003-40/current/PDF/2003-40.PDF"],
  ],
];

const LAND_TAX: StateRow[] = [
  [
    "NSW",
    "$1,075,000 (2026 land tax year, unimproved land value)",
    "Special trusts, which can include discretionary trusts, get no threshold; in a group of related companies, only one company gets it",
    ["Revenue NSW", "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/land-tax/understanding-land-tax/thresholds-and-rates"],
  ],
  [
    "VIC",
    "$50,000 (site value, 2024–2033 land tax years)",
    "Trust surcharge rates from $25,000",
    ["State Revenue Office Victoria", "https://www.sro.vic.gov.au/about-us/rates-and-statistics/current-rates/land-tax-current-rates"],
  ],
  [
    "QLD",
    "$600,000",
    "Companies and trustees from $350,000",
    ["Queensland Revenue Office", "https://qro.qld.gov.au/land-tax/calculate/individual/"],
  ],
  [
    "WA",
    "Above $300,000 (aggregated taxable value of all your non-exempt land); land tax payers in the Perth metropolitan area may also pay the Metropolitan Region Improvement Tax",
    "Trustees assessed as if the land were their own; land held for different trusts is assessed separately",
    ["WA Department of Treasury and Finance", "https://www.wa.gov.au/organisation/department-of-treasury-and-finance/land-tax-assessment"],
  ],
  [
    "SA",
    "$936,000 (2026–27, site value)",
    "Trusts from $25,000",
    ["RevenueSA", "https://www.revenuesa.sa.gov.au/landtax/rates-and-thresholds"],
  ],
  [
    "ACT",
    "No tax-free threshold: applies to residential property that isn’t your principal place of residence",
    "Ask the ACT Revenue Office about trusts and companies; foreign owners pay a surcharge",
    ["ACT Revenue Office", "https://revenue.act.gov.au/land-tax"],
  ],
];

const withSource = (rows: StateRow[]) =>
  rows.map(([state, a, b, [name, href]]) => [
    state,
    a,
    b,
    <ExternalLink key={href} href={href}>
      {name}
    </ExternalLink>,
  ]);

const FAQS: [string, string][] = [
  [
    "Can I buy an investment property in another state?",
    "Generally yes. Australian citizens, permanent residents and New Zealand citizens who hold or are eligible for a Special Category Visa don’t usually need FIRB approval, and you follow the rules of the property’s state for the contract, cooling-off, stamp duty and land tax. Foreign persons, including temporary residents, generally need FIRB approval and are currently barred from buying established homes, with limited exceptions.",
  ],
  [
    "Is it a good idea to buy property interstate in 2026?",
    "It can be, if the property fits your budget, cash flow and hold period better than what you can buy locally. In Cotality’s October 2026 data, Perth and Brisbane were still up over the year but fell 5.7% and 6.1% over three months, and every capital fell over the quarter, so judge the specific property and suburb rather than last year’s growth.",
  ],
  [
    "How do you buy property interstate without seeing it?",
    "Use comparable sales and rent evidence, a video walk-through arranged with the selling agent, an independent building and pest inspection on the property you choose, and strata records where relevant. Only commit once a solicitor or conveyancer in that state has reviewed the contract.",
  ],
  [
    "Do I pay stamp duty in the state I live in or where the property is?",
    "Where the property is. Transfer duty is paid to that state’s revenue office at its rates, and the amount on the same price can differ by tens of thousands of dollars between states.",
  ],
  [
    "Do I pay land tax in more than one state?",
    "Each state taxes only the land you own in that state, based on its taxable land value rather than the price you paid. Thresholds differ, for example $1,075,000 in NSW for 2026, $600,000 for individuals in Queensland and $50,000 in Victoria. Trusts and companies can be treated differently.",
  ],
  [
    "Which solicitor or conveyancer should I use when buying interstate?",
    "One who practises in the state where the property is. In Queensland, the Government recommends appointing a solicitor who specialises in property or conveyancing.",
  ],
  [
    "Is there a cooling-off period when buying interstate?",
    "It depends on the state. NSW gives 5 business days (10 for off-the-plan), Queensland and the ACT 5, Victoria 3 clear business days, and South Australia 2 clear business days counted from the later of the contract and the Form 1. Western Australia has none by law. There’s generally no cooling-off at auction, and other exceptions apply, for example in Victoria for purchases around an auction or by a company; see the table above.",
  ],
  [
    "When should the building and pest inspection be done?",
    "On the property you decide to buy, before you’re committed. For a private sale that usually means before exchange or within a building and pest condition in the contract; for an auction, before auction day, because there’s no cooling-off.",
  ],
  [
    "How do I find a good property manager in another state?",
    "Ask at least two local agencies about their vacancy rate, days to lease, fees, inspection frequency and how they approve repairs. Read their management agreement before settlement, and check reviews from landlords as well as tenants.",
  ],
  [
    "Can I use equity in my home to buy interstate?",
    "Many lenders let you borrow against equity in an existing property, but the loan structure matters, including whether properties are cross-secured. Speak to a mortgage broker or lender before you start looking.",
  ],
];

export default function InterstateBuyersAgentPage() {
  requirePreview();

  return (
    <div className="text-white">
      <ServiceJsonLd
        path={PATH}
        crumb="Interstate Buyer’s Agent"
        serviceType="Interstate buyer's agent"
        areaServed={{ "@type": "Country", name: "Australia" }}
      />

      <PageHero
        crumb="Interstate Buyer’s Agent"
        title="Interstate Buyer’s Agent: Buying Investment Property in Another State"
      >
        <Para className="mt-6">
          VRS Realinvest helps busy professionals and families buy investment
          property in another state, when a different market fits their goals
          better than the one they live in. We’re based in Jordan Springs, near
          Penrith in Sydney’s west, and we buy across Australia. We set your
          brief, research the market, assess properties and negotiate, with the
          appropriate local professionals, including a solicitor or conveyancer
          in the property’s state, supporting each purchase. It’s part of how
          we help people work towards our mission, Create Real Freedom™.
        </Para>
        <Para className="mt-4">
          Start with a One-on-One Strategy Session to talk through which markets
          fit your plan.
        </Para>
        <CtaRow />
        <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-gray-500">
          VRS Realinvest Pty Ltd · ABN 21 688 632 760
        </p>
      </PageHero>

      <PageBody>
        <Section title="Who we help">
          <BulletList
            items={[
              "Busy professionals and families whose budget or rental goals fit another state better than their own",
              "Investors who want to spread their holdings across more than one market",
              "First-time investors who want to understand why a market made the list, not just be handed a property",
              "Sydney-based investors comparing Sydney with other capitals and regional centres",
            ]}
          />
          <Para>
            Buying your first home in another state? You’re welcome to enquire,
            and we’ll tell you whether our service suits what you need.
          </Para>
        </Section>

        <Section title="How we buy interstate when you can’t be there">
          <Para>
            Most of our clients work full-time and can’t travel for every
            inspection, so the process is built around evidence you can see from
            home.
          </Para>
          <LeadList
            ordered
            items={[
              ["Set the brief.", "Your goals, budget, finance position and how long you plan to hold. If you haven’t chosen a state, this is where we compare markets against your numbers."],
              ["Research the market and suburb.", "Rental demand, vacancy, affordability, new supply, comparable sales and ownership costs, with the source and date for the figures we use."],
              ["Shortlist properties.", "Each with comparable sales, rent evidence and the reasons it made the list."],
              ["Check the property you choose.", "Before you commit, we help you arrange an independent building and pest inspection on the property you decide to buy, timed to suit the contract conditions or, for an auction, before auction day. For strata properties we help you get the strata or body corporate records."],
              ["Coordinate the contract review.", "Your solicitor or conveyancer in the property’s state reviews the contract and advises you on it. We coordinate the process and flag the clauses that work differently from your home state."],
              ["Negotiate.", "We negotiate on price and terms within the limit you set in writing."],
              ["Settle and hand over.", "In NSW, your solicitor or conveyancer completes settlement electronically on your behalf; in other states, ask them how settlement works there. We help you choose a local property manager before settlement."],
            ]}
          />
          <Para>
            These checks reduce risk but can’t remove it. Data dates, rents move
            and an inspection can miss a hidden defect. We tell you what we
            couldn’t verify, so you decide with the evidence in front of you.
          </Para>
        </Section>

        <Section title="What changes when you buy in another state">
          <Para>
            You follow the rules of the state where the property is, not the
            state where you live. That changes your cooling-off rights, the
            seller’s disclosure documents, stamp duty, land tax and who acts on
            your conveyance.
          </Para>

          <h3 className={`mt-10 ${H3}`}>Cooling-off on a private residential sale</h3>
          <DataTable
            id="cooling-off"
            caption="Cooling-off on a private residential sale, by state"
            minWidth="min-w-[46rem]"
            head={["State", "Cooling-off period", "Doesn’t apply when", "Official source"]}
            rows={withSource(COOLING_OFF)}
          />
          <Para>
            For Tasmania and the Northern Territory, check the rules with your
            local solicitor or conveyancer before you sign.
          </Para>

          <h3 className={`mt-10 ${H3}`}>Land tax for an investment property</h3>
          <Para>
            Most states and the ACT charge land tax on the total taxable value
            of the land you own there; the Northern Territory has no land tax,
            and Tasmania isn’t covered below. It’s based on the land or site
            value set by the state valuer, not the price you paid, and owning
            through a trust or company can change the threshold and rate.
          </Para>
          <DataTable
            id="land-tax"
            caption="Land tax for an investment property, by state"
            minWidth="min-w-[46rem]"
            head={[
              "State",
              "Individuals start paying at (total taxable land value)",
              "Trusts and companies",
              "Official source",
            ]}
            rows={withSource(LAND_TAX)}
          />
          <Para>
            Each state assesses only the land in that state, so a portfolio
            across two states is measured against two thresholds, not one. Your
            accountant can tell you how land tax applies to your ownership
            structure.
          </Para>

          <h3 className={`mt-10 ${H3}`}>Other things that catch interstate buyers</h3>
          <Para>
            <strong className="font-medium text-white">
              Use a solicitor or conveyancer who practises in the property’s
              state.
            </strong>{" "}
            In Queensland, the Government recommends appointing a solicitor who
            specialises in property or conveyancing. Ask before you sign
            anything.
          </Para>
          <Para>
            <strong className="font-medium text-white">Seller documents differ.</strong>{" "}
            Victoria uses a Section 32 vendor statement, South Australia a Form
            1, and Queensland a Form 2 seller disclosure statement since 1
            August 2025. Queensland’s Form 2 doesn’t have to cover the
            building’s structural soundness or its flooding history, so you
            still need a building and pest inspection and your own flood check.
          </Para>
          <Para>
            <strong className="font-medium text-white">
              In WA, read the finance clause before you sign.
            </strong>{" "}
            With no statutory cooling-off period, a properly completed finance
            condition matters more.
          </Para>
          <Para>
            <strong className="font-medium text-white">Stamp duty</strong> is
            paid to the revenue office of the state where the property is, at
            that state’s rates, and it can differ by tens of thousands of dollars
            between states on the same price. Get a quote for the actual state
            and price before you set a budget.
          </Para>
        </Section>

        <Section title="Who can buy, and the costs to budget for">
          <Para>
            Australian citizens, permanent residents and New Zealand citizens
            who hold or are eligible for a Special Category Visa generally don’t
            need Foreign Investment Review Board (FIRB) approval to buy
            residential property in any state or territory. Foreign persons,
            including temporary residents, generally need FIRB approval before
            buying residential land, and, under current Government policy, are
            generally banned from buying established homes from 1 April 2025 to
            30 June 2029, with limited exceptions. States also charge foreign
            purchaser surcharges, such as NSW’s 9% surcharge purchaser duty.
          </Para>
          <Para>
            Budget for stamp duty in the property’s state, conveyancing, the
            building and pest inspection, lender fees and valuation, landlord
            insurance, council and water rates, strata levies where relevant,
            property management and letting fees, and land tax once your
            holdings in that state pass its threshold. Our guide to{" "}
            <Link
              href="/blog/rental-yield-australia-2026-gross-net-and-cash-flow"
              className={TEXT_LINK}
            >
              rental yield, net yield and cash flow
            </Link>{" "}
            shows how these costs change the numbers.
          </Para>
        </Section>

        <Section title="What the market figures say">
          <Para>
            <ExternalLink href={COTALITY_HVI}>Cotality’s Home Value Index</ExternalLink>{" "}
            (published 2 November 2026, October data) shows values over the
            year to October rising 9.7% in Darwin, 5.5% in Hobart, 3.9% in
            Perth, 3.7% in Adelaide and 0.4% in Brisbane, while Sydney fell
            9.4%, Melbourne 7.6% and Canberra 3.7%. Regional Australia rose 3.4%
            as the combined capitals fell 4.8%.
          </Para>
          <Para>
            The three months to October in the same release look different:
            every capital fell, led by Brisbane (6.1%) and Perth (5.7%), and
            even Darwin slipped 0.2%. Last year’s growth isn’t this year’s
            guarantee, so we judge each property and suburb on its own evidence.
            Gross rental yields ranged from about 3.5% in Sydney to 6.4% in
            Darwin (same release).
          </Para>
          <Para>
            For a fuller comparison, read{" "}
            <Link
              href="/blog/regional-or-capital-city-property-what-to-compare-in-2026"
              className={TEXT_LINK}
            >
              regional or capital city property: what to compare in 2026
            </Link>
            .
          </Para>
        </Section>

        <Section title="When buying interstate makes sense, and when it doesn’t">
          <Para>
            It can make sense when your budget buys a better property in another
            market than it does at home, when you want to spread risk across
            more than one state, or when a location’s rental demand and
            employment hold up in the data. It makes less sense when the main
            reason is a growth chart, or when you can’t carry the property
            through a vacancy or a large repair. We’ll tell you which side of
            that line your plan sits on, and sometimes the answer is to buy
            closer to home.
          </Para>
          <Para>
            For the full service, read how our{" "}
            <Link href="/investment-property-buyers-agent" className={TEXT_LINK}>
              investment property buyer’s agent
            </Link>{" "}
            service works.
          </Para>
        </Section>

        <Faqs items={FAQS} />

        <ClosingBlock lead="Thinking about buying in another state?">
          Schedule a One-on-One Strategy Session. Tell us your goals, budget and
          the markets you’re weighing, and we’ll explain how we’d compare them
          and whether we’re a good fit. First home buyers are welcome to
          enquire.
        </ClosingBlock>

        <Disclaimer>
          General information only. This page is not financial, legal, tax or
          credit advice. Rules and thresholds change; check them with the
          relevant state authority and your solicitor, conveyancer or accountant
          before you act. Figures and rules current as at 2 November 2026.
        </Disclaimer>
      </PageBody>
    </div>
  );
}
