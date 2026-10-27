import Link from "next/link";
import SecuredProperties from "@/components/sections/SecuredProperties";
import { BOOKING_URL } from "@/lib/links";
import { getSecuredProperties } from "@/lib/publicContent";

export default async function PropertiesPage() {
  const properties = await getSecuredProperties();

  return (
    <>
      {/* ================= PROPERTIES ================= */}
      {/* A div: the (public) layout already provides <main>. The first
          covers are above the fold here, so they load straight away. */}
      <div className="pt-10">
        <SecuredProperties
          headingLevel="h1"
          properties={properties}
          eagerImages={3}
        />
      </div>

      {/* ================= CTA ================= */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-xl md:text-2xl font-medium text-white mb-3">
              Looking for the Right Investment?
            </h2>

            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-xl mx-auto">
              Speak with our experts and discover tailored property
              opportunities that match your goals.
            </p>

            <Link
              href={BOOKING_URL}
              className="inline-block bg-[var(--primary-gold)] text-[#221F1F] px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Schedule a One-on-One Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}