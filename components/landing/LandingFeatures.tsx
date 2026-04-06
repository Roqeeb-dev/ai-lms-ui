import {
  BookOpen,
  BarChart2,
  Sparkles,
  ClipboardList,
  GraduationCap,
  PencilLine,
  Layers,
  Users,
} from "lucide-react";

export default function LandingFeatures() {
  const studentFeatures = [
    {
      icon: BookOpen,
      title: "Enroll & Learn",
      desc: "Browse published courses and enroll instantly. Pick up where you left off at any time.",
    },
    {
      icon: BarChart2,
      title: "Track Your Progress",
      desc: "See how far you've come with per-lesson completion tracking and a real-time progress bar.",
    },
    {
      icon: Sparkles,
      title: "AI Tutor",
      desc: "Stuck on a concept? Ask your AI tutor anything and get a clear, instant explanation.",
    },
    {
      icon: ClipboardList,
      title: "Quizzes",
      desc: "Test your understanding with lesson quizzes. See your score, pass rate, and duration.",
    },
  ];

  const instructorFeatures = [
    {
      icon: Layers,
      title: "Course Builder",
      desc: "Organize your course into modules and lessons with a clean, intuitive builder.",
    },
    {
      icon: PencilLine,
      title: "Rich Content Types",
      desc: "Deliver lessons as videos, PDFs, rich text, or quizzes — all in one place.",
    },
    {
      icon: Users,
      title: "Student Management",
      desc: "See who's enrolled in your courses and monitor their progress across lessons.",
    },
    {
      icon: BarChart2,
      title: "Analytics Dashboard",
      desc: "Get a high-level view of enrollments, completions, and learner engagement.",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-3 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
            Everything you need.
            <br />
            <span className="text-primary">Nothing you don't.</span>
          </h2>
          <p className="text-base text-foreground-muted leading-relaxed">
            Cognify gives students a focused learning experience and instructors
            the tools to build and deliver great courses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Students */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap size={14} className="text-primary" />
              </div>
              <span className="text-sm font-bold text-foreground uppercase tracking-widest">
                For Students
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studentFeatures.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={15} className="text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructors */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center">
                <PencilLine size={14} className="text-secondary" />
              </div>
              <span className="text-sm font-bold text-foreground uppercase tracking-widest">
                For Instructors
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {instructorFeatures.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 hover:border-secondary/40 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Icon size={15} className="text-secondary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
