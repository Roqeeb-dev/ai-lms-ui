import LoginClient from "./LoginClient";
import SideAnimation from "@/components/SideAnimation";

export const metadata = {
  title: "Login | AI-powered Learning Management System",
  description: "Login as an existing user to continue from where you stopped",
};

export default function Login() {
  return (
    <main className="flex h-screen">
      <div className="hidden lg:block lg:w-1/2">
        <SideAnimation />
      </div>
      <div className="flex-1 flex items-center justify-center px-6 bg-background">
        <LoginClient />
      </div>
    </main>
  );
}
