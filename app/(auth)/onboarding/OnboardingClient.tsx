"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OptionCard from "@/components/OptionCard";
import { ROLES } from "@/types/roles";

type Role = (typeof ROLES)[keyof typeof ROLES];

interface OnboardingState {
  role: Role;
  purpose: string;
  focusArea: string;
  level: string;
  pace: string;
}

const purposeOptions = {
  [ROLES.STUDENT]: [
    { value: "career", label: "Career change", icon: "💼" },
    { value: "school", label: "School / university", icon: "🎓" },
    { value: "certification", label: "Get certified", icon: "📜" },
    { value: "personal", label: "Personal growth", icon: "🌱" },
    { value: "curiosity", label: "Just curious", icon: "✨" },
  ],
  [ROLES.INSTRUCTOR]: [
    { value: "school", label: "School / K-12", icon: "🏫" },
    { value: "university", label: "University", icon: "🎓" },
    { value: "corporate", label: "Corporate training", icon: "💼" },
    { value: "independent", label: "Independent educator", icon: "🌱" },
  ],
};

const focusAreas = [
  { value: "technology", label: "Technology", icon: "💻" },
  { value: "business", label: "Business", icon: "📈" },
  { value: "design", label: "Design", icon: "🎨" },
  { value: "science", label: "Science", icon: "🔬" },
  { value: "languages", label: "Languages", icon: "🌍" },
  { value: "health", label: "Health", icon: "🧬" },
  { value: "arts", label: "Arts", icon: "🎭" },
  { value: "math", label: "Mathematics", icon: "📐" },
];

const levels = [
  {
    value: "beginner",
    label: "Complete beginner",
    description: "Starting from scratch",
  },
  { value: "some", label: "Some experience", description: "Know the basics" },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Comfortable with fundamentals",
  },
  { value: "advanced", label: "Advanced", description: "Looking to go deeper" },
];

const paces = [
  { value: "15", label: "15 min / day", description: "Light and steady" },
  { value: "30", label: "30 min / day", description: "Consistent progress" },
  { value: "60", label: "1 hr+ / day", description: "Full commitment" },
];

const TOTAL_STEPS = 3;

export default function OnboardingClient() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [data, setData] = useState<OnboardingState>({
    role: ROLES.STUDENT,
    purpose: "",
    focusArea: "",
    level: "",
    pace: "",
  });

  function set<K extends keyof OnboardingState>(
    key: K,
    value: OnboardingState[K],
  ) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function navigate(dir: "forward" | "back") {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      if (dir === "forward")
        step === TOTAL_STEPS - 1 ? setCompleted(true) : setStep((s) => s + 1);
      else setStep((s) => s - 1);
      setAnimating(false);
    }, 250);
  }

  const canProceed = [data.purpose, data.focusArea, data.level && data.pace][
    step
  ];

  const steps = [
    {
      question:
        data.role === ROLES.STUDENT
          ? "What are you learning for?"
          : "What kind of teaching do you do?",
      content: (
        <>
          <div className="grid grid-cols-2 rounded-lg border border-border bg-card p-1 gap-1">
            {[ROLES.STUDENT, ROLES.INSTRUCTOR].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  set("role", r);
                  set("purpose", "");
                }}
                className={`py-2 rounded-md text-sm font-semibold capitalize transition-all duration-200 ${
                  data.role === r
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {r === ROLES.STUDENT ? "Student" : "Instructor"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {purposeOptions[data.role].map((o) => (
              <OptionCard
                key={o.value}
                icon={o.icon}
                label={o.label}
                selected={data.purpose === o.value}
                onClick={() => set("purpose", o.value)}
              />
            ))}
          </div>
        </>
      ),
    },
    {
      question: "What's your main focus area?",
      content: (
        <div className="grid grid-cols-2 gap-2">
          {focusAreas.map((o) => (
            <OptionCard
              key={o.value}
              icon={o.icon}
              label={o.label}
              selected={data.focusArea === o.value}
              onClick={() => set("focusArea", o.value)}
            />
          ))}
        </div>
      ),
    },
    {
      question: "Your level and pace",
      content: (
        <>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Current level
            </p>
            <div className="grid grid-cols-2 gap-2">
              {levels.map((o) => (
                <OptionCard
                  key={o.value}
                  label={o.label}
                  description={o.description}
                  selected={data.level === o.value}
                  onClick={() => set("level", o.value)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Daily commitment
            </p>
            <div className="grid grid-cols-3 gap-2">
              {paces.map((o) => (
                <OptionCard
                  key={o.value}
                  label={o.label}
                  description={o.description}
                  selected={data.pace === o.value}
                  onClick={() => set("pace", o.value)}
                />
              ))}
            </div>
          </div>
        </>
      ),
    },
  ];

  if (completed) {
    const focusLabel = focusAreas.find((f) => f.value === data.focusArea);

    function goToDashboard() {
      if (data.role === ROLES.STUDENT) {
        router.push("/dashboard/student");
      } else if (data.role === ROLES.INSTRUCTOR) {
        router.push("/dashboard/instructor");
      } else {
        router.push("/dashboard/admin");
      }
    }

    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-lg flex flex-col items-center gap-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-accent opacity-20 blur-2xl scale-150" />
            <div className="relative w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-2xl">
              ✦
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl font-bold text-foreground">
              You're all set
            </h1>
            <p className="text-sm text-foreground-muted">
              Cognify is building your personalized learning path.
            </p>
          </div>
          <div className="w-full rounded-2xl border border-border bg-card p-4 flex flex-col gap-3 text-left">
            {[
              {
                label: "Role",
                value: data.role === ROLES.STUDENT ? "Student" : "Instructor",
              },
              {
                label: "Focus area",
                value: `${focusLabel?.icon} ${focusLabel?.label}`,
              },
              {
                label: "Level",
                value: levels.find((l) => l.value === data.level)?.label,
              },
              {
                label: "Daily commitment",
                value: paces.find((p) => p.value === data.pace)?.label,
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
                  {label}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={goToDashboard}
            className="w-full rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            Go to my dashboard →
          </button>
        </div>
      </main>
    );
  }

  const current = steps[step];

  return (
    <main className="min-h-screen bg-background flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-foreground-muted">
            <span className="font-semibold tracking-widest uppercase">
              Step {step + 1} of {TOTAL_STEPS}
            </span>
            <span>{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Step */}
        <div
          className={`flex flex-col gap-5 transition-all duration-250 ${
            animating
              ? direction === "forward"
                ? "opacity-0 -translate-x-3"
                : "opacity-0 translate-x-3"
              : "opacity-100 translate-x-0"
          }`}
        >
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            {current.question}
          </h1>
          {current.content}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => navigate("back")}
              className="flex-1 rounded-lg border border-border bg-card text-foreground px-3 py-2 text-sm font-semibold hover:bg-muted transition-all duration-200"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("forward")}
            disabled={!canProceed}
            className="flex-1 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-40 disabled:pointer-events-none"
          >
            {step === TOTAL_STEPS - 1 ? "Finish" : "Next →"}
          </button>
        </div>
      </div>
    </main>
  );
}
