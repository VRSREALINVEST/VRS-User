import Link from "next/link";
import WebinarSection from "@/components/sections/WebinarSection";
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/links";

const TEXT_LINK =
  "text-[var(--primary-gold)] underline underline-offset-4 transition hover:opacity-80";

export default function WebinarPage() {
  return (
    <>
      {/* PAGE CONTENT (a div: the (public) layout already provides <main>) */}
      <div className="min-h-screen text-white flex flex-col">
        <div className="flex-1 pt-14 pb-10">
          <WebinarSection />

          {/* ================= READY FOR HELP BUYING ================= */}
          {/* Page Copy v2 §5. "What attendees say" waits for webinar-labelled
              testimonials, and the 10 factors guide for its live page. */}
          <section className="max-w-4xl mx-auto px-6 py-16 text-center">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mb-5 opacity-80"></div>
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-[-0.01em]">
              Ready for help buying?
            </h2>
            <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-sm md:text-base leading-relaxed tracking-wide">
              If you’d like help researching and buying an investment property,{" "}
              <Link href="/investment-property-buyers-agent" className={TEXT_LINK}>
                see how our buyer’s agent service works
              </Link>
              ,{" "}
              <Link href={BOOKING_URL} className={TEXT_LINK}>
                schedule a One-on-One Session
              </Link>
              , or{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={TEXT_LINK}
              >
                message us on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}