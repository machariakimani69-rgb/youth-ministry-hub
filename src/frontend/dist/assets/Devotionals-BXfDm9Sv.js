import { r as reactExports, j as jsxRuntimeExports, s as Sun, B as Button, f as formatDate } from "./index-CPIOcdtY.js";
import { k as useDevotionals, B as Badge } from "./useQueries-DxEGoYB2.js";
import { C as Card, a as CardContent } from "./card-BUuSK7y6.js";
import { S as Skeleton } from "./skeleton-Dj2ezB5s.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { Q as Quote } from "./quote-C8v75Q_j.js";
import { C as ChevronRight } from "./chevron-right-D4bO022t.js";
import { B as BookOpen } from "./book-open-baAj5-pa.js";
const TODAY = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});
function DevotionalSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" })
  ] }) }, n)) });
}
function DevotionalDetail({ devotional, onBack }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "container mx-auto px-4 max-w-3xl py-12",
      "data-ocid": "devotionals.detail",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-display font-medium",
            "data-ocid": "devotionals.back_button",
            children: "← Back to Devotionals"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-8 md:p-12 shadow-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-6 w-6 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(devotional.date) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-xl", children: devotional.title })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "border-l-4 border-secondary/60 pl-6 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-5 w-5 text-secondary shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg leading-snug", children: devotional.scripture })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-7", children: "Scripture Reference" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: devotional.reflection.split("\n").map(
            (para, i) => para.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-foreground/85 leading-relaxed",
                children: para
              },
              `ref-${i + 1}`
            ) : null
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-6 border-t border-border flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share this devotional" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: onBack,
                "data-ocid": "devotionals.close_detail_button",
                children: "Back to List"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function Devotionals() {
  const { data: devotionals = [], isLoading } = useDevotionals();
  const [selected, setSelected] = reactExports.useState(null);
  const sorted = [...devotionals].sort((a, b) => Number(b.date - a.date));
  const todayDevotional = sorted[0] ?? null;
  const pastDevotionals = sorted.slice(1);
  if (selected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background min-h-screen", "data-ocid": "devotionals.page", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DevotionalDetail,
      {
        devotional: selected,
        onBack: () => setSelected(null)
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "devotionals.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-card border-b border-border",
        style: { minHeight: 340 },
        "data-ocid": "devotionals.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/devotionals-hero.dim_1600x500.jpg",
              alt: "Morning devotional",
              className: "absolute inset-0 w-full h-full object-cover opacity-25"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-card/70 via-card/50 to-card" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-secondary/20 text-secondary border-secondary/30 px-4 py-1", children: "Daily Word" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-bold text-foreground mb-3", children: "Daily Devotionals" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-body max-w-xl", children: "Start each day with Scripture, reflection, and prayer." })
              ]
            }
          ) })
        ]
      }
    ),
    !isLoading && todayDevotional && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-gradient-to-br from-secondary/10 via-background to-primary/10 py-14 border-b border-border",
        "data-ocid": "devotionals.featured_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-6 w-6 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-semibold text-secondary uppercase tracking-widest", children: "Today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: TODAY })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.2 },
              className: "bg-card rounded-2xl border border-border shadow-elevated p-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "border-l-4 border-secondary/60 pl-6 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-5 w-5 text-secondary shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-xl leading-snug", children: todayDevotional.scripture })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: todayDevotional.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground leading-relaxed line-clamp-4 mb-6", children: todayDevotional.reflection }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    className: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                    onClick: () => setSelected(todayDevotional),
                    "data-ocid": "devotionals.read_today_button",
                    children: [
                      "Read Full Devotional ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
                    ]
                  }
                )
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      pastDevotionals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-8", children: "Past Devotionals" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(DevotionalSkeleton, {}) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 rounded-2xl border border-dashed border-border",
          "data-ocid": "devotionals.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mx-auto h-14 w-14 text-muted-foreground opacity-30 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "New Devotionals Coming Soon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Daily devotionals will be added regularly. Check back tomorrow!" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "devotionals.list", children: pastDevotionals.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.45, delay: i * 0.06 },
          "data-ocid": `devotionals.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card transition-smooth hover:shadow-md cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-full text-left",
              onClick: () => setSelected(d),
              "aria-label": `Read devotional: ${d.title}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-secondary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground group-hover:text-primary transition-colors truncate", children: d.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-secondary mt-0.5 truncate", children: d.scripture })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground shrink-0", children: formatDate(d.date) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-2 line-clamp-2 leading-relaxed", children: d.reflection })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" })
              ] }) })
            }
          ) })
        },
        d.id.toString()
      )) })
    ] }) })
  ] });
}
export {
  Devotionals as default
};
