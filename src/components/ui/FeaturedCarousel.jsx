import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

import { ProjectCard } from "./ProjectCard";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

const AUTO_PLAY_DELAY = 5000;
const DRAG_THRESHOLD = 150;

// ==========================================
// CAROUSEL CONFIGURATION
// ==========================================

const CARD_GAP = -120; // <-- DIRECTLY CONTROL CARD SPACING HERE

const CARD_ACTIVE_SCALE = 1;
const CARD_ADJACENT_SCALE = 0.52;
const CARD_FAR_SCALE = 0.32;

export function FeaturedCarousel({ projects }) {
  const reduceMotion = useReducedMotionPreference();

  const viewportRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [renderX, setRenderX] = useState(0);

  const x = useMotionValue(0);

  /*
   * ==========================================
   * Resize Observer
   * ==========================================
   */

  useEffect(() => {
    if (!viewportRef.current) return;

    const observer = new ResizeObserver(() => {
      setWidth(viewportRef.current.clientWidth);
    });

    observer.observe(viewportRef.current);

    setWidth(viewportRef.current.clientWidth);

    return () => observer.disconnect();
  }, []);

  if (!projects?.length) return null;

  /*
   * ==========================================
   * Layout Configuration
   * ==========================================
   */

  const CARD_WIDTH = Math.min(1000, width * 0.62);

  const CENTER_OFFSET = 2;

  const centerX = width / 1.87 + CENTER_OFFSET;

  /*
   * ==========================================
   * Card Positioning
   * ==========================================
   *
   * CARD_GAP is intentionally independent.
   *
   * Change only CARD_GAP above to control
   * the spacing/overlap between cards.
   *
   * Negative = overlap
   * 0       = touching
   * Positive = space between cards
   */

  const cardStep = CARD_WIDTH + CARD_GAP;

  const ACTIVE_CARD_X = 500;

  const centerToIndex = (index) => {
    return ACTIVE_CARD_X - index * cardStep - CARD_WIDTH / 2;
  };

  /*
   * ==========================================
   * Motion Value Tracking
   * ==========================================
   */

  useEffect(() => {
    const unsubscribe = x.on("change", (value) => {
      setRenderX(value);
    });

    return () => unsubscribe();
  }, [x]);

  useEffect(() => {
    if (!width) return;

    x.set(centerToIndex(activeIndex));
  }, [width]);

  /*
   * ==========================================
   * Distance From Center
   * ==========================================
   */

  const distanceFromCenter = (index) => {
    const cardCenter = index * cardStep + CARD_WIDTH / 2 + renderX;

    return cardCenter - centerX;
  };

  /*
   * ==========================================
   * Navigation
   * ==========================================
   */

  const snapToIndex = (index) => {
    animate(x, centerToIndex(index), {
      type: "spring",
      stiffness: 220,
      damping: 28,
      mass: 0.6,
    });
  };

  const paginate = (direction) => {
    const next = (activeIndex + direction + projects.length) % projects.length;

    setActiveIndex(next);
    snapToIndex(next);
  };

  /*
   * ==========================================
   * Autoplay
   * ==========================================
   */

  useEffect(() => {
    if (paused || reduceMotion) return;

    const timer = setInterval(() => {
      paginate(1);
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(timer);
  }, [paused, reduceMotion, activeIndex]);

  /*
   * ==========================================
   * Render
   * ==========================================
   */

  return (
    <section
      ref={viewportRef}
      className="
        relative
        left-1/2
        w-full
        -translate-x-1/2
        h-[22rem]
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ======================================
          Carousel Track
          ====================================== */}

      <motion.div
        drag="x"
        dragElastic={0.12}
        dragMomentum={true}
        dragConstraints={{
          left: centerToIndex(projects.length - 1),
          right: centerToIndex(0),
        }}
        onDragEnd={(event, info) => {
          if (info.offset.x < -DRAG_THRESHOLD) {
            paginate(1);
            return;
          }

          if (info.offset.x > DRAG_THRESHOLD) {
            paginate(-1);
            return;
          }

          snapToIndex(activeIndex);
        }}
        style={{
          x,
          display: "flex",
          alignItems: "center",
          gap: 0,
          position: "absolute",
          left: 0,
          top: "20%",
          translateY: "-50%",
          paddingLeft: `${centerX - CARD_WIDTH / 2}px`,
          paddingRight: `${centerX - CARD_WIDTH / 2}px`,
        }}
      >
        {projects.map((project, index) => {
          const dx = distanceFromCenter(index);

          const distance = Math.abs(index - activeIndex);

          /*
           * ======================================
           * Card Scale
           * ======================================
           */

          let targetScale;

          if (distance === 0) {
            targetScale = CARD_ACTIVE_SCALE;
          } else if (distance === 1) {
            targetScale = CARD_ADJACENT_SCALE;
          } else {
            targetScale = CARD_FAR_SCALE;
          }

          /*
           * ======================================
           * Visual Effects
           * ======================================
           */

          const rotateY = width ? (dx / width) * -20 : 0;

          const translateY = Math.abs(dx) * 0.12;

          const targetOpacity = distance === 0 ? 1 : 0.8;

          const targetZIndex = distance === 0 ? 1000 : 500;

          /*
           * ======================================
           * Card
           * ======================================
           */

          return (
            <motion.div
              key={project.slug}
              initial={false}
              animate={{
                scale: targetScale,
                rotateY,
                y: translateY,
                opacity: targetOpacity,
              }}
              transition={
                reduceMotion
                  ? {
                      duration: 0,
                    }
                  : {
                      scale: {
                        type: "spring",
                        stiffness: 180,
                        damping: 22,
                        mass: 0.7,
                      },

                      rotateY: {
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                        mass: 0.7,
                      },

                      y: {
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                        mass: 0.7,
                      },

                      opacity: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    }
              }
              style={{
                width: CARD_WIDTH,
                flex: "0 0 auto",
                marginRight: CARD_GAP,
                zIndex: targetZIndex,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* ======================================
          Indicators
          ====================================== */}

      <div
        className="
          absolute
          right-0
          bottom-10
          z-50
          flex
          gap-2
        "
      >
        {projects.map((project, index) => (
          <button
            key={project.slug}
            onClick={() => {
              setActiveIndex(index);
              snapToIndex(index);
            }}
            aria-label={`Go to project ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-10 bg-cyan-300" : "w-2.5 bg-zinc-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
