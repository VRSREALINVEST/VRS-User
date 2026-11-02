import { notFound } from "next/navigation";

// Draft pages waiting for Sudhesh's final approval (Page Content v2: Buyer's
// Agent Sydney and Interstate Buyer's Agent). They render only in a build made
// with VRS_PREVIEW_PAGES=1 (set when building, as the pages are static). Every
// other build, production included, answers those URLs with the normal 404, so
// deploying this code publishes nothing. The pages also carry noindex and stay
// out of the sitemap and navigation. On approval, delete this gate and the
// pages' robots setting, then add them to the sitemap.
export const PREVIEW_PAGES = process.env.VRS_PREVIEW_PAGES === "1";

// Call from both generateMetadata and the page, so a gated URL's 404 carries no
// draft title or description either.
export function requirePreview() {
  if (!PREVIEW_PAGES) notFound();
}
