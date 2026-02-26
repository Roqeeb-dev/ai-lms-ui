import Logo from "./Logo";
import Button from "./Button";

export const links = [
  { text: "Home", to: "" },
  { text: "Features", to: "features" },
  { text: "Testimonials", to: "testimonials" },
  { text: "Pricing", to: "pricing" },
  { text: "How it works", to: "how-it-works" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-5">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={`#${link.to}`}
              className="relative text-sm font-medium text-foreground-muted transition-colors duration-200 hover:text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.text}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="secondary" text="Login" href="/login" />
          <Button variant="primary" text="Sign Up" href="/register" />
        </div>
      </div>
    </header>
  );
}
