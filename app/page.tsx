import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

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
    </main>
  );
}
