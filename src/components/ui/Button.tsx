"use client";

import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover glow-accent font-semibold",
  secondary:
    "bg-transparent border border-border hover:border-border-hover text-foreground",
  ghost:
    "bg-transparent hover:bg-surface-elevated text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg font-medium
    transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileTap={{ scale: 0.97 }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
