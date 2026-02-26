"use client";

import Button from "./Button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description:
      "Everything you need to start learning. No time limit, no credit card.",
    features: [
      "Personalized learning path",
      "AI Tutor (20 questions/day)",
      "Progress tracking",
      "5 courses",
    ],
    cta: "Get started free",
    href: "/register",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    per: "/ month",
    description: "For serious learners who want the full Cognify experience.",
    features: [
      "Everything in Free",
      "Unlimited AI Tutor",
      "Advanced analytics",
      "Unlimited courses",
      "Priority support",
    ],
    cta: "Start Pro",
    href: "/register?plan=pro",
    highlight: true,
  },
  {
    name: "Institution",
    price: "Custom",
    description: "For schools, universities, and training teams.",
    features: [
      "Everything in Pro",
      "Classroom management",
      "Bulk enrollment",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact us",
    href: "/contact",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-background">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-14">
        {/* Header */}
        <div className="text-center flex flex-col gap-3 max-w-lg mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Pricing
          </span>
          <h2 className="text-4xl font-bold text-foreground tracking-tight leading-tight">
            Start free.{" "}
            <span
              className="text-primary"
              style={{
                textDecorationLine: "underline",
                textDecorationStyle: "wavy",
                textDecorationColor: "#F5A623",
                textUnderlineOffset: "5px",
              }}
            >
              Grow when ready.
            </span>
          </h2>
          <p className="text-base text-foreground-muted leading-relaxed">
            Cognify is free to use — forever. Pro is there when you're ready to
            go deeper.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col gap-6 rounded-2xl border p-8 transition-all duration-200 ${
                plan.highlight
                  ? "border-primary bg-card shadow-md"
                  : "border-border bg-card/60 shadow-sm"
              }`}
            >
              {/* Badge */}
              {plan.highlight && (
                <span className="self-start text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1">
                  Most Popular
                </span>
              )}

              {/* Price */}
              <div>
                <p className="text-sm font-semibold text-foreground-muted mb-1">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">
                    {plan.price}
                  </span>
                  {plan.per && (
                    <span className="text-sm text-foreground-muted">
                      {plan.per}
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground-muted mt-2 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "primary" : "secondary"}
                text={plan.cta}
                href={plan.href}
              />
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-xs text-foreground-muted">
          No contracts. No hidden fees. Cancel or downgrade anytime.
        </p>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
