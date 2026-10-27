import type { Metadata } from "next";
import StrategySessionForm, {
  BookTimeNow,
} from "@/components/sections/StrategySessionForm";

// Copy: Page Copy v2 §3. The items marked [Confirm – Sudhesh] there (session
// length, who runs it, session format, the Google rating and buyer-only
// representation) stay off the page until he confirms them.
const TITLE = "Free One-on-One Property Investment Session | VRS Realinvest";
const DESCRIPTION =
  "Book a free One-on-One Session to clarify your investment goals, budget and buying plan before you choose a property. Education, not financial advice.";

export const metadata: Metadata = {
  // The v2 title already ends with the brand, so the root layout's
  // "%s | VRS Real Invest" template must not add it again.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/strategy-session" },
  // Its own social preview; without this it inherited the homepage's.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.vrsrealinvest.com.au/strategy-session",
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },
};

const COVERED = [
  "Your goals: income, long-term growth, diversification, or a first step into investing",
  "Your budget range and how comfortable you are holding the property",
  "Timing, and how involved you want to be",
  "Locations you’re considering, and how we’d compare them",
  "How our buyer’s agent service works, what it includes, and what we’d need from you",
];

const QUESTIONS = [
  [
    "What is the property for?",
    "Rental income, long-term growth or a balance of both. Your answer changes which markets and property types make sense.",
  ],
  [
    "What can you comfortably hold?",
    "Count strata, rates, insurance, management, maintenance, vacancy and loan interest, and test how a rate rise or an empty month would feel. Your broker can confirm your borrowing capacity.",
  ],
  [
    "How long will you hold it, and how might you sell?",
    "A market with few buyers for that type of property can be slow to sell in.",
  ],
  [
    "How will you compare locations?",
    "Look at rental demand, vacancy, affordability, new supply, ownership costs and comparable sales, using dated data rather than headlines or past growth alone.",
  ],
  [
    "Who advises on what?",
    "Your broker advises on lending, your accountant on tax and ownership structure, a licensed financial adviser on whether investing suits you, and a conveyancer on the contract.",
  ],
];

const BODY = "text-sm md:text-base leading-relaxed tracking-wide text-gray-400";
const H2 = "text-2xl md:text-3xl font-medium tracking-[-0.01em] text-white";

export default function StrategySessionPage() {
  return (
    <div className="text-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(231,200,156,0.08),transparent_60%)]" />

        <div className="relative mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[1fr_16rem] md:items-end">
          <div>
            <div className="mb-5 h-[2px] w-12 bg-[var(--primary-gold)]" />

            <h1 className="text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              Book a Free One-on-One Session
            </h1>

            <p className={`mt-6 max-w-2xl ${BODY}`}>
              Before you look at a single listing, it helps to be clear on what
              you want an investment property to do for you. In a free
              One-on-One Session, we talk through your goals, budget, timing and
              preferred locations, and explain how we would approach the search.
              You’ll leave with a clearer buying plan, and you’ll know whether
              our buyer’s agent service is a good fit. There’s no obligation and
              no pressure. First home buyers are welcome to book too.
            </p>
          </div>

          {/* Beside the intro (v2): a shortcut for visitors who are ready. */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 p-6 text-center backdrop-blur-sm">
            <p className="text-sm tracking-wide text-gray-300">Ready to book?</p>
            <BookTimeNow className="mt-4 inline-block rounded-lg bg-[var(--primary-gold)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#221F1F] transition hover:opacity-90" />
          </div>
        </div>
      </section>

      {/* Same left edge as the hero; the text column stays narrow to read. */}
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <div className="max-w-3xl space-y-14">
          {/* ================= WHAT WE'LL COVER ================= */}
          <section>
            <h2 className={H2}>What we’ll cover</h2>
            <ul className={`mt-5 list-disc space-y-2 pl-5 marker:text-[var(--primary-gold)] ${BODY}`}>
              {COVERED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* ================= FIVE QUESTIONS ================= */}
          <section>
            <h2 className={H2}>
              Property investment strategy: five questions to answer before you
              buy
            </h2>
            <ol className={`mt-5 list-decimal space-y-4 pl-5 marker:text-[var(--primary-gold)] ${BODY}`}>
              {QUESTIONS.map(([question, answer]) => (
                <li key={question}>
                  <span className="font-medium text-white">{question}</span>{" "}
                  {answer}
                </li>
              ))}
            </ol>
          </section>

          {/* ================= WHAT IT ISN'T ================= */}
          <section>
            <h2 className={H2}>What a One-on-One Session isn’t</h2>
            <p className={`mt-5 ${BODY}`}>
              It isn’t financial, tax, lending or SMSF advice, and we won’t tell
              you how to structure your finances. Those questions belong with your
              licensed adviser, accountant or broker, and we’re happy to work
              alongside them.
            </p>
          </section>

          {/* ================= BOOKING STEP ================= */}
          {/* Every booking button on the site links here (lib/links
              BOOKING_URL). scroll-mt clears the fixed navbar on the jump. */}
          <section
            id="book"
            className="scroll-mt-24 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 p-6 backdrop-blur-sm md:p-10"
          >
            <h2 className={H2}>Book your free One-on-One Session</h2>

            <StrategySessionForm />

            <p className="mt-8 text-center text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Licence no. 20496430
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
