import type { backendInterface } from "@/backend";
/**
 * Typed backend wrappers.
 * All actor calls go through hooks/useQueries.ts; this file provides
 * standalone helpers for one-off calls that do not benefit from caching.
 */
import type {
  MediaType,
  PrayerPrivacy,
  PrayerStatus,
  ResourceId,
  RsvpStatus,
  ShoppingItem,
  StripeConfiguration,
  SystemSettings,
  UserRole,
} from "@/types";

export type Actor = backendInterface;

// ── Content helpers ───────────────────────────────────────────────
export const api = {
  // Announcements
  listAnnouncements: (actor: Actor) => actor.listAnnouncements(),
  addAnnouncement: (
    actor: Actor,
    title: string,
    content: string,
    isPinned: boolean,
    publishAt: bigint,
    expireAt: bigint | null,
  ) => actor.addAnnouncement(title, content, isPinned, publishAt, expireAt),
  deleteAnnouncement: (actor: Actor, id: ResourceId) =>
    actor.deleteAnnouncement(id),

  // Events
  listEvents: (actor: Actor) => actor.listEvents(),
  getEvent: (actor: Actor, id: ResourceId) => actor.getEvent(id),
  getEventWithRsvps: (actor: Actor, id: ResourceId) =>
    actor.getEventWithRsvps(id),
  createEvent: (
    actor: Actor,
    title: string,
    description: string,
    location: string,
    startDate: bigint,
    endDate: bigint,
    capacity: bigint | null,
    imageUrl: string | null,
  ) =>
    actor.createEvent(
      title,
      description,
      location,
      startDate,
      endDate,
      capacity,
      imageUrl,
    ),
  submitRsvp: (actor: Actor, eventId: ResourceId, status: RsvpStatus) =>
    actor.submitRsvp(eventId, status),

  // Sermons
  listSermons: (actor: Actor) => actor.listSermons(),

  // Blog
  listBlogPosts: (actor: Actor) => actor.listBlogPosts(),

  // Devotionals
  listDevotionals: (actor: Actor) => actor.listDevotionals(),

  // Gallery
  listAlbums: (actor: Actor) => actor.listAlbums(),
  listGalleryImages: (actor: Actor, albumId: ResourceId) =>
    actor.listGalleryImages(albumId),
  createAlbum: (
    actor: Actor,
    title: string,
    description: string | null,
    category: string,
    coverImageBlob: unknown | null,
  ) => actor.createAlbum(title, description, category, coverImageBlob as never),

  // Prayer
  listPrayerRequests: (actor: Actor) => actor.listPrayerRequests(),
  submitPrayerRequest: (
    actor: Actor,
    name: string,
    content: string,
    privacy: PrayerPrivacy,
  ) => actor.submitPrayerRequest(name, content, privacy),
  updatePrayerStatus: (actor: Actor, id: ResourceId, status: PrayerStatus) =>
    actor.updatePrayerStatus(id, status),

  // Testimonials
  listTestimonials: (actor: Actor) => actor.listTestimonials(),
  submitTestimonial: (
    actor: Actor,
    authorName: string,
    content: string,
    photoBlob: unknown | null,
  ) => actor.submitTestimonial(authorName, content, photoBlob as never),
  approveTestimonial: (actor: Actor, id: ResourceId, isFeatured: boolean) =>
    actor.approveTestimonial(id, isFeatured),

  // Leadership
  listLeadership: (actor: Actor) => actor.listLeadership(),

  // Media
  listMedia: (actor: Actor) => actor.listMedia(),
  listMediaByType: (actor: Actor, mediaType: MediaType) =>
    actor.listMediaByType(mediaType),
  uploadMedia: (
    actor: Actor,
    fileName: string,
    blob: unknown,
    mediaType: MediaType,
    category: string,
    description: string | null,
  ) =>
    actor.uploadMedia(
      fileName,
      blob as never,
      mediaType,
      category,
      description,
    ),

  // Donations
  listDonations: (actor: Actor) => actor.listDonations(),
  totalDonationsCents: (actor: Actor) => actor.totalDonationsCents(),
  createDonationCheckout: (
    actor: Actor,
    donorName: string,
    donorEmail: string,
    amountCents: bigint,
    currency: string,
    message: string | null,
    successUrl: string,
    cancelUrl: string,
  ) =>
    actor.createDonationCheckout(
      donorName,
      donorEmail,
      amountCents,
      currency,
      message,
      successUrl,
      cancelUrl,
    ),

  // Contact
  listContacts: (actor: Actor) => actor.listContacts(),
  submitContact: (
    actor: Actor,
    name: string,
    email: string,
    subject: string,
    message: string,
  ) => actor.submitContact(name, email, subject, message),
  markContactRead: (actor: Actor, id: ResourceId) => actor.markContactRead(id),

  // Newsletter
  listSubscribers: (actor: Actor) => actor.listSubscribers(),
  subscribeNewsletter: (actor: Actor, email: string) =>
    actor.subscribeNewsletter(email),
  unsubscribeNewsletter: (actor: Actor, email: string) =>
    actor.unsubscribeNewsletter(email),

  // Users
  listUsers: (actor: Actor) => actor.listUsers(),
  listPendingRegistrations: (actor: Actor) => actor.listPendingRegistrations(),
  getUserProfile: (
    actor: Actor,
    userId: import("@icp-sdk/core/principal").Principal,
  ) => actor.getUserProfile(userId),
  getCallerUserProfile: (actor: Actor) => actor.getCallerUserProfile(),
  saveCallerUserProfile: (
    actor: Actor,
    name: string,
    email: string,
    phone: string | null,
  ) => actor.saveCallerUserProfile(name, email, phone),
  registerUser: (
    actor: Actor,
    name: string,
    email: string,
    phone: string | null,
  ) => actor.registerUser(name, email, phone),
  approveUser: (
    actor: Actor,
    userId: import("@icp-sdk/core/principal").Principal,
  ) => actor.approveUser(userId),
  rejectUser: (
    actor: Actor,
    userId: import("@icp-sdk/core/principal").Principal,
  ) => actor.rejectUser(userId),
  assignUserRole: (
    actor: Actor,
    userId: import("@icp-sdk/core/principal").Principal,
    role: UserRole,
  ) => actor.assignUserRole(userId, role),

  // Analytics
  getAnalyticsSummary: (actor: Actor) => actor.getAnalyticsSummary(),
  recordPageView: (actor: Actor, page: string) => actor.recordPageView(page),

  // Settings
  getSettings: (actor: Actor) => actor.getSettings(),
  updateSettings: (actor: Actor, updated: SystemSettings) =>
    actor.updateSettings(updated),

  // Stripe
  isStripeConfigured: (actor: Actor) => actor.isStripeConfigured(),
  setStripeConfiguration: (actor: Actor, config: StripeConfiguration) =>
    actor.setStripeConfiguration(config),
  getDonationSessionStatus: (actor: Actor, sessionId: string) =>
    actor.getDonationSessionStatus(sessionId),
  createCheckoutSession: (
    actor: Actor,
    items: Array<ShoppingItem>,
    successUrl: string,
    cancelUrl: string,
  ) => actor.createCheckoutSession(items, successUrl, cancelUrl),

  isCallerAdmin: (actor: Actor) => actor.isCallerAdmin(),
};
