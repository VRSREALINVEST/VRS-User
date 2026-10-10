"use client";

import { useEffect, useState } from "react";
import useNearViewport from "@/lib/useNearViewport";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
}

export default function TeamSection() {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, near] = useNearViewport<HTMLElement>();

  useEffect(() => {
    if (!near) return;
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API}/api/team`);
        // An error body ({ message }) would crash .map below
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    if (API) fetchTeam();
    else setLoading(false);
  }, [API, near]);

  // Hide the section only once we know there is genuinely no data. While
  // loading, the header + skeletons render (and server-render) so the page
  // has stable structure and real headings for crawlers.
  if (!loading && teamMembers.length === 0) return null;

  const isScrollable = teamMembers.length > 4;

  return (
    <section ref={sectionRef} className="py-20 md:py-24">
      <div className="px-6 md:px-10 lg:px-20">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mb-6 opacity-80"></div>

          <h2 className=" text-3xl md:text-4xl font-medium text-white tracking-[-0.01em]">
            Meet Our Team
          </h2>

          <p className=" text-gray-400 mt-4 text-[11px] md:text-sm tracking-[0.18em] uppercase">
            Experienced professionals dedicated to helping you create real
            freedom
          </p>
        </div>
        {/* SCROLL / GRID */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[340px] md:h-[360px] rounded-2xl border border-[var(--card-border)] bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : isScrollable ? (
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {teamMembers.map((member) => (
              <div
                key={member._id}
                className="min-w-[260px] md:min-w-[300px] snap-start 
                relative group rounded-2xl overflow-hidden
                border border-[var(--card-border)]
                bg-[var(--card-bg)]
                transition-all duration-500
                hover:border-[var(--primary-gold)]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              >
                {/* IMAGE */}
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[340px] md:h-[360px] object-cover
                  group-hover:scale-105 transition duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 w-full p-5 text-center">
                  <h4 className=" text-white text-lg font-medium tracking-tight">
                    {member.name}
                  </h4>

                  <p className=" text-gray-400 mt-2 text-[11px] tracking-[0.15em] uppercase">
                    {member.role}
                  </p>

                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent mx-auto mt-4 opacity-80"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member._id}
                className="relative group rounded-2xl overflow-hidden
                border border-[var(--card-border)]
                bg-[var(--card-bg)]
                transition-all duration-500
                hover:border-[var(--primary-gold)]/40"
              >
                {/* IMAGE */}
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[340px] md:h-[360px] object-cover
                  group-hover:scale-105 transition duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 w-full p-5 text-center">
                  <h4 className="text-white text-lg font-medium">
                    {member.name}
                  </h4>

                  <p className="text-gray-400 mt-1 text-sm">{member.role}</p>

                  <div className="w-10 h-[2px] bg-[var(--primary-gold)] mx-auto mt-3"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
