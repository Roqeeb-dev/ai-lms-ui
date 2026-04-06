import Link from "next/link";
import { GraduationCap, ArrowRight, BookOpen } from "lucide-react";

export default function LandingFinalCTA() {
  return (
    <section className="py-24 px-4 md:px-8 bg-card border-t border-border">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <GraduationCap size={24} className="text-primary" />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
            Start learning today.
          </h2>
          <p className="text-base text-foreground-muted leading-relaxed max-w-md mx-auto">
            Join Cognify and take control of your learning — or share your
            expertise with the world.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/register"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 w-full sm:w-auto justify-center"
          >
            Create free account
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/dashboard/student/browse"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <BookOpen size={15} />
            Browse courses
          </Link>
        </div>
      </div>
    </section>
  );
}
