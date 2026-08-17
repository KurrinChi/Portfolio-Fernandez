import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionPreference } from "./useReducedMotionPreference";

export function useLenisScroll() {
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.1,
      duration: 1.06,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      autoRaf: false,
    });

    let frame = 0;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);
}
