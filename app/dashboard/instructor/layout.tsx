"use client";

import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "instructor") {
      router.replace("/dashboard/student");
    }
  }, [user]);

  if (!user || user.role !== "instructor") return null;

  return <>{children}</>;
}
