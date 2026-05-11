import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/community";
import Storage "mo:caffeineai-object-storage/Storage";
import CommunityLib "../lib/community";

mixin (
  accessControlState : AccessControl.AccessControlState,
  prayers : Map.Map<Common.ResourceId, Types.PrayerRequest>,
  testimonials : Map.Map<Common.ResourceId, Types.Testimonial>,
  leadership : Map.Map<Common.ResourceId, Types.LeadershipMember>,
  contacts : Map.Map<Common.ResourceId, Types.ContactMessage>,
  subscribers : Map.Map<Text, Types.NewsletterSubscriber>,
  state : { var nextCommunityId : Nat },
) {
  // --- Prayer Requests ---
  public shared ({ caller }) func submitPrayerRequest(
    submitterName : Text,
    content : Text,
    privacy : Types.PrayerPrivacy,
  ) : async Types.PrayerRequest {
    let callerId : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
    let id = state.nextCommunityId;
    state.nextCommunityId += 1;
    CommunityLib.submitPrayerRequest(prayers, id, submitterName, callerId, content, privacy);
  };

  public shared ({ caller }) func updatePrayerStatus(
    id : Common.ResourceId,
    status : Types.PrayerStatus,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CommunityLib.updatePrayerStatus(prayers, id, status);
  };

  public query ({ caller }) func listPrayerRequests() : async [Types.PrayerRequest] {
    let isUser = AccessControl.hasPermission(accessControlState, caller, #user);
    if (isUser) {
      prayers.values().filter(func(p) {
        switch (p.privacy) {
          case (#public_) { true };
          case (#membersOnly) { true };
          case (#private_) { false };
        };
      }).toArray();
    } else {
      prayers.values().filter(func(p) {
        switch (p.privacy) {
          case (#public_) { true };
          case _ { false };
        };
      }).toArray();
    };
  };

  // --- Testimonials ---
  public shared ({ caller }) func submitTestimonial(
    authorName : Text,
    content : Text,
    photoBlob : ?Storage.ExternalBlob,
  ) : async Types.Testimonial {
    let authorId : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
    let id = state.nextCommunityId;
    state.nextCommunityId += 1;
    CommunityLib.submitTestimonial(testimonials, id, authorName, authorId, content, photoBlob);
  };

  public shared ({ caller }) func approveTestimonial(
    id : Common.ResourceId,
    isFeatured : Bool,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve testimonials");
    };
    CommunityLib.approveTestimonial(testimonials, id, isFeatured);
  };

  public shared ({ caller }) func deleteTestimonial(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    CommunityLib.deleteTestimonial(testimonials, id);
  };

  public query func listTestimonials() : async [Types.Testimonial] {
    testimonials.values().filter(func(t) { t.isApproved }).toArray();
  };

  // --- Leadership ---
  public shared ({ caller }) func addLeader(
    name : Text,
    title : Text,
    bio : Text,
    photoBlob : ?Storage.ExternalBlob,
    displayOrder : Nat,
  ) : async Types.LeadershipMember {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can manage leadership");
    };
    let id = state.nextCommunityId;
    state.nextCommunityId += 1;
    CommunityLib.addLeader(leadership, id, name, title, bio, photoBlob, displayOrder);
  };

  public shared ({ caller }) func updateLeader(
    id : Common.ResourceId,
    name : Text,
    title : Text,
    bio : Text,
    photoBlob : ?Storage.ExternalBlob,
    displayOrder : Nat,
    isActive : Bool,
  ) : async Types.LeadershipMember {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can manage leadership");
    };
    CommunityLib.updateLeader(leadership, id, name, title, bio, photoBlob, displayOrder, isActive);
  };

  public shared ({ caller }) func deleteLeader(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can manage leadership");
    };
    CommunityLib.deleteLeader(leadership, id);
  };

  public query func listLeadership() : async [Types.LeadershipMember] {
    CommunityLib.listLeadership(leadership);
  };

  // --- Contact Messages ---
  public func submitContact(
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : async Types.ContactMessage {
    let id = state.nextCommunityId;
    state.nextCommunityId += 1;
    CommunityLib.submitContact(contacts, id, name, email, subject, message);
  };

  public shared ({ caller }) func markContactRead(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can manage contact messages");
    };
    CommunityLib.markContactRead(contacts, id);
  };

  public query ({ caller }) func listContacts() : async [Types.ContactMessage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    CommunityLib.listContacts(contacts);
  };

  // --- Newsletter ---
  public func subscribeNewsletter(email : Text) : async () {
    CommunityLib.subscribeNewsletter(subscribers, email);
  };

  public func unsubscribeNewsletter(email : Text) : async () {
    CommunityLib.unsubscribeNewsletter(subscribers, email);
  };

  public query ({ caller }) func listSubscribers() : async [Types.NewsletterSubscriber] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view subscribers");
    };
    CommunityLib.listSubscribers(subscribers);
  };
};
