import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function AmbientMotion() {
  const reduceMotion = useReducedMotionPreference();

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 4,
      })),
    [],
  );

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-[28vh] left-[-10vw] h-[52vh] w-[52vh] rounded-full bg-cyan-400/12 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -16, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[30vh] right-[-8vw] h-[58vh] w-[58vh] rounded-full bg-fuchsia-500/12 blur-3xl"
        animate={{ x: [0, -38, 20, 0], y: [0, -18, 14, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.14),transparent_62%)]"
        animate={{ opacity: [0.22, 0.34, 0.22] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-200/35"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 16, 0],
            opacity: [0.1, 0.6, 0.15],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
