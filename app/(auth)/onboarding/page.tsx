import OnboardingClient from "./OnboardingClient";

export const metadata = {
  title: "Get Started | AI-powered Learning Management System",
  description:
    "Tell us about yourself so Cognify can build a learning path made specifically for you.",
};

export default function Onboarding() {
  return (
    <main>
      <OnboardingClient />
    </main>
  );
}
