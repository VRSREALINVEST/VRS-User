"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Shield, Target, TrendingUp } from "lucide-react";
import { BOOKING_URL } from "@/lib/links";

export default function AboutSection() {
  return (
    <section className=" text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* IMAGE */}
        <div className="w-full flex justify-center md:justify-start">
          <Image
            src="https://tagmango.com/staticassets/-jpg-68-e1d436dafac6deeea15fa1a751be9c62.webp"
            alt="Sudhesh K Valappil - Founder of VRS realinvest"
            width={700}
            height={900}
            className="w-full max-w-md md:max-w-full h-auto rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] object-contain hover:scale-[1.02] transition duration-500 ease-out"
            priority
          />
        </div>

        {/* TEXT */}
        <div className="max-w-lg mx-auto md:mx-0 text-center md:text-left flex flex-col justify-center">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mb-6 opacity-80 mx-auto md:mx-0" />

          {/* Page Copy v2 §4: H1 and opening. Left out until Sudhesh confirms
              them: the $350K–$700K range and buyer-only representation. */}
          <h1 className=" text-4xl md:text-5xl font-medium leading-[1.1] tracking-[-0.015em]">
            About VRS Realinvest
          </h1>

          <p className=" text-gray-300 text-base md:text-lg leading-relaxed tracking-wide mt-6">
            <span className="text-[var(--primary-gold)] font-medium">
              VRS Realinvest
            </span>{" "}
            is a buyer’s agency and property education business. We help busy
            professionals and families research and buy investment properties
            across Australia.
          </p>

          <p className=" text-gray-300 text-base md:text-lg leading-relaxed tracking-wide mt-4">
            Founded by{" "}
            <span className="text-white font-medium">Sudhesh K Valappil</span>{" "}
            and based in Jordan Springs, NSW, near Penrith, we lead with
            education and evidence-based research. Our mission is Create Real
            Freedom™: helping people work towards long-term wealth and greater
            choice through informed property decisions.
          </p>

          <p className=" text-gray-400 leading-relaxed tracking-wide mt-4">
            We don’t promise growth or rental income. We show you the evidence
            behind each decision.
          </p>
        </div>
      </div>

      {/* ================= FACTS STRIP ================= */}
      {/* Page Copy v2 §4: the old counters stay off the page until each one is
          evidenced, so only the confirmed business details are shown. */}
      <div className="bg-[var(--card-bg)] py-12 border-y border-[var(--card-border)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Non-breaking spaces keep each number on one line. */}
        <ul className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-16">
          {[
            "Licence no. 20496430",
            "VRS Realinvest Pty Ltd · ABN 21 688 632 760",
          ].map((fact) => (
            <li
              key={fact}
              className=" text-base md:text-lg font-medium tracking-wide text-[var(--primary-gold)]"
            >
              {fact}
            </li>
          ))}
        </ul>
      </div>

      {/* ================= WHO WE HELP ================= */}
      <SectionWrapper title="Who We Help">
        <List
          items={[
            "Busy professionals (medical, IT, engineering, business owners)",
            "First-time investors who want guidance",
            "Home owners building a long-term portfolio",
            "Families seeking passive income and better lifestyle",
          ]}
        />
      </SectionWrapper>

      {/* ================= WHAT WE DO ================= */}
      <SectionWrapper title="What We Do">
        <List
          items={[
            "Strategy session based on your goals & borrowing capacity",
            "Suburb & property research using data and fundamentals",
            "Shortlisting only suitable opportunities",
            "Risk checks, rental demand & growth drivers analysis",
            "Negotiation & contract support",
            "Ongoing guidance for smarter future decisions",
          ]}
        />
      </SectionWrapper>

      {/* ================= OUR APPROACH ================= */}
      <SectionWrapper title="Our Approach: Simple, Practical, Lower-Risk Selection">
        <List
          items={[
            "Low-risk suburbs with strong owner-occupier demand",
            "Strong rental fundamentals & tight vacancy rates",
            "Growth backed by infrastructure & supply-demand data",
            "Strategy-matched properties — not hype-driven picks",
            "Every recommendation explained in plain English",
          ]}
        />
      </SectionWrapper>

      {/* ================= PROMISE ================= */}
      <SectionWrapper title="Our Promise: Trust, Transparency & No Pressure">
        <List
          items={[
            "Honest advice (even if that means telling you to wait)",
            "Clear communication & regular updates",
            "Professional documented processes",
            "Your goals always come first",
          ]}
        />
      </SectionWrapper>

      {/* ================= WHO WE ARE ================= */}
      <SectionWrapper title="Who We Are">
        <div className="text-center max-w-3xl mx-auto">
          <p className=" text-gray-300 leading-relaxed tracking-wide">
            VRS Realinvest is an Australian buyer’s agency and property
            education business led by Sudhesh K Valappil...
          </p>

          <p className=" text-gray-300 mt-4 leading-relaxed tracking-wide">
            We’re not selling properties — we represent you, the buyer...
          </p>
        </div>
      </SectionWrapper>

      {/* ================= MISSION ================= */}
      <SectionWrapper title="Our Mission">
        <p className=" text-gray-300 text-base md:text-lg leading-relaxed tracking-wide text-center">
          To help{" "}
          <span className="text-[var(--primary-gold)] font-semibold">
            10,000 busy professionals
          </span>{" "}
          grow long-term wealth...
        </p>
      </SectionWrapper>

      {/* ================= WHY CHOOSE US ================= */}
      {/* "10+ Years Experience" is off until Sudhesh confirms his verified
          experience (Page Copy v2 §4). */}
      <SectionWrapper title="Why Choose Us">
        <div className="grid md:grid-cols-3 gap-6">
          <Feature icon={<Shield />} title="Trusted & Verified">
            Transparent, compliant, and buyer-focused process.
          </Feature>
          <Feature icon={<Target />} title="Personalised Strategy">
            Tailored to your age, goals, and financial position.
          </Feature>
          <Feature icon={<TrendingUp />} title="Long-term focus">
            Secure investment-grade assets with long-term performance.
          </Feature>
        </div>
      </SectionWrapper>

      {/* ================= CORE VALUES ================= */}
      <SectionWrapper title="Our Core Values">
        <List
          items={[
            "Excellence – High standards in research & service",
            "Integrity – Doing what’s right always",
            "Growth-Focused – Building long-term wealth",
            "Professionalism – Clear process & communication",
          ]}
        />
      </SectionWrapper>

      {/* ================= PROCESS ================= */}
      <SectionWrapper title="Our Investment Approach">
        <div className="space-y-6">
          {[
            "Understanding Your Requirements",
            "Formalising the Agreement",
            "Budget Confirmation & Loan Pre-Approval",
            "Research & Due Diligence",
            "Suburb Presentation",
            "Property Sourcing",
            "Negotiation & Contract Review",
            "Building & Pest Inspection",
            "Contingency Management",
            "Settlement & Property Handover",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="bg-[var(--primary-gold)] text-[#221F1F]  font-semibold w-9 h-9 flex items-center justify-center rounded-full">
                {i + 1}
              </div>
              <p className=" text-gray-300 tracking-wide">{step}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ================= CTA ================= */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h2 className=" text-2xl md:text-4xl font-medium tracking-[-0.01em]">
              Ready to Start Your Investment Journey?
            </h2>

            <p className=" text-gray-400 mb-6 text-sm md:text-base tracking-wide leading-relaxed max-w-xl mx-auto">
              Partner with VRS Real Invest and secure premium real estate
              opportunities today.
            </p>

            <Link
              href={BOOKING_URL}
              className="inline-block bg-[var(--primary-gold)] text-[#221F1F] px-7 py-2.5 rounded-lg text-[11px]  font-medium tracking-[0.18em] uppercase hover:opacity-90 hover:scale-[1.03] active:scale-[0.98] transition"
            >
              Schedule a One-on-One Session
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

/* ================= HELPERS ================= */

// Section headings are h2 under the page's h1; Feature cards are h3 inside them.
function SectionWrapper({ title, children }: any) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
      <div className="mb-12 text-center">
        <div className="relative inline-block">
          <h2 className=" text-3xl md:text-4xl font-medium tracking-[-0.01em]">
            {title}
          </h2>

          <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent opacity-80"></span>
        </div>
      </div>
      {children}
    </section>
  );
}

function List({ items }: any) {
  return (
    <ul className="space-y-5 max-w-2xl mx-auto text-center">
      {items.map((item: string, i: number) => (
        <li
          key={i}
          className="flex items-center justify-center gap-3  text-gray-300 tracking-wide leading-relaxed"
        >
          <CheckCircle
            className="text-[var(--primary-gold)] shrink-0"
            size={18}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Feature({ icon, title, children }: any) {
  return (
    <div className="bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--card-border)] hover:border-[var(--primary-gold)]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition">
      <div className="text-[var(--primary-gold)] mb-4">{icon}</div>
      <h3 className=" text-lg font-medium tracking-tight">{title}</h3>
      <p className=" text-gray-400 text-sm md:text-base tracking-wide leading-relaxed">
        {children}
      </p>
    </div>
  );
}
