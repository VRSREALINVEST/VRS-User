import { Metadata } from "next";

// Page Copy v2 §4. The title already ends with the brand, so the root
// layout's "%s | VRS Real Invest" template must not add it again.
const TITLE = "About VRS Realinvest | Buyer’s Agent & Property Education";
const DESCRIPTION =
  "Meet Sudhesh K Valappil and the VRS Realinvest team: a buyer’s agency and property education business helping busy professionals invest with care.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.vrsrealinvest.com.au/about",
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
