import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import { getTeam } from "@/lib/publicContent";

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      {/* A div: the (public) layout already provides <main>. */}
      <div className="flex-1 pt-10 text-white">
        <AboutSection />
        <TeamSection members={team} />
      </div>
    </>
  );
}
