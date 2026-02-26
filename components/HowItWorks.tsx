"use client";

import { useEffect, useRef, useState } from "react";

const content = {
  student: [
    {
      number: "01",
      label: "Create your account",
      description:
        "Sign up in seconds. No credit card, no setup friction. Just you and a blank slate ready to be shaped.",
    },
    {
      number: "02",
      label: "Tell us your goals",
      description:
        "Pick what you want to learn and why. Cognify builds a personalized path calibrated to your pace and level.",
    },
    {
      number: "03",
      label: "Learn with AI by your side",
      description:
        "Work through your path with an AI tutor that adapts in real time — answering questions, filling gaps, and keeping you moving.",
    },
  ],
  teacher: [
    {
      number: "01",
      label: "Set up your classroom",
      description:
        "Create your educator profile and invite students in minutes. No IT setup, no configuration overhead.",
    },
    {
      number: "02",
      label: "Build or import your curriculum",
      description:
        "Upload existing materials or let Cognify's AI structure a course from scratch around your learning objectives.",
    },
    {
      number: "03",
      label: "Track every learner in real time",
      description:
        "See each student's progress, knowledge gaps, and engagement — and let Cognify flag who needs your attention most.",
    },
  ],
};

type Tab = "student" | "teacher";

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

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-14">
        {/* Header */}
        <div className="text-center flex flex-col gap-5 max-w-xl mx-auto">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              How It Works
            </span>
            <h2 className="text-4xl font-bold text-foreground tracking-tight leading-tight mt-3">
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
            {(["student", "teacher"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
                  tab === t
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {t === "student" ? "I'm a Student" : "I'm a Teacher"}
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

          {steps.map((step, i) => (
            <div
              key={`${tab}-${i}`}
              className={`flex flex-col gap-5 rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center shrink-0 z-10">
                <span className="text-xs font-extrabold text-primary">
                  {step.number}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-foreground leading-snug">
                  {step.label}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
