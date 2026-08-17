import { useMemo, useState } from "react";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";
import { isValidExternalUrl } from "../lib/url";

export default function EfxPortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const mediaItems = useMemo(() => {
    if (activeFilter === "All") {
      return siteConfig.efx.media;
    }
    return siteConfig.efx.media.filter(
      (item) => item.category === activeFilter,
    );
  }, [activeFilter]);

  return (
    <>
      <Seo
        title={`EFX Portfolio | ${siteConfig.seo.defaultTitle}`}
        description="Filterable gallery and reel showcase for EFX Creations projects."
      />

      <Section
        eyebrow="EFX Portfolio"
        title="Gallery and Client Work"
        subtitle="Photography, videography, drone footage, event coverage, and social content."
      >
        <div className="mb-6 flex flex-wrap gap-2">
          {siteConfig.efx.filters.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md border px-3 py-1.5 text-sm transition ${
                activeFilter === filter
                  ? "border-cyan-300 bg-cyan-500/20 text-cyan-100"
                  : "border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:text-zinc-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mediaItems.map((item) => (
            <Reveal key={item.id}>
              <article className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900/60">
                <img
                  src={item.thumbnail}
                  alt={`${item.title} placeholder`}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />
                <div className="space-y-2 p-5">
                  <h3 className="font-display text-xl text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-fuchsia-300">
                    {item.category}
                  </p>
                  {item.type === "youtube" &&
                    isValidExternalUrl(item.sourceUrl) && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex rounded-lg border border-fuchsia-400/60 bg-fuchsia-500/10 px-3 py-2 text-sm text-fuchsia-200"
                      >
                        Watch Reel
                      </a>
                    )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
