import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { ProjectCard } from "../components/ui/ProjectCard";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";

export default function WebDevelopmentProjectsPage() {
  const projects = siteConfig.projects.items.filter(
    (project) => project.category === "web-development",
  );

  return (
    <>
      <Seo
        title={`Web Development Projects | ${siteConfig.seo.defaultTitle}`}
        description="React projects, full-stack builds, API integrations, and roadmap categories."
      />

      <Section
        eyebrow="Web Development"
        title="Web Development Projects"
        subtitle="React, frontend, full-stack, and API integration work."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Roadmap Categories"
        subtitle="Visible expansion tracks for future delivery."
        className="pb-24"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.projects.roadmap.map((category) => (
            <Reveal key={category}>
              <article className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-5">
                <h3 className="font-display text-lg text-zinc-50">
                  {category}
                </h3>
                <p className="mt-3 font-mono text-sm text-cyan-300">
                  Coming Soon
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
