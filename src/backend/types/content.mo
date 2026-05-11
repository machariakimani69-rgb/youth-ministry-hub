import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // Sermons
  public type Sermon = {
    id : Common.ResourceId;
    title : Text;
    speaker : Text;
    date : Common.Timestamp;
    description : Text;
    scriptureReference : Text;
    audioBlob : ?Storage.ExternalBlob;
    videoBlob : ?Storage.ExternalBlob;
    thumbnailBlob : ?Storage.ExternalBlob;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
    isPublished : Bool;
  };

  // Blog
  public type BlogPost = {
    id : Common.ResourceId;
    title : Text;
    content : Text;
    author : Common.UserId;
    featuredImageBlob : ?Storage.ExternalBlob;
    isPublished : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  // Devotionals
  public type Devotional = {
    id : Common.ResourceId;
    title : Text;
    scripture : Text;
    reflection : Text;
    date : Common.Timestamp;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
  };

  // Announcements
  public type Announcement = {
    id : Common.ResourceId;
    title : Text;
    content : Text;
    isPinned : Bool;
    publishAt : Common.Timestamp;
    expireAt : ?Common.Timestamp;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
  };
};
