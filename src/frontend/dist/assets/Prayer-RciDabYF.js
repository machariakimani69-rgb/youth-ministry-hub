import { c as createLucideIcon, r as reactExports, v as PrayerStatus, w as PrayerPrivacy, j as jsxRuntimeExports, H as Heart, B as Button, h as ue, x as formatDateShort } from "./index-CPIOcdtY.js";
import { l as usePrayerRequests, m as useSubmitPrayerRequest, B as Badge } from "./useQueries-DxEGoYB2.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BUuSK7y6.js";
import { I as Input } from "./input-BWJvKHaA.js";
import { L as Label } from "./label-XxsscQYO.js";
import { R as RadioGroup, L as Lock, a as RadioGroupItem } from "./radio-group-8BiY1mO8.js";
import { S as Skeleton } from "./skeleton-Dj2ezB5s.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-C12HVHIn.js";
import { T as Textarea } from "./textarea-CSk6XXTY.js";
import { u as useForm } from "./index.esm-BopNdsTi.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { A as AnimatePresence } from "./index-BGjtlR7s.js";
import { C as CircleCheck } from "./circle-check-CTEr1gZn.js";
import { U as UserX } from "./user-x-Cu5rbwdc.js";
import "./index-C2fOTmji.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const PRIVACY_OPTIONS = [
  {
    value: PrayerPrivacy.public_,
    label: "Public",
    desc: "Visible to everyone",
    icon: Heart
  },
  {
    value: PrayerPrivacy.membersOnly,
    label: "Members Only",
    desc: "Visible to registered members",
    icon: ShieldCheck
  },
  {
    value: PrayerPrivacy.private_,
    label: "Private",
    desc: "Only visible to leaders",
    icon: Lock
  }
];
function PrayerSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/4" })
  ] }) });
}
function PrayerCard({ prayer }) {
  const isAnswered = prayer.status === PrayerStatus.answered;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `border-border bg-card hover:shadow-subtle transition-smooth ${isAnswered ? "border-l-4 border-l-secondary" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                isAnswered ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-secondary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-primary flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm", children: prayer.submitterName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body flex-shrink-0", children: formatDateShort(prayer.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 font-body leading-relaxed", children: prayer.content }),
            isAnswered && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "mt-3 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 mr-1" }),
              " Answered"
            ] })
          ] })
        }
      )
    }
  );
}
function Prayer() {
  const { data: requests = [], isLoading } = usePrayerRequests();
  const submitMutation = useSubmitPrayerRequest();
  const [submitted, setSubmitted] = reactExports.useState(false);
  const activeRequests = requests.filter(
    (r) => r.status === PrayerStatus.active && r.privacy === PrayerPrivacy.public_
  );
  const answeredRequests = requests.filter(
    (r) => r.status === PrayerStatus.answered && r.privacy === PrayerPrivacy.public_
  );
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: "",
      content: "",
      privacy: PrayerPrivacy.public_,
      anonymous: false
    }
  });
  const isAnonymous = watch("anonymous");
  const selectedPrivacy = watch("privacy");
  const onSubmit = async (data) => {
    try {
      const name = data.anonymous ? "Anonymous" : data.name;
      await submitMutation.mutateAsync({
        name,
        content: data.content,
        privacy: data.privacy
      });
      setSubmitted(true);
      reset();
      ue.success("Prayer request submitted", {
        description: "We're lifting your request up in prayer."
      });
      setTimeout(() => setSubmitted(false), 4e3);
    } catch {
      ue.error("Failed to submit prayer request", {
        description: "Please try again."
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", "data-ocid": "prayer.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "mb-4 font-display text-xs uppercase tracking-widest",
              children: "Prayer Wall"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-3", children: "Prayer Requests" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg max-w-xl", children: "Share your heart with us. We pray together as a community, lifting one another in faith." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background flex-1 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card sticky top-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-secondary" }),
              "Submit a Prayer Request"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                className: "text-center py-8",
                "data-ocid": "prayer.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-12 w-12 text-secondary mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "Prayer Received" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "We're lifting your request up in faith." })
                ]
              },
              "success"
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.form,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                onSubmit: handleSubmit(onSubmit),
                className: "space-y-5",
                "data-ocid": "prayer.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "checkbox",
                        id: "prayer-anonymous",
                        checked: isAnonymous,
                        onChange: () => setValue("anonymous", !isAnonymous),
                        className: "h-5 w-5 rounded border-input accent-primary cursor-pointer",
                        "data-ocid": "prayer.anonymous.checkbox"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "prayer-anonymous",
                        className: "cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-display font-medium text-foreground flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-3.5 w-3.5" }),
                            " Submit Anonymously"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your name won't be shown publicly" })
                        ]
                      }
                    )
                  ] }),
                  !isAnonymous && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "prayer-name",
                        className: "font-display text-sm",
                        children: "Your Name"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "prayer-name",
                        placeholder: "Enter your name",
                        ...register("name", {
                          required: !isAnonymous ? "Name is required" : false
                        }),
                        "data-ocid": "prayer.name.input"
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "prayer.name.field_error",
                        children: errors.name.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "prayer-content",
                        className: "font-display text-sm",
                        children: "Prayer Request"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "prayer-content",
                        placeholder: "Share your prayer request here…",
                        rows: 5,
                        className: "resize-none",
                        ...register("content", {
                          required: "Please share your request.",
                          minLength: {
                            value: 10,
                            message: "Please provide more detail."
                          }
                        }),
                        "data-ocid": "prayer.content.textarea"
                      }
                    ),
                    errors.content && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "prayer.content.field_error",
                        children: errors.content.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display text-sm", children: "Privacy" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      RadioGroup,
                      {
                        value: selectedPrivacy,
                        onValueChange: (v) => setValue("privacy", v),
                        className: "space-y-2",
                        "data-ocid": "prayer.privacy.radio",
                        children: PRIVACY_OPTIONS.map((opt) => {
                          const Icon = opt.icon;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "label",
                            {
                              htmlFor: `privacy-${opt.label}`,
                              className: `flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth ${selectedPrivacy === opt.value ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  RadioGroupItem,
                                  {
                                    id: `privacy-${opt.label}`,
                                    value: opt.value,
                                    className: "sr-only"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground", children: opt.label }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: opt.desc })
                                ] })
                              ]
                            },
                            opt.label
                          );
                        })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full font-display",
                      disabled: isSubmitting,
                      "data-ocid": "prayer.submit_button",
                      children: isSubmitting ? "Submitting…" : "Submit Prayer Request"
                    }
                  )
                ]
              },
              "form"
            ) }) })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "active", "data-ocid": "prayer.tabs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full grid grid-cols-2 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "active", "data-ocid": "prayer.active.tab", children: [
                "Active Requests",
                activeRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2 text-xs", children: activeRequests.length })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "answered",
                  "data-ocid": "prayer.answered.tab",
                  children: [
                    "Answered Prayers",
                    answeredRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2 text-xs", children: answeredRequests.length })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "active", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerSkeleton, {}, n)) }) : activeRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-16",
                "data-ocid": "prayer.active.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: "No Active Requests" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm max-w-xs mx-auto", children: "Be the first to share a prayer request with our community." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: activeRequests.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerCard, { prayer: req }, req.id.toString())) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "answered", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerSkeleton, {}, n)) }) : answeredRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-16",
                "data-ocid": "prayer.answered.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: "Answered Prayers Coming" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm max-w-xs mx-auto", children: "This section celebrates prayers that God has answered. Stay faithful!" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: answeredRequests.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerCard, { prayer: req }, req.id.toString())) }) })
          ] })
        }
      ) })
    ] }) }) })
  ] });
}
export {
  Prayer as default
};
