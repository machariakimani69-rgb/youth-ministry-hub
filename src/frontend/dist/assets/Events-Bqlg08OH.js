import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as formatTime, u as useAuth, R as RsvpStatus, B as Button, g as LogIn, t as timestampToDate, h as ue } from "./index-CPIOcdtY.js";
import { a as useEvents, B as Badge, e as useEventWithRsvps, f as useSubmitRsvp } from "./useQueries-DxEGoYB2.js";
import { C as Card, a as CardContent } from "./card-BUuSK7y6.js";
import { S as Skeleton } from "./skeleton-Dj2ezB5s.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-C12HVHIn.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { C as CalendarDays } from "./calendar-days-DvDnLmFn.js";
import { C as Calendar } from "./calendar-CnJCSJnH.js";
import { C as Clock } from "./clock-fzvWW9V_.js";
import { M as MapPin } from "./map-pin-Wb1Zd8Aa.js";
import { A as AnimatePresence } from "./index-BGjtlR7s.js";
import { U as Users } from "./users-iU5sTJQr.js";
import { C as CircleCheck } from "./circle-check-CTEr1gZn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode);
function EventSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28" })
  ] }) });
}
function DateBadge({ timestamp }) {
  const date = timestampToDate(timestamp);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center w-14 h-16 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-bold text-primary tracking-widest", children: month }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-primary leading-none", children: day })
  ] });
}
function RsvpSection({ event }) {
  var _a;
  const { data: eventWithRsvps, isLoading } = useEventWithRsvps(event.id);
  const submitRsvp = useSubmitRsvp();
  const { isAuthenticated, login } = useAuth();
  const [userRsvp, setUserRsvp] = reactExports.useState(null);
  const rsvpCount = ((_a = eventWithRsvps == null ? void 0 : eventWithRsvps.rsvps) == null ? void 0 : _a.filter((r) => r.status === RsvpStatus.going).length) ?? 0;
  const capacity = event.capacity ? Number(event.capacity) : null;
  const isFull = capacity !== null && rsvpCount >= capacity;
  const handleRsvp = async (status) => {
    if (!isAuthenticated) {
      login();
      return;
    }
    try {
      await submitRsvp.mutateAsync({ eventId: event.id, status });
      setUserRsvp(status);
      ue.success(
        status === RsvpStatus.going ? "You're registered!" : "RSVP cancelled",
        {
          description: status === RsvpStatus.going ? `See you at ${event.title}!` : "We'll miss you!"
        }
      );
    } catch {
      ue.error("Could not update RSVP", {
        description: "Please try again."
      });
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28" });
  const attending = userRsvp === RsvpStatus.going;
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: login,
        className: "flex items-center gap-1.5 font-display",
        "data-ocid": "events.rsvp.login_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-3.5 w-3.5" }),
          " Sign in to RSVP"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    capacity && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 inline mr-1" }),
      rsvpCount,
      "/",
      capacity,
      " going"
    ] }),
    attending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "secondary",
        onClick: () => handleRsvp(RsvpStatus.notGoing),
        disabled: submitRsvp.isPending,
        className: "font-display flex items-center gap-1.5",
        "data-ocid": "events.rsvp.cancel_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " Registered"
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        onClick: () => handleRsvp(RsvpStatus.going),
        disabled: submitRsvp.isPending || isFull,
        className: "font-display",
        "data-ocid": "events.rsvp.submit_button",
        children: isFull ? "Event Full" : "Register Now"
      }
    )
  ] });
}
function EventCard({ event, index }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const now = BigInt(Date.now()) * 1000000n;
  const isPast = event.endDate < now;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.4 },
      "data-ocid": `events.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `border-border bg-card overflow-hidden transition-smooth hover:shadow-subtle ${isPast ? "opacity-70" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DateBadge, { timestamp: event.startDate }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight", children: event.title }),
                isPast && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs flex-shrink-0", children: "Past" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-body mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  formatTime(event.startDate),
                  " – ",
                  formatTime(event.endDate)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                  event.location
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  transition: { duration: 0.3 },
                  className: "text-sm text-foreground/80 font-body leading-relaxed overflow-hidden mb-3",
                  children: event.description
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                !isPast && /* @__PURE__ */ jsxRuntimeExports.jsx(RsvpSection, { event }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpanded((v) => !v),
                    className: "text-xs text-primary hover:text-primary/80 transition-colors font-display",
                    "data-ocid": `events.expand_button.${index + 1}`,
                    children: expanded ? "Hide details" : "View details"
                  }
                )
              ] })
            ] })
          ] }) })
        }
      )
    }
  );
}
function Events() {
  const { data: events = [], isLoading } = useEvents();
  const [filter, setFilter] = reactExports.useState("upcoming");
  const [view, setView] = reactExports.useState("list");
  const now = BigInt(Date.now()) * 1000000n;
  const upcoming = events.filter((e) => e.endDate >= now && e.isPublished);
  const past = events.filter((e) => e.endDate < now && e.isPublished);
  const displayed = filter === "upcoming" ? upcoming : past;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", "data-ocid": "events.page", children: [
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
              children: "What's Happening"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-3", children: "Events" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg max-w-xl", children: "Join us for worship nights, retreats, community service, and more. There's always something happening at Anchor Youth." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          value: filter,
          onValueChange: (v) => setFilter(v),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "upcoming", "data-ocid": "events.upcoming.tab", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Upcoming",
              upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-2 text-xs", children: upcoming.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "past", "data-ocid": "events.past.tab", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Past Events"
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setView("list"),
            className: `p-2 transition-colors ${view === "list" ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            "aria-label": "List view",
            "data-ocid": "events.list_view.toggle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setView("grid"),
            className: `p-2 transition-colors ${view === "grid" ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            "aria-label": "Grid view",
            "data-ocid": "events.grid_view.toggle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background flex-1 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: view === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-5" : "space-y-4",
        children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventSkeleton, {}, n))
      }
    ) : displayed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center py-20",
        "data-ocid": "events.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/40 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-10 w-10 text-muted-foreground opacity-40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: filter === "upcoming" ? "No Upcoming Events" : "No Past Events" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm max-w-sm mx-auto", children: filter === "upcoming" ? "Check back soon — we're planning something great!" : "Past events will appear here once they've taken place." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: view === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-5" : "space-y-4",
        "data-ocid": "events.list",
        children: displayed.map((event, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventCard, { event, index: i }, event.id.toString()))
      }
    ) }) })
  ] });
}
export {
  Events as default
};
