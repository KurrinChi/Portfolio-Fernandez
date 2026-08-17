import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function FeaturedCarousel({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reduceMotion || paused || projects.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [projects.length, paused, reduceMotion]);

  const cards = projects.map((project, index) => {
    const delta = (index - activeIndex + projects.length) % projects.length;
    let slot = delta;
    if (slot > 2) slot = -1;

    const cardClass =
      slot === 0
        ? "z-30 scale-100 opacity-100"
        : slot === 1
          ? "z-20 translate-x-[16%] scale-[0.93] opacity-75"
          : slot === 2
            ? "z-10 translate-x-[30%] scale-[0.86] opacity-45"
            : "z-10 -translate-x-[16%] scale-[0.9] opacity-0";

    return (
      <motion.article
        key={project.slug}
        className={`absolute left-0 top-0 w-full transform-gpu rounded-2xl border border-zinc-700/80 bg-zinc-900/75 backdrop-blur ${cardClass}`}
        transition={{ duration: 0.6, ease: [0.2, 0.95, 0.35, 1] }}
        animate={{ rotateX: slot === 0 ? 0 : 2, rotateY: slot === 0 ? 0 : -8 }}
      >
        <img
          src={project.thumbnail}
          alt={`${project.title} carousel preview`}
          className="h-52 w-full rounded-t-2xl object-cover"
          loading="lazy"
        />
        <div className="space-y-3 p-5">
          <h3 className="font-display text-xl text-zinc-50">{project.title}</h3>
          <p className="text-sm text-zinc-300">{project.summary}</p>
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex rounded-lg border border-cyan-300/60 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200"
          >
            Open Case Study
          </Link>
        </div>
      </motion.article>
    );
  });

  return (
    <section
      className="relative h-[28.5rem] w-full perspective-[1400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence>{cards}</AnimatePresence>
      <div className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition ${
              index === activeIndex ? "w-9 bg-cyan-300" : "w-2.5 bg-zinc-600"
            }`}
            aria-label={`Show ${project.title}`}
          />
        ))}
      </div>
    </section>
  );
}
