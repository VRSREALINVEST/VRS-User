import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingIcons from "@/components/ui/FloatingIcons";
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
      <WebinarCta />
      <FloatingIcons />
    </>
  );
}
