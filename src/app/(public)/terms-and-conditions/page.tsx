
export default function TermsPage() {
  return (
    <>
      {/* PAGE CONTENT */}
      <>
          {/* ================= HERO ================= */}
          <section className="pt-28 pb-12 px-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(231,200,156,0.08),transparent_60%)] pointer-events-none" />

            <div className="relative px-6 md:px-10 lg:px-20 text-center">
              <div className="w-12 h-[2px] bg-[var(--primary-gold)] mx-auto mb-4" />

              <h1 className=" text-4xl md:text-5xl font-medium text-white tracking-[-0.015em]">
                Terms & Conditions
              </h1>

              <p className=" text-gray-500 text-sm mt-3 tracking-wide">
                VRS RealInvest Pty Ltd <br />
                Effective Date: 27 March 2026
              </p>
            </div>
          </section>

          {/* ================= CONTENT ================= */}
          <main className="px-6 md:px-10 lg:px-20 pb-24 ">
            <div className="max-w-4xl mx-auto space-y-8">
              <Section title="1. Introduction">
                <p>
                  Welcome to VRS RealInvest Pty Ltd ("we", "our", "us"). By
                  accessing our website, registering for webinars, purchasing
                  programs, or using our services, you agree to be bound by
                  these Terms and Conditions.
                </p>
              </Section>

              <Section title="2. Nature of Services (Disclaimer)">
                <p>
                  All content, webinars, coaching sessions, and services
                  provided are for educational and informational purposes only.
                  We do not provide financial, legal, or tax advice. You should
                  seek independent advice before making any investment
                  decisions.
                </p>
              </Section>

              <Section title="3. No Guarantees">
                <p>
                  We do not guarantee financial outcomes, capital growth, rental
                  income, or investment performance. Results vary based on
                  individual circumstances and market conditions.
                </p>
              </Section>

              <Section title="4. Client Responsibility">
                <p>
                  You acknowledge that you are solely responsible for your
                  financial decisions and due diligence. Any property purchase
                  decision is made independently by you.
                </p>
              </Section>

              <Section title="5. Services Provided">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Educational webinars</li>
                  <li>Paid courses and programs</li>
                  <li>One-on-one strategy sessions</li>
                  <li>Buyer’s Agent services</li>
                </ul>
              </Section>

              <Section title="6. Payments">
                <p>
                  All payments must be made in full prior to accessing paid
                  services unless otherwise agreed. Prices may change without
                  prior notice.
                </p>
              </Section>

              <Section title="7. Refund Policy">
                <p>
                  Due to the nature of digital products, purchases are generally
                  non-refundable unless otherwise stated. One-on-one sessions
                  may be rescheduled with notice. Buyer’s Agent services are
                  governed by separate agreements.
                </p>
              </Section>

              <Section title="8. Intellectual Property">
                <p>
                  All materials including webinars, videos, courses, documents,
                  and branding are the intellectual property of VRS RealInvest
                  Pty Ltd and may not be copied or distributed without
                  permission.
                </p>
              </Section>

              <Section title="9. Limitation of Liability">
                <p>
                  To the maximum extent permitted by law, we are not liable for
                  any financial loss, investment loss, or damages arising from
                  the use of our services.
                </p>
              </Section>

              <Section title="10. Third-Party Services">
                <p>
                  We may refer you to third-party professionals such as brokers
                  or accountants. We are not responsible for their services or
                  outcomes.
                </p>
              </Section>

              <Section title="11. Privacy">
                <p>
                  Your use of our services is also governed by our Privacy
                  Policy.
                </p>
              </Section>

              <Section title="12. Termination">
                <p>
                  We reserve the right to refuse or terminate services if these
                  Terms are violated.
                </p>
              </Section>

              <Section title="13. Changes to Terms">
                <p>
                  We may update these Terms at any time. Continued use of our
                  services indicates acceptance of the updated Terms.
                </p>
              </Section>

              <Section title="14. Governing Law">
                <p>
                  These Terms are governed by the laws of New South Wales,
                  Australia.
                </p>
              </Section>

              <Section title="15. Contact Us">
                <p>
                  VRS RealInvest Pty Ltd <br />
                  Email: sudhesh@vrsrealinvest.com.au <br />
                  Website: www.vrsrealinvest.com.au
                </p>
              </Section>
            </div>
          </main>
      </>
    </>
  );
}

/* ================= SECTION ================= */

function Section({ title, children }: any) {
  return (
    <div className="space-y-3 border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-sm rounded-xl p-5 md:p-6 hover:border-[var(--primary-gold)]/30 transition">
      <h2 className=" text-lg md:text-xl font-medium text-[var(--primary-gold)] tracking-wide">
        {title}
      </h2>

      <div className="text-sm md:text-base leading-relaxed text-gray-400 tracking-wide">
        {children}
      </div>
    </div>
  );
}
