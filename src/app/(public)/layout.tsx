import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingIcons from "@/components/ui/FloatingIcons";

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
      <FloatingIcons />
    </>
  );
}
