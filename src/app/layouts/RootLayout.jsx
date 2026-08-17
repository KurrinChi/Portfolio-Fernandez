import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { BackToTopButton } from "../../components/layout/BackToTopButton";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { useLenisScroll } from "../../hooks/useLenisScroll";
import { ScrollProgress } from "../../components/motion/ScrollProgress";
import { AmbientMotion } from "../../components/motion/AmbientMotion";
import { CursorGlow } from "../../components/motion/CursorGlow";
import { siteConfig } from "../../content/siteConfig";

export function RootLayout() {
  useScrollToTop();
  useLenisScroll();

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100">
      <ScrollProgress />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,245,255,0.14),transparent_45%),radial-gradient(circle_at_bottom,rgba(124,58,237,0.14),transparent_40%)]" />
      {siteConfig.featureFlags.showParticles && <AmbientMotion />}
      {siteConfig.featureFlags.showScanlines && (
        <div className="pointer-events-none scanlines absolute inset-0 opacity-30" />
      )}

      <div className="relative z-10">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>

      <BackToTopButton />
      <CursorGlow />
    </div>
  );
}
