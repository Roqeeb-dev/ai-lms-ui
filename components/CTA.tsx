"use client";

import Button from "./Button";

export default function CTABanner() {
  return (
    <section className="w-full bg-background-subtle">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative rounded-2xl border border-primary/20 bg-card overflow-hidden px-8 py-16 flex flex-col items-center text-center gap-7">
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #C0522A 0%, transparent 65%)",
            }}
          />

          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, #C0522A33 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col items-center gap-4 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              Get Started
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Your smartest learning decision{" "}
              <span
                className="text-primary"
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "wavy",
                  textDecorationColor: "#F5A623",
                  textUnderlineOffset: "5px",
                }}
              >
                starts here.
              </span>
            </h2>
            <p className="text-base text-foreground-muted leading-relaxed">
              Join 10,000+ learners already growing with Cognify. Free to start,
              built to last.
            </p>
          </div>

          <div className="relative flex items-center gap-3 flex-wrap justify-center">
            <Button
              variant="primary"
              text="Start Learning Free"
              href="/register"
            />
            <Button variant="secondary" text="Talk to us" href="/contact" />
          </div>

          <p className="relative text-xs text-muted-foreground">
            No credit card required · Free forever plan · Cancel anytime
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
