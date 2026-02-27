"use client";

import DashboardTopbar from "@/components/DashboardTopbar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main>
      <DashboardTopbar
        user={{
          fullname: "Ada Lovelace",
          email: "ada@cognify.com",
          role: "student",
          streak: 7,
        }}
        pageTitle="My Courses"
        notificationCount={3}
        onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
      />
      {children}
    </main>
  );
}
