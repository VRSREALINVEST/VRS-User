import { ArrowRight, Video } from "lucide-react";
import { FREE_WEBINAR_URL } from "@/lib/links";

// Site-wide floating webinar CTA, mounted once in app/(public)/layout.tsx.
//
// Sits 12px above the chat button in FloatingIcons (fixed bottom-6 right-6,
// h-14): 1.5rem + 3.5rem + 0.75rem = 5.75rem. z-40 keeps it over page
// content but under the navbar/mobile menu and page modals (z-50), the chat
// widget and its panel (z-[999]), the enquiry popup and the page loader.
//
// Server component: a plain link plus CSS, no client JS. The entrance and
// ring pulse live in globals.css (.webinar-cta); the cta-card: variant that
// switches pill -> card is defined there too.
export default function WebinarCta() {
  return (
    <a
      href={FREE_WEBINAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join Free Webinar: want to connect 1-to-1 with VRS RealInvest? (opens in a new tab)"
      className="webinar-cta group fixed right-6 bottom-[calc(5.75rem_+_env(safe-area-inset-bottom))] z-40 rounded-full
      bg-[var(--primary-gold)] text-[#221F1F]
      shadow-[0_12px_30px_rgba(0,0,0,0.55)]
      transition-transform duration-300 motion-safe:hover:-translate-y-0.5
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            Free Webinar
          </span>
          <span className="flex items-center gap-1 text-[11px] font-medium">
            Connect 1-to-1
            <ArrowRight size={12} aria-hidden="true" />
          </span>
        </span>
      </span>

      {/* FULL CARD — desktop */}
      <span className="hidden w-[17rem] p-5 cta-card:block">
        <span className="flex items-start gap-3.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--primary-gold)]/40 bg-[var(--primary-gold)]/10 text-[var(--primary-gold)]">
            <Video size={20} aria-hidden="true" />
          </span>

          <span className="block">
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--primary-gold)]">
              Free Webinar
            </span>
            {/* nowrap stops "1-to-1" breaking at its hyphens; lining-nums
                because Cormorant's default old-style 1 reads as "ı". */}
            <span className="mt-1 block font-[family-name:var(--font-heading)] text-[1.4rem] font-medium leading-[1.15] text-white lining-nums">
              Want to <span className="whitespace-nowrap">Connect 1-to-1?</span>
            </span>
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
  );
}
