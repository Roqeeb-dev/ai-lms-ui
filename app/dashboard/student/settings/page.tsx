import SettingsClient from "./SettingsClient";

export const metadata = {
  title: "Settings | Cognify",
  description: "Manage your account settings, notifications, and preferences.",
};

export default function SettingsPage() {
  return (
    <main>
      <SettingsClient />
    </main>
  );
}
