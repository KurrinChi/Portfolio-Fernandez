import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function MagneticButton({
  as: Component = "button",
  className = "",
  children,
  ...props
}) {
  const reduceMotion = useReducedMotionPreference();

  if (reduceMotion) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <motion.div
      onMouseMove={(event) => {
        const target = event.currentTarget;
        const bounds = target.getBoundingClientRect();
        const x = event.clientX - (bounds.left + bounds.width / 2);
        const y = event.clientY - (bounds.top + bounds.height / 2);
        target.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translate3d(0px, 0px, 0px)";
      }}
      className="inline-flex will-change-transform transition-transform duration-200"
    >
      <Component className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  );
}
