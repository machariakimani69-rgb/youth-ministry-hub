import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, h as ue } from "./index-CPIOcdtY.js";
import { p as useSettings, q as useSubmitContact, B as Badge } from "./useQueries-DxEGoYB2.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BUuSK7y6.js";
import { I as Input } from "./input-BWJvKHaA.js";
import { L as Label } from "./label-XxsscQYO.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BA1WiTzi.js";
import { T as Textarea } from "./textarea-CSk6XXTY.js";
import { u as useForm } from "./index.esm-BopNdsTi.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { P as Phone, M as MessageCircle } from "./phone-B_IAkDL5.js";
import { M as Mail } from "./mail-DcUnBHUu.js";
import { M as MapPin } from "./map-pin-Wb1Zd8Aa.js";
import { A as AnimatePresence } from "./index-BGjtlR7s.js";
import { C as CircleCheck } from "./circle-check-CTEr1gZn.js";
import "./index-IXOTxK3N.js";
import "./index-C2fOTmji.js";
import "./check-D8Svqf9K.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
];
const Facebook = createLucideIcon("facebook", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$2);
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
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
];
const Twitter = createLucideIcon("twitter", __iconNode$1);
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
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
];
const Youtube = createLucideIcon("youtube", __iconNode);
const SUBJECTS = [
  "General Inquiry",
  "Event Information",
  "Prayer Request",
  "Volunteering",
  "Membership",
  "Donations",
  "Other"
];
const DEFAULT_PHONE = "+254 700 000 000";
const DEFAULT_EMAIL = "info@anchoryouth.org";
const DEFAULT_ADDRESS = "123 Faith Avenue, Nairobi, Kenya";
const WHATSAPP_NUMBER = "254700000000";
function SocialIcon({
  href,
  label,
  icon: Icon,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": label,
      className: "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-smooth",
      "data-ocid": ocid,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
    }
  );
}
function Contact() {
  const { data: settings } = useSettings();
  const submitContact = useSubmitContact();
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [selectedSubject, setSelectedSubject] = reactExports.useState("");
  const phone = (settings == null ? void 0 : settings.contactPhone) ?? DEFAULT_PHONE;
  const email = (settings == null ? void 0 : settings.contactEmail) ?? DEFAULT_EMAIL;
  const address = (settings == null ? void 0 : settings.address) ?? DEFAULT_ADDRESS;
  const social = settings == null ? void 0 : settings.socialLinks;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Anchor%20Youth!`;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { name: "", email: "", subject: "", message: "" }
  });
  const onSubmit = async (data) => {
    try {
      await submitContact.mutateAsync(data);
      setSubmitted(true);
      reset();
      setSelectedSubject("");
      ue.success("Message sent!", {
        description: "We'll get back to you within 24–48 hours."
      });
    } catch {
      ue.error("Failed to send message", {
        description: "Please try again or contact us directly."
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", "data-ocid": "contact.page", children: [
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
              children: "Reach Out"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-3", children: "Contact Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg max-w-xl", children: "We'd love to hear from you. Whether you have a question, need prayer, or want to get involved — reach out anytime." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background flex-1 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "lg:col-span-2 space-y-6",
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Get in Touch" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `tel:${phone}`,
                    className: "flex items-center gap-3 group",
                    "data-ocid": "contact.phone.link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-display", children: "Phone" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground group-hover:text-primary transition-colors", children: phone })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `mailto:${email}`,
                    className: "flex items-center gap-3 group",
                    "data-ocid": "contact.email.link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-display", children: "Email" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground group-hover:text-primary transition-colors break-all", children: email })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-display", children: "Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground", children: address })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: whatsappUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                "data-ocid": "contact.whatsapp.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card hover:shadow-subtle transition-smooth group cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-6 w-6 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Chat on WhatsApp" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Quick responses during office hours" })
                  ] })
                ] }) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-48 bg-muted/40 flex items-center justify-center relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.07%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-8 w-8 text-primary mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display text-muted-foreground", children: address }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-xs text-primary hover:underline mt-1 block",
                    "data-ocid": "contact.map.link",
                    children: "Open in Google Maps →"
                  }
                )
              ] })
            ] }) }),
            social && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-display uppercase tracking-widest mb-3", children: "Follow Us" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                social.facebook && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SocialIcon,
                  {
                    href: social.facebook,
                    label: "Facebook",
                    icon: Facebook,
                    ocid: "contact.facebook.link"
                  }
                ),
                social.instagram && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SocialIcon,
                  {
                    href: social.instagram,
                    label: "Instagram",
                    icon: Instagram,
                    ocid: "contact.instagram.link"
                  }
                ),
                social.twitter && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SocialIcon,
                  {
                    href: social.twitter,
                    label: "Twitter",
                    icon: Twitter,
                    ocid: "contact.twitter.link"
                  }
                ),
                social.youtube && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SocialIcon,
                  {
                    href: social.youtube,
                    label: "YouTube",
                    icon: Youtube,
                    ocid: "contact.youtube.link"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "lg:col-span-3",
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Send a Message" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                className: "text-center py-12",
                "data-ocid": "contact.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-14 w-14 text-secondary mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "Message Sent!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm max-w-xs mx-auto", children: "Thank you for reaching out. We'll respond within 24–48 hours." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "mt-6 font-display",
                      onClick: () => setSubmitted(false),
                      "data-ocid": "contact.send_another.button",
                      children: "Send Another Message"
                    }
                  )
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
                "data-ocid": "contact.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "contact-name",
                          className: "font-display text-sm",
                          children: [
                            "Full Name",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "contact-name",
                          placeholder: "Your full name",
                          ...register("name", {
                            required: "Name is required"
                          }),
                          "data-ocid": "contact.name.input"
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "contact.name.field_error",
                          children: errors.name.message
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "contact-email",
                          className: "font-display text-sm",
                          children: [
                            "Email Address",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "contact-email",
                          type: "email",
                          placeholder: "your@email.com",
                          ...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Enter a valid email address"
                            }
                          }),
                          "data-ocid": "contact.email.input"
                        }
                      ),
                      errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "contact.email.field_error",
                          children: errors.email.message
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "contact-subject",
                        className: "font-display text-sm",
                        children: [
                          "Subject ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: selectedSubject,
                        onValueChange: (v) => {
                          setSelectedSubject(v);
                          setValue("subject", v);
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectTrigger,
                            {
                              id: "contact-subject",
                              "data-ocid": "contact.subject.select",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a subject" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                        ]
                      }
                    ),
                    errors.subject && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "contact.subject.field_error",
                        children: errors.subject.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "contact-message",
                        className: "font-display text-sm",
                        children: [
                          "Message ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "contact-message",
                        placeholder: "Tell us how we can help…",
                        rows: 6,
                        className: "resize-none",
                        ...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 20,
                            message: "Please provide more detail (min 20 characters)."
                          }
                        }),
                        "data-ocid": "contact.message.textarea"
                      }
                    ),
                    errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "contact.message.field_error",
                        children: errors.message.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full font-display",
                      disabled: isSubmitting,
                      "data-ocid": "contact.submit_button",
                      children: isSubmitting ? "Sending…" : "Send Message"
                    }
                  )
                ]
              },
              "form"
            ) }) })
          ] })
        }
      )
    ] }) }) })
  ] });
}
export {
  Contact as default
};
