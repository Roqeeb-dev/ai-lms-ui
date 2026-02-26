"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";

function NeuralViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);

    const layers = [3, 5, 5, 3];
    const nodes: { x: number; y: number; pulse: number; speed: number }[] = [];

    layers.forEach((count, li) => {
      const x = W * 0.15 + (li / (layers.length - 1)) * (W * 0.7);
      for (let i = 0; i < count; i++) {
        const y = (H / (count + 1)) * (i + 1);
        nodes.push({
          x,
          y,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.02,
        });
      }
    });

    const edges: {
      from: number;
      to: number;
      progress: number;
      speed: number;
      active: boolean;
    }[] = [];
    let layerStart = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const fromCount = layers[l];
      const toStart = layerStart + fromCount;
      const toCount = layers[l + 1];
      for (let f = layerStart; f < layerStart + fromCount; f++) {
        for (let t = toStart; t < toStart + toCount; t++) {
          edges.push({
            from: f,
            to: t,
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.004,
            active: Math.random() > 0.4,
          });
        }
      }
      layerStart += fromCount;
    }

    const colorPrimary = "#C0522A";
    const colorAccent = "#F5A623";
    const colorSecondary = "#2D4A3E";
    const colorMuted = "#D4B99A";

    let raf: number;

    function draw() {
      if (!ctx) return null;

      ctx.clearRect(0, 0, W, H);

      // ── Edges ──
      edges.forEach((e) => {
        const from = nodes[e.from];
        const to = nodes[e.to];

        // Static line
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = colorMuted + "55";
        ctx.lineWidth = 1;
        ctx.stroke();

        if (!e.active) return;

        // Traveling signal dot
        e.progress += e.speed;
        if (e.progress > 1) {
          e.progress = 0;
          e.active = Math.random() > 0.15;
        }

        const px = from.x + (to.x - from.x) * e.progress;
        const py = from.y + (to.y - from.y) * e.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = colorAccent;
        ctx.fill();
      });

      // Reactivate dormant edges occasionally
      edges.forEach((e) => {
        if (!e.active && Math.random() < 0.003) e.active = true;
      });

      // ── Nodes ──
      nodes.forEach((n, i) => {
        n.pulse += n.speed;
        const glow = (Math.sin(n.pulse) + 1) / 2;

        // Outer glow ring
        const grad = ctx.createRadialGradient(
          n.x,
          n.y,
          2,
          n.x,
          n.y,
          14 + glow * 6,
        );
        grad.addColorStop(0, colorPrimary + "CC");
        grad.addColorStop(1, colorPrimary + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, 14 + glow * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core node — color by layer
        const layerColors = [
          colorSecondary,
          colorPrimary,
          colorPrimary,
          colorAccent,
        ];
        let layerIdx = 0,
          acc = 0;
        for (let l = 0; l < layers.length; l++) {
          acc += layers[l];
          if (i < acc) {
            layerIdx = l;
            break;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, 5 + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = layerColors[layerIdx];
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

// ── Floating stat card
function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: string;
}) {
  return (
    <div
      className="absolute bg-card border border-border rounded-xl px-4 py-3 shadow-md flex flex-col gap-0.5"
      style={{ animationDelay: delay }}
    >
      <span className="text-lg font-bold text-primary leading-none">
        {value}
      </span>
      <span className="text-xs text-foreground-muted">{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #C0522A22 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #C0522A 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-7">
          <div className="inline-flex items-center gap-2 self-start border border-border bg-card rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-foreground-muted tracking-wide">
              AI-powered · 10,000+ learners · 500+ courses
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground">
            Learn smarter with{" "}
            <span
              className="relative inline-block text-primary"
              style={{
                textDecorationLine: "underline",
                textDecorationStyle: "wavy",
                textDecorationColor: "#F5A623",
                textUnderlineOffset: "6px",
              }}
            >
              AI
            </span>{" "}
            that adapts to <span className="text-primary">you.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-foreground-muted leading-relaxed max-w-md">
            Cognify builds a personalized learning path around your goals, pace,
            and style, then evolves as you grow. Education that finally feels
            like it was made for you.
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="primary"
                text="Start Learning Free"
                href="/register"
              />
              <Button
                variant="secondary"
                text="See how it works"
                href="#features"
              />
            </div>
          </div>

          {/* Social proof avatars */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {["#C0522A", "#2D4A3E", "#F5A623", "#8A6A52"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {["A", "M", "R", "S"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-foreground-muted">
              Joined by{" "}
              <span className="text-foreground font-medium">10,000+</span>{" "}
              learners this month
            </p>
          </div>
        </div>

        {/* ── Right: AI Visualization ── */}
        <div className="relative h-[480px] lg:h-[520px]">
          {/* Main viz card */}
          <div className="absolute inset-0 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 40%, #F5A62318 0%, transparent 70%)",
              }}
            />
            <NeuralViz />
          </div>

          {/* Floating stat cards */}
          <StatCard value="94%" label="Completion rate" delay="0ms" />
          <StatCard value="2.4×" label="Faster retention" delay="200ms" />
          <StatCard value="48h" label="Avg. to first milestone" delay="400ms" />

          {/* Position the cards */}
          <style>{`
            .absolute.bg-card:nth-of-type(2) { top: 16px; right: -16px; }
            .absolute.bg-card:nth-of-type(3) { bottom: 80px; right: -20px; }
            .absolute.bg-card:nth-of-type(4) { bottom: 16px; left: -16px; }
          `}</style>
        </div>
      </div>
    </section>
  );
}
