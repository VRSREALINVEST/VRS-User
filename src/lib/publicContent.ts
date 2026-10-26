import type { DiscoverVideoData } from "@/components/sections/DiscoverVideo";
import type { SecuredProperty } from "@/components/sections/SecuredProperties";
import type { TeamMember } from "@/components/sections/TeamSection";
import type {
  TextReview,
  VideoReview,
} from "@/components/sections/TestimonialsSection";

// Admin-managed content that the homepage, /about, /review and /properties
// render on the server, so it is in the initial HTML. Responses are cached
// for a minute (ISR): the pages stay static, and admin edits appear within
// about a minute without a redeploy. A failed request returns null, and that
// section renders without its content instead of breaking the page.
async function getJson(path: string): Promise<unknown> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
      next: { revalidate: 60 },
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

async function getList<T>(path: string): Promise<T[] | null> {
  const data = await getJson(path);
  return Array.isArray(data) ? (data as T[]) : null;
}

export const getSecuredProperties = () =>
  getList<SecuredProperty>("/api/secured-properties");
export const getTeam = () => getList<TeamMember>("/api/team");
export const getTextTestimonials = () =>
  getList<TextReview>("/api/text-testimonials");
export const getVideoTestimonials = () =>
  getList<VideoReview>("/api/video-testimonials");

// One document, or null when none is set up.
export const getDiscoverVideo = async () => {
  const data = await getJson("/api/discover-video");
  return data && typeof data === "object" && !Array.isArray(data)
    ? (data as DiscoverVideoData)
    : null;
};
