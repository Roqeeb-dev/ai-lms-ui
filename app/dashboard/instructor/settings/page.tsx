import SettingsClient from "./SettingsClient";

export const metadata = {
  title: "Settings",
  description: "Manage your account settings, notifications, and preferences.",
};

export default function InstructorSettingsPage() {
  return (
    <main>
      <SettingsClient />
    </main>
  );
}
