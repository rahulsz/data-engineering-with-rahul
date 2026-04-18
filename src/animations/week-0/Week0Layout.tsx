"use client";

import { motion } from "framer-motion";
import { week0Item } from "./variants";
import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function Week0Layout({ children, className, delay = 0 }: Props) {
  const dynamicVariant = {
    ...week0Item,
    visible: {
      ...week0Item.visible,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { ...(week0Item.visible as any).transition, delay }
    }
  };

  return (
    <motion.div
      variants={dynamicVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
