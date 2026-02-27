"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import DashboardTopbar from "@/components/DashboardTopbar";

const mockUser = {
  fullname: "Ada Lovelace",
  email: "ada@cognify.com",
  role: "student" as const,
  streak: 7,
};

function getPageTitle(pathname: string): string {
  const map: Record<string, string> = {
    // Student
    "/dashboard/student": "Home",
    "/dashboard/student/courses": "My Courses",
    "/dashboard/student/progress": "Progress",
    "/dashboard/student/ai-tutor": "AI Tutor",
    // Teacher
    "/dashboard/teacher": "Home",
    "/dashboard/teacher/classrooms": "Classrooms",
    "/dashboard/teacher/students": "Students",
    "/dashboard/teacher/analytics": "Analytics",
    // Admin
    "/dashboard/admin": "Home",
    "/dashboard/admin/users": "Users",
    "/dashboard/admin/settings": "Settings",
  };
  return map[pathname] ?? "Dashboard";
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar placeholder — replace with role-based sidebar */}
      <aside
        className={`shrink-0 h-full bg-card border-r border-border transition-all duration-300 ease-in-out overflow-hidden
          ${sidebarOpen ? "w-60" : "w-0 border-r-0"}`}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardTopbar
          user={mockUser}
          pageTitle={pageTitle}
          notificationCount={3}
          onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
