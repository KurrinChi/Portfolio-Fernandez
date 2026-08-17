import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { ProjectCard } from "./src/components/ui/ProjectCard.jsx";

export function FeaturedCarousel({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const reduceMotion = useReducedMotionPreference();

  const dragX = useMotionValue(0);

  const prevIndex = (activeIndex - 1 + projects.length) % projects.length;

  const nextIndex = (activeIndex + 1) % projects.length;

  const paginate = (direction) => {
    setActiveIndex((prev) => {
      const next = (prev + direction + projects.length) % projects.length;

      return next;
    });
  };

  useEffect(() => {
    if (paused || reduceMotion) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  const resetPosition = () => {
    animate(dragX, 0, {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  const handleDragEnd = (_, info) => {
    const threshold = 120;

    if (info.offset.x < -threshold) {
      animate(dragX, -300, {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          dragX.set(0);
          paginate(1);
        },
      });

      return;
    }

    if (info.offset.x > threshold) {
      animate(dragX, 300, {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          dragX.set(0);
          paginate(-1);
        },
      });

      return;
    }

    resetPosition();
  };

  if (!projects?.length) return null;

  return (
    <section
      className="relative h-[32rem] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.06}
        dragMomentum={false}
        style={{
          x: dragX,
          touchAction: "pan-y",
        }}
        onDragEnd={handleDragEnd}
        whileDrag={{
          cursor: "grabbing",
        }}
        className="absolute inset-0 flex items-center justify-center select-none"
      >
        {/* Previous */}
        <div
          className="
            absolute
            left-0
            w-[72%]
            pointer-events-none
            opacity-35
            scale-[0.82]
            -translate-x-[18%]
            z-10
          "
        >
          <ProjectCard project={projects[prevIndex]} />
        </div>

        {/* Active */}
        <div
          className="
            relative
            z-30
            w-full
            max-w-5xl
          "
        >
          <ProjectCard project={projects[activeIndex]} />
        </div>

        {/* Next */}
        <div
          className="
            absolute
            right-0
            w-[72%]
            pointer-events-none
            opacity-35
            scale-[0.82]
            translate-x-[18%]
            z-10
          "
        >
          <ProjectCard project={projects[nextIndex]} />
        </div>
      </motion.div>

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
