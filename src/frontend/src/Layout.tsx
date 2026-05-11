import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth, useCallerProfile } from "@/hooks/useAuth";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, LogIn, LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Sermons", href: "/sermons" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Devotionals", href: "/devotionals" },
  { label: "Prayer", href: "/prayer" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { isAuthenticated, isDisabled, login, logout } = useAuth();
  const { data: profile } = useCallerProfile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is intentionally used as trigger to close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-40 bg-card border-b border-border transition-shadow duration-300 ${
          scrolled ? "shadow-elevated" : "shadow-subtle"
        }`}
        data-ocid="nav.header"
      >
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
            data-ocid="nav.logo_link"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-sm shadow-md">
              CY
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-base text-foreground leading-tight">
                Christ Youth
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">
                Ministry
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden xl:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
                data-ocid={`nav.link.${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {profile && (
                  <Link
                    to="/profile"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="nav.profile_link"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline truncate max-w-[80px]">
                      {profile.name}
                    </span>
                  </Link>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-1.5"
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={login}
                disabled={isDisabled}
                className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="nav.login_button"
              >
                <LogIn className="h-4 w-4" />
                <span>{isDisabled ? "Loading…" : "Sign In"}</span>
              </Button>
            )}
            {/* Mobile hamburger */}
            <button
              type="button"
              className="xl:hidden flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              data-ocid="nav.mobile_menu_toggle"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav
            className="xl:hidden border-t border-border bg-card px-4 pb-4 pt-2 animate-slide-up"
            aria-label="Mobile navigation"
            data-ocid="nav.mobile_menu"
          >
            <div className="grid grid-cols-2 gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                  data-ocid={`nav.mobile_link.${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background animate-fade-in" id="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border" data-ocid="footer">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold">
                  CY
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    Christ Youth
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    Ministry
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Growing together in faith, friendship, and purpose.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.facebook_link"
                >
                  <SiFacebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-secondary transition-colors"
                  data-ocid="footer.instagram_link"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  data-ocid="footer.youtube_link"
                >
                  <SiYoutube className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp support"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  data-ocid="footer.whatsapp_link"
                >
                  <SiWhatsapp className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Explore
              </h3>
              <ul className="space-y-2">
                {["About", "Events", "Sermons", "Devotionals"].map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid={`footer.link.${item.toLowerCase()}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Community
              </h3>
              <ul className="space-y-2">
                {["Blog", "Gallery", "Testimonials", "Prayer"].map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid={`footer.link.${item.toLowerCase()}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Connect
              </h3>
              <ul className="space-y-2">
                {["Donate", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid={`footer.link.${item.toLowerCase()}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="https://wa.me/254700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                    data-ocid="footer.whatsapp_support"
                  >
                    <SiWhatsapp className="h-4 w-4" />
                    WhatsApp Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Christ Youth Ministry. All
              rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with{" "}
              <Heart className="inline h-3 w-3 text-destructive mx-0.5" /> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
