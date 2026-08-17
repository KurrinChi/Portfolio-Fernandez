import { useMemo, useState } from "react";
import { Section } from "../components/ui/Section";
import { Reveal } from "../components/motion/Reveal";
import { Seo } from "../components/seo/Seo";
import { siteConfig } from "../content/siteConfig";
import {
  buildMailtoLink,
  getContactMode,
  sendContactWithEmailJs,
} from "../lib/contact";
import { visibleSocialEntries } from "../lib/url";

const initialState = {
  name: "",
  email: "",
  message: "",
  company: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const socials = useMemo(() => visibleSocialEntries(siteConfig.socials), []);

  const mode = getContactMode();

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (form.company) {
      setStatus({ type: "success", text: "Message sent successfully." });
      setForm(initialState);
      return;
    }

    if (!form.name || !form.email || !form.message) {
      setStatus({
        type: "error",
        text: "Please complete all required fields.",
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "idle", text: "" });

    try {
      if (mode === "emailjs") {
        await sendContactWithEmailJs({
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: siteConfig.brand.name,
        });

        setStatus({
          type: "success",
          text: "Message sent. Thanks for reaching out.",
        });
      } else {
        const mailto = buildMailtoLink({
          to: siteConfig.brand.email,
          name: form.name,
          email: form.email,
          message: form.message,
        });
        window.location.href = mailto;
        setStatus({
          type: "success",
          text: "Opening your email client now.",
        });
      }
      setForm(initialState);
    } catch {
      const fallback = buildMailtoLink({
        to: siteConfig.brand.email,
        name: form.name,
        email: form.email,
        message: form.message,
      });
      window.location.href = fallback;
      setStatus({
        type: "success",
        text: "Email service unavailable. Opening your email client.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title={`Contact | ${siteConfig.seo.defaultTitle}`}
        description="Contact form and social channels for collaboration opportunities."
      />

      <Section
        eyebrow="Contact"
        title="Let's Collaborate"
        subtitle={siteConfig.brand.availability}
        className="pb-24"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <form
              className="space-y-4 rounded-2xl border border-zinc-700 bg-zinc-900/70 p-6"
              onSubmit={onSubmit}
            >
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-300">Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none ring-cyan-300/40 focus:ring"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-300">Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none ring-cyan-300/40 focus:ring"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-zinc-300">
                  Message
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={6}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none ring-cyan-300/40 focus:ring"
                  required
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg border border-cyan-300/60 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>

              {status.text && (
                <p
                  className={`text-sm ${
                    status.type === "error"
                      ? "text-rose-300"
                      : "text-emerald-300"
                  }`}
                >
                  {status.text}
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4 rounded-2xl border border-zinc-700 bg-zinc-900/70 p-6">
              <h3 className="font-display text-2xl text-zinc-50">
                Contact Info
              </h3>
              <p className="text-zinc-300">{siteConfig.brand.email}</p>
              <p className="text-zinc-300">{siteConfig.brand.location}</p>

              {socials.length > 0 && (
                <div>
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">
                    Social Links
                  </p>
                  <ul className="space-y-2">
                    {socials.map((item) => (
                      <li key={item.platform}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-zinc-200 hover:text-cyan-200"
                        >
                          {item.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
