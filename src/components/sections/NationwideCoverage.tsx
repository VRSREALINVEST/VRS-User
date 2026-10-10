"use client";

import Image from "next/image";

const states = [
  { name: "Western Australia", short: "WA", left: "18%", top: "60%" },
  { name: "Northern Territory", short: "NT", left: "45%", top: "28%" },
  { name: "South Australia", short: "SA", left: "50%", top: "70%" },
  { name: "Queensland", short: "QLD", left: "82%", top: "45%" },
  { name: "New South Wales", short: "NSW", left: "78%", top: "65%" },
  { name: "Victoria", short: "VIC", left: "72%", top: "82%" },
  { name: "Tasmania", short: "TAS", left: "73%", top: "94%" },
];

export default function NationwideCoverage() {
  return (
    <section className="relative  py-14 md:py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        {/* HEADING */}
        <div className="text-center mb-8">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mb-5 opacity-80" />

          <h2 className="text-lg md:text-2xl font-medium text-white tracking-[-0.01em]">
            Nationwide Coverage
          </h2>

          <p className="text-gray-400 mt-3 text-[10px] md:text-xs tracking-[0.2em] uppercase">
            Our presence across major Australian cities
          </p>
        </div>

        {/* MAP CARD */}
        <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="relative w-full aspect-[16/10] bg-[var(--card-bg)]">
            {/* MAP IMAGE */}
            <Image
              src="https://images.pexels.com/photos/35884953/pexels-photo-35884953.jpeg"
              alt="Australia Map"
              fill
              className="object-cover opacity-80"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-[#221F1F]/60" />

            {/* STATE MARKERS */}
            {states.map((state, index) => (
              <div
                key={index}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: state.left, top: state.top }}
              >
                <div className="relative flex flex-col items-center">
                  {/* PULSE RING */}
                  <span className="hidden md:block absolute h-5 w-5 rounded-full bg-[var(--primary-gold)]/30 animate-ping" />

                  {/* DOT */}
                  <span className="relative h-3 w-3 rounded-full bg-[var(--primary-gold)] shadow-[0_0_14px_rgba(231,200,156,0.9)] border border-white/40" />

                  {/* LABEL */}
                  <div className="mt-2 px-3 py-1 text-[9px] md:text-[10px] tracking-[0.15em] uppercase bg-[#221F1F]/90 text-white rounded-full border border-[var(--card-border)] backdrop-blur-md whitespace-nowrap">
                    <span className="md:hidden text-[var(--primary-gold)]">
                      {state.short}
                    </span>

                    <span className="hidden md:inline">{state.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
