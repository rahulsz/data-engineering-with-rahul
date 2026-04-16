"use client";

import { motion } from "framer-motion";
import { pageVariants, layoutTransition } from "@/animations/page-transitions";
import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatePageMain({ children, className }: Props) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={layoutTransition}
      className={cn("w-full", className)}
    >
      {children}
    </motion.main>
  );
}
