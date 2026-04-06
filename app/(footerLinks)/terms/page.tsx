import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Cognify LMS",
  description:
    "Read Cognify's Terms of Service to understand your rights and responsibilities when using our platform.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using Cognify ("the Platform"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use the Platform.`,
  },
  {
    id: "description",
    title: "2. Description of Service",
    content: `Cognify is an online learning management system that enables instructors to create, publish, and manage courses, and students to discover, enroll in, and complete those courses. We reserve the right to modify, suspend, or discontinue any part of the Platform at any time.`,
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    content: `You must provide accurate, complete, and current information when creating an account. You are solely responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately if you suspect any unauthorized use of your account.`,
  },
  {
    id: "instructor",
    title: "4. Instructor Responsibilities",
    content: `Instructors are solely responsible for all content they upload, publish, or distribute through the Platform. By publishing a course, you confirm that you own or have the legal right to use all content within it, and that such content does not infringe upon any third-party intellectual property rights, violate any applicable laws, or contain misleading or harmful material.`,
  },
  {
    id: "student",
    title: "5. Student Responsibilities",
    content: `Course content accessed through Cognify is for your personal, non-commercial use only. You may not reproduce, distribute, publicly display, or otherwise exploit any course material without the express written permission of the respective instructor or rights holder.`,
  },
  {
    id: "prohibited",
    title: "6. Prohibited Conduct",
    content: `You agree not to engage in any of the following:\n• Upload or distribute content that is unlawful, harmful, defamatory, or infringing\n• Attempt to gain unauthorized access to any part of the Platform or its infrastructure\n• Use the Platform to harass, abuse, impersonate, or harm any person\n• Reverse-engineer, decompile, or copy any part of the Platform\n• Engage in any activity that disrupts or interferes with the Platform's normal operation`,
  },
  {
    id: "payments",
    title: "7. Payments and Refunds",
    content: `Where paid courses are offered, payment is required at the time of enrollment. All transactions are processed through secure third-party payment providers. Refund requests are handled on a case-by-case basis. Please contact our support team within a reasonable period of purchase if you believe you are entitled to a refund.`,
  },
  {
    id: "ip",
    title: "8. Intellectual Property",
    content: `All platform content, branding, design, and technology created by Cognify is our exclusive property and is protected by applicable intellectual property laws. Instructors retain ownership of their course content. By publishing on Cognify, instructors grant us a limited, non-exclusive license to host, display, and deliver that content through the Platform.`,
  },
  {
    id: "termination",
    title: "9. Termination",
    content: `We reserve the right to suspend or permanently terminate any account that violates these Terms, at our sole discretion and without prior notice. Upon termination, your right to access the Platform ceases immediately.`,
  },
  {
    id: "liability",
    title: "10. Limitation of Liability",
    content: `The Platform is provided on an "as is" and "as available" basis. We do not warrant that it will be uninterrupted, error-free, or free of harmful components. To the fullest extent permitted by applicable law, Cognify shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Platform.`,
  },
  {
    id: "changes",
    title: "11. Changes to Terms",
    content: `We may revise these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Your continued use of the Platform following any changes constitutes your acceptance of the revised Terms.`,
  },
  {
    id: "contact",
    title: "12. Contact",
    content: `If you have any questions or concerns regarding these Terms, please reach out to us at support@cognify.com.`,
  },
];

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">
            Legal
          </p>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-base">
            Effective Date:{" "}
            <span className="text-foreground font-medium">April 6, 2026</span>
          </p>
          <p className="text-muted-foreground text-sm mt-4 max-w-xl leading-relaxed">
            Please read these terms carefully before using Cognify. By creating
            an account or accessing any part of the platform, you agree to be
            bound by the following terms and conditions.
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
              <div className="text-muted-foreground text-sm leading-7 space-y-2">
                {section.content.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            These Terms of Service were last updated on April 6, 2026. If you
            have questions, contact us at{" "}
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
