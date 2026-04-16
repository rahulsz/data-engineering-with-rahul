import { Variants, Transition } from "framer-motion"

export const pageVariants: Variants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -16 }
}

export const layoutTransition: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30
}
