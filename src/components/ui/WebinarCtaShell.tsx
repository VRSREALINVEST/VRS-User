"use client";

import { useState } from "react";
import { X } from "lucide-react";

// Client half of WebinarCta: fixed position, the close (×) button and the
// fade-out. The link itself stays server-rendered and arrives as children.
//
// Closed is plain component state, never persisted: it lasts while moving
// between pages (the (public) layout stays mounted) and the CTA is open
// again on every load/refresh.
export default function WebinarCtaShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [closed, setClosed] = useState(false);

  return (
    // 12px above the chat button in FloatingIcons (fixed bottom-6 right-6,
    // h-14): 1.5rem + 3.5rem + 0.75rem = 5.75rem. z-40 keeps it over page
    // content but under the navbar/mobile menu and page modals (z-50), the
    // chat widget and its panel (z-[999]) and the loader.
    // Closing fades out, then display:none (allow-discrete) takes it out of
    // the tab order; browsers without discrete transitions just hide it.
    // The wrapper itself never takes clicks, so it can't block the page
    // while the CTA is still invisible (entrance delay) or fading out.
    <div
      className={`pointer-events-none fixed right-6 bottom-[calc(5.75rem_+_env(safe-area-inset-bottom))] z-40 origin-bottom-right transition-[opacity,scale,display] transition-discrete duration-200 motion-reduce:transition-none ${
        closed ? "hidden scale-95 opacity-0" : ""
      }`}
    >
      {/* .webinar-cta (globals.css) runs the entrance on this inner layer;
          its filled opacity/visibility would override the fade above. */}
      <div
        className={`webinar-cta relative transition-transform duration-300 motion-safe:hover:-translate-y-0.5 ${
          closed ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {children}

        {/* Sibling of the link, never inside it, so it can't trigger it.
            Pill: badge on the corner. Card: inside the top-right corner.
            before: pads the tap target (sides and below only, so on the
            pill it stays clear of the text and of the footer's 160px
            clearance above the pill) without growing the circle. */}
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Close free webinar"
          className="absolute -right-3.5 -top-3 flex h-7 w-7 items-center justify-center rounded-full
          border border-[var(--primary-gold)]/40 bg-[var(--background)] text-gray-300
          transition-[color] hover:text-[var(--primary-gold)]
          before:absolute before:-inset-1.5 before:top-0
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-gold)]
          cta-card:right-3 cta-card:top-3"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
