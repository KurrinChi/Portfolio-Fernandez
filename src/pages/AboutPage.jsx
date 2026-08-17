import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";

export default function AboutPage() {
  const { education, awards, certifications, experience } = siteConfig.about;

  return (
    <>
      <Seo
        title={`About | ${siteConfig.seo.defaultTitle}`}
        description="Professional background, education, awards, certifications, and career journey."
      />

      <Section
        eyebrow="About"
        title="Professional Background"
        subtitle="Developer and creative producer focused on high-impact digital products and visual storytelling."
      >
        <Reveal>
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-6 text-zinc-300">
            <p>{siteConfig.brand.intro}</p>
          </div>
        </Reveal>
      </Section>

      <Section title="Education">
        <Reveal>
          <div className="rounded-2xl border border-cyan-400/30 bg-zinc-900/60 p-6">
            <h3 className="font-display text-2xl text-zinc-50">
              {education.school}
            </h3>
            <p className="mt-2 text-zinc-300">{education.degree}</p>
            <p className="text-zinc-300">{education.major}</p>
            <p className="mt-3 text-cyan-200">{education.latinHonors}</p>
            <p className="font-mono text-sm text-zinc-400">
              GPA {education.gpa}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section title="Awards & Achievements">
        <div className="grid gap-4 md:grid-cols-3">
          {awards.map((award) => (
            <Reveal key={award}>
              <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4 text-zinc-200">
                {award}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Certifications">
        <div className="grid gap-4 md:grid-cols-2">
          {certifications.map((cert) => (
            <Reveal key={cert}>
              <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4 text-zinc-200">
                {cert}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Career Journey" className="pb-24">
        <div className="space-y-4">
          {experience.map((item) => (
            <Reveal key={item.role}>
              <article className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-5">
                <h3 className="font-display text-xl text-zinc-50">
                  {item.role}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">
                  {item.stack.join(" • ")}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-zinc-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
