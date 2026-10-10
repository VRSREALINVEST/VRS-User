import WebinarSection from "@/components/sections/WebinarSection";

export default function WebinarPage() {
  return (
    <>
      {/* PAGE CONTENT */}
      <div className="min-h-screen text-white flex flex-col">
        <main className="flex-1 pt-14 pb-10">
          <WebinarSection />
        </main>
      </div>
    </>
  );
}