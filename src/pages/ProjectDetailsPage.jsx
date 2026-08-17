import { Navigate, useParams } from "react-router-dom";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";
import { isValidExternalUrl } from "../lib/url";

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const project = siteConfig.projects.items.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to={siteConfig.routes.notFound} replace />;
  }

  return (
    <>
      <Seo
        title={`${project.title} | ${siteConfig.seo.defaultTitle}`}
        description={project.summary}
        keywords={project.keywords}
        ogImage={project.ogImage || siteConfig.seo.projectOgImage}
      />

      <Section
        eyebrow="Project Details"
        title={project.title}
        subtitle={project.summary}
      >
        <Reveal>
          <img
            src={project.gallery[0] || project.thumbnail}
            alt={`${project.title} hero banner`}
            className="h-72 w-full rounded-2xl border border-zinc-700 object-cover"
          />
        </Reveal>
      </Section>

      <Section title="Project Overview">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-5">
              <h3 className="font-display text-xl text-zinc-50">
                Problem Solved
              </h3>
              <p className="mt-3 text-zinc-300">{project.problemSolved}</p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-5">
              <h3 className="font-display text-xl text-zinc-50">Roles</h3>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-zinc-300">
                {project.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Section>

      <Section title="Features and Technologies">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-5">
              <h3 className="font-display text-xl text-zinc-50">Features</h3>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-zinc-300">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-5">
              <h3 className="font-display text-xl text-zinc-50">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs text-cyan-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      <Section title="Outcomes">
        <Reveal>
          <ul className="list-disc space-y-2 rounded-xl border border-zinc-700 bg-zinc-900/60 p-6 pl-10 text-zinc-300">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section title="Screenshots and Gallery" className="pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {project.gallery.slice(1).map((imageUrl, index) => (
            <Reveal key={imageUrl} delay={index * 0.05}>
              <img
                src={imageUrl}
                alt={`${project.title} screenshot ${index + 1}`}
                className="h-52 w-full rounded-xl border border-zinc-700 object-cover"
                loading="lazy"
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {isValidExternalUrl(project.liveUrl) && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-cyan-300/60 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200"
            >
              Live Demo
            </a>
          )}
          {isValidExternalUrl(project.repoUrl) && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-fuchsia-300/60 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-200"
            >
              Source Code
            </a>
          )}
        </div>
      </Section>
    </>
  );
}
