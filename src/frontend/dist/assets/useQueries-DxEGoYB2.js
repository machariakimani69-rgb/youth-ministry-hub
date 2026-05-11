import { j as jsxRuntimeExports, ak as Slot, q as cn, al as cva, am as useQuery, y as useActor, V as useMutation, T as useQueryClient, an as useInternetIdentity, z as createActor } from "./index-CPIOcdtY.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function useActorReady() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, ready: !!actor && !isFetching };
}
function useAnnouncements() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => actor ? actor.listAnnouncements() : [],
    enabled: ready
  });
}
function useEvents() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => actor ? actor.listEvents() : [],
    enabled: ready
  });
}
function useEventWithRsvps(id) {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["eventWithRsvps", id.toString()],
    queryFn: async () => actor ? actor.getEventWithRsvps(id) : null,
    enabled: ready
  });
}
function useSubmitRsvp() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      eventId,
      status
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitRsvp(eventId, status);
    },
    onSuccess: (_d, { eventId }) => {
      qc.invalidateQueries({
        queryKey: ["eventWithRsvps", eventId.toString()]
      });
    }
  });
}
function useSermons() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["sermons"],
    queryFn: async () => actor ? actor.listSermons() : [],
    enabled: ready
  });
}
function useBlogPosts() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => actor ? actor.listBlogPosts() : [],
    enabled: ready
  });
}
function useDevotionals() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["devotionals"],
    queryFn: async () => actor ? actor.listDevotionals() : [],
    enabled: ready
  });
}
function useAlbums() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["albums"],
    queryFn: async () => actor ? actor.listAlbums() : [],
    enabled: ready
  });
}
function useGalleryImages(albumId) {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["galleryImages", albumId.toString()],
    queryFn: async () => actor ? actor.listGalleryImages(albumId) : [],
    enabled: ready
  });
}
function usePrayerRequests() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["prayerRequests"],
    queryFn: async () => actor ? actor.listPrayerRequests() : [],
    enabled: ready
  });
}
function useSubmitPrayerRequest() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      content,
      privacy
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitPrayerRequest(name, content, privacy);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["prayerRequests"] })
  });
}
function useTestimonials() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => actor ? actor.listTestimonials() : [],
    enabled: ready
  });
}
function useLeadership() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["leadership"],
    queryFn: async () => actor ? actor.listLeadership() : [],
    enabled: ready
  });
}
function useMedia() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["media"],
    queryFn: async () => actor ? actor.listMedia() : [],
    enabled: ready
  });
}
function useDonations() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery({
    queryKey: ["donations"],
    queryFn: async () => actor ? actor.listDonations() : [],
    enabled: ready && isAuthenticated
  });
}
function useTotalDonations() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["totalDonations"],
    queryFn: async () => actor ? actor.totalDonationsCents() : 0n,
    enabled: ready
  });
}
function useContacts() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => actor ? actor.listContacts() : [],
    enabled: ready && isAuthenticated
  });
}
function useSubmitContact() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      name,
      email,
      subject,
      message
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContact(name, email, subject, message);
    }
  });
}
function useSubscribeNewsletter() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (email) => {
      if (!actor) throw new Error("Actor not available");
      return actor.subscribeNewsletter(email);
    }
  });
}
function useUsers() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => actor ? actor.listUsers() : [],
    enabled: ready && isAuthenticated
  });
}
function usePendingRegistrations() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery({
    queryKey: ["pendingRegistrations"],
    queryFn: async () => actor ? actor.listPendingRegistrations() : [],
    enabled: ready && isAuthenticated
  });
}
function useAnalytics() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAnalyticsSummary();
    },
    enabled: ready && isAuthenticated
  });
}
function useSettings() {
  const { actor, ready } = useActorReady();
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getSettings();
    },
    enabled: ready
  });
}
function useUpdateSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (updated) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateSettings(updated);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] })
  });
}
export {
  Badge as B,
  useEvents as a,
  useTestimonials as b,
  useSubscribeNewsletter as c,
  useLeadership as d,
  useEventWithRsvps as e,
  useSubmitRsvp as f,
  useSermons as g,
  useBlogPosts as h,
  useAlbums as i,
  useGalleryImages as j,
  useDevotionals as k,
  usePrayerRequests as l,
  useSubmitPrayerRequest as m,
  useTotalDonations as n,
  useDonations as o,
  useSettings as p,
  useSubmitContact as q,
  useMedia as r,
  useContacts as s,
  useAnalytics as t,
  useAnnouncements as u,
  useUsers as v,
  useUpdateSettings as w,
  usePendingRegistrations as x
};
