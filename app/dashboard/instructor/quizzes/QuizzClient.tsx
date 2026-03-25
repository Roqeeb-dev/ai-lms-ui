"use client";

import DashboardHeader from "@/components/DashboardHeader";

export default function QuizzClient() {
  return (
    <main className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <DashboardHeader
          title="Quiz"
          text="Create and manage quiz for various lessons and students"
        />

        <button className="flex items-center gap-2 self-start sm:self-auto bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm">
          Create Quiz
        </button>
      </div>
    </main>
  );
}
