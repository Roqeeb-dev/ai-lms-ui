"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Cognify rebuilt how I study completely. The AI tutor explains things in ways my professors never could.",
    name: "Amara Osei",
    role: "Medical Student, University of Lagos",
    initials: "AO",
    color: "#C0522A",
  },
  {
    quote:
      "We rolled Cognify out across our entire training department. Completion rates went from 61% to 94% in two months.",
    name: "Marcus Reid",
    role: "L&D Manager, Helix Corp",
    initials: "MR",
    color: "#2D4A3E",
  },
  {
    quote:
      "I've tried every learning app out there. Nothing adapts to me the way Cognify does. It actually feels personal.",
    name: "Riya Menon",
    role: "Product Designer, self-taught",
    initials: "RM",
    color: "#F5A623",
  },
  {
    quote:
      "The spaced repetition alone is worth it. I retained more from one Cognify course than a full semester of lectures.",
    name: "Daniel Ferreira",
    role: "Software Engineer, Lisbon",
    initials: "DF",
    color: "#8A6A52",
  },
  {
    quote:
      "As an educator, what impresses me most is how Cognify identifies gaps I wouldn't have caught myself.",
    name: "Prof. Sarah Okafor",
    role: "Lecturer, Covenant University",
    initials: "SO",
    color: "#C0522A",
  },
  {
    quote:
      "I passed my certification exam on the first attempt. My study path was entirely built by Cognify.",
    name: "James Whitfield",
    role: "Cloud Architect, AWS certified",
    initials: "JW",
    color: "#2D4A3E",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 fill-accent text-accent"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  t,
  index,
  visible,
}: {
  t: (typeof testimonials)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Stars />
      <p className="text-sm text-foreground leading-relaxed flex-1">
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-border-subtle">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-none">
            {t.name}
          </p>
          <p className="text-xs text-foreground-muted mt-0.5">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="w-full bg-background">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-14">
        {/* Header */}
        <div className="text-center flex flex-col gap-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-foreground tracking-tight leading-tight">
            Learners who{" "}
            <span
              className="text-primary"
              style={{
                textDecorationLine: "underline",
                textDecorationStyle: "wavy",
                textDecorationColor: "#F5A623",
                textUnderlineOffset: "5px",
              }}
            >
              never looked back
            </span>
          </h2>
          <p className="text-base text-foreground-muted leading-relaxed">
            From students to seasoned professionals — here's what learning with
            Cognify actually feels like.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} visible={visible} />
          ))}
        </div>

        {/* Bottom social proof bar */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
          {[
            ["10,000+", "Active learners"],
            ["94%", "Completion rate"],
            ["4.9/5", "Average rating"],
            ["500+", "Courses"],
          ].map(([val, label]) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-extrabold text-primary">
                {val}
              </span>
              <span className="text-xs text-foreground-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
