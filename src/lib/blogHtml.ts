import sanitizeHtml from "sanitize-html";
import { BOOKING_URL, CALENDLY_URL } from "@/lib/links";

/**
 * Articles written before the rich text editor existed are stored as plain
 * text using "## " headings, "-" bullets and **bold**. Anything produced by
 * the editor is HTML. Detecting which we have lets both render correctly
 * without migrating existing posts.
 */
export const looksLikeHtml = (content: string): boolean =>
  /<(p|h[1-6]|ul|ol|li|blockquote|pre|figure|img|br|strong|em|u|s|a|code)\b[^>]*>/i.test(
    content
  );

/**
 * The blog title is the page's H1, so any H1 written in the body is demoted to
 * H2 to keep a single top-level heading per page.
 */
export const sanitizeBlogHtml = (content: string): string =>
  sanitizeHtml(content, {
    allowedTags: [
      "p",
      "br",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "del",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "code",
      "pre",
      "hr",
      "img",
      "figure",
      "figcaption",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "loading", "decoding"],
    },
    // Blocks javascript: and data: URLs from ever reaching the page.
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    transformTags: {
      h1: "h2",
      // Every link leaves with safe rel attributes, whatever was stored.
      // Booking links to the Calendly event open the site's booking form in
      // the same tab instead, like every booking button (client review,
      // 26 Oct); posts stored before that still link to Calendly.
      a: (tagName, attribs): sanitizeHtml.Tag =>
        attribs.href?.startsWith(CALENDLY_URL)
          ? { tagName, attribs: { href: BOOKING_URL } }
          : {
              tagName,
              attribs: {
                ...attribs,
                ...(attribs.target === "_blank"
                  ? { rel: "noopener noreferrer" }
                  : {}),
              },
            },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy", decoding: "async" },
      }),
    },
  });
