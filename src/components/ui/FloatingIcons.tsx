import Image from "next/image";
import ConsultationCta from "./ConsultationCta";

// Site-wide floating actions, mounted once in app/(public)/layout.tsx: the
// WhatsApp button on top, the consultation CTA below it, in one fixed
// bottom-right stack. Footer.tsx clears the stack's footprint (about 152px
// tall, 216px wide), so keep it in sync with the sizes here.
//
// z-40 keeps the stack over page content but under the navbar/mobile menu and
// page modals (z-50). The container never takes clicks itself; each child opts
// back in, so the gap between them can't block the page.

// wa.me takes the number as country code + digits only.
const WHATSAPP_URL = "https://wa.me/61412864050";

export default function FloatingIcons() {
  return (
    <div className="pointer-events-none fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-40 flex flex-col items-end gap-5">
      {/* The ring is a sibling of the link: the link clips its image
          (overflow-hidden), which would clip the ring too. */}
      <div className="pointer-events-auto relative h-14 w-14">
        <span
          aria-hidden="true"
          className="wa-ring pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/50"
        />

        {/* /whatsapp.png is a 1024px render with the logo sphere in its middle
            (about 385px wide, centred near 51.5% / 47.6%) on a grey backdrop.
            The image is scaled to 164px and offset so the sphere fills the
            56px circle; overflow-hidden rounds off the backdrop. */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with VRS RealInvest on WhatsApp (opens in a new tab)"
          title="Chat on WhatsApp"
          className="relative block h-14 w-14 overflow-hidden rounded-full
          bg-[var(--primary-gold)]
          shadow-[0_12px_30px_rgba(0,0,0,0.5)]
          transition-[transform,box-shadow] duration-300
          hover:shadow-[0_14px_34px_rgba(0,0,0,0.55),0_0_22px_rgba(37,211,102,0.35)] motion-safe:hover:scale-105
          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary-gold)]"
        >
          <Image
            src="/whatsapp.png"
            alt=""
            width={164}
            height={164}
            sizes="164px"
            className="pointer-events-none absolute left-[-56px] top-[-50px] max-w-none"
          />
        </a>
      </div>

      <ConsultationCta />
    </div>
  );
}
