import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import { LINKEDIN_URL, YOUTUBE_URL } from "@/lib/links";
import { getTeam } from "@/lib/publicContent";

const PROFILE_LINK =
  "text-[var(--primary-gold)] underline underline-offset-4 transition hover:opacity-80";

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      {/* A div: the (public) layout already provides <main>. */}
      <div className="flex-1 pt-10 text-white">
        <AboutSection />
        <TeamSection members={team} />

        {/* ================= ABOUT SUDHESH ================= */}
        {/* Page Copy v3 §4; article bylines link to /about#sudhesh. Left out
            until Sudhesh confirms them: his licence details and experience
            years. scroll-mt clears the fixed navbar. */}
        <section
          id="sudhesh"
          className="max-w-7xl mx-auto px-6 py-20 md:py-24 scroll-mt-24"
        >
          <div className="mb-12 text-center">
            <div className="relative inline-block">
              <h2 className=" text-3xl md:text-4xl font-medium tracking-[-0.01em]">
                About Sudhesh K Valappil
              </h2>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent opacity-80"></span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className=" text-gray-300 leading-relaxed tracking-wide">
              Sudhesh K Valappil is the founder of VRS Realinvest and a buyer’s
              agent. He started VRS Realinvest to help busy professionals and
              families make property decisions with evidence rather than hype.
              He runs the free property investment webinars. He does not provide
              financial, tax or lending advice.
            </p>

            <p className="mt-6 text-sm tracking-wide text-gray-400">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={PROFILE_LINK}
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span aria-hidden="true" className="mx-3">
                ·
              </span>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={PROFILE_LINK}
              >
                YouTube
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
