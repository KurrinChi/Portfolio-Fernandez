import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

const VARIANTS = {
  slide: {
    initial: { opacity: 0, y: 28 },
    shown: { opacity: 1, y: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96, y: 10 },
    shown: { opacity: 1, scale: 1, y: 0 },
  },
  glow: {
    initial: { opacity: 0, filter: "blur(8px)" },
    shown: { opacity: 1, filter: "blur(0px)" },
  },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "slide",
}) {
  const reduceMotion = useReducedMotionPreference();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const chosen = VARIANTS[variant] || VARIANTS.slide;

  return (
    <motion.div
      className={className}
      initial={chosen.initial}
      whileInView={chosen.shown}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
