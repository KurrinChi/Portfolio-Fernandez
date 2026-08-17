import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function CursorGlow() {
  const [point, setPoint] = useState({ x: 0, y: 0, visible: false });
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    function onMove(event) {
      setPoint({ x: event.clientX, y: event.clientY, visible: true });
    }

    function onLeave() {
      setPoint((state) => ({ ...state, visible: false }));
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {point.visible && (
        <motion.div
          key="cursor-glow"
          className="pointer-events-none fixed z-[70] h-44 w-44 rounded-full bg-cyan-400/12 blur-3xl"
          animate={{ x: point.x - 88, y: point.y - 88, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 24,
            mass: 0.4,
          }}
        />
      )}
    </AnimatePresence>
  );
}
