import VerifyClient from "./VerifyClient";

export const metadata = {
  title: "Verify Email",
  description:
    "Verify your email address to complete your Cognify account setup.",
};

export default function VerifyEmail() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <VerifyClient />
    </main>
  );
}
