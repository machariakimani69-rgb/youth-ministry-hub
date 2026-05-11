import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/community";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // --- Prayer Requests ---
  public func submitPrayerRequest(
    prayers : Map.Map<Common.ResourceId, Types.PrayerRequest>,
    id : Common.ResourceId,
    submitterName : Text,
    submitterId : ?Common.UserId,
    content : Text,
    privacy : Types.PrayerPrivacy,
  ) : Types.PrayerRequest {
    let req : Types.PrayerRequest = {
      id = id;
      submitterName = submitterName;
      submitterId = submitterId;
      content = content;
      privacy = privacy;
      status = #active;
      createdAt = Common.now();
    };
    prayers.add(id, req);
    req;
  };

  public func updatePrayerStatus(
    prayers : Map.Map<Common.ResourceId, Types.PrayerRequest>,
    id : Common.ResourceId,
    status : Types.PrayerStatus,
  ) : () {
    switch (prayers.get(id)) {
      case (null) { Runtime.trap("Prayer request not found") };
      case (?p) { prayers.add(id, { p with status = status }) };
    };
  };

  public func listPrayerRequests(
    prayers : Map.Map<Common.ResourceId, Types.PrayerRequest>,
  ) : [Types.PrayerRequest] {
    prayers.values().toArray();
  };

  // --- Testimonials ---
  public func submitTestimonial(
    testimonials : Map.Map<Common.ResourceId, Types.Testimonial>,
    id : Common.ResourceId,
    authorName : Text,
    authorId : ?Common.UserId,
    content : Text,
    photoBlob : ?Storage.ExternalBlob,
  ) : Types.Testimonial {
    let t : Types.Testimonial = {
      id = id;
      authorName = authorName;
      authorId = authorId;
      content = content;
      photoBlob = photoBlob;
      isFeatured = false;
      isApproved = false;
      createdAt = Common.now();
    };
    testimonials.add(id, t);
    t;
  };

  public func approveTestimonial(
    testimonials : Map.Map<Common.ResourceId, Types.Testimonial>,
    id : Common.ResourceId,
    isFeatured : Bool,
  ) : () {
    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?t) { testimonials.add(id, { t with isApproved = true; isFeatured = isFeatured }) };
    };
  };

  public func deleteTestimonial(
    testimonials : Map.Map<Common.ResourceId, Types.Testimonial>,
    id : Common.ResourceId,
  ) : () {
    testimonials.remove(id);
  };

  public func listTestimonials(
    testimonials : Map.Map<Common.ResourceId, Types.Testimonial>,
  ) : [Types.Testimonial] {
    testimonials.values().toArray();
  };

  // --- Leadership ---
  public func addLeader(
    leadership : Map.Map<Common.ResourceId, Types.LeadershipMember>,
    id : Common.ResourceId,
    name : Text,
    title : Text,
    bio : Text,
    photoBlob : ?Storage.ExternalBlob,
    displayOrder : Nat,
  ) : Types.LeadershipMember {
    let member : Types.LeadershipMember = {
      id = id;
      name = name;
      title = title;
      bio = bio;
      photoBlob = photoBlob;
      displayOrder = displayOrder;
      isActive = true;
    };
    leadership.add(id, member);
    member;
  };

  public func updateLeader(
    leadership : Map.Map<Common.ResourceId, Types.LeadershipMember>,
    id : Common.ResourceId,
    name : Text,
    title : Text,
    bio : Text,
    photoBlob : ?Storage.ExternalBlob,
    displayOrder : Nat,
    isActive : Bool,
  ) : Types.LeadershipMember {
    switch (leadership.get(id)) {
      case (null) { Runtime.trap("Leader not found") };
      case (?m) {
        let updated : Types.LeadershipMember = { m with
          name = name;
          title = title;
          bio = bio;
          photoBlob = photoBlob;
          displayOrder = displayOrder;
          isActive = isActive;
        };
        leadership.add(id, updated);
        updated;
      };
    };
  };

  public func deleteLeader(
    leadership : Map.Map<Common.ResourceId, Types.LeadershipMember>,
    id : Common.ResourceId,
  ) : () {
    leadership.remove(id);
  };

  public func listLeadership(
    leadership : Map.Map<Common.ResourceId, Types.LeadershipMember>,
  ) : [Types.LeadershipMember] {
    leadership.values().toArray();
  };

  // --- Contact Messages ---
  public func submitContact(
    contacts : Map.Map<Common.ResourceId, Types.ContactMessage>,
    id : Common.ResourceId,
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : Types.ContactMessage {
    let msg : Types.ContactMessage = {
      id = id;
      name = name;
      email = email;
      subject = subject;
      message = message;
      isRead = false;
      createdAt = Common.now();
    };
    contacts.add(id, msg);
    msg;
  };

  public func markContactRead(
    contacts : Map.Map<Common.ResourceId, Types.ContactMessage>,
    id : Common.ResourceId,
  ) : () {
    switch (contacts.get(id)) {
      case (null) { Runtime.trap("Contact message not found") };
      case (?m) { contacts.add(id, { m with isRead = true }) };
    };
  };

  public func listContacts(
    contacts : Map.Map<Common.ResourceId, Types.ContactMessage>,
  ) : [Types.ContactMessage] {
    contacts.values().toArray();
  };

  // --- Newsletter ---
  public func subscribeNewsletter(
    subscribers : Map.Map<Text, Types.NewsletterSubscriber>,
    email : Text,
  ) : () {
    switch (subscribers.get(email)) {
      case (?existing) {
        subscribers.add(email, { existing with isActive = true });
      };
      case (null) {
        subscribers.add(email, {
          email = email;
          subscribedAt = Common.now();
          isActive = true;
        });
      };
    };
  };

  public func unsubscribeNewsletter(
    subscribers : Map.Map<Text, Types.NewsletterSubscriber>,
    email : Text,
  ) : () {
    switch (subscribers.get(email)) {
      case (?existing) {
        subscribers.add(email, { existing with isActive = false });
      };
      case (null) {};
    };
  };

  public func listSubscribers(
    subscribers : Map.Map<Text, Types.NewsletterSubscriber>,
  ) : [Types.NewsletterSubscriber] {
    subscribers.values().toArray();
  };
};
