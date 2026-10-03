import { ArrowRight, Video } from "lucide-react";
import { FREE_WEBINAR_URL } from "@/lib/links";
import WebinarCtaShell from "./WebinarCtaShell";

// Site-wide floating webinar CTA, mounted once in app/(public)/layout.tsx.
//
// The link is a server component (no client JS). WebinarCtaShell is the only
// client code: position/z-index, the close (×) button and its fade-out. The
// entrance and ring pulse live in globals.css (.webinar-cta); the cta-card:
// variant that switches pill -> card is defined there too.
export default function WebinarCta() {
  return (
    <WebinarCtaShell>
      <a
        href={FREE_WEBINAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join Free Webinar with VRS RealInvest (opens in a new tab)"
        className="group relative block rounded-full
        bg-[var(--primary-gold)] text-[#221F1F]
        shadow-[0_12px_30px_rgba(0,0,0,0.55)]
        focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary-gold)]
        cta-card:rounded-2xl cta-card:border cta-card:border-[var(--primary-gold)]/50 cta-card:bg-[var(--background)]/95
        cta-card:shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(231,200,156,0.18)]"
      >
        <span
          aria-hidden="true"
          className="webinar-cta-ring pointer-events-none absolute inset-0 rounded-[inherit]"
        />

        {/* COMPACT PILL — phones, tablets, short windows */}
        <span className="flex items-center gap-3 py-2 pl-2 pr-5 cta-card:hidden">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#221F1F] text-[var(--primary-gold)]">
            <Video size={16} aria-hidden="true" />
          </span>

          <span className="flex flex-col text-left leading-tight">
            <span className="flex items-center gap-1 text-[11px] font-medium">
              Free Webinar
              <ArrowRight size={12} aria-hidden="true" />
            </span>
          </span>
        </span>

        {/* FULL CARD — desktop */}
        <span className="hidden w-[17rem] p-5 cta-card:block">
          <span className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--primary-gold)]/40 bg-[var(--primary-gold)]/10 text-[var(--primary-gold)]">
              <Video size={20} aria-hidden="true" />
            </span>

            <span className="block font-[family-name:var(--font-heading)] text-[1.4rem] font-medium leading-[1.15] text-white">
              Free Webinar
            </span>
          </span>

          <span className="mt-3 block text-[11px] uppercase tracking-[0.2em] text-gray-300">
            Learn • Ask • Connect
          </span>

          <span className="mt-4 flex items-center justify-center gap-2 rounded-md bg-[var(--primary-gold)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#221F1F]">
            Join Free Webinar
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
            />
          </span>
        </span>
      </a>
    </WebinarCtaShell>
  );
}
