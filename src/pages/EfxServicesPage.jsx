import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";

export default function EfxServicesPage() {
  return (
    <>
      <Seo
        title={`EFX Services | ${siteConfig.seo.defaultTitle}`}
        description="Service offerings from EFX Creations across photo, video, drone, and social content."
      />

      <Section
        eyebrow="EFX Services"
        title="Service Offerings"
        subtitle="Creative services designed for campaigns, events, and brand storytelling."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.efx.services.map((service) => (
            <Reveal key={service}>
              <article className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-5">
                <h3 className="font-display text-xl text-zinc-50">{service}</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  Tailored delivery model for quality-focused visual production.
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <Reveal>
          <div className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 p-8 text-center">
            <h2 className="font-display text-3xl text-zinc-50">
              Request a Quote
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-zinc-300">
              Share your vision and timeline, and we can map a production plan
              that fits your goals.
            </p>
            <a
              href={`mailto:${siteConfig.brand.email}`}
              className="mt-5 inline-flex rounded-lg border border-cyan-300/60 bg-zinc-900/70 px-5 py-2.5 text-sm text-cyan-200"
            >
              Request a Quote
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
