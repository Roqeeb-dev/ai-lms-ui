"use client";

import { motion } from "framer-motion";

const slides = [
  {
    label: "Deep Focus",
    title: "Study sessions that feel effortless",
    description:
      "Cognify keeps your learning flow intact with dynamic pacing, real-time review cues, and distraction-free guidance.",
  },
  {
    label: "Retention Boost",
    title: "Remember more with every review",
    description:
      "Built-in spaced repetition ensures concepts stay fresh, not forgotten after a single session.",
  },
  {
    label: "Instructor Insights",
    title: "Uncover gaps before they become problems",
    description:
      "Instant analytics show which learners need help, which topics lag, and what to focus on next.",
  },
  {
    label: "Adaptive Flow",
    title: "Content that evolves with you",
    description:
      "The platform flexes to your progress, so every lesson feels relevant, personalized, and motivating.",
  },
];

export default function SpotlightCarousel() {
  return (
    <section className="w-full overflow-hidden py-16">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 mb-10 flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">
          Spotlight
        </span>
        <h2 className="text-2xl font-bold text-foreground max-w-md leading-snug">
          A premium learning experience, elevated.
        </h2>
      </div>

      {/* Marquee track with edge fades */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-3 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...slides, ...slides].map((slide, index) => (
            <div
              key={index}
              className="min-w-[260px] max-w-[260px] shrink-0 rounded-2xl border border-border bg-card px-5 py-4 flex flex-col gap-3 hover:border-primary/40 transition-colors duration-300"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                {slide.label}
              </span>
              <h3 className="text-sm font-semibold text-foreground leading-snug">
                {slide.title}
              </h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {slide.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
