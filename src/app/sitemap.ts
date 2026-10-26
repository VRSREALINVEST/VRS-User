import { MetadataRoute } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const BASE_URL = "https://www.vrsrealinvest.com.au";
const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// Regenerate hourly so newly published blogs appear without a redeploy, and so a
// sitemap generated while the API was unreachable repairs itself on the next pass.
export const revalidate = 3600;

interface Blog {
  slug: string;
  publishDate?: string;
  createdAt: string;
}

interface SecuredProperty {
  createdAt: string;
  updatedAt?: string;
}

// Returns `null` on failure — deliberately distinct from an empty list — so a
// dead API is reported loudly instead of silently shipping a truncated sitemap.
async function fetchJson<T>(path: string): Promise<T[] | null> {
  if (!API) {
    console.error(
      `[sitemap] NEXT_PUBLIC_API_BASE_URL is not set — ${path} not fetched.`,
    );
    return null;
  }

  // Logged in full: Next's error output hides which host and port refused.
  const url = `${API}${path}`;
  try {
    const res = await fetch(url, { next: { revalidate } });

    if (!res.ok) {
      console.error(`[sitemap] ${url} responded ${res.status}.`);
      return null;
    }

    return (await res.json()) as T[];
  } catch (err) {
    console.error(`[sitemap] ${url} fetch failed.`, err);
    return null;
  }
}

// The newest valid date, or undefined. A page without a reliable date leaves
// lastModified out rather than claiming "now" on every regeneration, which
// crawlers learn to ignore.
function newest(dates: Array<string | undefined>): Date | undefined {
  const times = dates
    .map((date) => new Date(date ?? "").getTime())
    .filter(Number.isFinite);
  return times.length ? new Date(Math.max(...times)) : undefined;
}

// Posts are dated by publication: updatedAt also moves when only the status or
// image is saved, so it isn't a content change.
const published = (post: Blog) => post.publishDate ?? post.createdAt;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, properties] = await Promise.all([
    fetchJson<Blog>("/api/blog"),
    fetchJson<SecuredProperty>("/api/secured-properties"),
  ]);

  // Only the two listings have a reliable date (from their data). The other
  // pages have no record of when their content last changed, so they carry
  // no lastModified. /strategy-session stays out: it is noindex and unlinked.
  const staticPages: MetadataRoute.Sitemap = [
    {
      // Trailing slash to match the homepage canonical exactly.
      url: `${BASE_URL}/`,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      // Properties render on a single listing page (no per-property routes),
      // so its lastModified tracks the most recently updated property.
      url: `${BASE_URL}/properties`,
      lastModified: newest(
        (properties ?? []).map((item) => item.updatedAt ?? item.createdAt),
      ),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      // The listing changes when a post is published.
      url: `${BASE_URL}/blog`,
      lastModified: newest((blogs ?? []).map(published)),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/webinar`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/review`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  if (blogs === null) {
    // Outside `next build`, throw: a production server then keeps serving its
    // last good sitemap and retries 30 s later (next dev shows the error). The
    // build has no earlier copy, so it ships the static pages and says so. (A
    // failed property list only drops the /properties date, so it doesn't
    // hold back new blog URLs.)
    if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
      throw new Error(
        "[sitemap] Blog list unavailable — not regenerated; a production " +
          "server keeps serving its last good sitemap.",
      );
    }
    console.error(
      "[sitemap] Serving static pages only — blog URLs are MISSING. Check the " +
        "API; the sitemap self-repairs on the next revalidation.",
    );
  }

  // `/api/blog` returns published posts only, so drafts never reach the sitemap.
  const blogPages: MetadataRoute.Sitemap = (blogs ?? [])
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: newest([published(post)]),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticPages, ...blogPages];
}
