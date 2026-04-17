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
    <section className="w-full bg-background-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Spotlight
          </span>
          <h2 className="text-3xl font-bold text-foreground">
            A premium learning experience that looks and feels elevated.
          </h2>
        </div>

        {/* MARQUEE */}
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card">
          <motion.div
            className="flex gap-4 w-max py-8"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 45,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...slides, ...slides].map((slide, index) => (
              <div
                key={index}
                className="min-w-[20rem] max-w-[20rem] shrink-0 rounded-3xl border border-border-subtle bg-background-subtle/80 p-6 backdrop-blur-xl"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  {slide.label}
                </span>

                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {slide.title}
                </h3>

                <p className="mt-3 text-sm text-foreground-muted">
                  {slide.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
