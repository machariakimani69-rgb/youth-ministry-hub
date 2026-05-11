import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useAnnouncements,
  useEvents,
  useSubscribeNewsletter,
  useTestimonials,
} from "@/hooks/useQueries";
import { formatDate } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Church,
  ExternalLink,
  Gift,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Mic,
  Phone,
  Play,
  Users,
} from "lucide-react";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";

// ─── Static data ──────────────────────────────────────────────────
const SCRIPTURES = [
  {
    verse: "I can do all things through Christ who strengthens me.",
    ref: "Philippians 4:13",
  },
  {
    verse:
      "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    ref: "John 3:16",
  },
  {
    verse:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    ref: "Proverbs 3:5-6",
  },
  {
    verse:
      "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary.",
    ref: "Isaiah 40:31",
  },
  {
    verse:
      "For I know the plans I have for you, declares the Lord — plans to prosper you and not to harm you, plans to give you hope and a future.",
    ref: "Jeremiah 29:11",
  },
  {
    verse:
      "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    ref: "Joshua 1:9",
  },
  {
    verse:
      "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    ref: "Romans 8:28",
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Community",
    desc: "Connect with youth from all walks of life in a welcoming, inclusive community.",
  },
  {
    icon: BookOpen,
    title: "Discipleship",
    desc: "Grow in faith through Bible studies, devotionals, and mentorship programs.",
  },
  {
    icon: Heart,
    title: "Service",
    desc: "Make a real difference through outreach, missions, and community service.",
  },
  {
    icon: Play,
    title: "Worship",
    desc: "Experience powerful worship nights, music, and transformational spiritual encounters.",
  },
];

const QUICK_LINKS = [
  { icon: Church, label: "About Us", href: "/about" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: Mic, label: "Sermons", href: "/sermons" },
  { icon: BookOpen, label: "Blog", href: "/blog" },
  { icon: Play, label: "Gallery", href: "/gallery" },
  { icon: Heart, label: "Prayer", href: "/prayer" },
  { icon: MessageCircle, label: "Testimonials", href: "/testimonials" },
  { icon: Gift, label: "Donate", href: "/donate" },
  { icon: Phone, label: "Contact", href: "/contact" },
  { icon: Users, label: "Members", href: "/profile" },
];

const SOCIAL_LINKS = [
  {
    Icon: SiFacebook,
    label: "Facebook",
    href: "https://facebook.com",
    color: "hover:text-primary",
    bg: "hover:bg-primary/10",
  },
  {
    Icon: SiInstagram,
    label: "Instagram",
    href: "https://instagram.com",
    color: "hover:text-secondary",
    bg: "hover:bg-secondary/10",
  },
  {
    Icon: SiYoutube,
    label: "YouTube",
    href: "https://youtube.com",
    color: "hover:text-destructive",
    bg: "hover:bg-destructive/10",
  },
  {
    Icon: SiWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/254700000000",
    color: "hover:text-accent-foreground",
    bg: "hover:bg-accent/10",
  },
];

const FALLBACK_TESTIMONIALS = [
  {
    id: "t1",
    name: "Amara Osei",
    quote:
      "Youth Ministry Hub transformed my faith walk. I found not just friends but a family that lifts me higher every single day.",
    initials: "AO",
  },
  {
    id: "t2",
    name: "Daniel Kimani",
    quote:
      "The worship nights and Bible studies here gave me direction and purpose I never thought possible. This community is truly anointed.",
    initials: "DK",
  },
];

const TODAY_SCRIPTURE = SCRIPTURES[new Date().getDay() % SCRIPTURES.length];

