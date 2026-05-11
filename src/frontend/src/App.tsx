import Layout from "@/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageLoader } from "@/components/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const EventsPage = lazy(() => import("@/pages/Events"));
const SermonsPage = lazy(() => import("@/pages/Sermons"));
const BlogPage = lazy(() => import("@/pages/Blog"));
const GalleryPage = lazy(() => import("@/pages/Gallery"));
const DevotionalsPage = lazy(() => import("@/pages/Devotionals"));
const PrayerPage = lazy(() => import("@/pages/Prayer"));
const TestimonialsPage = lazy(() => import("@/pages/Testimonials"));
const DonatePage = lazy(() => import("@/pages/Donate"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const AdminPage = lazy(() => import("@/pages/Admin"));
const RegisterPage = lazy(() => import("@/pages/Register"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});
const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EventsPage />
    </Suspense>
  ),
});
const sermonsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sermons",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SermonsPage />
    </Suspense>
  ),
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPage />
    </Suspense>
  ),
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <GalleryPage />
    </Suspense>
  ),
});
const devotionalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/devotionals",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DevotionalsPage />
    </Suspense>
  ),
});
const prayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prayer",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PrayerPage />
    </Suspense>
  ),
});
const testimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/testimonials",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TestimonialsPage />
    </Suspense>
  ),
});
const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donate",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DonatePage />
    </Suspense>
  ),
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactPage />
    </Suspense>
  ),
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  ),
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RegisterPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  eventsRoute,
  sermonsRoute,
  blogRoute,
  galleryRoute,
  devotionalsRoute,
  prayerRoute,
  testimonialsRoute,
  donateRoute,
  contactRoute,
  profileRoute,
  adminRoute,
  registerRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <Toaster richColors closeButton position="top-right" />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
