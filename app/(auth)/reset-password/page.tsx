import ResetClient from "./ResetClient";

export const metadata = {
  title: "Reset Password | AI-powered Learning Management System",
  description: "Set a new password for your Cognify account",
};

export default function ResetPassword() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <ResetClient />
    </main>
  );
}
