import { c as createLucideIcon, r as reactExports, l as useComposedRefs, i as useControllableState, j as jsxRuntimeExports, P as Primitive, k as composeEventHandlers, o as useSize, p as createContextScope, q as cn, u as useAuth, G as useCallerProfile, J as useUserRole, K as PageLoader, M as RegistrationStatus, U as User, H as Heart, B as Button, g as LogIn, N as UserRole, O as useSaveProfile, f as formatDate, X, D as formatCurrency, Q as Moon, y as useActor, T as useQueryClient, V as useMutation, h as ue, R as RsvpStatus, z as createActor } from "./index-CPIOcdtY.js";
import { B as Badge, a as useEvents, f as useSubmitRsvp, o as useDonations } from "./useQueries-DxEGoYB2.js";
import { C as Card, a as CardContent, b as CardHeader } from "./card-BUuSK7y6.js";
import { I as Input } from "./input-BWJvKHaA.js";
import { L as Label } from "./label-XxsscQYO.js";
import { S as Separator } from "./separator-BMnDqqhO.js";
import { u as usePrevious } from "./index-C2fOTmji.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-C12HVHIn.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { C as Calendar } from "./calendar-CnJCSJnH.js";
import { S as Settings, a as Save } from "./settings-DdPbItz7.js";
import { C as Clock } from "./clock-fzvWW9V_.js";
import { G as Gift } from "./gift-C-G_PU7K.js";
import { C as Check } from "./check-D8Svqf9K.js";
import { B as BookOpen } from "./book-open-baAj5-pa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
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
function RoleBadge({ role }) {
  const config = {
    [UserRole.admin]: {
      label: "Admin",
      className: "bg-destructive/20 text-destructive border-destructive/40"
    },
    [UserRole.leader]: {
      label: "Leader",
      className: "bg-secondary/20 text-secondary border-secondary/40"
    },
    [UserRole.member]: {
      label: "Member",
      className: "bg-primary/20 text-primary border-primary/40"
    },
    [UserRole.guest]: {
      label: "Guest",
      className: "bg-muted text-muted-foreground border-border"
    }
  };
  const c = config[role] ?? config[UserRole.guest];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      className: `text-xs font-semibold px-2.5 py-0.5 border ${c.className}`,
      children: c.label
    }
  );
}
function LoginGate({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      className: "flex min-h-[70vh] items-center justify-center px-4",
      "data-ocid": "profile.login_required",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-10 w-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Welcome to Your Member Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-8", children: "Sign in with Internet Identity to access your profile, track events, view donation history, and connect with the community." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: onLogin,
            size: "lg",
            className: "bg-primary text-primary-foreground gap-2 font-semibold",
            "data-ocid": "profile.login_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
              "Sign In with Internet Identity"
            ]
          }
        )
      ] })
    }
  );
}
function RegistrationForm() {
  const register = useRegisterUser();
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    terms: false
  });
  const [errors, setErrors] = reactExports.useState({});
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
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center py-12",
        "data-ocid": "profile.pending_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-10 w-10 text-secondary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Registration Submitted!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body max-w-md mx-auto mb-4", children: [
            "Your membership request has been received. An admin will review and approve your account within",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "1–2 business days" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Check back soon or contact us if you have questions." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-1", children: "Join the Community" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: "Complete your registration to become a member." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-5",
        "data-ocid": "register.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-name", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "reg-name",
                placeholder: "Your full name",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-email", children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "reg-email",
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reg-phone", children: [
              "Phone Number",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "reg-phone",
                type: "tel",
                placeholder: "+254 700 000 000",
                value: form.phone,
                onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                "data-ocid": "register.phone_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                id: "reg-terms",
                checked: form.terms,
                onChange: (e) => setForm((f) => ({ ...f, terms: e.target.checked })),
                className: "mt-0.5 h-4 w-4 accent-primary",
                "data-ocid": "register.terms_checkbox"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "reg-terms",
                className: "text-sm text-muted-foreground leading-snug cursor-pointer",
                children: "I agree to the community guidelines and terms of membership for Anchor Youth Ministry."
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
              children: register.isPending ? "Registering…" : "Complete Registration"
            }
          )
        ]
      }
    )
  ] });
}
function PendingApproval({ name }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "text-center py-10",
      "data-ocid": "profile.pending_approval",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-10 w-10 text-secondary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Pending Approval" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body max-w-md mx-auto mb-2", children: [
          "Hello, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: name }),
          "! Your account is pending admin approval."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto", children: [
          "Estimated wait time:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "1–2 business days" }),
          ". You'll have full access once approved. Contact us if you need help."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-5 py-2 text-sm text-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
          "Awaiting Admin Review"
        ] })
      ]
    }
  );
}
function ProfileTab() {
  const { data: profile } = useCallerProfile();
  const saveProfile = useSaveProfile();
  const [editing, setEditing] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ name: "", email: "", phone: "" });
  if (!profile) return null;
  const startEdit = () => {
    setForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? ""
    });
    setEditing(true);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await saveProfile.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone || null
      });
      ue.success("Profile saved!");
      setEditing(false);
    } catch {
      ue.error("Failed to save profile.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-3xl shrink-0", children: profile.name.charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground truncate", children: profile.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: profile.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: profile.registrationStatus })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-1.5", children: [
          "Member since ",
          formatDate(profile.joinedAt)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSave,
        className: "space-y-4",
        "data-ocid": "profile.edit_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pt-name", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pt-name",
                  value: form.name,
                  onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                  required: true,
                  "data-ocid": "profile.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pt-email", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pt-email",
                  type: "email",
                  value: form.email,
                  onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                  required: true,
                  "data-ocid": "profile.email_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pt-phone", children: [
              "Phone",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pt-phone",
                type: "tel",
                value: form.phone,
                onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                "data-ocid": "profile.phone_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: saveProfile.isPending,
                className: "bg-primary text-primary-foreground gap-1.5",
                "data-ocid": "profile.save_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                  saveProfile.isPending ? "Saving…" : "Save Changes"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: () => setEditing(false),
                "data-ocid": "profile.cancel_button",
                children: "Cancel"
              }
            )
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body", children: profile.email })
        ] }),
        profile.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body", children: profile.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body capitalize", children: profile.role })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Member Since" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body", children: formatDate(profile.joinedAt) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: startEdit,
          className: "gap-1.5",
          "data-ocid": "profile.edit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            " Edit Profile"
          ]
        }
      )
    ] })
  ] });
}
function EventsTab() {
  const { data: events = [], isLoading } = useEvents();
  const submitRsvp = useSubmitRsvp();
  const cancelRsvp = async (eventId) => {
    try {
      await submitRsvp.mutateAsync({ eventId, status: RsvpStatus.notGoing });
      ue.success("RSVP cancelled.");
    } catch {
      ue.error("Could not cancel RSVP.");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "profile.events_loading", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 rounded-lg bg-muted animate-pulse" }, n)) });
  }
  const upcomingEvents = events.filter(
    (e) => Number(e.endDate) / 1e6 > Date.now()
  );
  if (!upcomingEvents.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", "data-ocid": "profile.events_empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mx-auto h-10 w-10 text-muted-foreground opacity-40 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "No upcoming events found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/events",
          className: "text-primary text-sm mt-2 inline-block hover:underline",
          children: "Browse Events →"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "profile.events_list", children: upcomingEvents.map((event, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: idx * 0.06 },
      className: "flex items-start gap-4 p-4 rounded-lg bg-muted/40 border border-border",
      "data-ocid": `profile.event_item.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm truncate", children: event.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5", children: [
            formatDate(event.startDate),
            " · ",
            event.location
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => cancelRsvp(event.id),
            className: "text-destructive hover:text-destructive shrink-0 gap-1",
            "data-ocid": `profile.cancel_rsvp.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
              " Cancel"
            ]
          }
        )
      ]
    },
    event.id.toString()
  )) });
}
function DonationsTab() {
  const { data: donations = [], isLoading } = useDonations();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "profile.donations_loading", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 rounded-lg bg-muted animate-pulse" }, n)) });
  }
  if (!donations.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-10",
        "data-ocid": "profile.donations_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "mx-auto h-10 w-10 text-muted-foreground opacity-40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "No donation history yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/donate",
              className: "text-primary text-sm mt-2 inline-block hover:underline",
              children: "Make a Donation →"
            }
          )
        ]
      }
    );
  }
  const total = donations.reduce(
    (sum, d) => sum + d.amountCents,
    0n
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "profile.donations_list", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-lg bg-secondary/10 border border-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5 text-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Total Contributions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-secondary", children: formatCurrency(total) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: donations.map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: idx * 0.06 },
        className: "flex items-center gap-4 p-4 rounded-lg bg-muted/40 border border-border",
        "data-ocid": `profile.donation_item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-secondary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-semibold", children: formatCurrency(d.amountCents, d.currency) }),
            d.message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs truncate", children: d.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs shrink-0", children: formatDate(d.createdAt) })
        ]
      },
      d.id.toString()
    )) })
  ] });
}
function SettingsTab() {
  const [prefs, setPrefs] = reactExports.useState({
    eventReminders: true,
    newsletter: true,
    darkMode: true
  });
  const toggle = (key) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    ue.success("Preference updated.");
  };
  const items = [
    {
      key: "eventReminders",
      icon: Bell,
      label: "Event Reminders",
      description: "Get notified about upcoming events and schedule changes.",
      ocid: "profile.event_reminders_toggle"
    },
    {
      key: "newsletter",
      icon: BookOpen,
      label: "Newsletter",
      description: "Receive weekly devotionals, announcements, and community news.",
      ocid: "profile.newsletter_toggle"
    },
    {
      key: "darkMode",
      icon: Moon,
      label: "Dark Mode",
      description: "Use dark theme for a comfortable viewing experience.",
      ocid: "profile.dark_mode_toggle"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "profile.settings_panel", children: items.map(({ key, icon: Icon, label, description, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between p-4 rounded-lg bg-muted/40 border border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-semibold", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: description })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: prefs[key],
            onCheckedChange: () => toggle(key),
            "data-ocid": ocid
          }
        )
      ]
    },
    key
  )) });
}
function Profile() {
  const { isAuthenticated, login } = useAuth();
  const { data: profile, isLoading } = useCallerProfile();
  const { role } = useUserRole();
  if (!isAuthenticated) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginGate, { onLogin: login });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {});
  const isNotRegistered = !profile;
  const isPending = (profile == null ? void 0 : profile.registrationStatus) === RegistrationStatus.pending;
  const isApproved = (profile == null ? void 0 : profile.registrationStatus) === RegistrationStatus.approved;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        className: "flex flex-col sm:flex-row sm:items-center gap-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-2xl shrink-0", children: profile ? profile.name.charAt(0).toUpperCase() : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: profile ? profile.name : "Member Portal" }),
            profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs capitalize", children: profile.registrationStatus })
            ] })
          ] })
        ] })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      isNotRegistered && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card max-w-lg mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RegistrationForm, {}) }) }),
      isPending && profile && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card max-w-lg mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PendingApproval, { name: profile.name }) }) }),
      isApproved && profile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsList,
          {
            className: "mb-6 bg-muted/50 p-1 rounded-xl gap-1",
            "data-ocid": "profile.tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "profile",
                  className: "gap-1.5",
                  "data-ocid": "profile.tab.profile",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                    " Profile"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "events",
                  className: "gap-1.5",
                  "data-ocid": "profile.tab.events",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                    " My Events"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "donations",
                  className: "gap-1.5",
                  "data-ocid": "profile.tab.donations",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
                    " Donations"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "settings",
                  className: "gap-1.5",
                  "data-ocid": "profile.tab.settings",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
                    " Settings"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsContent,
          {
            value: "profile",
            "data-ocid": "profile.tab_panel.profile",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-0 px-6 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: "My Profile" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, {}) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "events", "data-ocid": "profile.tab_panel.events", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-0 px-6 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: "My RSVPs" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EventsTab, {}) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsContent,
          {
            value: "donations",
            "data-ocid": "profile.tab_panel.donations",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-0 px-6 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: "Donation History" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DonationsTab, {}) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsContent,
          {
            value: "settings",
            "data-ocid": "profile.tab_panel.settings",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-0 px-6 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: "Preferences" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsTab, {}) })
            ] })
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Profile as default
};
