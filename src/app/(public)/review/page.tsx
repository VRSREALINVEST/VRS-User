import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function ReviewPage() {
  return (
    <>
      {/* PAGE CONTENT */}
      <div className="min-h-screen text-white flex flex-col">
        <main className="flex-1 pt-18 pb-10">
          <TestimonialsSection />
        </main>
      </div>
    </>
  );
}