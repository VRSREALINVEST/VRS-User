import { Metadata } from "next";

// The title already ends with the brand, so the root layout's
// "%s | VRS Real Invest" template must not add it again.
const TITLE = "Contact Us | VRS Realinvest";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    "Get in touch with VRS Real Invest to discuss your property investment goals and book a consultation with our buyer's agents.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: TITLE,
    description:
      "Get in touch with VRS Real Invest to discuss your property investment goals and book a consultation with our buyer's agents.",
    url: "https://www.vrsrealinvest.com.au/contact",
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
