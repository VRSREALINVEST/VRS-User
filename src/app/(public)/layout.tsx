import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingIcons from "@/components/ui/FloatingIcons";
import EnquiryPopup from "@/components/ui/EnquiryPopup";
import WebinarCta from "@/components/ui/WebinarCta";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen vrs-bg text-white">{children}</main>

      <Footer />
      {/* Room at the end of every page so the footer's contact details can
          scroll clear of the floating webinar CTA + chat (bottom-right).
          Heights track the CTA's top edge: pill ~144px, card ~286px. */}
      <div aria-hidden="true" className="h-36 cta-card:h-72" />
      <WebinarCta />
      <FloatingIcons />
      <EnquiryPopup />
    </>
  );
}
