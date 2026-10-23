import Link from "next/link";
import { Metadata } from "next";
import { SUDHESH, TEAM, isBySudhesh } from "@/lib/byline";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author?: string;
  imageAlt?: string;
  imageTitle?: string;
  publishDate?: string;
  createdAt: string;
}

export const metadata: Metadata = {
  title: "Real Estate Blog | VRS Real Invest",
  description:
    "Explore premium real estate insights, luxury investment strategies, and expert market analysis from VRS Real Invest.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Real Estate Blog | VRS Real Invest",
    description:
      "Explore premium real estate insights, luxury investment strategies, and expert market analysis from VRS Real Invest.",
    url: "https://www.vrsrealinvest.com.au/blog",
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },
};

async function getBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <div className="min-h-screen  text-white flex flex-col">
      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="py-24 px-6 text-center relative overflow-hidden">
          {/* subtle glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(231,200,156,0.08),transparent_60%)] pointer-events-none" />

          <div className="relative max-w-3xl mx-auto">
            <div className="w-12 h-[2px] bg-[var(--primary-gold)] mx-auto mb-5" />

            <h1 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight">
              Market Insights & Investment Intelligence
            </h1>

            <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Expert perspectives, strategic investment insights, and premium
              real estate analysis tailored for sophisticated investors.
            </p>
          </div>
        </section>

        {/* ================= BLOG GRID ================= */}
        <section className="pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md transition duration-500 hover:border-[var(--primary-gold)]/40"
                  >
                    {/* IMAGE */}
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        title={post.imageTitle || undefined}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-60 object-cover group-hover:scale-105 transition duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                        {new Date(
                          post.publishDate || post.createdAt,
                        ).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        <span className="normal-case tracking-normal">
                          {" "}
                          · By {isBySudhesh(post.author) ? SUDHESH : TEAM}
                        </span>
                      </p>

                      <h2 className="text-lg font-medium mb-3 group-hover:text-[var(--primary-gold)] transition">
                        {post.title}
                      </h2>

                      <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        {post.excerpt}
                      </p>

                      <span className="text-[var(--primary-gold)] text-sm font-medium tracking-wide">
                        Continue Reading →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[40vh] text-gray-500 text-sm">
                No blog articles available.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
