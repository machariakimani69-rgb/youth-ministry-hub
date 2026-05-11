import { GalleryThumbnail, ImageLightbox } from "@/components/ImageLightbox";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAlbums, useGalleryImages } from "@/hooks/useQueries";
import type { GalleryAlbum } from "@/types";
import { ArrowLeft, FolderOpen, Image, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

function AlbumSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

function ImageSkeleton() {
  return <Skeleton className="aspect-square w-full rounded-lg" />;
}

const CATEGORIES = [
  "All",
  "Worship",
  "Retreat",
  "Community",
  "Service",
  "Youth",
];

export default function Gallery() {
  const { data: albums = [], isLoading } = useAlbums();
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: images = [], isLoading: imagesLoading } = useGalleryImages(
    selectedAlbum?.id ?? 0n,
  );

  const lightboxImages = images.map((img) => ({
    src: img.blob.getDirectURL(),
    alt: img.caption ?? "Gallery image",
    caption: img.caption ?? undefined,
  }));

  const filteredAlbums = useMemo(() => {
    return albums.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        activeCategory === "All" ||
        a.category.toLowerCase() === activeCategory.toLowerCase();
      return matchSearch && matchCat;
    });
  }, [albums, search, activeCategory]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set(albums.map((a) => a.category));
    return ["All", ...Array.from(cats)];
  }, [albums]);

  const displayCategories =
    uniqueCategories.length > 2 ? uniqueCategories : CATEGORIES;

  return (
    <div className="flex flex-col min-h-screen" data-ocid="gallery.page">
      {/* Hero */}
      <section className="bg-card border-b border-border py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 font-display text-xs uppercase tracking-widest"
            >
              Community Moments
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              {selectedAlbum ? selectedAlbum.title : "Gallery"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl">
              {selectedAlbum
                ? (selectedAlbum.description ?? "Photos from this album.")
                : "Memories from our community events, worship nights, and more."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background flex-1 py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {!selectedAlbum ? (
              <motion.div
                key="album-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search albums…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10 bg-card border-input"
                      data-ocid="gallery.search_input"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {displayCategories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-sm font-display font-medium transition-smooth border ${
                          activeCategory === cat
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                        }`}
                        data-ocid={`gallery.category.${cat.toLowerCase()}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <AlbumSkeleton key={n} />
                    ))}
                  </div>
                ) : filteredAlbums.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                    data-ocid="gallery.empty_state"
                  >
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/40 mb-6">
                      <Image className="h-10 w-10 text-muted-foreground opacity-40" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {search ? "No albums match your search" : "No Albums Yet"}
                    </h3>
                    <p className="text-muted-foreground font-body">
                      {search
                        ? "Try a different keyword or category."
                        : "Photos from our events will appear here."}
                    </p>
                    {search && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearch("");
                          setActiveCategory("All");
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-ocid="gallery.album.list"
                  >
                    {filteredAlbums.map((album, i) => (
                      <motion.button
                        type="button"
                        key={album.id.toString()}
                        onClick={() => setSelectedAlbum(album)}
                        className="text-left w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.4 }}
                        data-ocid={`gallery.album.item.${i + 1}`}
                      >
                        <Card className="border-border bg-card overflow-hidden transition-lift hover:-translate-y-1 hover:shadow-elevated cursor-pointer group">
                          <div className="aspect-video bg-muted/40 flex items-center justify-center overflow-hidden relative">
                            {album.coverImageBlob ? (
                              <img
                                src={album.coverImageBlob.getDirectURL()}
                                alt={album.title}
                                className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                              />
                            ) : (
                              <FolderOpen className="h-12 w-12 text-muted-foreground opacity-30" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-fade" />
                            <Badge
                              variant="secondary"
                              className="absolute top-3 left-3 text-xs capitalize opacity-90"
                            >
                              {album.category}
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                              {album.title}
                            </h3>
                            {album.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2 font-body">
                                {album.description}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="image-grid"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedAlbum(null)}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-8 group"
                  data-ocid="gallery.back_button"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Albums
                </button>

                {imagesLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <ImageSkeleton key={n} />
                    ))}
                  </div>
                ) : images.length === 0 ? (
                  <div
                    className="text-center py-16"
                    data-ocid="gallery.images.empty_state"
                  >
                    <Image className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                    <p className="text-muted-foreground font-body">
                      No images in this album yet.
                    </p>
                  </div>
                ) : (
                  <div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                    data-ocid="gallery.images.list"
                  >
                    {images.map((img, i) => (
                      <motion.div
                        key={img.id.toString()}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.35 }}
                      >
                        <GalleryThumbnail
                          src={img.blob.getDirectURL()}
                          alt={img.caption ?? undefined}
                          onClick={() => {
                            setLightboxIndex(i);
                            setLightboxOpen(true);
                          }}
                          className="aspect-square"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
