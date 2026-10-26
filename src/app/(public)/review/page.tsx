import TestimonialsSection from "@/components/sections/TestimonialsSection";
import {
  getTextTestimonials,
  getVideoTestimonials,
} from "@/lib/publicContent";

export default async function ReviewPage() {
  const [reviews, videos] = await Promise.all([
    getTextTestimonials(),
    getVideoTestimonials(),
  ]);

  return (
    <>
      {/* PAGE CONTENT (a div: the (public) layout already provides <main>) */}
      <div className="min-h-screen text-white flex flex-col">
        <div className="flex-1 pt-18 pb-10">
          <TestimonialsSection
            headingLevel="h1"
            reviews={reviews}
            videos={videos}
          />
        </div>
      </div>
    </>
  );
}