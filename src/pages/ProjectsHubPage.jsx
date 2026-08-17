import { Link } from "react-router-dom";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";

export default function ProjectsHubPage() {
  return (
    <>
      <Seo
        title={`Projects | ${siteConfig.seo.defaultTitle}`}
        description="Central hub for web development and EFX Creations project tracks."
      />

      <Section
        eyebrow="Projects"
        title="Projects Hub"
        subtitle="Choose a specialized track to explore engineering builds or creative productions."
        className="pb-24"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="rounded-2xl border border-cyan-400/30 bg-zinc-900/70 p-6">
              <h3 className="font-display text-2xl text-zinc-50">
                Web Development Projects
              </h3>
              <p className="mt-3 text-zinc-300">
                React, frontend systems, full-stack products, API integrations,
                and roadmap work for Power Platform and .NET.
              </p>
              <Link
                to={siteConfig.routes.webDevelopment}
                className="mt-5 inline-flex rounded-lg border border-cyan-300/60 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
              >
                Open Web Development
              </Link>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="rounded-2xl border border-fuchsia-400/30 bg-zinc-900/70 p-6">
              <h3 className="font-display text-2xl text-zinc-50">
                EFX Creations Projects
              </h3>
              <p className="mt-3 text-zinc-300">
                Photography, videography, commercial shoots, event coverage, and
                creative campaign work.
              </p>
              <Link
                to={siteConfig.routes.efxLanding}
                className="mt-5 inline-flex rounded-lg border border-fuchsia-300/60 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200"
              >
                Open EFX Creations
              </Link>
            </article>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