// ─── Animated section hook ─────────────────────────────────────────
function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── RevealSection wrapper ─────────────────────────────────────────
function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useRevealOnScroll();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────
export default function Home() {
  const { data: announcements = [], isLoading: annLoading } =
    useAnnouncements();
  const { data: events = [], isLoading: evtLoading } = useEvents();
  const { data: testimonials = [] } = useTestimonials();
  const subscribeNewsletter = useSubscribeNewsletter();

  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const upcomingEvents = events.filter((e) => e.isPublished).slice(0, 3);
  const pinnedAnnouncements = [
    ...announcements.filter((a) => a.isPinned),
    ...announcements.filter((a) => !a.isPinned),
  ].slice(0, 3);

  const displayTestimonials =
    testimonials.filter((t) => t.isFeatured).slice(0, 2).length > 0
      ? testimonials.filter((t) => t.isFeatured).slice(0, 2)
      : null;

  const handleSubscribe = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!email) return;
      try {
        await subscribeNewsletter.mutateAsync(email);
        setSubStatus("success");
        setEmail("");
      } catch {
        setSubStatus("error");
      }
    },
    [email, subscribeNewsletter],
  );

  return (
    <div className="flex flex-col" data-ocid="home.page">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen items-center overflow-hidden"
        data-ocid="home.hero_section"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[8000ms]"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-youth-ministry.dim_1400x700.jpg')",
            transform: heroLoaded ? "scale(1)" : "scale(1.05)",
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" />
        {/* Floating decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-secondary/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Hero content */}
        <div
          className={`relative container mx-auto px-4 py-28 flex flex-col items-center text-center gap-6 transition-all duration-1000 ${
            heroLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {/* Church logo badge */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 border-2 border-secondary/40 backdrop-blur-sm">
              <Church className="h-7 w-7 text-secondary" />
            </div>
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 uppercase tracking-widest text-xs px-4 py-1.5 backdrop-blur-sm">
              Christ Youth Ministry
            </Badge>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight max-w-4xl text-primary-foreground">
            Welcome to{" "}
            <span className="text-secondary">Youth Ministry Hub</span>
          </h1>
          <p className="text-xl font-body max-w-2xl leading-relaxed text-primary-foreground/80">
            Grow in faith,{" "}
            <span className="text-secondary font-semibold">
              serve with purpose
            </span>
            , live in community.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Button
              asChild
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display font-semibold shadow-elevated px-8 py-6 text-base transition-lift"
              data-ocid="home.hero.join_button"
            >
              <a href="/profile">Join Our Community</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/40 text-primary-foreground bg-primary-foreground/8 font-display font-semibold px-8 py-6 text-base transition-lift backdrop-blur-sm hover:bg-primary-foreground/15"
              data-ocid="home.hero.events_button"
            >
              <a href="/events">Explore Events</a>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs tracking-widest uppercase text-primary-foreground/60">
              Scroll down
            </span>
            <div className="h-8 w-5 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center pt-1.5">
              <div className="h-2 w-1 rounded-full bg-primary-foreground/60" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Scripture of the Day ──────────────────────────────────── */}
      <section className="bg-primary py-12" data-ocid="home.scripture_section">
        <RevealSection>
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs uppercase tracking-widest text-secondary mb-4 font-display font-semibold">
              Scripture of the Day
            </p>
            <blockquote className="font-body italic text-xl sm:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              &ldquo;{TODAY_SCRIPTURE.verse}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-display font-bold text-secondary tracking-wide">
              &mdash; {TODAY_SCRIPTURE.ref}
            </p>
          </div>
        </RevealSection>
      </section>

      {/* ── Announcements ─────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-16"
        data-ocid="home.announcements_section"
      >
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-1">
                  Latest
                </p>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Announcements
                </h2>
              </div>
              <a
                href="/about"
                className="text-sm text-primary hover:text-secondary flex items-center gap-1 transition-colors font-display"
                data-ocid="home.announcements.view_all"
              >
                View all <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </RevealSection>

          {annLoading ? (
            <LoadingSpinner className="py-8" />
          ) : pinnedAnnouncements.length === 0 ? (
            <RevealSection>
              <div
                className="text-center py-12 text-muted-foreground"
                data-ocid="home.announcements.empty_state"
              >
                <Mail className="mx-auto h-10 w-10 mb-3 opacity-40" />
                <p className="font-body">
                  No announcements yet. Check back soon!
                </p>
              </div>
            </RevealSection>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
              data-ocid="home.announcements.list"
            >
              {pinnedAnnouncements.map((ann, i) => (
                <RevealSection key={ann.id.toString()} delay={i * 100}>
                  <Card
                    className="border-border bg-card h-full transition-lift hover:-translate-y-1 hover:shadow-md"
                    data-ocid={`home.announcements.item.${i + 1}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {ann.isPinned && (
                          <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs">
                            Pinned
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          Announcement
                        </Badge>
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2 text-lg">
                        {ann.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 font-body leading-relaxed">
                        {ann.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-4 font-display">
                        {formatDate(ann.publishAt)}
                      </p>
                    </CardContent>
                  </Card>
                </RevealSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Features / Why Join Us ────────────────────────────────── */}
      <section
        className="bg-background py-20"
        data-ocid="home.features_section"
      >
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-2">
                Our Community
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Why Join Us?
              </h2>
              <p className="mt-3 text-muted-foreground font-body max-w-xl mx-auto text-lg">
                Everything you need to grow in faith and community — all in one
                place.
              </p>
            </div>
          </RevealSection>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="home.features.list"
          >
            {FEATURES.map((f, i) => (
              <RevealSection key={f.title} delay={i * 120}>
                <div
                  className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-card border border-border transition-lift hover:-translate-y-2 hover:shadow-elevated hover:border-secondary/30 group cursor-default"
                  data-ocid={`home.features.item.${i + 1}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 group-hover:bg-secondary/15 transition-colors">
                    <f.icon className="h-7 w-7 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ──────────────────────────────────────── */}
      <section className="bg-muted/30 py-16" data-ocid="home.events_section">
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-1">
                  Don't Miss Out
                </p>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Upcoming Events
                </h2>
              </div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-1 text-primary hover:text-secondary"
                data-ocid="home.events.view_all"
              >
                <a href="/events">
                  View all <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </RevealSection>

          {evtLoading ? (
            <LoadingSpinner className="py-8" />
          ) : upcomingEvents.length === 0 ? (
            <RevealSection>
              <div
                className="text-center py-14 text-muted-foreground"
                data-ocid="home.events.empty_state"
              >
                <Calendar className="mx-auto h-12 w-12 mb-3 opacity-40" />
                <p className="font-body text-lg">
                  No upcoming events yet. Check back soon!
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-4"
                  data-ocid="home.events.explore_button"
                >
                  <a href="/events">Browse All Events</a>
                </Button>
              </div>
            </RevealSection>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-ocid="home.events.list"
            >
              {upcomingEvents.map((evt, i) => {
                const d = new Date(Number(evt.startDate) / 1e6);
                return (
                  <RevealSection key={evt.id.toString()} delay={i * 100}>
                    <Card
                      className="group overflow-hidden border-border bg-card transition-lift hover:-translate-y-2 hover:shadow-elevated hover:border-secondary/30"
                      data-ocid={`home.events.item.${i + 1}`}
                    >
                      <CardContent className="p-0">
                        {/* Date badge bar */}
                        <div className="bg-primary px-5 py-3 flex items-center gap-3">
                          <div className="flex flex-col items-center leading-none min-w-[3rem]">
                            <span className="text-xs font-display font-semibold text-primary-foreground/70 uppercase">
                              {d.toLocaleDateString("en-US", {
                                month: "short",
                              })}
                            </span>
                            <span className="text-3xl font-display font-bold text-secondary leading-none">
                              {d.getDate()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display font-semibold text-primary-foreground truncate">
                              {evt.title}
                            </h3>
                            <p className="text-xs text-primary-foreground/60 flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3" /> {evt.location}
                            </p>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="text-sm text-muted-foreground line-clamp-2 font-body mb-4">
                            {evt.description}
                          </p>
                          <Button
                            asChild
                            size="sm"
                            className="w-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground border border-secondary/30 font-display font-semibold transition-smooth"
                            data-ocid={`home.events.register_button.${i + 1}`}
                          >
                            <a href="/events">Register Now</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </RevealSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Quick Navigation Grid ─────────────────────────────────── */}
      <section
        className="bg-card py-16 border-y border-border"
        data-ocid="home.quicknav_section"
      >
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-2">
                Explore
              </p>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Quick Navigation
              </h2>
            </div>
          </RevealSection>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
            data-ocid="home.quicknav.list"
          >
            {QUICK_LINKS.map((link, i) => (
              <RevealSection key={link.label} delay={i * 60}>
                <a
                  href={link.href}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl bg-background border border-border hover:border-secondary/40 hover:bg-secondary/5 transition-smooth group"
                  data-ocid={`home.quicknav.item.${i + 1}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 group-hover:bg-secondary/15 transition-colors">
                    <link.icon className="h-5 w-5 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <span className="text-sm font-display font-semibold text-foreground group-hover:text-secondary transition-colors text-center">
                    {link.label}
                  </span>
                </a>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Preview ─────────────────────────────────── */}
      <section
        className="bg-background py-20"
        data-ocid="home.testimonials_section"
      >
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-2">
                Voices of Faith
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Testimonials
              </h2>
              <p className="mt-3 text-muted-foreground font-body max-w-lg mx-auto">
                Real stories of transformation from our community members.
              </p>
            </div>
          </RevealSection>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            data-ocid="home.testimonials.list"
          >
            {(displayTestimonials ?? FALLBACK_TESTIMONIALS).map((t, i) => {
              const name =
                "name" in t
                  ? (t.name as string)
                  : (t as (typeof FALLBACK_TESTIMONIALS)[0]).name;
              const quote =
                "quote" in t
                  ? (t.quote as string)
                  : "content" in t
                    ? String((t as { content: string }).content)
                    : "";
              const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              return (
                <RevealSection
                  key={"id" in t ? String(t.id) : name}
                  delay={i * 150}
                >
                  <Card
                    className="border-border bg-card transition-lift hover:-translate-y-1 hover:shadow-elevated hover:border-secondary/30"
                    data-ocid={`home.testimonials.item.${i + 1}`}
                  >
                    <CardContent className="p-7">
                      <div className="text-secondary text-4xl font-serif leading-none mb-4">
                        &ldquo;
                      </div>
                      <p className="font-body text-foreground/90 leading-relaxed italic mb-5">
                        {quote}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary font-display font-bold text-sm">
                          {initials}
                        </div>
                        <div>
                          <p className="font-display font-semibold text-foreground text-sm">
                            {name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Community Member
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </RevealSection>
              );
            })}
          </div>
          <RevealSection delay={300}>
            <div className="text-center mt-8">
              <Button
                asChild
                variant="outline"
                className="border-secondary/30 text-secondary hover:bg-secondary/10 font-display"
                data-ocid="home.testimonials.view_all"
              >
                <a href="/testimonials">
                  Read All Testimonials{" "}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Social Media ─────────────────────────────────────────── */}
      <section className="bg-muted/30 py-14" data-ocid="home.social_section">
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-2">
                Stay Connected
              </p>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Follow Us
              </h2>
              <p className="mt-2 text-muted-foreground font-body">
                Join our online community across all platforms.
              </p>
            </div>
          </RevealSection>
          <div
            className="flex flex-wrap justify-center gap-4"
            data-ocid="home.social.list"
          >
            {SOCIAL_LINKS.map((s, i) => (
              <RevealSection key={s.label} delay={i * 80}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border ${s.bg} ${s.color} transition-smooth group min-w-[160px] justify-center`}
                  data-ocid={`home.social.${s.label.toLowerCase()}_link`}
                >
                  <s.Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                  <span className="font-display font-semibold text-sm">
                    {s.label}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter Signup ─────────────────────────────────────── */}
      <section className="bg-primary py-16" data-ocid="home.newsletter_section">
        <div className="container mx-auto px-4">
          <RevealSection>
            <div className="max-w-xl mx-auto text-center">
              <Mail className="mx-auto h-10 w-10 text-secondary mb-4" />
              <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                Stay in the Loop
              </h2>
              <p className="font-body text-primary-foreground/70 mb-8">
                Get weekly devotionals, event reminders, and community updates
                delivered straight to your inbox.
              </p>

              {subStatus === "success" ? (
                <div
                  className="flex items-center justify-center gap-2 bg-secondary/20 border border-secondary/30 rounded-xl p-4 text-secondary font-display font-semibold"
                  data-ocid="home.newsletter.success_state"
                >
                  <Heart className="h-5 w-5" />
                  You&rsquo;re subscribed! Welcome to the family 🎉
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                  data-ocid="home.newsletter.form"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSubStatus("idle");
                    }}
                    required
                    className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-secondary"
                    data-ocid="home.newsletter.input"
                  />
                  <Button
                    type="submit"
                    disabled={subscribeNewsletter.isPending || !email}
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display font-semibold px-6 transition-lift whitespace-nowrap"
                    data-ocid="home.newsletter.submit_button"
                  >
                    {subscribeNewsletter.isPending
                      ? "Subscribing…"
                      : "Subscribe"}
                  </Button>
                </form>
              )}

              {subStatus === "error" && (
                <p
                  className="mt-3 text-sm text-destructive-foreground font-body"
                  data-ocid="home.newsletter.error_state"
                >
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="bg-background py-20" data-ocid="home.cta_section">
        <div className="container mx-auto px-4 text-center">
          <RevealSection>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Find Your Community?
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto text-lg">
              New here? Come as you are. Whether you&rsquo;re curious about
              faith or looking to go deeper — there&rsquo;s a place for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display font-semibold px-8 py-6 text-base transition-lift shadow-elevated"
                data-ocid="home.cta.join_button"
              >
                <a href="/profile">Get Connected</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/5 font-display font-semibold px-8 py-6 text-base"
                data-ocid="home.cta.donate_button"
              >
                <a href="/donate">Support the Ministry</a>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
