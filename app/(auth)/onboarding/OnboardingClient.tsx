"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "student" | "teacher";

interface OnboardingState {
  role: Role;
  purpose: string;
  focusArea: string;
  level: string;
  pace: string;
}

// ── Step data

const purposeOptions = {
  student: [
    { value: "career", label: "Career change", icon: "💼" },
    { value: "school", label: "School / university", icon: "🎓" },
    { value: "certification", label: "Get certified", icon: "📜" },
    { value: "personal", label: "Personal growth", icon: "🌱" },
    { value: "curiosity", label: "Just curious", icon: "✨" },
  ],
  teacher: [
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

// ── Option card
function OptionCard({
  icon,
  label,
  description,
  selected,
  onClick,
}: {
  icon?: string;
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 w-full
        ${
          selected
            ? "border-primary bg-primary/10 text-foreground"
            : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted"
        }`}
    >
      {icon && <span className="text-xl shrink-0">{icon}</span>}
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{label}</span>
        {description && (
          <span className="text-xs text-foreground-muted">{description}</span>
        )}
      </div>
      <div
        className={`ml-auto w-4 h-4 rounded-full border-2 shrink-0 transition-all duration-200
        ${selected ? "border-primary bg-primary" : "border-border"}`}
      />
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function OnboardingClient() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [data, setData] = useState<OnboardingState>({
    role: "student",
    purpose: "",
    focusArea: "",
    level: "",
    pace: "",
  });

  const TOTAL_STEPS = 3;

  function navigate(to: "next" | "back") {
    if (animating) return;
    const isNext = to === "next";
    setDirection(isNext ? "forward" : "back");
    setAnimating(true);
    setTimeout(() => {
      if (isNext) {
        if (currentIndex === TOTAL_STEPS - 1) {
          setCompleted(true);
        } else setCurrentIndex((i) => i + 1);
      } else {
        setCurrentIndex((i) => i - 1);
      }
      setAnimating(false);
    }, 260);
  }

  // Step validation — require a selection before Next
  const canProceed = [
    data.purpose !== "",
    data.focusArea !== "",
    data.level !== "" && data.pace !== "",
  ][currentIndex];

  const progressWidth = completed
    ? "100%"
    : `${((currentIndex + 1) / TOTAL_STEPS) * 100}%`;

  const purposes = purposeOptions[data.role];

  // ── Steps ──
  const steps = [
    {
      question:
        data.role === "student"
          ? "What are you learning for?"
          : "What kind of teaching do you do?",
      content: (
        <div className="flex flex-col gap-2">
          {/* Role toggle — only on step 0 */}
          <div className="grid grid-cols-2 rounded-lg border border-border bg-card p-1 gap-1 mb-2">
            {(["student", "teacher"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() =>
                  setData((prev) => ({ ...prev, role: r, purpose: "" }))
                }
                className={`py-2 rounded-md text-sm font-semibold capitalize transition-all duration-200 ${
                  data.role === r
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {r === "student" ? "Student" : "Teacher"}
              </button>
            ))}
          </div>
          {purposes.map((o) => (
            <OptionCard
              key={o.value}
              icon={o.icon}
              label={o.label}
              selected={data.purpose === o.value}
              onClick={() => setData((prev) => ({ ...prev, purpose: o.value }))}
            />
          ))}
        </div>
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
              onClick={() =>
                setData((prev) => ({ ...prev, focusArea: o.value }))
              }
            />
          ))}
        </div>
      ),
    },
    {
      question: "Your level and pace",
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Current level
            </p>
            {levels.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                description={o.description}
                selected={data.level === o.value}
                onClick={() => setData((prev) => ({ ...prev, level: o.value }))}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Daily commitment
            </p>
            {paces.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                description={o.description}
                selected={data.pace === o.value}
                onClick={() => setData((prev) => ({ ...prev, pace: o.value }))}
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  // ── Confirmation screen ──────────────────────────────────────────────────
  if (completed) {
    const focusLabel = focusAreas.find((f) => f.value === data.focusArea);
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">
          {/* Glow */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-accent opacity-20 blur-2xl scale-150" />
            <div className="relative w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
              <span className="text-2xl">✦</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              You're all set
            </h1>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Cognify is building your personalized learning path. Here's what
              we'll start with:
            </p>
          </div>

          {/* Summary card */}
          <div className="w-full rounded-2xl border border-border bg-card p-6 flex flex-col gap-3 text-left">
            {[
              {
                label: "Role",
                value: data.role === "student" ? "Student" : "Teacher",
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
            onClick={() => router.push("/dashboard")}
            className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            Go to my dashboard →
          </button>
        </div>
      </main>
    );
  }

  // ── Step view ────────────────────────────────────────────────────────────
  const step = steps[currentIndex];

  return (
    <main className="min-h-screen bg-background flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Step {currentIndex + 1} of {TOTAL_STEPS}
            </span>
            <span className="text-xs text-foreground-muted">
              {Math.round(((currentIndex + 1) / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-in-out"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        {/* Step card */}
        <div
          className={`transition-all duration-260 ease-in-out ${
            animating
              ? direction === "forward"
                ? "opacity-0 -translate-x-4"
                : "opacity-0 translate-x-4"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              {step.question}
            </h1>
            {step.content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={() => navigate("back")}
              className="flex-1 rounded-lg border border-border bg-card text-foreground px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-all duration-200"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("next")}
            disabled={!canProceed}
            className="flex-1 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-40 disabled:pointer-events-none"
          >
            {currentIndex === TOTAL_STEPS - 1 ? "Finish" : "Next →"}
          </button>
        </div>
      </div>
    </main>
  );
}
