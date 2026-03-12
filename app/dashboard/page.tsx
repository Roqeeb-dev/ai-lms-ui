"use client";

import { redirect } from "next/navigation";
import { Role } from "@/types/user";
import { useUserStore } from "@/store/useUserStore";

export default async function DashboardPage() {
  const user = useUserStore((state) => state.user);

  if (!user) return;

  const role: Role = user.role;

  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  if (role === "teacher") {
    redirect("/dashboard/teacher");
  }

  redirect("/dashboard/student");
}
