import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { ProjectCard } from "../components/ui/ProjectCard";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";
import { useAssetExists } from "../hooks/useAssetExists";
import { GlitchText } from "../components/motion/GlitchText";
import { HudStats } from "../components/motion/HudStats";
import { MagneticButton } from "../components/motion/MagneticButton";
import { FeaturedCarousel } from "../components/ui/FeaturedCarousel";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -55]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.36], [1, 0.72]);
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
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-cyan-300">
              Full-Stack • Creative Production
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-zinc-50 md:text-6xl">
              <GlitchText>{siteConfig.brand.heroTitle}</GlitchText>
            </h1>
            <p className="mt-5 max-w-2xl text-zinc-300">
              {siteConfig.brand.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton
                as={Link}
                to={siteConfig.routes.projects}
                className="inline-flex rounded-lg border border-cyan-300/60 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-200 shadow-[0_0_24px_rgba(0,245,255,0.22)]"
              >
                Explore Projects
              </MagneticButton>
              <MagneticButton
                as={Link}
                to={siteConfig.routes.contact}
                className="inline-flex rounded-lg border border-fuchsia-400/60 bg-fuchsia-400/10 px-5 py-2.5 text-sm font-medium text-fuchsia-200 shadow-[0_0_24px_rgba(255,46,99,0.2)]"
              >
                Contact Me
              </MagneticButton>
              {hasResume && (
                <MagneticButton
                  as="a"
                  href={siteConfig.brand.resumePath}
                  download
                  className="inline-flex rounded-lg border border-zinc-500/60 bg-zinc-800/70 px-5 py-2.5 text-sm font-medium text-zinc-100"
                >
                  Download Resume
                </MagneticButton>
              )}
            </div>

            <div className="mt-8">
              <HudStats />
            </div>
          </Reveal>

          <Reveal delay={0.12} variant="glow">
            <div className="hero-grid glitch-frame relative rounded-2xl border border-cyan-400/30 bg-zinc-900/70 p-6 backdrop-blur">
              <motion.span
                className="absolute -left-5 -top-5 h-12 w-12 rounded-full border border-cyan-300/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute -bottom-6 right-5 h-16 w-16 rounded-full border border-fuchsia-300/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 58, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -right-3 top-8 h-2 w-24 rounded-full bg-cyan-300/40"
                animate={{ x: [0, 14, -8, 0], opacity: [0.3, 0.8, 0.4] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <img
                src={siteConfig.brand.profileImage}
                alt="Abstract gradient profile placeholder"
                className="profile-glitch h-72 w-full rounded-xl object-cover"
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
        </motion.div>
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
            <Reveal key={skill} variant="scale">
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
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <Reveal variant="scale">
            <FeaturedCarousel projects={featuredProjects} />
          </Reveal>
          <div className="grid gap-4">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08} variant="glow">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
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
            <Reveal key={item.role} variant="slide">
              <article className="relative rounded-2xl border border-zinc-700 bg-zinc-900/60 p-5">
                <motion.span
                  className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-300 to-fuchsia-400"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
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
