import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy ",
  description:
    "Learn how Cognify collects, uses, and protects your personal information.",
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `Cognify ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains what personal information we collect, how we use it, when we share it, and the choices you have regarding your data. By using the Platform, you agree to the practices described in this policy.`,
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: `We collect information in the following ways:\n\nInformation you provide directly:\n• Name and email address when you register for an account\n• Profile information, including a profile picture\n• Course content, materials, and metadata uploaded by instructors\n• Communications you send us, such as support requests\n• Payment details, which are processed by third-party providers — we do not store card numbers or sensitive financial data\n\nInformation collected automatically:\n• Pages visited, features used, and actions taken on the Platform\n• Device type, browser, operating system, and IP address\n• Session data managed through secure HTTP-only cookies`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use the information we collect to:\n• Create and manage your account\n• Provide access to courses and Platform features\n• Process enrollments and course purchases\n• Send transactional communications such as enrollment confirmations and password resets\n• Respond to support inquiries\n• Monitor for abuse, enforce our Terms of Service, and ensure platform security\n• Improve and develop new Platform features based on usage patterns`,
  },
  {
    id: "sharing",
    title: "4. Data Sharing",
    content: `We do not sell your personal data to third parties. We may share your information with trusted service providers who assist us in operating the Platform — such as cloud storage providers, email delivery services, and payment processors. These providers are bound by confidentiality obligations and are only permitted to use your data to perform services on our behalf.\n\nWe may also disclose your information if required to do so by law or in response to valid legal process.`,
  },
  {
    id: "cookies",
    title: "5. Cookies and Authentication",
    content: `Cognify uses HTTP-only cookies to manage authentication sessions securely. These cookies are not accessible to client-side scripts and help protect your account. We do not use cookies for advertising or cross-site tracking. You may disable cookies in your browser settings, though doing so may prevent you from logging in or using certain features.`,
  },
  {
    id: "storage",
    title: "6. Data Storage and Security",
    content: `Your data is stored on secure servers. File uploads, including profile pictures and course materials, are stored via a third-party cloud storage provider. We implement reasonable technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse. However, no system is entirely secure, and we cannot guarantee absolute protection.`,
  },
  {
    id: "retention",
    title: "7. Data Retention",
    content: `We retain your personal data for as long as your account remains active or as necessary to provide our services. If you delete your account, we will remove your personal data within a reasonable timeframe, except where retention is required for legal or legitimate business purposes.`,
  },
  {
    id: "rights",
    title: "8. Your Rights",
    content: `Depending on your location, you may have the right to:\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your data\n• Withdraw consent where our processing is based on consent\n• Lodge a complaint with a relevant data protection authority\n\nTo exercise any of these rights, contact us at support@cognify.com. We will respond within a reasonable timeframe.`,
  },
  {
    id: "third-party",
    title: "9. Third-Party Links",
    content: `The Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies before providing any personal information.`,
  },
  {
    id: "children",
    title: "10. Children's Privacy",
    content: `Cognify is not directed at children under the age of 13. We do not knowingly collect personal information from children. If we become aware that a child under 13 has provided us with personal data, we will take steps to delete that information promptly.`,
  },
  {
    id: "changes",
    title: "11. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will revise the effective date at the top of this page. For significant changes, we may notify you via the Platform or by email. Continued use of the Platform after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "12. Contact Us",
    content: `If you have questions, concerns, or requests related to this Privacy Policy or how we handle your data, please contact us at support@cognify.com.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">
            Legal
          </p>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-base">
            Effective Date:{" "}
            <span className="text-foreground font-medium">April 6, 2026</span>
          </p>
          <p className="text-muted-foreground text-sm mt-4 max-w-xl leading-relaxed">
            Your privacy matters to us. This policy explains how Cognify
            collects, uses, and safeguards your personal information when you
            use our platform.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                {section.title}
              </h2>
              <div className="text-muted-foreground text-sm leading-7 space-y-3">
                {section.content.split("\n").map((line, i) =>
                  line === "" ? null : (
                    <p key={i} className={line.startsWith("•") ? "pl-4" : ""}>
                      {line}
                    </p>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            This Privacy Policy was last updated on April 6, 2026. For
            questions, contact us at{" "}
            <a
              href="mailto:support@cognify.com"
              className="text-primary hover:underline"
            >
              support@cognify.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
