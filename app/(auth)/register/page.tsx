import RegisterClient from "./RegisterClient";
import SideAnimation from "@/components/SideAnimation";

export const metadata = {
  title: "Register | AI-powered Learning Management System",
  description: "Register as a new user to start enjoying the application",
};

export default function RegisterPage() {
  return (
    <main className="flex h-screen">
      <RegisterClient />
      <div className="flex-1">
        <SideAnimation />
      </div>
    </main>
  );
}
