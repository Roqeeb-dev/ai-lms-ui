import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import ToastContainer from "@/components/ToastContainer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  alternates: {
    canonical: "https://ai-lms-ui.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        try {
          const theme = localStorage.getItem("theme-storage");
          const parsed = theme ? JSON.parse(theme) : null;
          const stored = parsed?.state?.theme;

          const finalTheme =
  stored ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

          if (finalTheme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.style.colorScheme = "dark";
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.style.colorScheme = "light";
          }
        } catch (e) {}
      })();
    `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
