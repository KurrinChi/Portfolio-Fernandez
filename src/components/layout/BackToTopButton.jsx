import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 360);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-50 rounded-full border border-cyan-400/50 bg-zinc-900/90 px-4 py-2 font-mono text-xs text-cyan-200 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      Back to top
    </button>
  );
}
