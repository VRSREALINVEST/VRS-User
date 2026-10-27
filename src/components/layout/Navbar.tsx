"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/app/logo/4.png";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BOOKING_URL } from "@/lib/links";

// The logo already links home, so the menu opens with the service page
// (client review, 26 Oct). Seven items plus the booking button.
const navLinks = [
  { name: "Buyer’s Agent", href: "/investment-property-buyers-agent" },
  { name: "Properties", href: "/properties" },
  { name: "Webinar", href: "/webinar" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Client Review", href: "/review" },
  { name: "Contact", href: "/contact" },
];

const BOOKING_BUTTON =
  "rounded-md bg-[var(--primary-gold)] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#221F1F] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary-gold)]";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--card-border)] shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      {/* GOLD GRADIENT LINE */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)]/50 to-transparent opacity-70" />

      <div className="w-full pl-4 pr-6 lg:pl-8 lg:pr-12 py-3 flex items-center justify-between gap-6">
        {/* LOGO */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={logo}
            alt="VRS RealInvest"
            className="h-10 w-auto object-contain transition duration-300 hover:opacity-90"
            priority
          />
        </Link>

        <div className="flex items-center gap-5 xl:gap-8 2xl:gap-12">
          {/* DESKTOP: the seven links plus the booking button need about
              1,230px, so the inline menu starts at xl (the menu button covers
              narrower screens). */}
          <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative group whitespace-nowrap font-body text-[11px] tracking-[0.22em] uppercase transition-all duration-300 ${
                    isActive
                      ? "text-[var(--primary-gold)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {/* TEXT */}
                  <span className="relative z-10">{link.name}</span>

                  {/* PREMIUM UNDERLINE */}
                  <span
                    className={`absolute left-0 -bottom-2 h-[1.5px] bg-gradient-to-r from-[var(--primary-gold)] via-[var(--primary-gold)]/70 to-transparent transition-all duration-500 ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />

                  {/* HOVER GLOW LINE */}
                  <span className="absolute left-0 bottom-0 w-0 h-[6px] bg-[var(--primary-gold)]/10 blur-md transition-all duration-500 group-hover:w-full"></span>
                </Link>
              );
            })}
          </nav>

          {/* BOOKING: in the bar from md; phones get it in the menu. */}
          <Link
            href={BOOKING_URL}
            className={`hidden md:inline-block whitespace-nowrap ${BOOKING_BUTTON}`}
          >
            Schedule a One-on-One Session
          </Link>

          {/* MOBILE BUTTON */}
          <div className="xl:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-white/80 hover:text-[var(--primary-gold)] transition"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU. Links close it themselves: a link to the current page
          (or to /strategy-session#book while on it) doesn't change pathname. */}
      {isOpen && (
        <div className="xl:hidden bg-[var(--background)]/95 backdrop-blur-xl border-t border-[var(--card-border)]">
          <div className="flex flex-col px-6 py-5 space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-[var(--primary-gold)] text-sm tracking-wide transition"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href={BOOKING_URL}
              onClick={() => setIsOpen(false)}
              className={`md:hidden text-center ${BOOKING_BUTTON}`}
            >
              Schedule a One-on-One Session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
