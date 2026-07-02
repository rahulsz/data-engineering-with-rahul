import { Variants } from "framer-motion";

// --- TypeCastingVisualizer Variants ---
export const castingItemVariants: Variants = {
  initial: { x: -50, opacity: 0, scale: 0.8 },
  animate: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { x: 50, opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
};

export const codeBlockVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }
};

// --- GitStagesVisualizer Variants ---
export const gitCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring", stiffness: 120 } }
};

export const gitArrowVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } }
};

// --- LinuxPipingVisualizer Variants ---
export const logLineVariants: Variants = {
  initial: { x: -20, opacity: 0 },
  animate: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.15, duration: 0.3 }
  }),
  exit: { x: 20, opacity: 0, transition: { duration: 0.2 } }
};

export const filterPulseVariants: Variants = {
  idle: { scale: 1, boxShadow: "0px 0px 0px rgba(249, 115, 22, 0)" },
  active: { 
    scale: 1.05, 
    boxShadow: "0px 0px 15px rgba(249, 115, 22, 0.4)",
    transition: { repeat: Infinity, repeatType: "reverse", duration: 0.5 }
  }
};
