import { Suspense, lazy } from "react";
import {
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { RouteLoader } from "../../components/ui/RouteLoader";
import { siteConfig } from "../../content/siteConfig";

const HomePage = lazy(() => import("../../pages/HomePage"));
const AboutPage = lazy(() => import("../../pages/AboutPage"));
const ProjectsHubPage = lazy(() => import("../../pages/ProjectsHubPage"));
const WebDevelopmentProjectsPage = lazy(
  () => import("../../pages/WebDevelopmentProjectsPage"),
);
const EfxLandingPage = lazy(() => import("../../pages/EfxLandingPage"));
const EfxServicesPage = lazy(() => import("../../pages/EfxServicesPage"));
const EfxPortfolioPage = lazy(() => import("../../pages/EfxPortfolioPage"));
const ProjectDetailsPage = lazy(() => import("../../pages/ProjectDetailsPage"));
const ContactPage = lazy(() => import("../../pages/ContactPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

function withSuspense(element) {
  return <Suspense fallback={<RouteLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={withSuspense(<HomePage />)} />
      <Route path="about" element={withSuspense(<AboutPage />)} />
      <Route path="projects" element={withSuspense(<ProjectsHubPage />)} />
      <Route
        path="projects/web-development"
        element={withSuspense(<WebDevelopmentProjectsPage />)}
      />
      <Route
        path="projects/efx-creations"
        element={<Navigate to={siteConfig.routes.efxLanding} replace />}
      />
      <Route
        path="projects/:slug"
        element={withSuspense(<ProjectDetailsPage />)}
      />

      <Route path="efx-creations" element={withSuspense(<EfxLandingPage />)} />
      <Route
        path="efx-creations/services"
        element={withSuspense(<EfxServicesPage />)}
      />
      <Route
        path="efx-creations/portfolio"
        element={withSuspense(<EfxPortfolioPage />)}
      />

      <Route path="contact" element={withSuspense(<ContactPage />)} />
      <Route path="404" element={withSuspense(<NotFoundPage />)} />
      <Route
        path="*"
        element={<Navigate to={siteConfig.routes.notFound} replace />}
      />
    </Route>,
  ),
);
