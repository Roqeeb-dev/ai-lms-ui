"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    label: "Adaptive Learning Paths",
    headline: "A curriculum that evolves with you",
    description:
      "Cognify maps your knowledge gaps in real time and builds a path unique to your pace, goals, and style.",
    image: "/images/features/adaptive-learning.png",
    alt: "Adaptive learning path visualization",
    span: "md:col-span-2",
  },
  {
    label: "AI Tutor",
    headline: "Ask anything. Understand everything.",
    description:
      "Your AI tutor answers questions and breaks down concepts the moment you get stuck.",
    image: "/images/features/ai-tutor.png",
    alt: "AI tutor interface",
    span: "md:col-span-1",
  },
  {
    label: "Progress Intelligence",
    headline: "See exactly where you stand",
    description:
      "Deep analytics surface your strengths and weak points so you always know what to tackle next.",
    image: "/images/features/progress.png",
    alt: "Progress analytics dashboard",
    span: "md:col-span-1",
  },
  {
    label: "Spaced Repetition",
    headline: "Remember what you learn, forever",
    description:
      "Cognify schedules reviews at the exact moment your memory starts to fade — proven science, fully automated.",
    image: "/images/features/spaced-repetition.png",
    alt: "Spaced repetition schedule",
    span: "md:col-span-2",
  },
];

export default function Features() {
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
    <section id="features" className="w-full bg-background-subtle">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-14">
        {/* Header */}
        <div className="text-center flex flex-col gap-3 max-w-xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Features
          </span>
          <h2 className="text-4xl font-bold text-foreground tracking-tight leading-tight">
            Everything you need to{" "}
            <span
              className="text-primary"
              style={{
                textDecorationLine: "underline",
                textDecorationStyle: "wavy",
                textDecorationColor: "#F5A623",
                textUnderlineOffset: "5px",
              }}
            >
              go further
            </span>
          </h2>
          <p className="text-base text-foreground-muted leading-relaxed">
            Proven learning science meets AI precision — so every minute you
            spend actually sticks.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.span} group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/9] bg-muted">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 p-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                  {f.label}
                </span>
                <h3 className="text-lg font-bold text-foreground leading-snug">
                  {f.headline}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {f.description}
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
