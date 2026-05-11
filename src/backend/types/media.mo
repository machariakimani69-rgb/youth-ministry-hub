import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type MediaType = { #video; #audio; #pdf; #image };

  public type MediaFile = {
    id : Common.ResourceId;
    fileName : Text;
    blob : Storage.ExternalBlob;
    mediaType : MediaType;
    category : Text;
    uploadedBy : Common.UserId;
    uploadedAt : Common.Timestamp;
    description : ?Text;
  };

  // Gallery
  public type GalleryAlbum = {
    id : Common.ResourceId;
    title : Text;
    description : ?Text;
    category : Text;
    coverImageBlob : ?Storage.ExternalBlob;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type GalleryImage = {
    id : Common.ResourceId;
    albumId : Common.ResourceId;
    blob : Storage.ExternalBlob;
    caption : ?Text;
    uploadedBy : Common.UserId;
    uploadedAt : Common.Timestamp;
  };
};
