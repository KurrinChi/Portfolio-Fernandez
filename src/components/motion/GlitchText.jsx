import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function GlitchText({ children, className = "", as: Tag = "span" }) {
  const reduceMotion = useReducedMotionPreference();

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      className="relative inline-block"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <Tag className={`${className} relative z-10`}>{children}</Tag>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 text-cyan-300 mix-blend-screen"
        variants={{
          rest: { opacity: 0, x: 0 },
          hover: { opacity: 0.9, x: -2 },
        }}
        transition={{ duration: 0.14 }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 text-fuchsia-400 mix-blend-screen"
        variants={{
          rest: { opacity: 0, x: 0 },
          hover: { opacity: 0.85, x: 2 },
        }}
        transition={{ duration: 0.14 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
