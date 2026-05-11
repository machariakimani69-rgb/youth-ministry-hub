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
  Rsvp,
  Sermon,
  ShoppingItem,
  SocialLinks,
  StripeConfiguration,
  StripeSessionStatus,
  SystemSettings,
  Testimonial,
  Timestamp,
  TransformationInput,
  TransformationOutput,
  UserId,
  UserProfile,
} from "@/backend";

export type {
  Announcement,
  AnalyticsSummary,
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
  Rsvp,
  Sermon,
  SocialLinks,
  StripeConfiguration,
  StripeSessionStatus,
  SystemSettings,
  Testimonial,
  Timestamp,
  TransformationInput,
  TransformationOutput,
  UserProfile,
  UserId,
  ShoppingItem,
};

export {
  MediaType,
  PrayerPrivacy,
  PrayerStatus,
  RegistrationStatus,
  RsvpStatus,
  UserRole,
} from "@/backend";

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

export type ToastType = "success" | "error" | "info" | "warning";
