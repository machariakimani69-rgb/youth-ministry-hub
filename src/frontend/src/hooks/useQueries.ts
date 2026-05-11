import { createActor } from "@/backend";
import type {
  AnalyticsSummary,
  Announcement,
  BlogPost,
  ContactMessage,
  Devotional,
  Donation,
  Event,
  EventWithRsvps,
  GalleryAlbum,
  GalleryImage,
  LeadershipMember,
  MediaFile,
  NewsletterSubscriber,
  PrayerRequest,
  ResourceId,
  Sermon,
  SystemSettings,
  Testimonial,
  UserProfile,
} from "@/types";
import type {
  MediaType,
  PrayerPrivacy,
  PrayerStatus,
  RsvpStatus,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useActorReady() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, ready: !!actor && !isFetching };
}

// ── Announcements ─────────────────────────────────────────────────
export function useAnnouncements() {
  const { actor, ready } = useActorReady();
  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => (actor ? actor.listAnnouncements() : []),
    enabled: ready,
  });
}

// ── Events ────────────────────────────────────────────────────────
export function useEvents() {
  const { actor, ready } = useActorReady();
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => (actor ? actor.listEvents() : []),
    enabled: ready,
  });
}

export function useEvent(id: ResourceId) {
  const { actor, ready } = useActorReady();
  return useQuery<Event | null>({
    queryKey: ["event", id.toString()],
    queryFn: async () => (actor ? actor.getEvent(id) : null),
    enabled: ready,
  });
}

export function useEventWithRsvps(id: ResourceId) {
  const { actor, ready } = useActorReady();
  return useQuery<EventWithRsvps | null>({
    queryKey: ["eventWithRsvps", id.toString()],
    queryFn: async () => (actor ? actor.getEventWithRsvps(id) : null),
    enabled: ready,
  });
}

export function useSubmitRsvp() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      eventId,
      status,
    }: { eventId: ResourceId; status: RsvpStatus }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitRsvp(eventId, status);
    },
    onSuccess: (_d, { eventId }) => {
      qc.invalidateQueries({
        queryKey: ["eventWithRsvps", eventId.toString()],
      });
    },
  });
}

// ── Sermons ───────────────────────────────────────────────────────
export function useSermons() {
  const { actor, ready } = useActorReady();
  return useQuery<Sermon[]>({
    queryKey: ["sermons"],
    queryFn: async () => (actor ? actor.listSermons() : []),
    enabled: ready,
  });
}

// ── Blog ──────────────────────────────────────────────────────────
export function useBlogPosts() {
  const { actor, ready } = useActorReady();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => (actor ? actor.listBlogPosts() : []),
    enabled: ready,
  });
}

// ── Devotionals ───────────────────────────────────────────────────
export function useDevotionals() {
  const { actor, ready } = useActorReady();
  return useQuery<Devotional[]>({
    queryKey: ["devotionals"],
    queryFn: async () => (actor ? actor.listDevotionals() : []),
    enabled: ready,
  });
}

// ── Gallery ───────────────────────────────────────────────────────
export function useAlbums() {
  const { actor, ready } = useActorReady();
  return useQuery<GalleryAlbum[]>({
    queryKey: ["albums"],
    queryFn: async () => (actor ? actor.listAlbums() : []),
    enabled: ready,
  });
}

export function useGalleryImages(albumId: ResourceId) {
  const { actor, ready } = useActorReady();
  return useQuery<GalleryImage[]>({
    queryKey: ["galleryImages", albumId.toString()],
    queryFn: async () => (actor ? actor.listGalleryImages(albumId) : []),
    enabled: ready,
  });
}

// ── Prayer ────────────────────────────────────────────────────────
export function usePrayerRequests() {
  const { actor, ready } = useActorReady();
  return useQuery<PrayerRequest[]>({
    queryKey: ["prayerRequests"],
    queryFn: async () => (actor ? actor.listPrayerRequests() : []),
    enabled: ready,
  });
}

