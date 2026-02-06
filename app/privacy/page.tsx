export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-black/70">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* Content */}
        <div className="mt-10 space-y-8 text-black/80 leading-relaxed">
          <Section title="Introduction">
            Jawily (“we”, “our”, “us”) respects your privacy and is committed to
            protecting your personal data. This policy explains how we collect,
            use, and safeguard your information when you use our website and
            services.
          </Section>

          <Section title="Information We Collect">
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details (name, email, phone number)</li>
              <li>Educational background and study preferences</li>
              <li>Documents you upload (SOPs, transcripts, etc.)</li>
              <li>Communication data (messages with counsellors)</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide study abroad counselling services</li>
              <li>To process applications and documentation</li>
              <li>To communicate updates and important information</li>
              <li>To improve our platform and user experience</li>
            </ul>
          </Section>

          <Section title="Data Sharing">
            We do not sell your personal data. Your information may be shared
            only with trusted partners such as universities or visa service
            providers, strictly for application-related purposes.
          </Section>

          <Section title="Data Security">
            We use reasonable technical and organisational measures to protect
            your data. However, no online system is 100% secure, and we cannot
            guarantee absolute security.
          </Section>

          <Section title="Your Rights">
            You have the right to access, update, or request deletion of your
            personal information. You may also opt out of non-essential
            communications at any time.
          </Section>

          <Section title="Cookies">
            Jawily may use cookies to enhance site performance and user
            experience. You can disable cookies in your browser settings.
          </Section>

          <Section title="Changes to This Policy">
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated date.
          </Section>

          <Section title="Contact Us">
            If you have any questions about this Privacy Policy or how your data
            is handled, please contact us at{" "}
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
