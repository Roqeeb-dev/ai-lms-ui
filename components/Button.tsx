"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  variant: "primary" | "secondary";
  href: string;
  text: string;
  icon?: React.ElementType;
}

export default function Button({
  variant,
  href,
  text,
  icon: Icon,
}: ButtonProps) {
  const router = useRouter();
  const primaryStyles = "bg-primary text-white";
  const secondaryStyles = "bg-background text-primary hover:bg-blue-100";

  return (
    <button
      className={`${variant === "primary" ? primaryStyles : secondaryStyles} flex items-center space-x-2 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition hover:opacity-90 active:scale-[0.98]`}
      onClick={() => router.push(href)}
    >
      <span>{text}</span>
      {Icon && <Icon />}
    </button>
  );
}
