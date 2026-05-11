import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import {
  useEventWithRsvps,
  useEvents,
  useSubmitRsvp,
} from "@/hooks/useQueries";
import { formatDate, formatTime, timestampToDate } from "@/lib/utils";
import type { Event } from "@/types";
import { RsvpStatus } from "@/types";
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List,
  LogIn,
  MapPin,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function EventSkeleton() {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-9 w-28" />
      </CardContent>
    </Card>
  );
}

function DateBadge({ timestamp }: { timestamp: bigint }) {
  const date = timestampToDate(timestamp);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  return (
    <div className="flex flex-col items-center justify-center w-14 h-16 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
      <span className="text-xs font-display font-bold text-primary tracking-widest">
        {month}
      </span>
      <span className="text-2xl font-display font-bold text-primary leading-none">
        {day}
      </span>
    </div>
  );
}

function RsvpSection({ event }: { event: Event }) {
  const { data: eventWithRsvps, isLoading } = useEventWithRsvps(event.id);
  const submitRsvp = useSubmitRsvp();
  const { isAuthenticated, login } = useAuth();
  const [userRsvp, setUserRsvp] = useState<RsvpStatus | null>(null);

  const rsvpCount =
    eventWithRsvps?.rsvps?.filter((r) => r.status === RsvpStatus.going)
      .length ?? 0;
  const capacity = event.capacity ? Number(event.capacity) : null;
  const isFull = capacity !== null && rsvpCount >= capacity;

  const handleRsvp = async (status: RsvpStatus) => {
    if (!isAuthenticated) {
      login();
      return;
    }
    try {
      await submitRsvp.mutateAsync({ eventId: event.id, status });
      setUserRsvp(status);
      toast.success(
        status === RsvpStatus.going ? "You're registered!" : "RSVP cancelled",
        {
          description:
            status === RsvpStatus.going
              ? `See you at ${event.title}!`
              : "We'll miss you!",
        },
      );
    } catch {
      toast.error("Could not update RSVP", {
        description: "Please try again.",
      });
    }
  };

  if (isLoading) return <Skeleton className="h-9 w-28" />;

  const attending = userRsvp === RsvpStatus.going;

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={login}
        className="flex items-center gap-1.5 font-display"
        data-ocid="events.rsvp.login_button"
      >
        <LogIn className="h-3.5 w-3.5" /> Sign in to RSVP
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {capacity && (
        <span className="text-xs text-muted-foreground font-body">
          <Users className="h-3 w-3 inline mr-1" />
          {rsvpCount}/{capacity} going
        </span>
      )}
      {attending ? (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleRsvp(RsvpStatus.notGoing)}
          disabled={submitRsvp.isPending}
          className="font-display flex items-center gap-1.5"
          data-ocid="events.rsvp.cancel_button"
        >
          <CheckCircle2 className="h-3.5 w-3.5" /> Registered
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={() => handleRsvp(RsvpStatus.going)}
          disabled={submitRsvp.isPending || isFull}
          className="font-display"
          data-ocid="events.rsvp.submit_button"
        >
          {isFull ? "Event Full" : "Register Now"}
        </Button>
      )}
    </div>
  );
}

function EventCard({ event, index }: { event: Event; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const now = BigInt(Date.now()) * 1_000_000n;
  const isPast = event.endDate < now;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      data-ocid={`events.item.${index + 1}`}
    >
      <Card
        className={`border-border bg-card overflow-hidden transition-smooth hover:shadow-subtle ${
          isPast ? "opacity-70" : ""
        }`}
      >
        <CardContent className="p-0">
          <div className="flex gap-4 p-5">
            <DateBadge timestamp={event.startDate} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                  {event.title}
                </h3>
                {isPast && (
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    Past
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-body mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(event.startDate)} – {formatTime(event.endDate)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </span>
              </div>

              <AnimatePresence>
                {expanded && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-foreground/80 font-body leading-relaxed overflow-hidden mb-3"
                  >
                    {event.description}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-3">
                {!isPast && <RsvpSection event={event} />}
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="text-xs text-primary hover:text-primary/80 transition-colors font-display"
                  data-ocid={`events.expand_button.${index + 1}`}
                >
                  {expanded ? "Hide details" : "View details"}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Events() {
  const { data: events = [], isLoading } = useEvents();
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const [view, setView] = useState<"list" | "grid">("list");

  const now = BigInt(Date.now()) * 1_000_000n;
  const upcoming = events.filter((e) => e.endDate >= now && e.isPublished);
  const past = events.filter((e) => e.endDate < now && e.isPublished);
  const displayed = filter === "upcoming" ? upcoming : past;

  return (
    <div className="flex flex-col min-h-screen" data-ocid="events.page">
      {/* Hero */}
      <section className="bg-card border-b border-border py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 font-display text-xs uppercase tracking-widest"
            >
              What's Happening
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Events
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl">
              Join us for worship nights, retreats, community service, and more.
              There's always something happening at Anchor Youth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & View Toggle */}
      <section className="bg-muted/30 border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <Tabs
              value={filter}
              onValueChange={(v) => setFilter(v as "upcoming" | "past")}
            >
              <TabsList>
                <TabsTrigger value="upcoming" data-ocid="events.upcoming.tab">
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                  Upcoming
                  {upcoming.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {upcoming.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="past" data-ocid="events.past.tab">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  Past Events
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setView("list")}
                className={`p-2 transition-colors ${
                  view === "list"
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="List view"
                data-ocid="events.list_view.toggle"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`p-2 transition-colors ${
                  view === "grid"
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Grid view"
                data-ocid="events.grid_view.toggle"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="bg-background flex-1 py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-5"
                  : "space-y-4"
              }
            >
              {[1, 2, 3].map((n) => (
                <EventSkeleton key={n} />
              ))}
            </div>
          ) : displayed.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
              data-ocid="events.empty_state"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/40 mb-6">
                <CalendarDays className="h-10 w-10 text-muted-foreground opacity-40" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {filter === "upcoming"
                  ? "No Upcoming Events"
                  : "No Past Events"}
              </h3>
              <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
                {filter === "upcoming"
                  ? "Check back soon — we're planning something great!"
                  : "Past events will appear here once they've taken place."}
              </p>
            </motion.div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-5"
                  : "space-y-4"
              }
              data-ocid="events.list"
            >
              {displayed.map((event, i) => (
                <EventCard key={event.id.toString()} event={event} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
