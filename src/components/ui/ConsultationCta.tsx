import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { BOOKING_URL } from "@/lib/links";
import ConsultationCtaShell from "./ConsultationCtaShell";

// Floating booking CTA, rendered by FloatingIcons above the WhatsApp button.
//
// The link is a server component (no client JS). ConsultationCtaShell is the
// only client code: the close (×) button and its fade-out. The entrance and
// the periodic shine live in globals.css (.consultation-cta, .consultation-shine).
export default function ConsultationCta() {
  return (
    <ConsultationCtaShell>
      <Link
        href={BOOKING_URL}
        className="relative flex items-center gap-2.5 overflow-hidden rounded-full
        bg-[var(--primary-gold)] py-2 pl-2 pr-5 text-[#221F1F]
        shadow-[0_12px_30px_rgba(0,0,0,0.55)]
        transition-[background-color,box-shadow] duration-300
        hover:bg-[#f0dcbc] hover:shadow-[0_14px_34px_rgba(0,0,0,0.6),0_0_24px_rgba(231,200,156,0.35)]
        focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary-gold)]"
      >
        <span aria-hidden="true" className="consultation-shine" />

        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#221F1F] text-[var(--primary-gold)]">
          <CalendarCheck size={18} aria-hidden="true" />
        </span>

        {/* The site-wide label, shortened on phones where the pill would
            crowd the screen (allowed by the client's 26 Oct review). */}
        <span className="relative whitespace-nowrap text-[13px] font-semibold leading-tight tracking-wide">
          <span className="sm:hidden">Book</span>
          <span className="hidden sm:inline">Schedule</span> a One-on-One
          Session
        </span>
      </Link>
    </ConsultationCtaShell>
  );
}
