import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tagmango.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      // Admin uploads (property covers and galleries, team photos) are stored
      // in this Cloudinary account as full-size originals; next/image resizes
      // them. Limited to the account so the optimiser isn't an open proxy.
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dxhdoypy0/**",
      },
      // YouTube's video stills, shown as click-to-play thumbnails. Served from
      // this site, so a visitor's browser contacts YouTube only after Play.
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/services",
        destination: "/properties",
        permanent: true,
      },
      // www is the preferred host (client requirement). The apex would
      // otherwise serve the full site at 200, duplicating every page; this
      // makes the host itself redirect so Google sees one origin.
      {
        source: "/:path*",
        has: [{ type: "host", value: "vrsrealinvest.com.au" }],
        destination: "https://www.vrsrealinvest.com.au/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;