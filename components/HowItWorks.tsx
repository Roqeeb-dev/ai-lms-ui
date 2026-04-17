"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, User, Sparkles, Rocket } from "lucide-react";

const content = {
  student: [
    {
      number: "01",
      label: "Create your learning profile",
      description:
        "Sign up in seconds and let Cognify tailor your path to your goals, pace, and preferences.",
      icon: User,
    },
    {
      number: "02",
      label: "Lock in your learning goals",
      description:
        "Choose what matters most and let the platform build a study path that adapts as you grow.",
      icon: BookOpen,
    },
    {
      number: "03",
      label: "Learn with AI guidance",
      description:
        "Study smarter with real-time explanations, review prompts, and next-step recommendations.",
      icon: Sparkles,
    },
  ],
  instructor: [
    {
      number: "01",
      label: "Launch your classroom",
      description:
        "Create your instructor space, onboard learners, and publish your first course in minutes.",
      icon: Rocket,
    },
    {
      number: "02",
      label: "Design curriculum faster",
      description:
        "Use AI-powered course creation or import your existing content for a polished learning journey.",
      icon: BookOpen,
    },
    {
      number: "03",
      label: "Track every learner’s progress",
      description:
        "See who needs support, where gaps exist, and how to help learners reach their goals.",
      icon: Sparkles,
    },
  ],
};

type Tab = "student" | "instructor";

export default function HowItWorks() {
  const [tab, setTab] = useState<Tab>("student");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const steps = content[tab];

  return (
    <section id="how-it-works" className="w-full bg-background-subtle">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-5 max-w-xl mx-auto">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              How It Works
            </span>
            <h2 className="text-3xl font-bold text-foreground tracking-tight leading-tight mt-3">
              Up and running in{" "}
              <span
                className="text-primary"
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "wavy",
                  textDecorationColor: "#F5A623",
                  textUnderlineOffset: "5px",
                }}
              >
                three steps
              </span>
            </h2>
            <p className="text-base text-foreground-muted leading-relaxed mt-3">
              Whether you're here to learn or to teach — getting started takes
              minutes.
            </p>
          </div>

          {/* Tab toggle */}
          <div className="inline-flex self-center rounded-xl border border-border bg-card p-1 gap-1">
            {(["student", "instructor"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                  tab === t
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {t === "student" ? "I'm a Student" : "I'm an Instructor"}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 relative"
        >
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-border via-primary/40 to-border" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={`${tab}-${i}`}
                className={`flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-3xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Step {step.number}
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {step.label}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
