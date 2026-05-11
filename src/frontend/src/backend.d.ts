import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Sermon {
    id: ResourceId;
    title: string;
    isPublished: boolean;
    date: Timestamp;
    createdAt: Timestamp;
    createdBy: UserId;
    description: string;
    audioBlob?: ExternalBlob;
    videoBlob?: ExternalBlob;
    thumbnailBlob?: ExternalBlob;
    scriptureReference: string;
    speaker: string;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface AnalyticsSummary {
    totalEvents: bigint;
    totalUsers: bigint;
    totalPageViews: bigint;
    totalDonations: bigint;
    totalMembers: bigint;
    totalDonationAmountCents: bigint;
}
export interface SocialLinks {
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
    youtube?: string;
}
export interface Devotional {
    id: ResourceId;
    title: string;
    scripture: string;
    date: Timestamp;
    createdAt: Timestamp;
    createdBy: UserId;
    reflection: string;
}
export interface Rsvp {
    status: RsvpStatus;
    userId: UserId;
    registeredAt: Timestamp;
}
export interface GalleryAlbum {
    id: ResourceId;
    title: string;
    coverImageBlob?: ExternalBlob;
    createdAt: Timestamp;
    createdBy: UserId;
    description?: string;
    category: string;
}
export interface SystemSettings {
    aboutUs: string;
    primaryColor: string;
    socialLinks: SocialLinks;
    churchName: string;
    logoUrl?: string;
    address?: string;
    contactEmail: string;
    welcomeMessage: string;
    contactPhone?: string;
}
export interface Donation {
    id: ResourceId;
    donorId?: UserId;
    createdAt: Timestamp;
    donorName: string;
    amountCents: bigint;
    message?: string;
    currency: string;
    stripeSessionId?: string;
    donorEmail: string;
}
export interface GalleryImage {
    id: ResourceId;
    blob: ExternalBlob;
    caption?: string;
    albumId: ResourceId;
    uploadedAt: Timestamp;
    uploadedBy: UserId;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface ContactMessage {
    id: ResourceId;
    subject: string;
    name: string;
    createdAt: Timestamp;
    isRead: boolean;
    email: string;
    message: string;
}
export interface Announcement {
    id: ResourceId;
    title: string;
    content: string;
    publishAt: Timestamp;
    createdAt: Timestamp;
    createdBy: UserId;
    expireAt?: Timestamp;
    isPinned: boolean;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface LeadershipMember {
    id: ResourceId;
    bio: string;
    photoBlob?: ExternalBlob;
    title: string;
    displayOrder: bigint;
    name: string;
    isActive: boolean;
}
export interface BlogPost {
    id: ResourceId;
    title: string;
    content: string;
    isPublished: boolean;
    createdAt: Timestamp;
    featuredImageBlob?: ExternalBlob;
    author: UserId;
    updatedAt: Timestamp;
}
export interface MediaFile {
    id: ResourceId;
    blob: ExternalBlob;
    description?: string;
    fileName: string;
    mediaType: MediaType;
    category: string;
    uploadedAt: Timestamp;
    uploadedBy: UserId;
}
export interface PrayerRequest {
    id: ResourceId;
    status: PrayerStatus;
    submitterName: string;
    content: string;
    createdAt: Timestamp;
    submitterId?: UserId;
    privacy: PrayerPrivacy;
}
export interface Event {
    id: ResourceId;
    title: string;
    endDate: Timestamp;
    isPublished: boolean;
    createdAt: Timestamp;
    createdBy: UserId;
    description: string;
    imageUrl?: string;
    capacity?: bigint;
    location: string;
    startDate: Timestamp;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface EventWithRsvps {
    event: Event;
    rsvps: Array<Rsvp>;
}
export interface NewsletterSubscriber {
    subscribedAt: Timestamp;
    isActive: boolean;
    email: string;
}
export type ResourceId = bigint;
export interface UserProfile {
    id: UserId;
    name: string;
    joinedAt: Timestamp;
    role: UserRole;
    photoUrl?: string;
    email: string;
    phone?: string;
    registrationStatus: RegistrationStatus;
}
export interface Testimonial {
    id: ResourceId;
    photoBlob?: ExternalBlob;
    isApproved: boolean;
    content: string;
    authorId?: UserId;
    createdAt: Timestamp;
    authorName: string;
    isFeatured: boolean;
}
export enum MediaType {
    pdf = "pdf",
    audio = "audio",
    video = "video",
    image = "image"
}
export enum PrayerPrivacy {
    public_ = "public",
    private_ = "private",
    membersOnly = "membersOnly"
}
export enum PrayerStatus {
    active = "active",
    answered = "answered"
}
export enum RegistrationStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum RsvpStatus {
    maybe = "maybe",
    notGoing = "notGoing",
    going = "going"
}
export enum UserRole {
    member = "member",
    admin = "admin",
    leader = "leader",
    guest = "guest"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAnnouncement(title: string, content: string, isPinned: boolean, publishAt: Timestamp, expireAt: Timestamp | null): Promise<Announcement>;
    addBlogPost(title: string, content: string, featuredImageBlob: ExternalBlob | null, isPublished: boolean): Promise<BlogPost>;
    addDevotional(title: string, scripture: string, reflection: string, date: Timestamp): Promise<Devotional>;
    addGalleryImage(albumId: ResourceId, blob: ExternalBlob, caption: string | null): Promise<GalleryImage>;
    addLeader(name: string, title: string, bio: string, photoBlob: ExternalBlob | null, displayOrder: bigint): Promise<LeadershipMember>;
    addSermon(title: string, speaker: string, date: Timestamp, description: string, scriptureReference: string, audioBlob: ExternalBlob | null, videoBlob: ExternalBlob | null, thumbnailBlob: ExternalBlob | null): Promise<Sermon>;
    approveTestimonial(id: ResourceId, isFeatured: boolean): Promise<void>;
    approveUser(userId: UserId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    assignUserRole(userId: UserId, role: UserRole): Promise<void>;
    createAlbum(title: string, description: string | null, category: string, coverImageBlob: ExternalBlob | null): Promise<GalleryAlbum>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createDonationCheckout(donorName: string, donorEmail: string, amountCents: bigint, currency: string, message: string | null, successUrl: string, cancelUrl: string): Promise<string>;
    createEvent(title: string, description: string, location: string, startDate: Timestamp, endDate: Timestamp, capacity: bigint | null, imageUrl: string | null): Promise<Event>;
    deleteAlbum(albumId: ResourceId): Promise<void>;
    deleteAnnouncement(id: ResourceId): Promise<void>;
    deleteBlogPost(id: ResourceId): Promise<void>;
    deleteDevotional(id: ResourceId): Promise<void>;
    deleteEvent(id: ResourceId): Promise<void>;
    deleteGalleryImage(id: ResourceId): Promise<void>;
    deleteLeader(id: ResourceId): Promise<void>;
    deleteMedia(id: ResourceId): Promise<void>;
    deleteSermon(id: ResourceId): Promise<void>;
    deleteTestimonial(id: ResourceId): Promise<void>;
    getAnalyticsSummary(): Promise<AnalyticsSummary>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getDonationSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getEvent(id: ResourceId): Promise<Event | null>;
    getEventWithRsvps(id: ResourceId): Promise<EventWithRsvps | null>;
    getSettings(): Promise<SystemSettings>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listAlbums(): Promise<Array<GalleryAlbum>>;
    listAnnouncements(): Promise<Array<Announcement>>;
    listBlogPosts(): Promise<Array<BlogPost>>;
    listContacts(): Promise<Array<ContactMessage>>;
    listDevotionals(): Promise<Array<Devotional>>;
    listDonations(): Promise<Array<Donation>>;
    listEvents(): Promise<Array<Event>>;
    listGalleryImages(albumId: ResourceId): Promise<Array<GalleryImage>>;
    listLeadership(): Promise<Array<LeadershipMember>>;
    listMedia(): Promise<Array<MediaFile>>;
    listMediaByType(mediaType: MediaType): Promise<Array<MediaFile>>;
    listPendingRegistrations(): Promise<Array<UserProfile>>;
    listPrayerRequests(): Promise<Array<PrayerRequest>>;
    listSermons(): Promise<Array<Sermon>>;
    listSubscribers(): Promise<Array<NewsletterSubscriber>>;
    listTestimonials(): Promise<Array<Testimonial>>;
    listUsers(): Promise<Array<UserProfile>>;
    markContactRead(id: ResourceId): Promise<void>;
    recordDonation(donorName: string, donorEmail: string, amountCents: bigint, currency: string, message: string | null, stripeSessionId: string | null): Promise<Donation>;
    recordPageView(page: string): Promise<void>;
    registerUser(name: string, email: string, phone: string | null): Promise<UserProfile>;
    rejectUser(userId: UserId): Promise<void>;
    saveCallerUserProfile(name: string, email: string, phone: string | null): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitContact(name: string, email: string, subject: string, message: string): Promise<ContactMessage>;
    submitPrayerRequest(submitterName: string, content: string, privacy: PrayerPrivacy): Promise<PrayerRequest>;
    submitRsvp(eventId: ResourceId, status: RsvpStatus): Promise<void>;
    submitTestimonial(authorName: string, content: string, photoBlob: ExternalBlob | null): Promise<Testimonial>;
    subscribeNewsletter(email: string): Promise<void>;
    totalDonationsCents(): Promise<bigint>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    unsubscribeNewsletter(email: string): Promise<void>;
    updateAnnouncement(id: ResourceId, title: string, content: string, isPinned: boolean, publishAt: Timestamp, expireAt: Timestamp | null): Promise<Announcement>;
    updateBlogPost(id: ResourceId, title: string, content: string, featuredImageBlob: ExternalBlob | null, isPublished: boolean): Promise<BlogPost>;
    updateDevotional(id: ResourceId, title: string, scripture: string, reflection: string, date: Timestamp): Promise<Devotional>;
    updateEvent(id: ResourceId, title: string, description: string, location: string, startDate: Timestamp, endDate: Timestamp, capacity: bigint | null, imageUrl: string | null, isPublished: boolean): Promise<Event>;
    updateLeader(id: ResourceId, name: string, title: string, bio: string, photoBlob: ExternalBlob | null, displayOrder: bigint, isActive: boolean): Promise<LeadershipMember>;
    updatePrayerStatus(id: ResourceId, status: PrayerStatus): Promise<void>;
    updateSermon(id: ResourceId, title: string, speaker: string, date: Timestamp, description: string, scriptureReference: string, audioBlob: ExternalBlob | null, videoBlob: ExternalBlob | null, thumbnailBlob: ExternalBlob | null, isPublished: boolean): Promise<Sermon>;
    updateSettings(updated: SystemSettings): Promise<void>;
    uploadMedia(fileName: string, blob: ExternalBlob, mediaType: MediaType, category: string, description: string | null): Promise<MediaFile>;
}
