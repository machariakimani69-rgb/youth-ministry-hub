import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, L as LoadingSpinner, f as formatDate, H as Heart, S as SiFacebook, a as SiInstagram, b as SiYoutube, d as SiWhatsapp } from "./index-CPIOcdtY.js";
import { u as useAnnouncements, a as useEvents, b as useTestimonials, c as useSubscribeNewsletter, B as Badge } from "./useQueries-DxEGoYB2.js";
import { C as Card, a as CardContent } from "./card-BUuSK7y6.js";
import { I as Input } from "./input-BWJvKHaA.js";
import { C as ChevronRight } from "./chevron-right-D4bO022t.js";
import { M as Mail } from "./mail-DcUnBHUu.js";
import { U as Users } from "./users-iU5sTJQr.js";
import { B as BookOpen } from "./book-open-baAj5-pa.js";
import { P as Play } from "./play-COmUzpge.js";
import { C as Calendar } from "./calendar-CnJCSJnH.js";
import { M as MapPin } from "./map-pin-Wb1Zd8Aa.js";
import { M as MessageCircle, P as Phone } from "./phone-B_IAkDL5.js";
import { G as Gift } from "./gift-C-G_PU7K.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10 9h4", key: "u4k05v" }],
  ["path", { d: "M12 7v5", key: "ma6bk" }],
  ["path", { d: "M14 22v-4a2 2 0 0 0-4 0v4", key: "1pdhuj" }],
  [
    "path",
    {
      d: "M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22",
      key: "1rkokr"
    }
  ],
  [
    "path",
    {
      d: "m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7",
      key: "1w6esw"
    }
  ]
];
const Church = createLucideIcon("church", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const Mic = createLucideIcon("mic", __iconNode);
const SCRIPTURES = [
  {
    verse: "I can do all things through Christ who strengthens me.",
    ref: "Philippians 4:13"
  },
  {
    verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    ref: "John 3:16"
  },
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    ref: "Proverbs 3:5-6"
  },
  {
    verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary.",
    ref: "Isaiah 40:31"
  },
  {
    verse: "For I know the plans I have for you, declares the Lord — plans to prosper you and not to harm you, plans to give you hope and a future.",
    ref: "Jeremiah 29:11"
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    ref: "Joshua 1:9"
  },
  {
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    ref: "Romans 8:28"
  }
];
const FEATURES = [
  {
    icon: Users,
    title: "Community",
    desc: "Connect with youth from all walks of life in a welcoming, inclusive community."
  },
  {
    icon: BookOpen,
    title: "Discipleship",
    desc: "Grow in faith through Bible studies, devotionals, and mentorship programs."
  },
  {
    icon: Heart,
    title: "Service",
    desc: "Make a real difference through outreach, missions, and community service."
  },
  {
    icon: Play,
    title: "Worship",
    desc: "Experience powerful worship nights, music, and transformational spiritual encounters."
  }
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
  { icon: Users, label: "Members", href: "/profile" }
];
const SOCIAL_LINKS = [
  {
    Icon: SiFacebook,
    label: "Facebook",
    href: "https://facebook.com",
    color: "hover:text-primary",
    bg: "hover:bg-primary/10"
  },
  {
    Icon: SiInstagram,
    label: "Instagram",
    href: "https://instagram.com",
    color: "hover:text-secondary",
    bg: "hover:bg-secondary/10"
  },
  {
    Icon: SiYoutube,
    label: "YouTube",
    href: "https://youtube.com",
    color: "hover:text-destructive",
    bg: "hover:bg-destructive/10"
  },
  {
    Icon: SiWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/254700000000",
    color: "hover:text-accent-foreground",
    bg: "hover:bg-accent/10"
  }
];
const FALLBACK_TESTIMONIALS = [
  {
    id: "t1",
    name: "Amara Osei",
    quote: "Youth Ministry Hub transformed my faith walk. I found not just friends but a family that lifts me higher every single day.",
    initials: "AO"
  },
  {
    id: "t2",
    name: "Daniel Kimani",
    quote: "The worship nights and Bible studies here gave me direction and purpose I never thought possible. This community is truly anointed.",
    initials: "DK"
  }
];
const TODAY_SCRIPTURE = SCRIPTURES[(/* @__PURE__ */ new Date()).getDay() % SCRIPTURES.length];
function useRevealOnScroll() {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}
function RevealSection({
  children,
  className = "",
  delay = 0
}) {
  const { ref, visible } = useRevealOnScroll();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`,
      style: { transitionDelay: `${delay}ms` },
      children
    }
  );
}
function Home() {
  const { data: announcements = [], isLoading: annLoading } = useAnnouncements();
  const { data: events = [], isLoading: evtLoading } = useEvents();
  const { data: testimonials = [] } = useTestimonials();
  const subscribeNewsletter = useSubscribeNewsletter();
  const [email, setEmail] = reactExports.useState("");
  const [subStatus, setSubStatus] = reactExports.useState(
    "idle"
  );
  const [heroLoaded, setHeroLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);
  const upcomingEvents = events.filter((e) => e.isPublished).slice(0, 3);
  const pinnedAnnouncements = [
    ...announcements.filter((a) => a.isPinned),
    ...announcements.filter((a) => !a.isPinned)
  ].slice(0, 3);
  const displayTestimonials = testimonials.filter((t) => t.isFeatured).slice(0, 2).length > 0 ? testimonials.filter((t) => t.isFeatured).slice(0, 2) : null;
  const handleSubscribe = reactExports.useCallback(
    async (e) => {
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
    [email, subscribeNewsletter]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative flex min-h-screen items-center overflow-hidden",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[8000ms]",
              style: {
                backgroundImage: "url('/assets/generated/hero-youth-ministry.dim_1400x700.jpg')",
                transform: heroLoaded ? "scale(1)" : "scale(1.05)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-secondary/10 blur-3xl animate-pulse",
              style: { animationDelay: "1.5s" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `relative container mx-auto px-4 py-28 flex flex-col items-center text-center gap-6 transition-all duration-1000 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 border-2 border-secondary/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Church, { className: "h-7 w-7 text-secondary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border-secondary/30 uppercase tracking-widest text-xs px-4 py-1.5 backdrop-blur-sm", children: "Christ Youth Ministry" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight max-w-4xl text-primary-foreground", children: [
                  "Welcome to",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: "Youth Ministry Hub" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-body max-w-2xl leading-relaxed text-primary-foreground/80", children: [
                  "Grow in faith,",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary font-semibold", children: "serve with purpose" }),
                  ", live in community."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 justify-center mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      className: "bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display font-semibold shadow-elevated px-8 py-6 text-base transition-lift",
                      "data-ocid": "home.hero.join_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/profile", children: "Join Our Community" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      variant: "outline",
                      className: "border-2 border-primary-foreground/40 text-primary-foreground bg-primary-foreground/8 font-display font-semibold px-8 py-6 text-base transition-lift backdrop-blur-sm hover:bg-primary-foreground/15",
                      "data-ocid": "home.hero.events_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/events", children: "Explore Events" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-center gap-2 animate-bounce", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-widest uppercase text-primary-foreground/60", children: "Scroll down" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-5 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center pt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-1 rounded-full bg-primary-foreground/60" }) })
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-12", "data-ocid": "home.scripture_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-secondary mb-4 font-display font-semibold", children: "Scripture of the Day" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "font-body italic text-xl sm:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed", children: [
        "“",
        TODAY_SCRIPTURE.verse,
        "”"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm font-display font-bold text-secondary tracking-wide", children: [
        "— ",
        TODAY_SCRIPTURE.ref
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-16",
        "data-ocid": "home.announcements_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-1", children: "Latest" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Announcements" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/about",
                className: "text-sm text-primary hover:text-secondary flex items-center gap-1 transition-colors font-display",
                "data-ocid": "home.announcements.view_all",
                children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                ]
              }
            )
          ] }) }),
          annLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { className: "py-8" }) : pinnedAnnouncements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12 text-muted-foreground",
              "data-ocid": "home.announcements.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mx-auto h-10 w-10 mb-3 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body", children: "No announcements yet. Check back soon!" })
              ]
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 md:grid-cols-3 gap-5",
              "data-ocid": "home.announcements.list",
              children: pinnedAnnouncements.map((ann, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Card,
                {
                  className: "border-border bg-card h-full transition-lift hover:-translate-y-1 hover:shadow-md",
                  "data-ocid": `home.announcements.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                      ann.isPinned && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border-secondary/30 text-xs", children: "Pinned" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Announcement" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2 text-lg", children: ann.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3 font-body leading-relaxed", children: ann.content }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-4 font-display", children: formatDate(ann.publishAt) })
                  ] })
                }
              ) }, ann.id.toString()))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-20",
        "data-ocid": "home.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-2", children: "Our Community" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "Why Join Us?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground font-body max-w-xl mx-auto text-lg", children: "Everything you need to grow in faith and community — all in one place." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
              "data-ocid": "home.features.list",
              children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { delay: i * 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-card border border-border transition-lift hover:-translate-y-2 hover:shadow-elevated hover:border-secondary/30 group cursor-default",
                  "data-ocid": `home.features.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 group-hover:bg-secondary/15 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-7 w-7 text-primary group-hover:text-secondary transition-colors" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg", children: f.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: f.desc })
                  ]
                }
              ) }, f.title))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", "data-ocid": "home.events_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-1", children: "Don't Miss Out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Upcoming Events" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "ghost",
            size: "sm",
            className: "gap-1 text-primary hover:text-secondary",
            "data-ocid": "home.events.view_all",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/events", children: [
              "View all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            ] })
          }
        )
      ] }) }),
      evtLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { className: "py-8" }) : upcomingEvents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-14 text-muted-foreground",
          "data-ocid": "home.events.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mx-auto h-12 w-12 mb-3 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-lg", children: "No upcoming events yet. Check back soon!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                className: "mt-4",
                "data-ocid": "home.events.explore_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/events", children: "Browse All Events" })
              }
            )
          ]
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6",
          "data-ocid": "home.events.list",
          children: upcomingEvents.map((evt, i) => {
            const d = new Date(Number(evt.startDate) / 1e6);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "group overflow-hidden border-border bg-card transition-lift hover:-translate-y-2 hover:shadow-elevated hover:border-secondary/30",
                "data-ocid": `home.events.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-5 py-3 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center leading-none min-w-[3rem]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-semibold text-primary-foreground/70 uppercase", children: d.toLocaleDateString("en-US", {
                        month: "short"
                      }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-secondary leading-none", children: d.getDate() })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-primary-foreground truncate", children: evt.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary-foreground/60 flex items-center gap-1 mt-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                        " ",
                        evt.location
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 font-body mb-4", children: evt.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        asChild: true,
                        size: "sm",
                        className: "w-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground border border-secondary/30 font-display font-semibold transition-smooth",
                        "data-ocid": `home.events.register_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/events", children: "Register Now" })
                      }
                    )
                  ] })
                ] })
              }
            ) }, evt.id.toString());
          })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card py-16 border-y border-border",
        "data-ocid": "home.quicknav_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-2", children: "Explore" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Quick Navigation" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4",
              "data-ocid": "home.quicknav.list",
              children: QUICK_LINKS.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: link.href,
                  className: "flex flex-col items-center gap-3 p-5 rounded-xl bg-background border border-border hover:border-secondary/40 hover:bg-secondary/5 transition-smooth group",
                  "data-ocid": `home.quicknav.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 group-hover:bg-secondary/15 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: "h-5 w-5 text-primary group-hover:text-secondary transition-colors" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-foreground group-hover:text-secondary transition-colors text-center", children: link.label })
                  ]
                }
              ) }, link.label))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-20",
        "data-ocid": "home.testimonials_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-2", children: "Voices of Faith" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Testimonials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground font-body max-w-lg mx-auto", children: "Real stories of transformation from our community members." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto",
              "data-ocid": "home.testimonials.list",
              children: (displayTestimonials ?? FALLBACK_TESTIMONIALS).map((t, i) => {
                const name = "name" in t ? t.name : t.name;
                const quote = "quote" in t ? t.quote : "content" in t ? String(t.content) : "";
                const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RevealSection,
                  {
                    delay: i * 150,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Card,
                      {
                        className: "border-border bg-card transition-lift hover:-translate-y-1 hover:shadow-elevated hover:border-secondary/30",
                        "data-ocid": `home.testimonials.item.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-7", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-secondary text-4xl font-serif leading-none mb-4", children: "“" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-foreground/90 leading-relaxed italic mb-5", children: quote }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary font-display font-bold text-sm", children: initials }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: name }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Community Member" })
                            ] })
                          ] })
                        ] })
                      }
                    )
                  },
                  "id" in t ? String(t.id) : name
                );
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { delay: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              className: "border-secondary/30 text-secondary hover:bg-secondary/10 font-display",
              "data-ocid": "home.testimonials.view_all",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/testimonials", children: [
                "Read All Testimonials",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
              ] })
            }
          ) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-14", "data-ocid": "home.social_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-secondary font-display font-semibold mb-2", children: "Stay Connected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Follow Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground font-body", children: "Join our online community across all platforms." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap justify-center gap-4",
          "data-ocid": "home.social.list",
          children: SOCIAL_LINKS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: s.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: `flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border ${s.bg} ${s.color} transition-smooth group min-w-[160px] justify-center`,
              "data-ocid": `home.social.${s.label.toLowerCase()}_link`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(s.Icon, { className: "h-6 w-6 transition-transform group-hover:scale-110" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm", children: s.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity" })
              ]
            }
          ) }, s.label))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-16", "data-ocid": "home.newsletter_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mx-auto h-10 w-10 text-secondary mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-primary-foreground mb-2", children: "Stay in the Loop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-primary-foreground/70 mb-8", children: "Get weekly devotionals, event reminders, and community updates delivered straight to your inbox." }),
      subStatus === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-center gap-2 bg-secondary/20 border border-secondary/30 rounded-xl p-4 text-secondary font-display font-semibold",
          "data-ocid": "home.newsletter.success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5" }),
            "You’re subscribed! Welcome to the family 🎉"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubscribe,
          className: "flex flex-col sm:flex-row gap-3",
          "data-ocid": "home.newsletter.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "email",
                placeholder: "Enter your email address",
                value: email,
                onChange: (e) => {
                  setEmail(e.target.value);
                  setSubStatus("idle");
                },
                required: true,
                className: "flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-secondary",
                "data-ocid": "home.newsletter.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: subscribeNewsletter.isPending || !email,
                className: "bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display font-semibold px-6 transition-lift whitespace-nowrap",
                "data-ocid": "home.newsletter.submit_button",
                children: subscribeNewsletter.isPending ? "Subscribing…" : "Subscribe"
              }
            )
          ]
        }
      ),
      subStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "mt-3 text-sm text-destructive-foreground font-body",
          "data-ocid": "home.newsletter.error_state",
          children: "Something went wrong. Please try again."
        }
      )
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", "data-ocid": "home.cta_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RevealSection, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-4", children: "Ready to Find Your Community?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-8 max-w-xl mx-auto text-lg", children: "New here? Come as you are. Whether you’re curious about faith or looking to go deeper — there’s a place for you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display font-semibold px-8 py-6 text-base transition-lift shadow-elevated",
            "data-ocid": "home.cta.join_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/profile", children: "Get Connected" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            variant: "outline",
            className: "border-primary/40 text-primary hover:bg-primary/5 font-display font-semibold px-8 py-6 text-base",
            "data-ocid": "home.cta.donate_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/donate", children: "Support the Ministry" })
          }
        )
      ] })
    ] }) }) })
  ] });
}
export {
  Home as default
};
