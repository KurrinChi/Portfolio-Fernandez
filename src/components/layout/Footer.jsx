import { Link } from "react-router-dom";
import { siteConfig } from "../../content/siteConfig";
import { visibleSocialEntries } from "../../lib/url";

const SOCIAL_LABELS = {
  github: "GitHub",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  behance: "Behance",
};

export function Footer() {
  const socials = visibleSocialEntries(siteConfig.socials);

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/80">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <section>
          <h2 className="font-display text-lg text-zinc-100">Contact</h2>
          <p className="mt-3 text-sm text-zinc-400">{siteConfig.brand.email}</p>
          <p className="text-sm text-zinc-400">{siteConfig.brand.location}</p>
        </section>

        <section>
          <h2 className="font-display text-lg text-zinc-100">Quick Links</h2>
          <ul className="mt-3 grid gap-2 text-sm text-zinc-300">
            {siteConfig.navigation.map((item) => (
              <li key={item.to}>
                <Link className="hover:text-cyan-200" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg text-zinc-100">Social</h2>
          {socials.length > 0 && (
            <ul className="mt-3 grid gap-2 text-sm text-zinc-300">
              {socials.map((item) => (
                <li key={item.platform}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-cyan-200"
                  >
                    {SOCIAL_LABELS[item.platform] || item.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {siteConfig.brand.name}. All rights
        reserved.
      </div>
    </footer>
  );
}
