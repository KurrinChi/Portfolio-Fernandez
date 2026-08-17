import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { ProjectCard } from "./ProjectCard";

const SWIPE_THRESHOLD = 80;

export function FeaturedCarousel({ projects }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const reduceMotion = useReducedMotionPreference();

  if (!projects?.length) return null;

  const activeIndex =
    ((page % projects.length) + projects.length) % projects.length;

  const prevIndex = (activeIndex - 1 + projects.length) % projects.length;

  const nextIndex = (activeIndex + 1) % projects.length;

  const paginate = (newDirection) => {
    setPage(([prev]) => [prev + newDirection, newDirection]);
  };

  useEffect(() => {
    if (paused || reduceMotion) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 180 : -180,
      opacity: 0,
    }),

    center: {
      x: 0,
      opacity: 1,
    },

    exit: (direction) => ({
      x: direction > 0 ? -180 : 180,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative h-[32rem] w-full "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Side previews */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="
            absolute
            left-0
            w-[72%]
            -translate-x-[18%]
            scale-[0.82]
            opacity-30
            blur-[1px]
            z-10
          "
        >
          <ProjectCard project={projects[prevIndex]} />
        </div>

        <div
          className="
            absolute
            right-0
            w-[72%]
            translate-x-[18%]
            scale-[0.82]
            opacity-30
            blur-[1px]
            z-10
          "
        >
          <ProjectCard project={projects[nextIndex]} />
        </div>
      </div>

      {/* Main card */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={(e, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) {
              paginate(1);
            } else if (info.offset.x > SWIPE_THRESHOLD) {
              paginate(-1);
            }
          }}
          className="
            absolute
            inset-0
            z-30
            flex
            items-center
            justify-center
            select-none
          "
          style={{
            touchAction: "pan-y",
          }}
        >
          <div className="w-full max-w-5xl">
            <ProjectCard project={projects[activeIndex]} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => setPage([index, index > activeIndex ? 1 : -1])}
            className={`h-2.5 rounded-full transition ${
              index === activeIndex ? "w-9 bg-cyan-300" : "w-2.5 bg-zinc-600"
            }`}
            aria-label={`Show ${project.title}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="
          absolute
          left-4
          top-1/2
          z-40
          -translate-y-1/2
          rounded-full
          border
          border-cyan-500/30
          bg-black/40
          px-3
          py-2
          backdrop-blur
        "
      >
        ←
      </button>

      <button
        onClick={() => paginate(1)}
        className="
          absolute
          right-4
          top-1/2
          z-40
          -translate-y-1/2
          rounded-full
          border
          border-cyan-500/30
          bg-black/40
          px-3
          py-2
          backdrop-blur
        "
      >
        →
      </button>
    </section>
  );
}
