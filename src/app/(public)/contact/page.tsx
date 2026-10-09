"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone } from "lucide-react";
import PageLoader from "@/components/common/PageLoader";

// Mirrors the footer's contact details (components/layout/Footer.tsx).
const CONTACT_DETAILS = [
  {
    Icon: Phone,
    label: "Phone",
    value: "+61 412 864 050",
    href: "tel:+61412864050",
  },
  {
    Icon: Mail,
    label: "Email",
    // <wbr /> wraps the address after "@" on narrow phones (adds no character).
    value: <>sudhesh@<wbr />vrsrealinvest.com.au</>,
    href: "mailto:sudhesh@vrsrealinvest.com.au",
  },
];

export default function ContactPage() {
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  // PageLoader is a fixed full-screen overlay, so page content renders (and
  // server-renders) underneath it. With no embed left to wait on, it clears
  // on the same 1300ms timer as the About page.
  const [showLoader, setShowLoader] = useState(true);

  // ================= HEADER LINE =================
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    el.style.width = "0px";

    const timer = setTimeout(() => {
      el.style.transition = "width 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.width = "60px";
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  // ================= SCROLL ANIMATION =================
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // ================= LOADER EXIT =================
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ✅ Loader */}
      <PageLoader visible={showLoader} />

      <main className="pt-6  text-white min-h-screen relative overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          {/* GOLD GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(231,200,156,0.08),transparent_60%)]" />

          {/* GRID (optional) */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <section className="relative py-16">
          {/* HEADER */}
          <div className="text-center mb-14 px-6">
            <div
              ref={lineRef}
              className="h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mb-6"
              style={{ width: 0 }}
            />

            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--primary-gold)]/70 mb-3 font-light">
              Premium Property Investment
            </p>

            <h1 className="text-3xl md:text-5xl font-light tracking-[0.12em] mb-4">
              Get In Touch
            </h1>

            <p className="text-gray-500 text-xs tracking-[0.25em] uppercase">
              Let&apos;s begin the conversation
            </p>
          </div>

          {/* CONTACT DETAILS */}
          <div className="max-w-xl mx-auto px-4">
            <div
              ref={cardRef}
              className={`relative group transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                visible
                  ? "opacity-100 translate-y-0 scale-100 blur-0"
                  : "opacity-0 translate-y-16 scale-[0.96] blur-sm"
              }`}
            >
              {/* CORNERS */}
              {[
                "top-0 left-0 border-t border-l",
                "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l",
                "bottom-0 right-0 border-b border-r",
              ].map((pos) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-6 h-6 border-[var(--primary-gold)]/40 transition duration-500 ${
                    visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                />
              ))}

              {/* GLOW */}
              <div
                className={`absolute -inset-2 rounded-2xl bg-[var(--primary-gold)]/10 blur-2xl transition-all duration-1000 ${
                  visible ? "opacity-60" : "opacity-0"
                }`}
              />

              {/* CARD */}
              <div className="rounded-2xl overflow-hidden relative border border-[var(--card-border)] bg-[var(--card-bg)] divide-y divide-[var(--card-border)]">
                {CONTACT_DETAILS.map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    // Inset ring + rounded outer corners keep the focus
                    // outline fully inside the card's overflow-hidden clip.
                    className="flex items-center gap-4 px-6 py-6 md:px-8 text-white transition-colors hover:bg-white/[0.03] hover:text-[var(--primary-gold)] first:rounded-t-2xl last:rounded-b-2xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--primary-gold)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--primary-gold)]/40 bg-[var(--primary-gold)]/10 text-[var(--primary-gold)]">
                      <Icon size={20} aria-hidden="true" />
                    </span>

                    {/* min-w-0 + overflow-wrap let the long email wrap rather
                        than overflow on narrow (320px) screens. */}
                    <span className="min-w-0">
                      <span className="block text-[10px] tracking-[0.3em] uppercase text-[var(--primary-gold)]/70">
                        {label}
                      </span>
                      <span className="mt-1 block text-base md:text-lg tracking-wide [overflow-wrap:anywhere]">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* FOOT */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-[11px] tracking-[0.25em] uppercase">
                Your enquiry is handled with complete discretion
              </p>
              <div className="mt-2 w-16 h-[1px] mx-auto bg-[var(--primary-gold)]/30" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
