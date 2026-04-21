"use client";

import { motion } from "framer-motion";
import { slideUp } from "@/lib/animations/variants";
import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealContent({ children, className, delay }: Props) {
  const variant = delay 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? { ...slideUp, visible: { ...slideUp.visible, transition: { ...(slideUp.visible as any).transition, delay } } }
    : slideUp;

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
