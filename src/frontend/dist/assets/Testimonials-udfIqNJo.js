import { y as useActor, r as reactExports, j as jsxRuntimeExports, H as Heart, B as Button, h as ue, f as formatDate, z as createActor } from "./index-CPIOcdtY.js";
import { b as useTestimonials, B as Badge } from "./useQueries-DxEGoYB2.js";
import { C as Card, a as CardContent } from "./card-BUuSK7y6.js";
import { I as Input } from "./input-BWJvKHaA.js";
import { L as Label } from "./label-XxsscQYO.js";
import { S as Skeleton } from "./skeleton-Dj2ezB5s.js";
import { T as Textarea } from "./textarea-CSk6XXTY.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { S as Star } from "./star-S-mbzf3g.js";
import { Q as Quote } from "./quote-C8v75Q_j.js";
function TestimonialSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/4" })
    ] })
  ] }) }, n)) });
}
function TestimonialCard({
  testimonial,
  index,
  variant = "standard"
}) {
  const isFeatured = variant === "featured";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.1 },
      "data-ocid": isFeatured ? `testimonials.featured.item.${index + 1}` : `testimonials.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `h-full border-border ${isFeatured ? "bg-gradient-to-br from-primary/5 to-secondary/5 border-secondary/20" : "bg-card"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
            isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-4", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: "h-4 w-4 fill-secondary text-secondary"
              },
              s
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-5 w-5 text-secondary/60 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `font-body italic leading-relaxed ${isFeatured ? "text-foreground" : "text-foreground/80"} ${isFeatured ? "" : "line-clamp-5"}`,
                  children: testimonial.content
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4", children: [
              testimonial.photoBlob ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: testimonial.photoBlob.getDirectURL(),
                  alt: testimonial.authorName,
                  className: "h-10 w-10 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-sm", children: testimonial.authorName.charAt(0) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm truncate", children: testimonial.authorName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(testimonial.createdAt) })
              ] }),
              isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border-secondary/30 text-xs shrink-0", children: "Featured" })
            ] })
          ] })
        }
      )
    }
  );
}
function Testimonials() {
  const { data: testimonials = [], isLoading, refetch } = useTestimonials();
  const { actor } = useActor(createActor);
  const [form, setForm] = reactExports.useState({ authorName: "", content: "" });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const approved = testimonials.filter((t) => t.isApproved);
  const featured = approved.filter((t) => t.isFeatured);
  const rest = approved.filter((t) => !t.isFeatured);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!actor || !form.authorName || !form.content) return;
    setSubmitting(true);
    try {
      await actor.submitTestimonial(form.authorName, form.content, null);
      ue.success("Testimonial submitted! It will appear after review.");
      setForm({ authorName: "", content: "" });
      refetch();
    } catch {
      ue.error("Failed to submit testimonial. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "testimonials.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-card border-b border-border",
        style: { minHeight: 340 },
        "data-ocid": "testimonials.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/testimonials-hero.dim_1600x500.jpg",
              alt: "Community celebration",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-secondary/20 text-secondary border-secondary/30 px-4 py-1", children: "God's Faithfulness" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-bold text-foreground mb-3", children: "Testimonials" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-body max-w-xl", children: "Hear how God is moving in the lives of our community." })
              ]
            }
          ) })
        ]
      }
    ),
    !isLoading && featured.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-14 border-b border-border",
        "data-ocid": "testimonials.featured_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Featured Stories" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Lives transformed by God's grace" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
              "data-ocid": "testimonials.featured.list",
              children: featured.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TestimonialCard,
                {
                  testimonial: t,
                  index: i,
                  variant: "featured"
                },
                t.id.toString()
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-6", children: "Community Stories" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialSkeleton, {}) : rest.length === 0 && featured.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-16 rounded-2xl border border-dashed border-border",
            "data-ocid": "testimonials.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "mx-auto h-14 w-14 text-muted-foreground opacity-30 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Be the First to Share!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-xs mx-auto", children: "Your story of God's faithfulness can inspire others. Share your testimony today." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "testimonials.list", children: rest.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          TestimonialCard,
          {
            testimonial: t,
            index: i
          },
          t.id.toString()
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border border-border bg-card p-6 sticky top-24 shadow-elevated",
          "data-ocid": "testimonials.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5 text-secondary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Share Your Story" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mb-5", children: "Has God moved in your life? Your testimony can encourage others in their faith journey." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "test-name", children: "Your Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "test-name",
                    placeholder: "Jane Doe",
                    value: form.authorName,
                    onChange: (e) => setForm((f) => ({ ...f, authorName: e.target.value })),
                    required: true,
                    "data-ocid": "testimonials.name_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "test-content", children: "Your Testimony" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "test-content",
                    placeholder: "Share how God has moved in your life…",
                    value: form.content,
                    onChange: (e) => setForm((f) => ({ ...f, content: e.target.value })),
                    required: true,
                    rows: 6,
                    "data-ocid": "testimonials.content_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full bg-primary text-primary-foreground",
                  disabled: submitting || !actor,
                  "data-ocid": "testimonials.submit_button",
                  children: submitting ? "Submitting…" : "Share Testimony"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Your testimony will be reviewed before publishing." })
            ] })
          ]
        }
      ) })
    ] }) }) })
  ] });
}
export {
  Testimonials as default
};
