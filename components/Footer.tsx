import Logo from "./Logo";

const links = {
  Product: ["Features", "How It Works", "Pricing", "Changelog"],
  Learn: ["Browse Courses", "AI Tutor", "For Students", "For Teachers"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* Top — brand + links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand col */}
          <div className="col-span-2 flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
              AI-powered personalized learning for students, educators, and
              institutions.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-1">
              {["X", "Li", "Gh", "Yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-xs font-semibold text-foreground-muted hover:text-foreground hover:border-primary transition-colors duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-foreground">
                {group}
              </p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-150"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-border-subtle">
          <p className="text-xs text-foreground-muted">
            © {new Date().getFullYear()} Cognify. All rights reserved.
          </p>
          <p className="text-xs text-foreground-muted">
            Built for learners everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
