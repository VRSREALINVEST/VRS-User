"use client";

import { useEffect, useState } from "react";
import { Video } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// No day, time or time zone on the public page (client requirement): visitors
// see the available sessions after they click through to register.
interface Webinar {
  _id: string;
  title: string;
  description: string;
  meetLink: string;
}

export default function WebinarSection() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const res = await fetch(`${API}/api/webinars`);
        if (!res.ok) return;
        const data = await res.json();
        setWebinars(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (API) fetchWebinars();
  }, []);

  // The section header always renders so /webinar has real server-side content
  // (it previously returned null until the client fetch resolved, leaving the
  // page empty for crawlers). Only the cards below depend on fetched data.
  return (
    <section className="relative py-16 overflow-hidden">
      {/* subtle glow */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* HEADER: Page Copy v2 §5 H1 and intro */}
        <div className="mb-10">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mb-5 opacity-80"></div>

          <h1 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight text-white">
            Free Property Investment Webinars
          </h1>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-sm md:text-base leading-relaxed tracking-wide">
            Learn how to assess an investment property before you buy. Our free
            webinars explain how we look at rental demand, vacancy,
            affordability, supply, comparable sales and ownership costs, so you
            can make your own informed decisions. Every session is general
            education, not personal financial advice.
          </p>
        </div>

        {webinars.length > 0 && (
          <h2 className="mb-6 text-2xl md:text-3xl font-medium text-white tracking-[-0.01em]">
            Upcoming webinars
          </h2>
        )}

        {/* CARDS */}
        <div className="space-y-6">
          {webinars.map((webinar) => {
            return (
              <div
                key={webinar._id}
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)] p-7 md:p-8 transition hover:border-[var(--primary-gold)]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
              >
                {/* TITLE */}
                <h3 className="text-lg md:text-xl text-white font-medium tracking-tight mb-4">
                  {webinar.title}
                </h3>

                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto my-4 opacity-70"></div>
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto my-4 opacity-70"></div>

                {/* PLATFORM */}
                <div className="flex items-center justify-center gap-2.5 text-gray-400 text-xs mb-4">
                  <Video size={14} className="text-[var(--primary-gold)]" />
                  <span className=" text-gray-400 text-[10px] tracking-[0.15em] uppercase">
                    FREE Live Webinar
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className=" text-gray-400 max-w-md mx-auto mb-6 text-sm leading-relaxed tracking-wide">
                  {webinar.description}
                </p>

                {/* BUTTON */}
                <a
                  href={webinar.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[var(--primary-gold)] text-[#221F1F] px-7 py-2.5 rounded-lg text-[11px]  font-medium tracking-[0.18em] uppercase transition hover:opacity-90 hover:scale-[1.03]"
                >
                  Register Now
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
