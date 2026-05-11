import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/content";
import Storage "mo:caffeineai-object-storage/Storage";
import ContentLib "../lib/content";

mixin (
  accessControlState : AccessControl.AccessControlState,
  sermons : Map.Map<Common.ResourceId, Types.Sermon>,
  posts : Map.Map<Common.ResourceId, Types.BlogPost>,
  devotionals : Map.Map<Common.ResourceId, Types.Devotional>,
  announcements : Map.Map<Common.ResourceId, Types.Announcement>,
  state : { var nextContentId : Nat },
) {
  // --- Sermons ---
  public shared ({ caller }) func addSermon(
    title : Text,
    speaker : Text,
    date : Common.Timestamp,
    description : Text,
    scriptureReference : Text,
    audioBlob : ?Storage.ExternalBlob,
    videoBlob : ?Storage.ExternalBlob,
    thumbnailBlob : ?Storage.ExternalBlob,
  ) : async Types.Sermon {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = state.nextContentId;
    state.nextContentId += 1;
    ContentLib.addSermon(sermons, id, caller, title, speaker, date, description, scriptureReference, audioBlob, videoBlob, thumbnailBlob);
  };

  public shared ({ caller }) func updateSermon(
    id : Common.ResourceId,
    title : Text,
    speaker : Text,
    date : Common.Timestamp,
    description : Text,
    scriptureReference : Text,
    audioBlob : ?Storage.ExternalBlob,
    videoBlob : ?Storage.ExternalBlob,
    thumbnailBlob : ?Storage.ExternalBlob,
    isPublished : Bool,
  ) : async Types.Sermon {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.updateSermon(sermons, id, title, speaker, date, description, scriptureReference, audioBlob, videoBlob, thumbnailBlob, isPublished);
  };

  public shared ({ caller }) func deleteSermon(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete sermons");
    };
    ContentLib.deleteSermon(sermons, id);
  };

  public query func listSermons() : async [Types.Sermon] {
    ContentLib.listSermons(sermons);
  };

  // --- Blog ---
  public shared ({ caller }) func addBlogPost(
    title : Text,
    content : Text,
    featuredImageBlob : ?Storage.ExternalBlob,
    isPublished : Bool,
  ) : async Types.BlogPost {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = state.nextContentId;
    state.nextContentId += 1;
    ContentLib.addBlogPost(posts, id, caller, title, content, featuredImageBlob, isPublished);
  };

  public shared ({ caller }) func updateBlogPost(
    id : Common.ResourceId,
    title : Text,
    content : Text,
    featuredImageBlob : ?Storage.ExternalBlob,
    isPublished : Bool,
  ) : async Types.BlogPost {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.updateBlogPost(posts, id, title, content, featuredImageBlob, isPublished);
  };

  public shared ({ caller }) func deleteBlogPost(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };
    ContentLib.deleteBlogPost(posts, id);
  };

  public query func listBlogPosts() : async [Types.BlogPost] {
    ContentLib.listBlogPosts(posts);
  };

  // --- Devotionals ---
  public shared ({ caller }) func addDevotional(
    title : Text,
    scripture : Text,
    reflection : Text,
    date : Common.Timestamp,
  ) : async Types.Devotional {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = state.nextContentId;
    state.nextContentId += 1;
    ContentLib.addDevotional(devotionals, id, caller, title, scripture, reflection, date);
  };

  public shared ({ caller }) func updateDevotional(
    id : Common.ResourceId,
    title : Text,
    scripture : Text,
    reflection : Text,
    date : Common.Timestamp,
  ) : async Types.Devotional {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.updateDevotional(devotionals, id, title, scripture, reflection, date);
  };

  public shared ({ caller }) func deleteDevotional(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete devotionals");
    };
    ContentLib.deleteDevotional(devotionals, id);
  };

  public query func listDevotionals() : async [Types.Devotional] {
    ContentLib.listDevotionals(devotionals);
  };

  // --- Announcements ---
  public shared ({ caller }) func addAnnouncement(
    title : Text,
    content : Text,
    isPinned : Bool,
    publishAt : Common.Timestamp,
    expireAt : ?Common.Timestamp,
  ) : async Types.Announcement {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = state.nextContentId;
    state.nextContentId += 1;
    ContentLib.addAnnouncement(announcements, id, caller, title, content, isPinned, publishAt, expireAt);
  };

  public shared ({ caller }) func updateAnnouncement(
    id : Common.ResourceId,
    title : Text,
    content : Text,
    isPinned : Bool,
    publishAt : Common.Timestamp,
    expireAt : ?Common.Timestamp,
  ) : async Types.Announcement {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ContentLib.updateAnnouncement(announcements, id, title, content, isPinned, publishAt, expireAt);
  };

  public shared ({ caller }) func deleteAnnouncement(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete announcements");
    };
    ContentLib.deleteAnnouncement(announcements, id);
  };

  public query func listAnnouncements() : async [Types.Announcement] {
    ContentLib.listAnnouncements(announcements);
  };
};
