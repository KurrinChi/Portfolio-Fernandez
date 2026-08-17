import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";

function StatCounter({ label, value }) {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
  const valueRef = useRef(null);

  useEffect(() => {
    if (!inView || !valueRef.current) return;

    const obj = { count: 0 };
    const tween = gsap.to(obj, {
      count: value,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = `${Math.round(obj.count)}`;
        }
      },
    });

    return () => tween.kill();
  }, [inView, value]);

  return (
    <article
      ref={ref}
      className="rounded-xl border border-cyan-400/30 bg-zinc-900/70 p-4"
    >
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
        {label}
      </p>
      <p ref={valueRef} className="mt-3 font-display text-3xl text-zinc-50">
        0
      </p>
    </article>
  );
}

export function HudStats() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <StatCounter label="Projects Logged" value={12} />
      <StatCounter label="Years Building" value={4} />
      <StatCounter label="Creative Deliveries" value={60} />
    </div>
  );
}
