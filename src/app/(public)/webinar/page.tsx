import WebinarSection from "@/components/sections/WebinarSection";

export default function WebinarPage() {
  return (
    <>
      {/* PAGE CONTENT (a div: the (public) layout already provides <main>) */}
      <div className="min-h-screen text-white flex flex-col">
        <div className="flex-1 pt-14 pb-10">
          <WebinarSection />
        </div>
      </div>
    </>
  );
}