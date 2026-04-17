import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import SpotlightCarousel from "@/components/SpotlightCarousel";
import CTABanner from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <SpotlightCarousel />
      <HowItWorks />
      <CTABanner />
    </main>
  );
}
