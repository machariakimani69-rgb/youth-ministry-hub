import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/media";
import Storage "mo:caffeineai-object-storage/Storage";
import MediaLib "../lib/media";

mixin (
  accessControlState : AccessControl.AccessControlState,
  mediaFiles : Map.Map<Common.ResourceId, Types.MediaFile>,
  albums : Map.Map<Common.ResourceId, Types.GalleryAlbum>,
  images : Map.Map<Common.ResourceId, Types.GalleryImage>,
  state : { var nextMediaId : Nat },
) {
  // --- Media Files ---
  public shared ({ caller }) func uploadMedia(
    fileName : Text,
    blob : Storage.ExternalBlob,
    mediaType : Types.MediaType,
    category : Text,
    description : ?Text,
  ) : async Types.MediaFile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = state.nextMediaId;
    state.nextMediaId += 1;
    MediaLib.uploadMedia(mediaFiles, id, caller, fileName, blob, mediaType, category, description);
  };

  public shared ({ caller }) func deleteMedia(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete media");
    };
    MediaLib.deleteMedia(mediaFiles, id);
  };

  public query func listMedia() : async [Types.MediaFile] {
    MediaLib.listMedia(mediaFiles);
  };

  public query func listMediaByType(mediaType : Types.MediaType) : async [Types.MediaFile] {
    MediaLib.listMediaByType(mediaFiles, mediaType);
  };

  // --- Gallery ---
  public shared ({ caller }) func createAlbum(
    title : Text,
    description : ?Text,
    category : Text,
    coverImageBlob : ?Storage.ExternalBlob,
  ) : async Types.GalleryAlbum {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = state.nextMediaId;
    state.nextMediaId += 1;
    MediaLib.createAlbum(albums, id, caller, title, description, category, coverImageBlob);
  };

  public shared ({ caller }) func deleteAlbum(albumId : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete albums");
    };
    MediaLib.deleteAlbum(albums, images, albumId);
  };

  public query func listAlbums() : async [Types.GalleryAlbum] {
    MediaLib.listAlbums(albums);
  };

  public shared ({ caller }) func addGalleryImage(
    albumId : Common.ResourceId,
    blob : Storage.ExternalBlob,
    caption : ?Text,
  ) : async Types.GalleryImage {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = state.nextMediaId;
    state.nextMediaId += 1;
    MediaLib.addImage(images, id, caller, albumId, blob, caption);
  };

  public shared ({ caller }) func deleteGalleryImage(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete gallery images");
    };
    MediaLib.deleteImage(images, id);
  };

  public query func listGalleryImages(albumId : Common.ResourceId) : async [Types.GalleryImage] {
    MediaLib.listImagesByAlbum(images, albumId);
  };
};
