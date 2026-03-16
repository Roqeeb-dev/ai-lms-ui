"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Role } from "@/types/user";
import { useUserStore } from "@/store/useUserStore";
import { auth } from "@/services/authService";

import DashboardTopbar from "@/components/DashboardTopbar";
import StudentSidebar from "./sidebars/StudentSidebar";
import InstructorSidebar from "./sidebars/InstructorSidebar"; // updated import
import AdminSidebar from "./sidebars/AdminSidebar";

function getPageTitle(pathname: string): string {
  const map: Record<string, string> = {
    "/dashboard/student": "Home",
    "/dashboard/student/courses": "My Courses",
    "/dashboard/student/progress": "Progress",
    "/dashboard/student/ai-tutor": "AI Tutor",
    "/dashboard/instructor": "Home",
    "/dashboard/instructor/classrooms": "Classrooms",
    "/dashboard/instructor/students": "Students",
    "/dashboard/instructor/analytics": "Analytics",
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
  const [hydrating, setHydrating] = useState(true);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const pathname = usePathname();
  const router = useRouter();
  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    if (user) {
      setHydrating(false);
      return;
    }

    async function fetchUser() {
      try {
        const res = await auth.me();
        setUser(res.user);
      } catch {
        router.push("/login");
      } finally {
        setHydrating(false);
      }
    }

    fetchUser();
  }, []);

  function displayDynamicSidebar(role: Role) {
    if (role === "student") return <StudentSidebar open={sidebarOpen} />;
    if (role === "instructor") return <InstructorSidebar open={sidebarOpen} />;
    return <AdminSidebar open={sidebarOpen} />;
  }

  if (hydrating) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {displayDynamicSidebar(user.role)}

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
