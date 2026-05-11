import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/content";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // --- Sermons ---
  public func addSermon(
    sermons : Map.Map<Common.ResourceId, Types.Sermon>,
    id : Common.ResourceId,
    caller : Common.UserId,
    title : Text,
    speaker : Text,
    date : Common.Timestamp,
    description : Text,
    scriptureReference : Text,
    audioBlob : ?Storage.ExternalBlob,
    videoBlob : ?Storage.ExternalBlob,
    thumbnailBlob : ?Storage.ExternalBlob,
  ) : Types.Sermon {
    let s : Types.Sermon = {
      id = id;
      title = title;
      speaker = speaker;
      date = date;
      description = description;
      scriptureReference = scriptureReference;
      audioBlob = audioBlob;
      videoBlob = videoBlob;
      thumbnailBlob = thumbnailBlob;
      createdBy = caller;
      createdAt = Common.now();
      isPublished = false;
    };
    sermons.add(id, s);
    s;
  };

  public func updateSermon(
    sermons : Map.Map<Common.ResourceId, Types.Sermon>,
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
  ) : Types.Sermon {
    switch (sermons.get(id)) {
      case (null) { Runtime.trap("Sermon not found") };
      case (?s) {
        let updated : Types.Sermon = { s with
          title = title;
          speaker = speaker;
          date = date;
          description = description;
          scriptureReference = scriptureReference;
          audioBlob = audioBlob;
          videoBlob = videoBlob;
          thumbnailBlob = thumbnailBlob;
          isPublished = isPublished;
        };
        sermons.add(id, updated);
        updated;
      };
    };
  };

  public func deleteSermon(
    sermons : Map.Map<Common.ResourceId, Types.Sermon>,
    id : Common.ResourceId,
  ) : () {
    sermons.remove(id);
  };

  public func listSermons(
    sermons : Map.Map<Common.ResourceId, Types.Sermon>,
  ) : [Types.Sermon] {
    sermons.values().toArray();
  };

  // --- Blog ---
  public func addBlogPost(
    posts : Map.Map<Common.ResourceId, Types.BlogPost>,
    id : Common.ResourceId,
    caller : Common.UserId,
    title : Text,
    content : Text,
    featuredImageBlob : ?Storage.ExternalBlob,
    isPublished : Bool,
  ) : Types.BlogPost {
    let now = Common.now();
    let p : Types.BlogPost = {
      id = id;
      title = title;
      content = content;
      author = caller;
      featuredImageBlob = featuredImageBlob;
      isPublished = isPublished;
      createdAt = now;
      updatedAt = now;
    };
    posts.add(id, p);
    p;
  };

  public func updateBlogPost(
    posts : Map.Map<Common.ResourceId, Types.BlogPost>,
    id : Common.ResourceId,
    title : Text,
    content : Text,
    featuredImageBlob : ?Storage.ExternalBlob,
    isPublished : Bool,
  ) : Types.BlogPost {
    switch (posts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?p) {
        let updated : Types.BlogPost = { p with
          title = title;
          content = content;
          featuredImageBlob = featuredImageBlob;
          isPublished = isPublished;
          updatedAt = Common.now();
        };
        posts.add(id, updated);
        updated;
      };
    };
  };

  public func deleteBlogPost(
    posts : Map.Map<Common.ResourceId, Types.BlogPost>,
    id : Common.ResourceId,
  ) : () {
    posts.remove(id);
  };

  public func listBlogPosts(
    posts : Map.Map<Common.ResourceId, Types.BlogPost>,
  ) : [Types.BlogPost] {
    posts.values().toArray();
  };

  // --- Devotionals ---
  public func addDevotional(
    devotionals : Map.Map<Common.ResourceId, Types.Devotional>,
    id : Common.ResourceId,
    caller : Common.UserId,
    title : Text,
    scripture : Text,
    reflection : Text,
    date : Common.Timestamp,
  ) : Types.Devotional {
    let d : Types.Devotional = {
      id = id;
      title = title;
      scripture = scripture;
      reflection = reflection;
      date = date;
      createdBy = caller;
      createdAt = Common.now();
    };
    devotionals.add(id, d);
    d;
  };

  public func updateDevotional(
    devotionals : Map.Map<Common.ResourceId, Types.Devotional>,
    id : Common.ResourceId,
    title : Text,
    scripture : Text,
    reflection : Text,
    date : Common.Timestamp,
  ) : Types.Devotional {
    switch (devotionals.get(id)) {
      case (null) { Runtime.trap("Devotional not found") };
      case (?d) {
        let updated : Types.Devotional = { d with
          title = title;
          scripture = scripture;
          reflection = reflection;
          date = date;
        };
        devotionals.add(id, updated);
        updated;
      };
    };
  };

  public func deleteDevotional(
    devotionals : Map.Map<Common.ResourceId, Types.Devotional>,
    id : Common.ResourceId,
  ) : () {
    devotionals.remove(id);
  };

  public func listDevotionals(
    devotionals : Map.Map<Common.ResourceId, Types.Devotional>,
  ) : [Types.Devotional] {
    devotionals.values().toArray();
  };

  // --- Announcements ---
  public func addAnnouncement(
    announcements : Map.Map<Common.ResourceId, Types.Announcement>,
    id : Common.ResourceId,
    caller : Common.UserId,
    title : Text,
    content : Text,
    isPinned : Bool,
    publishAt : Common.Timestamp,
    expireAt : ?Common.Timestamp,
  ) : Types.Announcement {
    let a : Types.Announcement = {
      id = id;
      title = title;
      content = content;
      isPinned = isPinned;
      publishAt = publishAt;
      expireAt = expireAt;
      createdBy = caller;
      createdAt = Common.now();
    };
    announcements.add(id, a);
    a;
  };

  public func updateAnnouncement(
    announcements : Map.Map<Common.ResourceId, Types.Announcement>,
    id : Common.ResourceId,
    title : Text,
    content : Text,
    isPinned : Bool,
    publishAt : Common.Timestamp,
    expireAt : ?Common.Timestamp,
  ) : Types.Announcement {
    switch (announcements.get(id)) {
      case (null) { Runtime.trap("Announcement not found") };
      case (?a) {
        let updated : Types.Announcement = { a with
          title = title;
          content = content;
          isPinned = isPinned;
          publishAt = publishAt;
          expireAt = expireAt;
        };
        announcements.add(id, updated);
        updated;
      };
    };
  };

  public func deleteAnnouncement(
    announcements : Map.Map<Common.ResourceId, Types.Announcement>,
    id : Common.ResourceId,
  ) : () {
    announcements.remove(id);
  };

  public func listAnnouncements(
    announcements : Map.Map<Common.ResourceId, Types.Announcement>,
  ) : [Types.Announcement] {
    announcements.values().toArray();
  };
};
