"use client";

import { useState } from "react";
import { X } from "lucide-react";

// Client half of ConsultationCta: the close (×) button and the fade-out. The
// link itself stays server-rendered and arrives as children. Position comes
// from the FloatingIcons container this sits in.
//
// Closed is plain component state, never persisted: it lasts while moving
// between pages (the (public) layout stays mounted) and the CTA is open
// again on every load/refresh. Closing leaves the WhatsApp button where it is
// in the corner, since the container shrinks to fit.
export default function ConsultationCtaShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [closed, setClosed] = useState(false);

  return (
    // Closing fades out, then display:none (allow-discrete) takes it out of
    // the tab order; browsers without discrete transitions just hide it.
    <div
      className={`origin-bottom-right transition-[opacity,scale,display] transition-discrete duration-200 motion-reduce:transition-none ${
        closed ? "hidden scale-95 opacity-0" : ""
      }`}
    >
      {/* .consultation-cta (globals.css) runs the entrance on this inner
          layer; it is backwards-filled, so the hover lift still applies. */}
      <div
        className={`consultation-cta relative transition-transform duration-300 motion-safe:hover:-translate-y-0.5 ${
          closed ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {children}

        {/* Sibling of the link, never inside it, so it can't trigger it.
            Badge on the pill's top-right corner. before: pads the tap target
            (sides and below only, so it stays clear of the text) without
            growing the circle. */}
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Close consultation button"
          className="absolute -right-3.5 -top-3 flex h-7 w-7 items-center justify-center rounded-full
          border border-[var(--primary-gold)]/40 bg-[var(--background)] text-gray-300
          transition-[color] hover:text-[var(--primary-gold)]
          before:absolute before:-inset-1.5 before:top-0
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-gold)]"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
