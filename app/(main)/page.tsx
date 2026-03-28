import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import CTABanner from "@/components/CTA";

export const metadata = {
  metadataBase: new URL("https://ai-lms-ui.vercel.app"),

  title: {
    default: "Cognify LMS – Smart Learning Platform for Students & Instructors",
    template: "%s | Cognify LMS",
  },

  description:
    "An AI-powered Learning Management System designed to help students learn faster and instructors teach smarter. Features include AI tutor, course recommendations, progress tracking, quizzes, and more.",

  keywords: [
    "AI LMS",
    "Learning Management System",
    "AI tutor",
    "online learning platform",
    "student dashboard",
    "course platform",
    "edtech",
  ],

  authors: [{ name: "Shafiriyu Roqeeb Taiwo" }, { name: "Mustapha Tobiloba" }],
  creator: "Shafiriyu Roqeeb",

  openGraph: {
    title: "Cognify LMS – Learn Smarter with AI",
    description:
      "Discover a smarter way to learn with AI-powered tutoring, personalized recommendations, and real-time progress tracking.",
    url: "https://ai-lms-ui.vercel.app",
    siteName: "Cognify LMS",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Cognify LMS Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Cognify LMS – Smart Learning Platform",
    description:
      "AI-powered LMS with tutor, quizzes, and personalized learning experience.",
    images: ["/og-image.jpeg"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  alternates: {
    canonical: "https://ai-lms-ui.vercel.app",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <HowItWorks />
      <Pricing />
      <CTABanner />
    </main>
  );
}
