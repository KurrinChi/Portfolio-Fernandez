import { Link } from "react-router-dom";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";

export default function EfxLandingPage() {
  return (
    <>
      <Seo
        title={`EFX Creations | ${siteConfig.seo.defaultTitle}`}
        description="Brand overview for EFX Creations services and portfolio."
      />

      <Section
        eyebrow="EFX Creations"
        title="Creative Production, Elevated"
        subtitle="A multidisciplinary studio direction for photography, videography, drone, and social-first media."
      >
        <Reveal>
          <div className="rounded-2xl border border-fuchsia-400/35 bg-zinc-900/70 p-6">
            <p className="text-zinc-300">
              EFX Creations blends creative direction with modern content
              systems for brands, events, and digital campaigns.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={siteConfig.routes.efxServices}
                className="rounded-lg border border-cyan-300/60 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200"
              >
                Explore Services
              </Link>
              <Link
                to={siteConfig.routes.efxPortfolio}
                className="rounded-lg border border-fuchsia-300/60 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-200"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section title="Service Highlights" className="pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {siteConfig.efx.services.map((service) => (
            <Reveal key={service}>
              <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-zinc-200">
                {service}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
