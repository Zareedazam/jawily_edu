export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-black/70">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Content */}
        <div className="mt-10 space-y-8 text-black/80 leading-relaxed">
          <Section title="Acceptance of Terms">
            By accessing or using Jawily’s website and services, you agree to be
            bound by these Terms & Conditions. If you do not agree, please do not
            use our platform.
          </Section>

          <Section title="Services">
            Jawily provides study abroad counselling, application guidance,
            documentation support, and related services. All services are
            provided on a best-effort basis and do not guarantee admission,
            scholarships, or visas.
          </Section>

          <Section title="User Responsibilities">
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Ensure uploaded documents are genuine and correct</li>
              <li>Use the platform only for lawful purposes</li>
              <li>Maintain confidentiality of your login credentials</li>
            </ul>
          </Section>

          <Section title="Fees & Payments">
            Some services may be free, while others may require payment. Any
            applicable fees will be clearly communicated before you proceed.
            Payments, once made, are generally non-refundable unless stated
            otherwise.
          </Section>

          <Section title="Intellectual Property">
            All content on this website, including text, design, logos, and
            software, is the property of Jawily. You may not copy, reproduce, or
            distribute any content without written permission.
          </Section>

          <Section title="Limitation of Liability">
            Jawily is not responsible for decisions made by universities,
            embassies, or third-party service providers. We are not liable for
            any direct or indirect losses arising from the use of our services.
          </Section>

          <Section title="Third-Party Links">
            Our website may contain links to third-party websites. Jawily has no
            control over these sites and is not responsible for their content or
            policies.
          </Section>

          <Section title="Termination">
            We reserve the right to suspend or terminate access to our services
            if these Terms are violated or if misuse of the platform is
            detected.
          </Section>

          <Section title="Changes to Terms">
            Jawily may update these Terms & Conditions at any time. Continued use
            of the website after changes are posted constitutes acceptance of
            the revised terms.
          </Section>

          <Section title="Governing Law">
            These Terms & Conditions shall be governed by and interpreted in
            accordance with the laws applicable in your jurisdiction.
          </Section>

          <Section title="Contact Information">
            If you have any questions about these Terms & Conditions, please
            contact us at{" "}
            <span className="font-semibold">support@jawily.com</span>.
          </Section>
        </div>

        {/* Footer action */}
        <div className="mt-14">
          <a
            href="/"
            className="inline-flex px-6 py-3 rounded-full border border-black/15 font-semibold hover:border-black/30"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

/* Helper */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-black tracking-tight mb-3">
        {title}
      </h2>
      <div className="text-black/70">{children}</div>
    </section>
  );
}
