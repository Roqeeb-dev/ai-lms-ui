import Client from "./Client";

export const metadata = {
  title: "Forgot Password",
  description: "Reset your Cognify password and get back to learning",
};

export default function ForgotPassword() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Client />
    </main>
  );
}
