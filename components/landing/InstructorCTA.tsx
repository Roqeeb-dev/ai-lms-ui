import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function InstructorCTA() {
  const perks = [
    "Full course builder with modules and lessons",
    "Video, PDF, text, and quiz lesson types",
    "Student enrollment and progress tracking",
    "Analytics dashboard to monitor engagement",
  ];

  return (
    <section
      id="instructors"
      className="py-24 px-4 md:px-8 bg-foreground relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--background) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary opacity-10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              For instructors
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary-foreground leading-tight">
              Have knowledge
              <br />
              to share?
              <br />
              <span className="text-primary">Build your course.</span>
            </h2>
            <p className="text-base text-primary-foreground/60 leading-relaxed">
              Cognify gives instructors a complete toolkit to create, publish,
              and manage courses — without the complexity.
            </p>
          </div>
          <Link
            href="/register"
            className="flex items-center gap-2 w-fit px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200"
          >
            Start teaching today
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {perks.map((perk) => (
            <div
              key={perk}
              className="flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3.5"
            >
              <CheckCircle size={15} className="text-accent shrink-0" />
              <span className="text-sm text-primary-foreground/80">{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
