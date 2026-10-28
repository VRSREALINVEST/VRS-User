import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import ScrollToTop from "@/components/common/ScrollToTop";
import localFont from "next/font/local";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// GA4 runs only on the live site (exact host match). Anywhere else (localhost,
// LAN IPs, previews, hosting temp domains) no gtag.js loads and window.gtag
// stays undefined, so the site's window.gtag?.() events do nothing. The apex
// redirects to www (next.config.ts) and is listed in case a page is served there.
const GA_HOSTS = ["www.vrsrealinvest.com.au", "vrsrealinvest.com.au"];

const playfair = localFont({
  src: "./fonts/CormorantGaramond-Variable.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-heading",
});

const montserrat = localFont({
  src: "./fonts/Montserrat-Variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vrsrealinvest.com.au"),

  title: {
    default: "VRS Real Invest",
    template: "%s | VRS Real Invest",
  },

  description: "Premium real estate investment portfolio website in Australia.",

  openGraph: {
    title: "VRS Real Invest",
    description:
      "Premium real estate investment portfolio website in Australia.",
    url: "https://www.vrsrealinvest.com.au",
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.vrsrealinvest.com.au/#organization",
      "name": "VRS Realinvest",
      "legalName": "VRS Realinvest Pty Ltd",
      "url": "https://www.vrsrealinvest.com.au",
      "logo": "https://www.vrsrealinvest.com.au/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+61-412-864-050",
        "contactType": "customer service",
        "email": "sudhesh@vrsrealinvest.com.au",
        "areaServed": "AU",
        "availableLanguage": "en"
      }
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.vrsrealinvest.com.au/#realestateagent",
      "name": "VRS Realinvest",
      "url": "https://www.vrsrealinvest.com.au",
      "logo": "https://www.vrsrealinvest.com.au/logo.png",
      "telephone": "+61-412-864-050",
      "email": "sudhesh@vrsrealinvest.com.au",
      "description": "Premium buyer's agency and real estate coaching business. We represent buyers and help busy professionals build wealth through strategic Australian real estate investing, providing end-to-end guidance from strategy to settlement.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AU",
        "addressRegion": "NSW"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Australia"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.vrsrealinvest.com.au/#localbusiness",
      "name": "VRS Realinvest",
      "url": "https://www.vrsrealinvest.com.au",
      "logo": "https://www.vrsrealinvest.com.au/logo.png",
      "telephone": "+61-412-864-050",
      "email": "sudhesh@vrsrealinvest.com.au",
      "description": "VRS Realinvest is an Australian buyer's agency and real estate coaching business helping busy professionals purchase the right investment property with clarity and confidence.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AU",
        "addressRegion": "NSW"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Australia"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={montserrat.className}>
        <ScrollToTop />
        {children}

        {/* gtag.js is added by this script, not by a <Script src>: that one
            also puts a <link rel="preload"> for it in the HTML, which every
            host would download. */}
        {GA_ID && (
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              if (${JSON.stringify(GA_HOSTS)}.includes(location.hostname)) {
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){dataLayer.push(arguments);};
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
                document.head.appendChild(s);
              }
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
