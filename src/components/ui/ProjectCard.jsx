import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function ProjectCard({ project }) {
  const reduceMotion = useReducedMotionPreference();

  return (
    <motion.article
      whileHover={reduceMotion ? {} : { y: -6, filter: "brightness(1.08)" }}
      transition={{ duration: 0.25 }}
      draggable={false}
      onMouseMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rx = ((event.clientY - centerY) / rect.height) * -7;
        const ry = ((event.clientX - centerX) / rect.width) * 7;
        event.currentTarget.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/70 backdrop-blur transition-[box-shadow] duration-200 hover:shadow-[0_0_30px_rgba(0,245,255,0.25)]"
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(0,245,255,0.12)_44%,transparent_70%)]" />
      </span>
      <img
        src={project.thumbnail}
        alt={`${project.title} project placeholder`}
        draggable={false}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
      <div className="space-y-4 p-5">
        <h3 className="font-display text-xl text-zinc-50">{project.title}</h3>
        <p className="text-sm text-zinc-300">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs text-cyan-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 rounded-lg border border-fuchsia-400/50 bg-fuchsia-500/10 px-3 py-2 text-sm font-medium text-fuchsia-200 transition hover:bg-fuchsia-500/20"
        >
          View Project Details
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.article>
  );
}
