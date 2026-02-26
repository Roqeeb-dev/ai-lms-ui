import RegisterClient from "./RegisterClient";
import SideAnimation from "@/components/SideAnimation";

export const metadata = {
  title: "Register | AI-powered Learning Management System",
  description: "Register as a new user to start enjoying the application",
};

export default function RegisterPage() {
  return (
    <main className="flex h-screen">
      <div className="flex-1 flex items-center justify-center px-6 bg-background">
        <RegisterClient />
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <SideAnimation />
      </div>
    </main>
  );
}
