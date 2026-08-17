import { Link } from "react-router-dom";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title={`404 | ${siteConfig.seo.defaultTitle}`}
        description="Page not found."
      />
      <section className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4 py-20 text-center md:px-6">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-10">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">
            Error 404
          </p>
          <h1 className="mt-3 font-display text-4xl text-zinc-50">
            Page Not Found
          </h1>
          <p className="mt-3 text-zinc-300">
            The route you requested does not exist or has moved.
          </p>
          <Link
            to={siteConfig.routes.home}
            className="mt-6 inline-flex rounded-lg border border-cyan-300/60 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200"
          >
            Return Home
          </Link>
        </div>
      </section>
    </>
  );
}
