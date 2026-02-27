import Client from "./Client";

export const metadata = {
  title: "Forgot Password | AI-powered Learning Management System",
  description: "Reset your Cognify password and get back to learning",
};

export default function ForgotPassword() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <Client />
    </main>
  );
}
