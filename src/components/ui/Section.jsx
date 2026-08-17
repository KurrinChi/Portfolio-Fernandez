import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AnimatedTitle({ text }) {
  const { ref, inView } = useInView({ threshold: 0.42, triggerOnce: true });
  const chars = text.split("");

  return (
    <h2
      ref={ref}
      className="font-display text-3xl font-semibold tracking-tight text-zinc-50 md:text-5xl"
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(10px)" }
          }
          transition={{ duration: 0.42, delay: index * 0.018 }}
        >
          {char === " " ? "\u00a0" : char}
        </motion.span>
      ))}
    </h2>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-4 py-20 md:px-6 ${className}`}
    >
      {(eyebrow || title || subtitle) && (
        <header className="mb-10 space-y-3">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
              {eyebrow}
            </p>
          )}
          {title && <AnimatedTitle text={title} />}
          {subtitle && <p className="max-w-3xl text-zinc-300">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
