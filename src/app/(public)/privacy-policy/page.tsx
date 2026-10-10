
export default function PrivacyPolicy() {
  return (
    <>
      {/* PAGE CONTENT */}
      <>
          {/* ================= HERO ================= */}
          <section className="pt-32 md:pt-36 pb-16 px-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(231,200,156,0.08),transparent_60%)] pointer-events-none" />

            <div className="relative px-6 md:px-10 lg:px-20 text-center">
              <div className="w-12 h-[2px] bg-[var(--primary-gold)] mx-auto mb-4" />

              <h1 className=" text-4xl md:text-5xl font-medium text-white tracking-[-0.015em]">
                Privacy Policy
              </h1>

              <p className=" text-gray-500 text-sm mt-3 tracking-wide">
                VRS RealInvest Pty Ltd
              </p>
            </div>
          </section>

          {/* ================= CONTENT ================= */}
          <main className="px-6 md:px-10 lg:px-20 pb-24  text-gray-300">
            <div className="max-w-4xl mx-auto space-y-8">
              <p className="text-sm md:text-base leading-relaxed text-gray-400 tracking-wide">
                At VRS RealInvest Pty Ltd, we respect your privacy and are
                committed to protecting your personal information.
              </p>

              <Section title="1. Information We Collect">
                <p>We may collect the following personal information:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Property investment goals and preferences</li>
                </ul>
              </Section>
              <Section title="2. How We Use Your Information">
                <p>Your information may be used to:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Respond to your enquiries</li>
                  <li>Provide property investment guidance</li>
                  <li>Share updates, offers, and educational content</li>
                  <li>Improve our services</li>
                </ul>
              </Section>

              <Section title="3. Sharing of Information">
                <p>
                  We do not sell or rent your personal information. Your data
                  may be shared with trusted partners only when necessary.
                </p>
              </Section>

              <Section title="4. Data Security">
                <p>
                  We take reasonable steps to protect your personal information
                  using industry-standard security measures.
                </p>
              </Section>

              <Section title="5. Your Rights">
                <p>
                  You may request access, correction, or deletion of your
                  personal information at any time.
                </p>
              </Section>

              <Section title="6. Marketing Communication">
                <p>
                  By submitting your details, you agree to receive communication
                  via phone, email, or messaging platforms including WhatsApp.
                  You can opt out anytime.
                </p>
              </Section>

              <Section title="7. Contact Us">
                <p>
                  VRS RealInvest Pty Ltd <br />
                  Sudhesh Kandankulath Valappil <br />
                  Email: sudhesh@vrsrealinvest.com.au <br />
                  Phone: +61 412 864 050
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
