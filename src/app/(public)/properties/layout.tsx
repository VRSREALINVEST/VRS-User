import { Metadata } from "next";

// The title already ends with the brand, so the root layout's
// "%s | VRS Real Invest" template must not add it again.
const TITLE = "Secured Properties | VRS Realinvest";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    "Explore premium properties VRS Real Invest has successfully secured for clients — real results from strategic Australian property investment.",
  alternates: {
    canonical: "/properties",
  },
  openGraph: {
    title: TITLE,
    description:
      "Explore premium properties VRS Real Invest has successfully secured for clients — real results from strategic Australian property investment.",
    url: "https://www.vrsrealinvest.com.au/properties",
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
