import { c as createLucideIcon, j as jsxRuntimeExports, H as Heart } from "./index-CPIOcdtY.js";
import { d as useLeadership, B as Badge } from "./useQueries-DxEGoYB2.js";
import { C as Card, a as CardContent } from "./card-BUuSK7y6.js";
import { S as Skeleton } from "./skeleton-Dj2ezB5s.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { S as Star } from "./star-S-mbzf3g.js";
import { U as Users } from "./users-iU5sTJQr.js";
import { B as BookOpen } from "./book-open-baAj5-pa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode);
const MISSION = "To empower young people with faith, purpose, and community — raising a generation that loves God, serves others, and impacts the world.";
const VISION = "A generation fully alive in Christ — bold in faith, rich in love, and transforming every corner of the earth.";
const VALUES = [
  {
    key: "faith",
    icon: Star,
    title: "Faith",
    desc: "Rooted in Scripture, alive in practice — we build our lives on the unchanging Word of God.",
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    key: "community",
    icon: Users,
    title: "Community",
    desc: "Belonging without borders or conditions — everyone has a place at the table.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    key: "service",
    icon: Heart,
    title: "Service",
    desc: "Loving our neighbours through action — faith without works is incomplete.",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    key: "growth",
    icon: Lightbulb,
    title: "Growth",
    desc: "Lifelong discipleship and spiritual formation — we never stop learning and becoming.",
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    key: "worship",
    icon: BookOpen,
    title: "Worship",
    desc: "Encountering God in spirit and truth — worship shapes who we are and who we become.",
    color: "text-primary",
    bg: "bg-primary/10"
  }
];
const TIMELINE = [
  { year: "2010", event: "Founded as a small Bible study of 12 young people." },
  { year: "2013", event: "First annual youth summer camp with 80 attendees." },
  {
    year: "2016",
    event: "Launched community service arm — 500+ volunteer hours."
  },
  { year: "2019", event: "Expanded to include worship band and media team." },
  {
    year: "2022",
    event: "Online ministry launched, reaching youth across 15 countries."
  },
  {
    year: "2024",
    event: "200+ active members and growing strong in God's grace."
  }
];
function LeadershipSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 rounded-full shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6" })
    ] })
  ] }) }) }, n)) });
}
function About() {
  const { data: leaders = [], isLoading } = useLeadership();
  const activeLeaders = leaders.filter((l) => l.isActive).sort((a, b) => Number(a.displayOrder - b.displayOrder)).slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "about.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-card border-b border-border",
        "data-ocid": "about.hero_section",
        style: { minHeight: 420 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/about-hero.dim_1600x600.jpg",
              alt: "Youth ministry community",
              className: "absolute inset-0 w-full h-full object-cover opacity-30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-card/60 via-card/40 to-card/90" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4 py-20 max-w-4xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-secondary/20 text-secondary border-secondary/30 px-4 py-1", children: "Our Story" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight", children: [
                  "About ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: "Our Ministry" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto", children: MISSION })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", "data-ocid": "about.mission_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          className: "rounded-2xl border border-secondary/20 bg-card p-8 shadow-elevated",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-6 w-6 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Our Mission" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground leading-relaxed", children: MISSION })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.7, delay: 0.15 },
          className: "rounded-2xl border border-primary/20 bg-card p-8 shadow-elevated",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Our Vision" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground leading-relaxed", children: VISION })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", "data-ocid": "about.values_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-accent/20 text-accent border-accent/30 px-4 py-1", children: "What We Stand For" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Our Core Values" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5", children: VALUES.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          "data-ocid": `about.values.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card h-full transition-lift hover:-translate-y-1 hover:shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-12 w-12 rounded-full ${v.bg} flex items-center justify-center mx-auto mb-4`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: `h-6 w-6 ${v.color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: v.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: v.desc })
          ] }) })
        },
        v.key
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", "data-ocid": "about.history_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-secondary/20 text-secondary border-secondary/30 px-4 py-1", children: "Our Journey" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Our History" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-8 top-0 bottom-0 w-0.5 bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: TIMELINE.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex gap-6 items-start",
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.12 },
            "data-ocid": `about.timeline.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-shrink-0 h-16 w-16 rounded-full bg-secondary flex items-center justify-center shadow-elevated z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xs text-secondary-foreground text-center leading-tight", children: item.year }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-card border border-border rounded-xl p-4 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-foreground leading-relaxed", children: item.event }) })
            ]
          },
          item.year
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-16",
        "data-ocid": "about.leadership_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "text-center mb-12",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-primary/20 text-primary border-primary/30 px-4 py-1", children: "Meet the Team" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Our Leadership" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mt-2 max-w-xl mx-auto", children: "Dedicated servants who lead by example and shepherd our community with love." })
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LeadershipSkeleton, {}) : activeLeaders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-16 rounded-2xl border border-dashed border-border",
              "data-ocid": "about.leadership.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: "Leadership Profiles Coming Soon" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Our team is excited to meet you!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
              "data-ocid": "about.leadership.list",
              children: activeLeaders.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: i * 0.1 },
                  "data-ocid": `about.leadership.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card h-full overflow-hidden transition-lift hover:-translate-y-1 hover:shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
                    l.photoBlob ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: l.photoBlob.getDirectURL(),
                        alt: l.name,
                        className: "w-full h-48 object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-5xl text-primary/40", children: l.name.charAt(0) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg", children: l.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-secondary font-body font-medium mb-3", children: l.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body line-clamp-3 leading-relaxed", children: l.bio })
                    ] })
                  ] }) })
                },
                l.id.toString()
              ))
            }
          )
        ] })
      }
    )
  ] });
}
export {
  About as default
};
