export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-4 py-20 md:px-6 ${className}`}
    >
      {(eyebrow || title || subtitle) && (
        <header className="mb-10 space-y-3">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && <p className="max-w-3xl text-zinc-300">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
