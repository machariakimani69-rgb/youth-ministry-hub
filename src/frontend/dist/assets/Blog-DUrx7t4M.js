import { r as reactExports, j as jsxRuntimeExports, f as formatDate, B as Button, U as User } from "./index-CPIOcdtY.js";
import { h as useBlogPosts, B as Badge } from "./useQueries-DxEGoYB2.js";
import { C as Card, a as CardContent } from "./card-BUuSK7y6.js";
import { S as Skeleton } from "./skeleton-Dj2ezB5s.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { B as BookOpen } from "./book-open-baAj5-pa.js";
import { C as CalendarDays } from "./calendar-days-DvDnLmFn.js";
import { C as Clock } from "./clock-fzvWW9V_.js";
import { A as ArrowLeft } from "./arrow-left-D7aIU0jW.js";
function readingTime(text) {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
function BlogSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28 rounded-full" })
    ] })
  ] }, n)) });
}
function PostCard({ post, index, onSelect }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index % 6 * 0.09 },
      "data-ocid": `blog.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card h-full overflow-hidden transition-lift hover:-translate-y-1 hover:shadow-elevated cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "w-full text-left",
          onClick: () => onSelect(post),
          "aria-label": `Read ${post.title}`,
          children: [
            post.featuredImageBlob ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: post.featuredImageBlob.getDirectURL(),
                alt: post.title,
                className: "w-full h-44 object-cover group-hover:scale-105 transition-smooth"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-44 bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 text-primary/30" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
                  formatDate(post.createdAt)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  readingTime(post.content),
                  " min read"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2 line-clamp-2 leading-snug text-lg group-hover:text-primary transition-colors", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body line-clamp-3 leading-relaxed mb-4", children: post.content.slice(0, 200) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 text-sm font-display font-semibold text-primary hover:underline", children: "Read More →" })
            ] })
          ]
        }
      ) })
    }
  );
}
function PostDetail({ post, onBack }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "container mx-auto px-4 max-w-3xl py-12",
      "data-ocid": "blog.post_detail",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-display font-medium",
            "data-ocid": "blog.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              " Back to Blog"
            ]
          }
        ),
        post.featuredImageBlob && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.featuredImageBlob.getDirectURL(),
            alt: post.title,
            className: "w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20", children: "Blog Post" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4" }),
            formatDate(post.createdAt)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
            readingTime(post.content),
            " min read"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            "Ministry Team"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight", children: post.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-neutral dark:prose-invert max-w-none font-body leading-relaxed text-foreground/90", children: post.content.split("\n").map(
          (para, i) => para.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mb-4 text-muted-foreground leading-relaxed",
              children: para
            },
            `para-${i + 1}`
          ) : null
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 pt-8 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onBack,
            "data-ocid": "blog.back_to_list_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
              " Back to Blog"
            ]
          }
        ) })
      ]
    }
  );
}
function Blog() {
  const { data: posts = [], isLoading } = useBlogPosts();
  const [selected, setSelected] = reactExports.useState(null);
  const published = posts.filter((p) => p.isPublished);
  const featured = published[0] ?? null;
  const rest = published.slice(1);
  if (selected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background min-h-screen", "data-ocid": "blog.page", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostDetail, { post: selected, onBack: () => setSelected(null) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "blog.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-card border-b border-border",
        style: { minHeight: 340 },
        "data-ocid": "blog.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/blog-hero.dim_1600x500.jpg",
              alt: "Blog community",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-secondary/20 text-secondary border-secondary/30 px-4 py-1", children: "Stories & Reflections" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-bold text-foreground mb-3", children: "Blog" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-body max-w-xl", children: "Stories, reflections, and insights from our community." })
              ]
            }
          ) })
        ]
      }
    ),
    !isLoading && featured && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-12 border-b border-border",
        "data-ocid": "blog.featured_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-semibold text-secondary uppercase tracking-widest mb-5", children: "Featured Post" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center", children: [
            featured.featuredImageBlob ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: featured.featuredImageBlob.getDirectURL(),
                alt: featured.title,
                className: "w-full h-56 object-cover rounded-2xl"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-56 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-16 w-16 text-primary/30" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
                  formatDate(featured.createdAt)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  readingTime(featured.content),
                  " min read"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3 leading-tight", children: featured.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground leading-relaxed mb-5 line-clamp-4", children: featured.content.slice(0, 300) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: () => setSelected(featured),
                  className: "bg-primary text-primary-foreground",
                  "data-ocid": "blog.featured_read_more_button",
                  children: "Read Full Post"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(BlogSkeleton, {}) : published.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "blog.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mx-auto h-14 w-14 text-muted-foreground opacity-30 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Our First Post is Coming Soon!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Stay tuned for stories, reflections, and community updates." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        "data-ocid": "blog.list",
        children: [
          rest.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PostCard,
            {
              post: p,
              index: i,
              onSelect: setSelected
            },
            p.id.toString()
          )),
          published.length === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            PostCard,
            {
              post: featured,
              index: 0,
              onSelect: setSelected
            },
            featured.id.toString()
          )
        ]
      }
    ) }) })
  ] });
}
export {
  Blog as default
};
