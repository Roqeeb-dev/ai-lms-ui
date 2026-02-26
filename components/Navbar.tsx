import Logo from "./Logo";
import Button from "./Button";

export const links = [
  { text: "Home", to: "" },
  { text: "Features", to: "features" },
  { text: "About", to: "about" },
  { text: "Documentation", to: "docs" },
];

export default function Navbar() {
  return (
    <header className="flex items-center justify-between max-w-7xl mx-auto p-4">
      <Logo />

      <nav className="flex items-center space-x-9">
        {links.map((link, idx) => (
          <a key={idx} href={`#${link.to}`}>
            {link.text}
          </a>
        ))}
      </nav>

      <div className="flex items-center space-x-2">
        <Button variant="primary" text="Login" href="/login" />
        <Button variant="secondary" text="Sign Up" href="/register" />
      </div>
    </header>
  );
}
