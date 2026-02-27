"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Role } from "@/types/user";
import DashboardTopbar from "@/components/DashboardTopbar";
import StudentSidebar from "./sidebars/StudentSidebar";
import TeacherSidebar from "./sidebars/TeacherSidebar";
import AdminSidebar from "./sidebars/AdminSidebar";

// mock data
const user = {
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

  function displayDynamicSidebar(role: Role) {
    if (role === "student") {
      return <StudentSidebar open={sidebarOpen} />;
    } else if (role === "teacher") {
      return <TeacherSidebar open={sidebarOpen} />;
    } else {
      return <AdminSidebar open={sidebarOpen} />;
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {displayDynamicSidebar(user.role)}

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardTopbar
          user={user}
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
