import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/logo/4.png";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  YOUTUBE_URL,
} from "@/lib/links";

export default function Footer() {
  // Keeps footer content clear of the fixed WhatsApp + consultation stack
  // (bottom-right, see components/ui/FloatingIcons.tsx) at the end of the page.
  // - Below lg: pb-40 lifts everything above the stack (~152px tall); the
  //   safe-area inset is added because the stack's offset includes it.
  // - lg+: no extra height; instead the content stays out of the stack's
  //   column, 347px from the right edge (24 offset + 299 wide + 24; the pill
  //   reads "Schedule a One-on-One Session" there). With the max-w-6xl
  //   (1152px) container centred, that needs 899px - 50vw of extra right
  //   padding: 323px max, 0 from 1798px wide.
  return (
   <footer className="relative bg-[var(--background)] text-gray-400 pt-10 pb-[calc(10rem+env(safe-area-inset-bottom))] lg:pb-4 overflow-hidden font-body lg:[--cta-gutter:clamp(0rem,56.1875rem_-_50vw,20.1875rem)]">
  {/* TOP LINE */}
  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)]/50 to-transparent"></div>

  <div className="max-w-6xl mx-auto px-6 lg:pr-[calc(1.5rem+var(--cta-gutter))] grid md:grid-cols-3 gap-8 items-start">

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
        Investment property buyer’s agent and property education,
        Australia-wide. Create Real Freedom™.
      </p>

      {/* Confirmed public business details (Dev Tasks §1). */}
      <p className="text-[11px] leading-relaxed text-gray-500 tracking-wide">
        VRS Realinvest Pty Ltd
        <br />
        Licence no. 20496430
        <br />
        ABN 21 688 632 760
      </p>

      <div className="flex gap-2 pt-1">
        {[
          { Icon: Facebook, href: FACEBOOK_URL, label: "VRS Realinvest on Facebook" },
          { Icon: Instagram, href: INSTAGRAM_URL, label: "VRS Realinvest on Instagram" },
          { Icon: Linkedin, href: LINKEDIN_URL, label: "Sudhesh K Valappil on LinkedIn" },
          { Icon: Youtube, href: YOUTUBE_URL, label: "VRS Realinvest on YouTube" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
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
        <li><Link href="/investment-property-buyers-agent" className="hover:text-[var(--primary-gold)] transition-colors">Investment Property Buyers Agent</Link></li>
        <li><Link href="/strategy-session" className="hover:text-[var(--primary-gold)] transition-colors">Strategy Session</Link></li>
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
  <div className="border-t border-[var(--card-border)] mt-8 pt-3 max-w-6xl mx-auto px-6 lg:pr-[calc(1.5rem+var(--cta-gutter))] flex flex-col md:flex-row justify-between items-center gap-1.5 text-[10px] tracking-wide">
    <p className="text-gray-500">
      © {new Date().getFullYear()} VRS Realinvest
    </p>

    <div className="flex gap-4">
      <Link href="/privacy-policy" className="hover:text-[var(--primary-gold)] transition-colors">Privacy</Link>
      <Link href="/terms-and-conditions" className="hover:text-[var(--primary-gold)] transition-colors">Terms</Link>
    </div>
  </div>
</footer>
  );
}