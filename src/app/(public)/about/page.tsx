import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";

export default function AboutPage() {
  return (
    <>
      <main className="flex-1 pt-10 text-white">
        <AboutSection />
        <TeamSection />
      </main>
    </>
  );
}
