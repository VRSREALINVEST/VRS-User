import { Metadata } from "next";

// Client-approved title and description (2 Nov). The title already ends with
// the brand, so the root layout's "%s | VRS Real Invest" template must not add
// it again.
const TITLE = "Client Reviews & Testimonials | VRS Realinvest";
const DESCRIPTION =
  "Read what VRS Realinvest clients say about their property investment experience with our Australian buyer's agency.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/review",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.vrsrealinvest.com.au/review",
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
