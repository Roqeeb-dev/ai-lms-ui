"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Role } from "@/types/user";
import { useUserStore } from "@/store/useUserStore";
import { auth } from "@/services/authService";
import DashboardTopbar from "@/components/DashboardTopbar";
import StudentSidebar from "./sidebars/StudentSidebar";
import InstructorSidebar from "./sidebars/InstructorSidebar";
import AdminSidebar from "./sidebars/AdminSidebar";

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard/student/courses/")) {
    return "Course Details";
  }

  if (pathname.startsWith("/dashboard/student/")) {
    switch (pathname) {
      case "/dashboard/student":
        return "Home";
      case "/dashboard/student/courses":
        return "My Courses";
      case "/dashboard/student/progress":
        return "Progress";
      case "/dashboard/student/browse":
        return "Explore Courses";
      case "/dashboard/student/quizzes":
        return "Quizzes";
      case "/dashboard/student/ai-tutor":
        return "AI Tutor";
      case "/dashboard/student/profile":
        return "Profile";
      case "/dashboard/student/settings":
        return "Settings";
      default:
        return "Student Dashboard";
    }
  }

  if (pathname.startsWith("/dashboard/instructor/course-builder")) {
    return "Course Builder";
  }

  if (pathname.startsWith("/dashboard/instructor/")) {
    switch (pathname) {
      case "/dashboard/instructor":
        return "Home";
      case "/dashboard/instructor/courses":
        return "My Courses";
      case "/dashboard/instructor/students":
        return "Students";
      case "/dashboard/instructor/quizzes":
        return "Quizzes";
      case "/dashboard/instructor/analytics":
        return "Analytics";
      case "/dashboard/instructor/profile":
        return "Profile";
      case "/dashboard/instructor/settings":
        return "Settings";
      default:
        return "Instructor Dashboard";
    }
  }

  if (pathname.startsWith("/dashboard/admin/")) {
    switch (pathname) {
      case "/dashboard/admin":
        return "Home";
      case "/dashboard/admin/users":
        return "Users";
      case "/dashboard/admin/courses":
        return "Courses";
      case "/dashboard/admin/analytics":
        return "Analytics";
      case "/dashboard/admin/reports":
        return "Reports";
      case "/dashboard/admin/billing":
        return "Billing";
      case "/dashboard/admin/settings":
        return "Settings";
      default:
        return "Admin Dashboard";
    }
  }

  return "Dashboard";
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopPinned, setDesktopPinned] = useState(false);
  const [hydrating, setHydrating] = useState(true);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const pathname = usePathname();
  const router = useRouter();
  const pageTitle = getPageTitle(pathname);

  // close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (user) {
      setHydrating(false);
      return;
    }
    async function fetchUser() {
      try {
        const res = await auth.checkUser();
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
    const props = {
      mobileOpen,
      desktopPinned,
      onMobileClose: () => setMobileOpen(false),
    };
    if (role === "student") return <StudentSidebar {...props} />;
    if (role === "instructor") return <InstructorSidebar {...props} />;
    return <AdminSidebar {...props} />;
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
          onSidebarToggle={() => {
            if (window.innerWidth < 768) {
              setMobileOpen((prev) => !prev);
            } else {
              setDesktopPinned((prev) => !prev);
            }
          }}
          sidebarOpen={desktopPinned}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
