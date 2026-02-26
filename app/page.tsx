import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";

export const metadata = {
  title: "Home | AI-powered Learning Management System",
  description:
    "This is the home page which introduces the user to the application",
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <HowItWorks />
    </main>
  );
}
