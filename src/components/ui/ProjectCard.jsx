import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/70 backdrop-blur"
    >
      <img
        src={project.thumbnail}
        alt={`${project.title} project placeholder`}
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
