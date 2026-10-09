import { MessageCircle } from "lucide-react";

// Site-wide floating WhatsApp button, mounted once in app/(public)/layout.tsx.
// A plain server-rendered link (no client JS) that opens the chat directly.
// WebinarCtaShell positions the webinar CTA 12px above it, so keep the
// bottom-6 / h-14 footprint in sync with that offset.

// wa.me takes the number as country code + digits only.
const WHATSAPP_URL = "https://wa.me/61412864050";

export default function FloatingIcons() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with VRS RealInvest on WhatsApp (opens in a new tab)"
      title="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full
      bg-[var(--primary-gold)] text-[#221F1F]
      shadow-[0_12px_30px_rgba(231,200,156,0.35)]
      focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary-gold)]"
    >
      <MessageCircle size={18} aria-hidden="true" />
    </a>
  );
}
