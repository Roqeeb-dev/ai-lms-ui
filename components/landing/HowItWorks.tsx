export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create your account",
      desc: "Sign up in seconds. Choose whether you're here to learn or to teach.",
      color: "text-primary",
      border: "border-primary/20",
      bg: "bg-primary/5",
    },
    {
      number: "02",
      title: "Find your course",
      desc: "Browse published courses across any subject. Enroll with a single click.",
      color: "text-secondary",
      border: "border-secondary/20",
      bg: "bg-secondary/5",
    },
    {
      number: "03",
      title: "Learn at your pace",
      desc: "Watch videos, read documents, tackle quizzes, and ask your AI tutor anything.",
      color: "text-accent",
      border: "border-accent/20",
      bg: "bg-accent/5",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-4 md:px-8 bg-card border-y border-border"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
            Up and running
            <br />
            <span className="text-primary">in three steps.</span>
          </h2>
          <p className="text-base text-foreground-muted leading-relaxed">
            No complicated setup. No onboarding maze. Just sign up and start
            learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col gap-4 relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%+0px)] w-full h-px border-t border-dashed border-border z-0" />
              )}
              <div
                className={`w-14 h-14 rounded-2xl border-2 ${step.border} ${step.bg} flex items-center justify-center shrink-0`}
              >
                <span className={`text-lg font-black ${step.color}`}>
                  {step.number}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