export function useSubmitPrayerRequest() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      content,
      privacy,
    }: { name: string; content: string; privacy: PrayerPrivacy }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitPrayerRequest(name, content, privacy);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["prayerRequests"] }),
  });
}

export function useUpdatePrayerStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: ResourceId; status: PrayerStatus }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePrayerStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["prayerRequests"] }),
  });
}

// ── Testimonials ──────────────────────────────────────────────────
export function useTestimonials() {
  const { actor, ready } = useActorReady();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => (actor ? actor.listTestimonials() : []),
    enabled: ready,
  });
}

// ── Leadership ────────────────────────────────────────────────────
export function useLeadership() {
  const { actor, ready } = useActorReady();
  return useQuery<LeadershipMember[]>({
    queryKey: ["leadership"],
    queryFn: async () => (actor ? actor.listLeadership() : []),
    enabled: ready,
  });
}

// ── Media ─────────────────────────────────────────────────────────
export function useMedia() {
  const { actor, ready } = useActorReady();
  return useQuery<MediaFile[]>({
    queryKey: ["media"],
    queryFn: async () => (actor ? actor.listMedia() : []),
    enabled: ready,
  });
}

export function useMediaByType(mediaType: MediaType) {
  const { actor, ready } = useActorReady();
  return useQuery<MediaFile[]>({
    queryKey: ["media", mediaType],
    queryFn: async () => (actor ? actor.listMediaByType(mediaType) : []),
    enabled: ready,
  });
}

// ── Donations ─────────────────────────────────────────────────────
export function useDonations() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<Donation[]>({
    queryKey: ["donations"],
    queryFn: async () => (actor ? actor.listDonations() : []),
    enabled: ready && isAuthenticated,
  });
}

export function useTotalDonations() {
  const { actor, ready } = useActorReady();
  return useQuery<bigint>({
    queryKey: ["totalDonations"],
    queryFn: async () => (actor ? actor.totalDonationsCents() : 0n),
    enabled: ready,
  });
}

// ── Contact ───────────────────────────────────────────────────────
export function useContacts() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<ContactMessage[]>({
    queryKey: ["contacts"],
    queryFn: async () => (actor ? actor.listContacts() : []),
    enabled: ready && isAuthenticated,
  });
}

export function useSubmitContact() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      name,
      email,
      subject,
      message,
    }: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContact(name, email, subject, message);
    },
  });
}

// ── Newsletter ────────────────────────────────────────────────────
export function useSubscribers() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<NewsletterSubscriber[]>({
    queryKey: ["subscribers"],
    queryFn: async () => (actor ? actor.listSubscribers() : []),
    enabled: ready && isAuthenticated,
  });
}

export function useSubscribeNewsletter() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.subscribeNewsletter(email);
    },
  });
}

// ── Users ─────────────────────────────────────────────────────────
export function useUsers() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<UserProfile[]>({
    queryKey: ["users"],
    queryFn: async () => (actor ? actor.listUsers() : []),
    enabled: ready && isAuthenticated,
  });
}

export function usePendingRegistrations() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<UserProfile[]>({
    queryKey: ["pendingRegistrations"],
    queryFn: async () => (actor ? actor.listPendingRegistrations() : []),
    enabled: ready && isAuthenticated,
  });
}

// ── Analytics ─────────────────────────────────────────────────────
export function useAnalytics() {
  const { actor, ready } = useActorReady();
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<AnalyticsSummary>({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAnalyticsSummary();
    },
    enabled: ready && isAuthenticated,
  });
}

// ── Settings ──────────────────────────────────────────────────────
export function useSettings() {
  const { actor, ready } = useActorReady();
  return useQuery<SystemSettings>({
    queryKey: ["settings"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getSettings();
    },
    enabled: ready,
  });
}

export function useUpdateSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (updated: import("@/types").SystemSettings) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateSettings(updated);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}
