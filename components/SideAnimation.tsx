export default function SideAnimation() {
  return (
    <aside className="relative w-full h-screen bg-primary overflow-hidden flex flex-col justify-between px-14 py-12">
      {/* ── Gradient blobs ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Blob 1 — saffron, top left */}
        <div
          className="absolute w-[480px] h-[480px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "#F5A623",
            top: "-10%",
            left: "-15%",
            animation: "blob1 14s ease-in-out infinite",
          }}
        />

        {/* Blob 2 — forest green, bottom right */}
        <div
          className="absolute w-[420px] h-[420px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "#2D4A3E",
            bottom: "-10%",
            right: "-10%",
            animation: "blob2 18s ease-in-out infinite",
          }}
        />

        {/* Blob 3 — deep terracotta, center */}
        <div
          className="absolute w-[360px] h-[360px] rounded-full opacity-25 blur-2xl"
          style={{
            background: "#8B3A1F",
            top: "35%",
            left: "25%",
            animation: "blob3 22s ease-in-out infinite",
          }}
        />

        {/* Blob 4 — saffron, bottom left */}
        <div
          className="absolute w-[280px] h-[280px] rounded-full opacity-20 blur-2xl"
          style={{
            background: "#F5A623",
            bottom: "10%",
            left: "-5%",
            animation: "blob1 26s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* ── Dot grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative">
        {/* Logo placeholder — swap with <Logo /> */}
        <span className="text-white font-bold text-xl tracking-tight">
          Cognify
        </span>
      </div>

      <div className="relative flex flex-col gap-6 max-w-sm">
        <div className="w-8 h-0.5 bg-accent" />
        <p className="text-2xl font-semibold text-white leading-snug">
          Education that finally feels like it was made for you.
        </p>
        <p className="text-sm text-white/60 leading-relaxed">
          Join 10,000+ learners who found their path with Cognify.
        </p>
      </div>

      <p className="relative text-xs text-white/30">
        © {new Date().getFullYear()} Cognify
      </p>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, -30px) scale(1.08); }
          66%       { transform: translate(-20px, 40px) scale(0.95); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-50px, 30px) scale(1.06); }
          66%       { transform: translate(30px, -40px) scale(0.97); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, 50px) scale(1.1); }
          66%       { transform: translate(-40px, -20px) scale(0.93); }
        }
      `}</style>
    </aside>
  );
}
