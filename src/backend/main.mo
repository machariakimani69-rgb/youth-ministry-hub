import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import UserTypes "types/users";
import EventTypes "types/events";
import ContentTypes "types/content";
import MediaTypes "types/media";
import CommunityTypes "types/community";
import DonationTypes "types/donations";
import AnalyticsTypes "types/analytics";
import SettingsTypes "types/settings";
import Common "types/common";
import UsersMixin "mixins/users-api";
import EventsMixin "mixins/events-api";
import ContentMixin "mixins/content-api";
import MediaMixin "mixins/media-api";
import CommunityMixin "mixins/community-api";
import DonationsMixin "mixins/donations-api";
import SettingsMixin "mixins/settings-api";
import AnalyticsMixin "mixins/analytics-api";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

actor {
  // --- Auth ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage ---
  include MixinObjectStorage();

  // --- Shared counters ---
  let userIdCounter = { var nextUserId : Nat = 0 };
  let eventIdCounter = { var nextEventId : Nat = 0 };
  let contentIdCounter = { var nextContentId : Nat = 0 };
  let mediaIdCounter = { var nextMediaId : Nat = 0 };
  let communityIdCounter = { var nextCommunityId : Nat = 0 };
  let donationIdCounter = { var nextDonationId : Nat = 0 };

  // --- Settings ---
  let settingsStore : { var data : SettingsTypes.SystemSettings } = {
    var data = {
      churchName = "Youth Ministry";
      logoUrl = null;
      primaryColor = "#6366f1";
      contactEmail = "";
      contactPhone = null;
      address = null;
      socialLinks = {
        facebook = null;
        instagram = null;
        twitter = null;
        youtube = null;
        whatsapp = null;
      };
      welcomeMessage = "Welcome to our Youth Ministry";
      aboutUs = "";
    };
  };
  let stripeConfigStore : { var data : ?SettingsTypes.StripeConfig } = { var data = null };

  // --- User state ---
  let profiles = Map.empty<Common.UserId, UserTypes.UserProfile>();

  // --- Event state ---
  let events = Map.empty<Common.ResourceId, EventTypes.Event>();
  let rsvps = Map.empty<Common.ResourceId, Map.Map<Common.UserId, EventTypes.Rsvp>>();

  // --- Content state ---
  let sermons = Map.empty<Common.ResourceId, ContentTypes.Sermon>();
  let posts = Map.empty<Common.ResourceId, ContentTypes.BlogPost>();
  let devotionals = Map.empty<Common.ResourceId, ContentTypes.Devotional>();
  let announcements = Map.empty<Common.ResourceId, ContentTypes.Announcement>();

  // --- Media state ---
  let mediaFiles = Map.empty<Common.ResourceId, MediaTypes.MediaFile>();
  let albums = Map.empty<Common.ResourceId, MediaTypes.GalleryAlbum>();
  let galleryImages = Map.empty<Common.ResourceId, MediaTypes.GalleryImage>();

  // --- Community state ---
  let prayers = Map.empty<Common.ResourceId, CommunityTypes.PrayerRequest>();
  let testimonials = Map.empty<Common.ResourceId, CommunityTypes.Testimonial>();
  let leadership = Map.empty<Common.ResourceId, CommunityTypes.LeadershipMember>();
  let contacts = Map.empty<Common.ResourceId, CommunityTypes.ContactMessage>();
  let subscribers = Map.empty<Text, CommunityTypes.NewsletterSubscriber>();

  // --- Donation state ---
  let donations = Map.empty<Common.ResourceId, DonationTypes.Donation>();

  // --- Analytics state ---
  let pageViews = List.empty<AnalyticsTypes.PageView>();

  // --- Mixins ---
  include UsersMixin(accessControlState, profiles, userIdCounter);
  include EventsMixin(accessControlState, events, rsvps, eventIdCounter);
  include ContentMixin(accessControlState, sermons, posts, devotionals, announcements, contentIdCounter);
  include MediaMixin(accessControlState, mediaFiles, albums, galleryImages, mediaIdCounter);
  include CommunityMixin(accessControlState, prayers, testimonials, leadership, contacts, subscribers, communityIdCounter);
  include DonationsMixin(accessControlState, donations, stripeConfigStore, donationIdCounter);
  include SettingsMixin(accessControlState, settingsStore, stripeConfigStore);
  include AnalyticsMixin(accessControlState, pageViews, profiles, donations, events);

  // --- Stripe required functions (canonical names required by extension) ---
  func getStripeConfig_() : Stripe.StripeConfiguration {
    switch (stripeConfigStore.data) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?cfg) { { secretKey = cfg.secretKey; allowedCountries = cfg.allowedCountries } };
    };
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfigStore.data != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfigStore.data := ?{ secretKey = config.secretKey; allowedCountries = config.allowedCountries };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig_(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig_(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // --- Donation checkout (uses actor-level transform) ---
  public shared ({ caller }) func createDonationCheckout(
    donorName : Text,
    donorEmail : Text,
    amountCents : Nat,
    currency : Text,
    message : ?Text,
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    let items : [Stripe.ShoppingItem] = [{
      currency = currency;
      productName = "Donation";
      productDescription = "Church Youth Ministry Donation";
      priceInCents = amountCents;
      quantity = 1;
    }];
    await Stripe.createCheckoutSession(getStripeConfig_(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getDonationSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig_(), sessionId, transform);
  };
};
