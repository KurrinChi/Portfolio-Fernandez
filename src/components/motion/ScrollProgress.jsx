import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const width = useSpring(0, { stiffness: 130, damping: 26, mass: 0.35 });
  const widthStyle = useTransform(width, (value) => `${value}%`);

  useEffect(() => {
    function onScroll() {
      const root = document.documentElement;
      const total = root.scrollHeight - window.innerHeight;
      const value = total > 0 ? window.scrollY / total : 0;
      setProgress(value);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    width.set(progress * 100);
  }, [progress, width]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-500 shadow-[0_0_20px_rgba(0,245,255,0.55)]"
      style={{ width: widthStyle }}
    />
  );
}
