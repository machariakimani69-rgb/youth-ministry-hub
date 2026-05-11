import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, X, B as Button } from "./index-CPIOcdtY.js";
import { C as ChevronRight } from "./chevron-right-D4bO022t.js";
import { i as useAlbums, j as useGalleryImages, B as Badge } from "./useQueries-DxEGoYB2.js";
import { C as Card, a as CardContent } from "./card-BUuSK7y6.js";
import { I as Input } from "./input-BWJvKHaA.js";
import { S as Skeleton } from "./skeleton-Dj2ezB5s.js";
import { m as motion } from "./proxy-IG4MCDiP.js";
import { A as AnimatePresence } from "./index-BGjtlR7s.js";
import { S as Search } from "./search-BTXcRDVE.js";
import { I as Image } from "./image-CXAemMFY.js";
import { A as ArrowLeft } from "./arrow-left-D7aIU0jW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
function ImageLightbox({
  images,
  initialIndex = 0,
  open,
  onClose
}) {
  const [current, setCurrent] = reactExports.useState(initialIndex);
  reactExports.useEffect(() => {
    if (open) setCurrent(initialIndex);
  }, [open, initialIndex]);
  const prev = reactExports.useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = reactExports.useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );
  reactExports.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, prev, next]);
  if (!open || images.length === 0) return null;
  const img = images[current];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 m-0 h-full w-full max-w-none border-0 bg-foreground/80 backdrop-blur-sm animate-fade-in p-0 flex items-center justify-center",
      onClick: onClose,
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      "aria-label": "Image viewer",
      "data-ocid": "image_lightbox.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative max-w-5xl w-full mx-4 flex flex-col items-center gap-4",
          onClick: (e) => e.stopPropagation(),
          onKeyDown: (e) => e.stopPropagation(),
          role: "presentation",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Close lightbox",
                className: "absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground hover:bg-card transition-colors",
                "data-ocid": "image_lightbox.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full flex items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: img.src,
                  alt: img.alt ?? "Gallery image",
                  className: "max-h-[75vh] max-w-full object-contain rounded-lg shadow-elevated animate-fade-in"
                }
              ),
              images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: prev,
                    "aria-label": "Previous image",
                    className: "absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground hover:bg-card transition-colors",
                    "data-ocid": "image_lightbox.prev_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: next,
                    "aria-label": "Next image",
                    className: "absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground hover:bg-card transition-colors",
                    "data-ocid": "image_lightbox.next_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
                  }
                )
              ] })
            ] }),
            (img.caption || images.length > 1) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              img.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 font-body", children: img.caption }),
              images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-foreground/50 font-mono", children: [
                current + 1,
                " / ",
                images.length
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function GalleryThumbnail({
  src,
  alt,
  onClick,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `group relative overflow-hidden rounded-lg border border-border transition-lift hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring ${className}`,
      "aria-label": alt ?? "View image",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: alt ?? "", className: "w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-fade flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-6 w-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-fade" }) })
      ]
    }
  );
}
function AlbumSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
  ] });
}
function ImageSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-lg" });
}
const CATEGORIES = [
  "All",
  "Worship",
  "Retreat",
  "Community",
  "Service",
  "Youth"
];
function Gallery() {
  const { data: albums = [], isLoading } = useAlbums();
  const [selectedAlbum, setSelectedAlbum] = reactExports.useState(null);
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(0);
  const [lightboxOpen, setLightboxOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const { data: images = [], isLoading: imagesLoading } = useGalleryImages(
    (selectedAlbum == null ? void 0 : selectedAlbum.id) ?? 0n
  );
  const lightboxImages = images.map((img) => ({
    src: img.blob.getDirectURL(),
    alt: img.caption ?? "Gallery image",
    caption: img.caption ?? void 0
  }));
  const filteredAlbums = reactExports.useMemo(() => {
    return albums.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || a.category.toLowerCase() === activeCategory.toLowerCase();
      return matchSearch && matchCat;
    });
  }, [albums, search, activeCategory]);
  const uniqueCategories = reactExports.useMemo(() => {
    const cats = new Set(albums.map((a) => a.category));
    return ["All", ...Array.from(cats)];
  }, [albums]);
  const displayCategories = uniqueCategories.length > 2 ? uniqueCategories : CATEGORIES;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", "data-ocid": "gallery.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "mb-4 font-display text-xs uppercase tracking-widest",
              children: "Community Moments"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-3", children: selectedAlbum ? selectedAlbum.title : "Gallery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg max-w-xl", children: selectedAlbum ? selectedAlbum.description ?? "Photos from this album." : "Memories from our community events, worship nights, and more." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background flex-1 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !selectedAlbum ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search albums…",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-10 bg-card border-input",
                  "data-ocid": "gallery.search_input"
                }
              ),
              search && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSearch(""),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Clear search",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: displayCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveCategory(cat),
                className: `px-3 py-1.5 rounded-full text-sm font-display font-medium transition-smooth border ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`,
                "data-ocid": `gallery.category.${cat.toLowerCase()}`,
                children: cat
              },
              cat
            )) })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlbumSkeleton, {}, n)) }) : filteredAlbums.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "text-center py-20",
              "data-ocid": "gallery.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/40 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-10 w-10 text-muted-foreground opacity-40" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: search ? "No albums match your search" : "No Albums Yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: search ? "Try a different keyword or category." : "Photos from our events will appear here." }),
                search && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "mt-4",
                    onClick: () => {
                      setSearch("");
                      setActiveCategory("All");
                    },
                    children: "Clear Filters"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
              "data-ocid": "gallery.album.list",
              children: filteredAlbums.map((album, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  onClick: () => setSelectedAlbum(album),
                  className: "text-left w-full",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: i * 0.07, duration: 0.4 },
                  "data-ocid": `gallery.album.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card overflow-hidden transition-lift hover:-translate-y-1 hover:shadow-elevated cursor-pointer group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video bg-muted/40 flex items-center justify-center overflow-hidden relative", children: [
                      album.coverImageBlob ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: album.coverImageBlob.getDirectURL(),
                          alt: album.title,
                          className: "w-full h-full object-cover transition-smooth group-hover:scale-105"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-12 w-12 text-muted-foreground opacity-30" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-fade" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "absolute top-3 left-3 text-xs capitalize opacity-90",
                          children: album.category
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground group-hover:text-primary transition-colors", children: album.title }),
                      album.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2 font-body", children: album.description })
                    ] })
                  ] })
                },
                album.id.toString()
              ))
            }
          )
        ]
      },
      "album-grid"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.3 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedAlbum(null),
              className: "flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-8 group",
              "data-ocid": "gallery.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 transition-transform group-hover:-translate-x-1" }),
                "Back to Albums"
              ]
            }
          ),
          imagesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(ImageSkeleton, {}, n)) }) : images.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-16",
              "data-ocid": "gallery.images.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "No images in this album yet." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
              "data-ocid": "gallery.images.list",
              children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.92 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: i * 0.04, duration: 0.35 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GalleryThumbnail,
                    {
                      src: img.blob.getDirectURL(),
                      alt: img.caption ?? void 0,
                      onClick: () => {
                        setLightboxIndex(i);
                        setLightboxOpen(true);
                      },
                      className: "aspect-square"
                    }
                  )
                },
                img.id.toString()
              ))
            }
          )
        ]
      },
      "image-grid"
    ) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImageLightbox,
      {
        images: lightboxImages,
        initialIndex: lightboxIndex,
        open: lightboxOpen,
        onClose: () => setLightboxOpen(false)
      }
    )
  ] });
}
export {
  Gallery as default
};
