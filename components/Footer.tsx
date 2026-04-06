import Logo from "./Logo";

export default function LandingFooter() {
  return (
    <footer className="bg-[#1A0F0A] px-4 md:px-8 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <Logo />
          <p className="text-xs text-white/40 max-w-xs text-center md:text-left">
            AI-powered personalized learning for students and instructors.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "For Instructors", href: "#instructors" },
            { label: "Log in", href: "/login" },
            { label: "Register", href: "/register" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs text-white/50 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Cognify. All rights reserved.
        </p>
        <p className="text-xs text-white/30">Built for learners everywhere.</p>
      </div>
    </footer>
  );
}
