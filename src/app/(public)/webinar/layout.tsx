import { Metadata } from "next";

// Page Copy v2 §5. The title already ends with the brand, so the root
// layout's "%s | VRS Real Invest" template must not add it again.
const TITLE = "Free Property Investment Webinars | VRS Realinvest";
const DESCRIPTION =
  "Free property investment webinars for Australian investors. Learn how to assess a property before you buy, then register for a time that suits you.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/webinar",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.vrsrealinvest.com.au/webinar",
    siteName: "VRS Real Invest",
    locale: "en_AU",
    type: "website",
  },
};

export default function WebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
