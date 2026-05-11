import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // Prayer Requests
  public type PrayerPrivacy = { #public_; #membersOnly; #private_ };
  public type PrayerStatus = { #active; #answered };

  public type PrayerRequest = {
    id : Common.ResourceId;
    submitterName : Text;
    submitterId : ?Common.UserId;
    content : Text;
    privacy : PrayerPrivacy;
    status : PrayerStatus;
    createdAt : Common.Timestamp;
  };

  // Testimonials
  public type Testimonial = {
    id : Common.ResourceId;
    authorName : Text;
    authorId : ?Common.UserId;
    content : Text;
    photoBlob : ?Storage.ExternalBlob;
    isFeatured : Bool;
    isApproved : Bool;
    createdAt : Common.Timestamp;
  };

  // Leadership
  public type LeadershipMember = {
    id : Common.ResourceId;
    name : Text;
    title : Text;
    bio : Text;
    photoBlob : ?Storage.ExternalBlob;
    displayOrder : Nat;
    isActive : Bool;
  };

  // Contact Messages
  public type ContactMessage = {
    id : Common.ResourceId;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    isRead : Bool;
    createdAt : Common.Timestamp;
  };

  // Newsletter
  public type NewsletterSubscriber = {
    email : Text;
    subscribedAt : Common.Timestamp;
    isActive : Bool;
  };
};
