"use client";

import { useUserStore } from "@/store/useUserStore";
import PasswordSection from "@/components/PasswordSection";
import NotificationsSection from "@/components/NotificationSection";
import DangerSection from "@/components/DangerSection";
import AppearanceSection from "@/components/AppearanceSection";

export default function SettingsClient() {
  const user = useUserStore((state) => state.user);

  if (!user)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-foreground-muted">No user session found.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-foreground-muted">
          Manage your account preferences and security.
        </p>
      </div>

      <PasswordSection />
      <NotificationsSection />
      <AppearanceSection />
      <DangerSection />
    </div>
  );
}
