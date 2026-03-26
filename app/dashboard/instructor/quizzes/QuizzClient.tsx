"use client";

import DashboardHeader from "@/components/DashboardHeader";

export default function QuizzClient() {
  return (
    <main className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Quiz"
        text="Create and manage quiz for various lessons and students"
      />
    </main>
  );
}
