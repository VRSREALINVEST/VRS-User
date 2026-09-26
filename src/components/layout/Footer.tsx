import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/logo/4.png";

export default function Footer() {
  // Keeps footer content clear of the fixed webinar CTA + chat (bottom-right,
  // see components/ui/WebinarCta.tsx) once the page is scrolled to the end.
  // - Pill (default): pb-40 lifts everything above the pill/chat stack (~144px).
  // - Card (cta-card:): no extra height; instead the content stays out of the
  //   card's column, 322px from the right edge (24 offset + 274 card + 24).
  //   With the max-w-6xl (1152px) container centred, that needs
  //   874px - 50vw of extra right padding: 298px max, 0 from ~1748px wide.
  return (
   <footer className="relative bg-[var(--background)] text-gray-400 pt-10 pb-40 cta-card:pb-4 overflow-hidden font-body cta-card:[--cta-gutter:clamp(0rem,54.625rem_-_50vw,18.625rem)]">
  {/* TOP LINE */}
  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)]/50 to-transparent"></div>

  <div className="max-w-6xl mx-auto px-6 cta-card:pr-[calc(1.5rem+var(--cta-gutter))] grid md:grid-cols-3 gap-8 items-start">

    {/* COLUMN 1 */}
    <div className="space-y-3">
      <Image
        src={logo}
        alt="VRS RealInvest Logo"
        width={85}
        height={28}
        className="object-contain"
      />

      <p className="text-[11px] leading-relaxed text-gray-400 max-w-xs tracking-wide">
        Trusted real estate investment partner across Australia.
      </p>

      <div className="flex gap-2 pt-1">
        {[
          { Icon: Facebook, label: "Facebook" },
          { Icon: Instagram, label: "Instagram" },
          { Icon: Linkedin, label: "LinkedIn" },
        ].map(({ Icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="w-6 h-6 bg-white/5 border border-[var(--card-border)] rounded-full flex items-center justify-center hover:bg-[var(--primary-gold)] hover:text-[#221F1F] transition"
          >
            <Icon size={11} />
          </a>
        ))}
      </div>
    </div>

    {/* COLUMN 2 */}
    <div className="space-y-3">
      <h3 className="text-white font-heading text-xs font-medium tracking-wide uppercase">
        Quick Links
      </h3>

      <ul className="space-y-1.5 text-[11px] tracking-wide">
        <li><Link href="/" className="hover:text-[var(--primary-gold)] transition-colors">Home</Link></li>
        <li><Link href="/properties" className="hover:text-[var(--primary-gold)] transition-colors">Properties</Link></li>
        <li><Link href="/blog" className="hover:text-[var(--primary-gold)] transition-colors">Blog</Link></li>
        <li><Link href="/contact" className="hover:text-[var(--primary-gold)] transition-colors">Contact</Link></li>
      </ul>
    </div>

    {/* COLUMN 3 */}
    <div className="space-y-3">
      <h3 className="text-white font-heading text-xs font-medium tracking-wide uppercase">
        Contact
      </h3>

      <a href="tel:+61412864050" className="flex items-center gap-2 text-[11px] hover:text-[var(--primary-gold)] transition-colors">
        <Phone size={12} className="shrink-0 text-[var(--primary-gold)]" />
        +61 412 864 050
      </a>

      <a href="mailto:sudhesh@vrsrealinvest.com.au" className="flex items-center gap-2 text-[11px] hover:text-[var(--primary-gold)] transition-colors">
        <Mail size={12} className="shrink-0 text-[var(--primary-gold)]" />
        sudhesh@vrsrealinvest.com.au
      </a>

      <div className="flex items-start gap-2 text-[11px]">
        <MapPin size={12} className="shrink-0 text-[var(--primary-gold)]" />
        Australia
      </div>
    </div>
  </div>

  {/* BOTTOM */}
  <div className="border-t border-[var(--card-border)] mt-8 pt-3 max-w-6xl mx-auto px-6 cta-card:pr-[calc(1.5rem+var(--cta-gutter))] flex flex-col md:flex-row justify-between items-center gap-1.5 text-[10px] tracking-wide">
    <p className="text-gray-500">
      © {new Date().getFullYear()} VRS RealInvest
    </p>

    <div className="flex gap-4">
      <Link href="/privacy-policy" className="hover:text-[var(--primary-gold)] transition-colors">Privacy</Link>
      <Link href="/terms-and-conditions" className="hover:text-[var(--primary-gold)] transition-colors">Terms</Link>
    </div>
  </div>
</footer>
  );
}