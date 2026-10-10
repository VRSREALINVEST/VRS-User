import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import { looksLikeHtml, sanitizeBlogHtml } from "@/lib/blogHtml";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: string;
  imageAlt?: string;
  imageTitle?: string;
  publishDate?: string;
  createdAt: string;
  updatedAt?: string;
}

const SITE_URL = "https://www.vrsrealinvest.com.au";

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Legacy renderer for articles written before the rich text editor, which are
// stored as plain text with "## " headings, "-" bullets and **bold**. New
// articles are HTML and take the sanitised path instead.
function formatBlogContent(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const formatInline = (text: string) => {
    // 🔗 Convert links
    let formatted = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // ⭐ Bold (**text**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Legacy text can still carry raw HTML (anything looksLikeHtml misses),
    // so it goes through the same allowlist as editor content.
    return sanitizeBlogHtml(formatted);
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // 👉 Bullet list
    if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
      listItems.push(trimmed.replace(/^[-•]\s*/, ""));
      return;
    }

    // 👉 Flush list
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 my-4">
          {listItems.map((item, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{
                __html: formatInline(item),
              }}
            />
          ))}
        </ul>
      );
      listItems = [];
    }

    // 👉 Empty line → spacing
    if (!trimmed) {
      elements.push(<div key={i} className="h-4" />);
      return;
    }

    // 👉 Heading (## Title)
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl md:text-2xl font-semibold mt-8 mb-3">
          {trimmed.replace("## ", "")}
        </h2>
      );
      return;
    }

    // 👉 Normal paragraph
    elements.push(
      <p
        key={i}
        dangerouslySetInnerHTML={{
          __html: formatInline(trimmed),
        }}
      />
    );
  });

  // 👉 Final list flush
  if (listItems.length > 0) {
    elements.push(
      <ul key="last-ul" className="list-disc pl-5 my-4">
        {listItems.map((item, idx) => (
          <li
            key={idx}
            dangerouslySetInnerHTML={{
              __html: formatInline(item),
            }}
          />
        ))}
      </ul>
    );
  }

  return elements;
}

// ✅ METADATA
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  // notFound() must fire here, not just in the page body: app/loading.tsx puts a
  // Suspense boundary above this route, so the 200 shell is flushed before the
  // page renders and the status can no longer be changed. Metadata resolves
  // before that flush, so this is what makes the response a real HTTP 404.
  if (!blog) notFound();

  const canonical = `/blog/${blog.slug}`;
  const description = blog.metaDescription || blog.excerpt;
  const published = blog.publishDate || blog.createdAt;

  return {
    // A hand-written metaTitle is the complete <title>: the root layout's
    // "%s | VRS Real Invest" template would otherwise append the brand a
    // second time for any metaTitle that already ends with it. Without one,
    // fall back to the blog title and let the template add the brand.
    title: blog.metaTitle ? { absolute: blog.metaTitle } : blog.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: blog.title,
      description,
      url: `${SITE_URL}${canonical}`,
      siteName: "VRS Real Invest",
      locale: "en_AU",
      type: "article",
      publishedTime: published,
      modifiedTime: blog.updatedAt || published,
      images: [
        {
          url: blog.image,
          alt: blog.imageAlt || blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [blog.image],
    },
  };
}

// ✅ PAGE
export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  // Unknown or unpublished slug → real HTTP 404 via app/not-found.tsx,
  // instead of a 200 "Blog not found" page (Soft 404).
  if (!blog) notFound();

  // ✅ ARTICLE STRUCTURED DATA (schema.org/Article)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: blog.image,
    datePublished: blog.publishDate || blog.createdAt,
    dateModified: blog.updatedAt || blog.publishDate || blog.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${blog.slug}`,
    },
    author: blog.author
      ? { "@type": "Person", name: blog.author }
      : {
          "@type": "Organization",
          name: "VRS Real Invest",
          url: SITE_URL,
        },
    publisher: {
      "@type": "Organization",
      name: "VRS Real Invest",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <main className="text-white min-h-screen">
      {/* "<" is escaped so a "</script>" in an admin-entered title or
          description can't close this tag and inject markup. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* HERO */}
      <section className="pt-28 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(231,200,156,0.08),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-[var(--primary-gold)] text-sm mb-6 inline-block hover:underline"
          >
            ← Back to Articles
          </Link>

          <h1 className="text-3xl md:text-5xl font-medium leading-tight">
            {blog.title}
          </h1>

          <p className="text-gray-500 text-sm mt-4">
            {blog.author && (
              <>
                <span className="text-gray-400">By {blog.author}</span>
                <span className="mx-2">·</span>
              </>
            )}
            Published on{" "}
            {new Date(blog.publishDate || blog.createdAt).toLocaleDateString(
              "en-AU",
              { day: "numeric", month: "long", year: "numeric" },
            )}
          </p>
        </div>
      </section>

      {/* IMAGE */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <img
            src={blog.image}
            alt={blog.imageAlt || blog.title}
            title={blog.imageTitle || undefined}
            fetchPriority="high"
            decoding="async"
            className="w-full h-[350px] md:h-[450px] object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          />
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {/* The prose-* utilities need @tailwindcss/typography, which is not
              installed, so .blog-content in globals.css does the styling. */}
          <article className="blog-content max-w-none">
            {looksLikeHtml(blog.content) ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeBlogHtml(blog.content),
                }}
              />
            ) : (
              formatBlogContent(blog.content)
            )}
          </article>
        </div>
      </section>
    </main>
  );
}