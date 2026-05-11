import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, A as Presence, P as Primitive, i as useControllableState, l as useComposedRefs, k as composeEventHandlers, o as useSize, p as createContextScope, q as cn, y as useActor, C as useSearch, H as Heart, D as formatCurrency, B as Button, h as ue, f as formatDate, z as createActor } from "./index-CPIOcdtY.js";
import { n as useTotalDonations, o as useDonations, B as Badge } from "./useQueries-DxEGoYB2.js";
import { C as Card, a as CardContent } from "./card-BUuSK7y6.js";
import { u as usePrevious } from "./index-C2fOTmji.js";
import { C as Check } from "./check-D8Svqf9K.js";
import { I as Input } from "./input-BWJvKHaA.js";
import { L as Label } from "./label-XxsscQYO.js";
import { R as RadioGroup, a as RadioGroupItem, L as Lock } from "./radio-group-8BiY1mO8.js";
import { S as Separator } from "./separator-BMnDqqhO.js";
import { S as Skeleton } from "./skeleton-Dj2ezB5s.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-C12HVHIn.js";
import { T as Textarea } from "./textarea-CSk6XXTY.js";
import { u as useForm } from "./index.esm-BopNdsTi.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { C as CircleCheck } from "./circle-check-CTEr1gZn.js";
import { S as Shield } from "./shield-CrTn7cXV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const PRESET_AMOUNTS = [500n, 1000n, 2500n, 5000n, 10000n];
const CATEGORIES = [
  {
    value: "general",
    label: "General Fund",
    description: "Supports all ministry operations"
  },
  {
    value: "youth",
    label: "Youth Programs",
    description: "Camps, retreats & weekly programs"
  },
  {
    value: "missions",
    label: "Missions",
    description: "Local & global outreach"
  },
  {
    value: "building",
    label: "Building Fund",
    description: "Facility maintenance & expansion"
  }
];
const IMPACT_STATS = [
  { label: "Youth Programs", percent: 70, color: "bg-primary" },
  { label: "Missions", percent: 20, color: "bg-secondary" },
  { label: "Operations", percent: 10, color: "bg-accent" }
];
function TrustBadges() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-primary" }),
      "SSL Encrypted"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5 text-primary" }),
      "Powered by Stripe"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-primary" }),
      "Tax-Deductible"
    ] })
  ] });
}
function ImpactSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", "data-ocid": "donate.impact_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg", children: "How Donations Are Used" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: IMPACT_STATS.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: stat.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          stat.percent,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: `h-full ${stat.color} rounded-full`,
          initial: { width: 0 },
          whileInView: { width: `${stat.percent}%` },
          viewport: { once: true },
          transition: { duration: 0.8, ease: "easeOut" }
        }
      ) })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your donation may be tax-deductible. Consult a tax advisor for details." })
  ] }) });
}
function RecentDonationsFeed() {
  const { data: donations, isLoading } = useDonations();
  const recent = (donations ?? []).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", "data-ocid": "donate.recent_feed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg", children: "Recent Supporters" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, n)) }) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-4",
        "data-ocid": "donate.recent_feed.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "mx-auto h-8 w-8 text-muted-foreground mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Be the first to give!" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recent.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between py-2 border-b border-border last:border-0",
        "data-ocid": `donate.recent_feed.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: d.donorName || "Anonymous" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(d.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-3 shrink-0", children: formatCurrency(d.amountCents) })
        ]
      },
      d.id.toString()
    )) })
  ] }) });
}
function SuccessState({ amount }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, ease: "easeOut" },
      className: "flex min-h-[70vh] items-center justify-center px-4",
      "data-ocid": "donate.success_state",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: { delay: 0.2, type: "spring", stiffness: 200 },
            className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Thank You!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body mb-1", children: [
          "Your gift",
          amount ? ` of ${amount}` : "",
          " has been received."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8 font-body italic", children: "“Give, and it will be given to you.” — Luke 6:38" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-8", children: [
          { icon: Heart, label: "Pray", desc: "Lift up the ministry" },
          { icon: Share2, label: "Share", desc: "Invite others to give" },
          {
            icon: CircleCheck,
            label: "Connect",
            desc: "Join a small group"
          }
        ].map(({ icon: Icon, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg bg-card border border-border p-3 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mx-auto h-5 w-5 text-primary mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "A receipt has been sent to your email. Your donation may be tax-deductible." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => {
              window.location.href = "/donate";
            },
            "data-ocid": "donate.success_give_again_button",
            children: "Give Again"
          }
        )
      ] })
    }
  );
}
function CancelledState({ onRetry }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "flex min-h-[70vh] items-center justify-center px-4",
      "data-ocid": "donate.error_state",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-10 w-10 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Donation Cancelled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-6", children: "No charges were made. Your generosity means a lot — whenever you’re ready." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: onRetry,
            className: "gap-2",
            "data-ocid": "donate.retry_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
              "Try Again"
            ]
          }
        )
      ] })
    }
  );
}
function Donate() {
  const { actor } = useActor(createActor);
  const { data: totalCents, isLoading: totalLoading } = useTotalDonations();
  const search = useSearch({ strict: false });
  const isSuccess = search.success === "1";
  const isCancelled = search.cancelled === "1";
  const successAmount = decodeURIComponent(search.amount ?? "");
  const [selectedAmount, setSelectedAmount] = reactExports.useState(2500n);
  const [frequency, setFrequency] = reactExports.useState("one-time");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      anonymous: false,
      category: "general",
      customAmount: ""
    }
  });
  const customAmount = watch("customAmount");
  const anonymous = watch("anonymous");
  const category = watch("category");
  const effectiveAmount = customAmount ? BigInt(Math.max(1, Math.round(Number.parseFloat(customAmount) * 100))) : selectedAmount;
  const onSubmit = async (data) => {
    var _a;
    if (!actor) {
      ue.error("Please wait while we connect.");
      return;
    }
    setSubmitting(true);
    try {
      const msgParts = [];
      if (data.message) msgParts.push(data.message);
      const catLabel = (_a = CATEGORIES.find((c) => c.value === data.category)) == null ? void 0 : _a.label;
      if (data.category !== "general" && catLabel)
        msgParts.push(`Category: ${catLabel}`);
      if (frequency === "monthly") msgParts.push("Recurring: Monthly");
      const url = await actor.createDonationCheckout(
        anonymous ? "Anonymous" : data.name,
        data.email,
        effectiveAmount,
        "USD",
        msgParts.length > 0 ? msgParts.join(" | ") : null,
        `${window.location.origin}/donate?success=1&amount=${encodeURIComponent(formatCurrency(effectiveAmount))}`,
        `${window.location.origin}/donate?cancelled=1`
      );
      window.location.href = url;
    } catch {
      ue.error("Unable to start checkout. Please try again.");
      setSubmitting(false);
    }
  };
  if (isSuccess) return /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessState, { amount: successAmount });
  if (isCancelled)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CancelledState,
      {
        onRetry: () => {
          window.location.href = "/donate";
        }
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "donate.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-card border-b border-border overflow-hidden py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "aria-hidden": "true",
          className: "absolute inset-0 opacity-5 pointer-events-none",
          style: {
            backgroundImage: "radial-gradient(circle at 30% 50%, oklch(var(--primary)) 0%, transparent 60%), radial-gradient(circle at 70% 50%, oklch(var(--secondary)) 0%, transparent 60%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4 text-center max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-7 w-7 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Support Our Ministry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body italic text-muted-foreground text-lg mb-2 leading-relaxed", children: "“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "— 2 Corinthians 9:7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex flex-col items-center gap-1 rounded-xl bg-primary/10 border border-primary/20 px-6 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-primary uppercase tracking-wider", children: "Total Raised" }),
              totalLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display text-2xl font-bold text-foreground",
                  "data-ocid": "donate.total_raised",
                  children: formatCurrency(totalCents ?? 0n)
                }
              )
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit(onSubmit),
              className: "space-y-6",
              "data-ocid": "donate.form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display font-semibold text-base", children: "Giving Frequency" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tabs,
                    {
                      value: frequency,
                      onValueChange: (v) => setFrequency(v),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        TabsList,
                        {
                          className: "w-full",
                          "data-ocid": "donate.frequency_tab",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              TabsTrigger,
                              {
                                value: "one-time",
                                className: "flex-1",
                                "data-ocid": "donate.one_time_tab",
                                children: "One-time"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              TabsTrigger,
                              {
                                value: "monthly",
                                className: "flex-1",
                                "data-ocid": "donate.monthly_tab",
                                children: "Monthly"
                              }
                            )
                          ]
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display font-semibold text-base", children: "Select Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: PRESET_AMOUNTS.map((a) => {
                    const isActive = selectedAmount === a && !customAmount;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: isActive ? "default" : "outline",
                        size: "sm",
                        onClick: () => {
                          setSelectedAmount(a);
                          setValue("customAmount", "");
                        },
                        className: "text-xs px-1 transition-smooth",
                        "data-ocid": `donate.amount_button.${a}`,
                        children: formatCurrency(a)
                      },
                      a.toString()
                    );
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground shrink-0", children: "Custom $" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        min: "1",
                        step: "0.01",
                        placeholder: "Other amount",
                        className: "flex-1",
                        ...register("customAmount", {
                          validate: (v) => !v || Number.parseFloat(v) >= 1 && Number.isFinite(Number.parseFloat(v)) || "Enter a valid amount ($1 minimum)"
                        }),
                        "data-ocid": "donate.custom_amount_input"
                      }
                    )
                  ] }),
                  errors.customAmount && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "donate.amount.field_error",
                      children: errors.customAmount.message
                    }
                  ),
                  effectiveAmount > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-primary", children: [
                    "Giving: ",
                    formatCurrency(effectiveAmount),
                    frequency === "monthly" ? "/mo" : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display font-semibold text-base", children: "Giving Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RadioGroup,
                    {
                      value: category,
                      onValueChange: (v) => setValue("category", v),
                      className: "space-y-2",
                      "data-ocid": "donate.category_radio",
                      children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: `flex items-start gap-3 rounded-lg border p-3 transition-smooth cursor-pointer ${category === cat.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`,
                          "data-ocid": `donate.category.${cat.value}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              RadioGroupItem,
                              {
                                value: cat.value,
                                id: `cat-${cat.value}`,
                                className: "mt-0.5"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Label,
                              {
                                htmlFor: `cat-${cat.value}`,
                                className: "cursor-pointer flex-1",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground block", children: cat.label }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: cat.description })
                                ]
                              }
                            )
                          ]
                        },
                        cat.value
                      ))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display font-semibold text-base", children: "Your Information" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "donate-name", children: "Full Name *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "donate-name",
                        placeholder: "Jane Doe",
                        ...register("name", {
                          required: !anonymous ? "Name is required" : false
                        }),
                        "data-ocid": "donate.name_input"
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "donate.name.field_error",
                        children: errors.name.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "donate-email", children: "Email Address *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "donate-email",
                        type: "email",
                        placeholder: "jane@example.com",
                        ...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                            message: "Enter a valid email address"
                          }
                        }),
                        "data-ocid": "donate.email_input"
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "donate.email.field_error",
                        children: errors.email.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "donate-message", children: "Message / Prayer Request (optional)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "donate-message",
                        placeholder: "Designate your gift or share a prayer request…",
                        rows: 3,
                        ...register("message"),
                        "data-ocid": "donate.message_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        id: "donate-anon",
                        checked: anonymous,
                        onCheckedChange: (checked) => setValue("anonymous", checked === true),
                        "data-ocid": "donate.anonymous_checkbox"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "donate-anon",
                        className: "cursor-pointer text-sm text-muted-foreground",
                        children: "Keep my name anonymous in public listings"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    className: "w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display font-bold text-base gap-2 transition-smooth",
                    disabled: submitting || !actor,
                    "data-ocid": "donate.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
                      submitting ? "Redirecting to secure checkout…" : `Give ${formatCurrency(effectiveAmount)}${frequency === "monthly" ? "/mo" : ""}`
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadges, {})
              ]
            }
          ) }) })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactSection, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RecentDonationsFeed, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/30 border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground block mb-1", children: "Privacy & Security" }),
                "Your payment is processed securely by Stripe. We never store your card details. Your information is protected and will never be sold."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/privacy",
                    className: "hover:underline",
                    "data-ocid": "donate.privacy_policy_link",
                    children: "Privacy Policy"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/contact",
                    className: "hover:underline",
                    "data-ocid": "donate.contact_link",
                    children: "Contact Us"
                  }
                )
              ] })
            ] }) })
          ]
        }
      ) })
    ] }) }) })
  ] });
}
export {
  Donate as default
};
