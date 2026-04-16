"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { hoverScale, tapPress } from "@/animations/micro-interactions";
import { cn } from "@/lib/cn";
import React from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size"> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  primary: "bg-brand-600 text-white hover:bg-brand-500 shadow-sm",
  ghost: "bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
  outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 py-2 text-sm",
  lg: "h-12 px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const compClassName = cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as { className?: string };
    return React.cloneElement(children, {
      className: cn(compClassName, childProps.className),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  }

  return (
    <motion.button
      whileHover={hoverScale}
      whileTap={tapPress}
      className={compClassName}
      {...props}
    >
      {children}
    </motion.button>
  );
}
