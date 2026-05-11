import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/media";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // --- Media Files ---
  public func uploadMedia(
    mediaFiles : Map.Map<Common.ResourceId, Types.MediaFile>,
    id : Common.ResourceId,
    caller : Common.UserId,
    fileName : Text,
    blob : Storage.ExternalBlob,
    mediaType : Types.MediaType,
    category : Text,
    description : ?Text,
  ) : Types.MediaFile {
    let f : Types.MediaFile = {
      id = id;
      fileName = fileName;
      blob = blob;
      mediaType = mediaType;
      category = category;
      uploadedBy = caller;
      uploadedAt = Common.now();
      description = description;
    };
    mediaFiles.add(id, f);
    f;
  };

  public func deleteMedia(
    mediaFiles : Map.Map<Common.ResourceId, Types.MediaFile>,
    id : Common.ResourceId,
  ) : () {
    mediaFiles.remove(id);
  };

  public func listMedia(
    mediaFiles : Map.Map<Common.ResourceId, Types.MediaFile>,
  ) : [Types.MediaFile] {
    mediaFiles.values().toArray();
  };

  public func listMediaByType(
    mediaFiles : Map.Map<Common.ResourceId, Types.MediaFile>,
    mediaType : Types.MediaType,
  ) : [Types.MediaFile] {
    mediaFiles.values().filter(func(f) {
      switch (f.mediaType, mediaType) {
        case (#video, #video) { true };
        case (#audio, #audio) { true };
        case (#pdf, #pdf) { true };
        case (#image, #image) { true };
        case _ { false };
      };
    }).toArray();
  };

  // --- Gallery Albums ---
  public func createAlbum(
    albums : Map.Map<Common.ResourceId, Types.GalleryAlbum>,
    id : Common.ResourceId,
    caller : Common.UserId,
    title : Text,
    description : ?Text,
    category : Text,
    coverImageBlob : ?Storage.ExternalBlob,
  ) : Types.GalleryAlbum {
    let album : Types.GalleryAlbum = {
      id = id;
      title = title;
      description = description;
      category = category;
      coverImageBlob = coverImageBlob;
      createdBy = caller;
      createdAt = Common.now();
    };
    albums.add(id, album);
    album;
  };

  public func deleteAlbum(
    albums : Map.Map<Common.ResourceId, Types.GalleryAlbum>,
    images : Map.Map<Common.ResourceId, Types.GalleryImage>,
    albumId : Common.ResourceId,
  ) : () {
    albums.remove(albumId);
    let toRemove = images.entries().filter(
      func((_, img)) { img.albumId == albumId }
    ).map(
      func((k, _)) { k }
    ).toArray();
    for (k in toRemove.values()) { images.remove(k) };
  };

  public func listAlbums(
    albums : Map.Map<Common.ResourceId, Types.GalleryAlbum>,
  ) : [Types.GalleryAlbum] {
    albums.values().toArray();
  };

  // --- Gallery Images ---
  public func addImage(
    images : Map.Map<Common.ResourceId, Types.GalleryImage>,
    id : Common.ResourceId,
    caller : Common.UserId,
    albumId : Common.ResourceId,
    blob : Storage.ExternalBlob,
    caption : ?Text,
  ) : Types.GalleryImage {
    let img : Types.GalleryImage = {
      id = id;
      albumId = albumId;
      blob = blob;
      caption = caption;
      uploadedBy = caller;
      uploadedAt = Common.now();
    };
    images.add(id, img);
    img;
  };

  public func deleteImage(
    images : Map.Map<Common.ResourceId, Types.GalleryImage>,
    id : Common.ResourceId,
  ) : () {
    images.remove(id);
  };

  public func listImagesByAlbum(
    images : Map.Map<Common.ResourceId, Types.GalleryImage>,
    albumId : Common.ResourceId,
  ) : [Types.GalleryImage] {
    images.values().filter(func(img) { img.albumId == albumId }).toArray();
  };
};
