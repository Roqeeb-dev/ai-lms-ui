"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  variant: "primary" | "secondary";
  href?: string;
  text: string;
  icon?: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  variant,
  href,
  text,
  icon: Icon,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  const router = useRouter();

  const baseStyles = `
    inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`;

  const variants = {
    primary: `bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm hover:shadow-md`,
    secondary: `bg-transparent text-primary border border-primary hover:bg-primary hover:text-primary-foreground`,
  };

  const handleClick = () => {
    if (onClick) return onClick();
    if (href) router.push(href);
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span>{text}</span>
      {Icon && <Icon size={16} />}
    </button>
  );
}
