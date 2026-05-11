import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, g as LogIn, B as Button, h as ue, y as useActor, T as useQueryClient, V as useMutation, z as createActor } from "./index-CPIOcdtY.js";
import { C as Card, a as CardContent } from "./card-BUuSK7y6.js";
import { I as Input } from "./input-BWJvKHaA.js";
import { L as Label } from "./label-XxsscQYO.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { A as ArrowLeft } from "./arrow-left-D7aIU0jW.js";
import { C as Clock } from "./clock-fzvWW9V_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function useRegisterUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.registerUser(name, email, phone);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["callerProfile"] })
  });
}
const steps = [
  { number: 1, label: "Sign In" },
  { number: 2, label: "Register" },
  { number: 3, label: "Approved" }
];
function Register() {
  const { isAuthenticated, login, isLoggingIn } = useAuth();
  const register = useRegisterUser();
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    terms: false
  });
  const [errors, setErrors] = reactExports.useState({});
  const currentStep = !isAuthenticated ? 1 : submitted ? 3 : 2;
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "A valid email is required.";
    if (!form.terms) e.terms = "You must accept the terms to continue.";
    return e;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await register.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone || null
      });
      setSubmitted(true);
    } catch {
      ue.error("Registration failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "register.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/20 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
            "Member Registration"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Join Youth Ministry Hub" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg", children: "Become part of a community built on faith, friendship, and purpose." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-0", children: steps.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-9 w-9 rounded-full flex items-center justify-center font-semibold text-sm transition-smooth ${currentStep > step.number ? "bg-primary text-primary-foreground" : currentStep === step.number ? "bg-primary/20 text-primary border-2 border-primary" : "bg-muted text-muted-foreground border-2 border-border"}`,
            children: currentStep > step.number ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }) : step.number
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xs ${currentStep >= step.number ? "text-foreground font-medium" : "text-muted-foreground"}`,
            children: step.label
          }
        )
      ] }),
      idx < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-0.5 w-16 sm:w-24 mb-5 transition-smooth ${currentStep > step.number ? "bg-primary" : "bg-border"}`
        }
      )
    ] }, step.number)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-lg", children: [
      !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-8 w-8 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-3", children: "Sign In First" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-6 text-sm", children: "You need to authenticate with Internet Identity before registering as a member." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: login,
                disabled: isLoggingIn,
                size: "lg",
                className: "bg-primary text-primary-foreground font-semibold gap-2 w-full",
                "data-ocid": "register.login_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                  isLoggingIn ? "Connecting…" : "Sign In with Internet Identity"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/",
                className: "mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
                "data-ocid": "register.back_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
                  " Back to Home"
                ]
              }
            )
          ] }) })
        }
      ),
      isAuthenticated && !submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-1", children: "Your Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: "Fill in your information to complete membership registration." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "space-y-5",
                "data-ocid": "register.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-name", children: "Full Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "r-name",
                        placeholder: "e.g. Amara Osei",
                        value: form.name,
                        onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                        "data-ocid": "register.name_input"
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-destructive text-xs",
                        "data-ocid": "register.name_error",
                        children: errors.name
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-email", children: "Email Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "r-email",
                        type: "email",
                        placeholder: "you@example.com",
                        value: form.email,
                        onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                        "data-ocid": "register.email_input"
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-destructive text-xs",
                        "data-ocid": "register.email_error",
                        children: errors.email
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "r-phone", children: [
                      "Phone",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "r-phone",
                        type: "tel",
                        placeholder: "+254 700 000 000",
                        value: form.phone,
                        onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                        "data-ocid": "register.phone_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-4 space-y-3 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Community Commitment" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 list-disc list-inside", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Respect all members and leaders" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Participate in community activities with an open heart" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Keep shared content encouraging and faith-centered" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "checkbox",
                        id: "r-terms",
                        checked: form.terms,
                        onChange: (e) => setForm((f) => ({ ...f, terms: e.target.checked })),
                        className: "mt-0.5 h-4 w-4 accent-primary",
                        "data-ocid": "register.terms_checkbox"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "r-terms",
                        className: "text-sm text-muted-foreground leading-snug cursor-pointer",
                        children: "I agree to the community guidelines and terms of membership."
                      }
                    )
                  ] }),
                  errors.terms && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs",
                      "data-ocid": "register.terms_error",
                      children: errors.terms
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: register.isPending,
                      className: "w-full bg-primary text-primary-foreground font-semibold",
                      "data-ocid": "register.submit_button",
                      children: register.isPending ? "Submitting…" : "Complete Registration"
                    }
                  )
                ]
              }
            )
          ] }) })
        }
      ),
      submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CardContent,
            {
              className: "p-10 text-center",
              "data-ocid": "register.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-10 w-10 text-secondary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "You're Registered!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body mb-4", children: [
                  "Your registration has been received. An admin will review and approve your account within",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "1–2 business days" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "Once approved, you'll have full access to member features, events, and the community." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "gap-1.5",
                      "data-ocid": "register.view_profile_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
                        " View My Profile"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      className: "bg-primary text-primary-foreground gap-1.5",
                      "data-ocid": "register.go_home_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                        " Back to Home"
                      ]
                    }
                  ) })
                ] })
              ]
            }
          ) })
        }
      )
    ] }) })
  ] });
}
export {
  Register as default
};
