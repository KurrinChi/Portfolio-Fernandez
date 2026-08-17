import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { ProjectCard } from "../components/ui/ProjectCard";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";
import { useAssetExists } from "../hooks/useAssetExists";

export default function HomePage() {
  const featuredProjects = siteConfig.projects.items.filter((project) =>
    siteConfig.projects.featured.includes(project.slug),
  );
  const hasResume = useAssetExists(siteConfig.brand.resumePath);

  return (
    <>
      <Seo
        title={siteConfig.seo.defaultTitle}
        description={siteConfig.seo.defaultDescription}
      />

      <Section className="pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-cyan-300">
              Full-Stack • Creative Production
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-zinc-50 md:text-6xl">
              {siteConfig.brand.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-zinc-300">
              {siteConfig.brand.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.04 }}>
                <Link
                  to={siteConfig.routes.projects}
                  className="inline-flex rounded-lg border border-cyan-300/60 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-200"
                >
                  Explore Projects
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }}>
                <Link
                  to={siteConfig.routes.contact}
                  className="inline-flex rounded-lg border border-fuchsia-400/60 bg-fuchsia-400/10 px-5 py-2.5 text-sm font-medium text-fuchsia-200"
                >
                  Contact Me
                </Link>
              </motion.div>
              {hasResume && (
                <motion.div whileHover={{ scale: 1.04 }}>
                  <a
                    href={siteConfig.brand.resumePath}
                    download
                    className="inline-flex rounded-lg border border-zinc-500/60 bg-zinc-800/70 px-5 py-2.5 text-sm font-medium text-zinc-100"
                  >
                    Download Resume
                  </a>
                </motion.div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-cyan-400/30 bg-zinc-900/70 p-6 backdrop-blur">
              <img
                src={siteConfig.brand.profileImage}
                alt="Abstract gradient profile placeholder"
                className="h-72 w-full rounded-xl object-cover"
              />
              <div className="mt-5 grid gap-2 text-sm text-zinc-300">
                {siteConfig.brand.roles.map((role) => (
                  <p
                    key={role}
                    className="rounded-md border border-zinc-700/80 bg-zinc-900/50 px-3 py-2"
                  >
                    {role}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="skills"
        eyebrow="Capabilities"
        title="Skills"
        subtitle="Core strengths across engineering and creative production."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "React + Frontend Engineering",
            "Full-Stack Application Architecture",
            "API Integrations and Data Flows",
            "Power Platform Roadmap",
            ".NET and Enterprise App Direction",
            "UI/UX Systems and Prototyping",
            "Photography and Video Storytelling",
            "Creative Direction and Delivery",
          ].map((skill) => (
            <Reveal key={skill}>
              <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-4 py-3 text-zinc-200">
                {skill}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="featured-projects"
        eyebrow="Portfolio Highlights"
        title="Featured Projects"
        subtitle="Selected work across software development and creative production."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="experience"
        eyebrow="Experience"
        title="Experience Snapshot"
        subtitle="Experience spanning product engineering and creative leadership."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.about.experience.map((item) => (
            <Reveal key={item.role}>
              <article className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-5">
                <h3 className="font-display text-xl text-zinc-50">
                  {item.role}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">
                  {item.stack.join(" • ")}
                </p>
                <ul className="mt-4 list-disc space-y-1 pl-4 text-sm text-zinc-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <Reveal>
          <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-8 text-center">
            <h2 className="font-display text-3xl text-zinc-50">
              Let's Build Something Scalable and Bold
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-zinc-300">
              {siteConfig.brand.availability}
            </p>
            <div className="mt-6">
              <Link
                to={siteConfig.routes.contact}
                className="inline-flex rounded-lg border border-cyan-300/60 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-200"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
