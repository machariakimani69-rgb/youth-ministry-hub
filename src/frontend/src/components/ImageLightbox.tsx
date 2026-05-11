import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface LightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  open,
  onClose,
}: ImageLightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    if (open) setCurrent(initialIndex);
  }, [open, initialIndex]);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, prev, next]);

  if (!open || images.length === 0) return null;

  const img = images[current];

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 h-full w-full max-w-none border-0 bg-foreground/80 backdrop-blur-sm animate-fade-in p-0 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      aria-label="Image viewer"
      data-ocid="image_lightbox.dialog"
    >
      <div
        className="relative max-w-5xl w-full mx-4 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="presentation"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground hover:bg-card transition-colors"
          data-ocid="image_lightbox.close_button"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="relative w-full flex items-center justify-center">
          <img
            src={img.src}
            alt={img.alt ?? "Gallery image"}
            className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-elevated animate-fade-in"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground hover:bg-card transition-colors"
                data-ocid="image_lightbox.prev_button"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground hover:bg-card transition-colors"
                data-ocid="image_lightbox.next_button"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Caption + counter */}
        {(img.caption || images.length > 1) && (
          <div className="flex items-center gap-4">
            {img.caption && (
              <p className="text-sm text-foreground/80 font-body">
                {img.caption}
              </p>
            )}
            {images.length > 1 && (
              <span className="text-xs text-foreground/50 font-mono">
                {current + 1} / {images.length}
              </span>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}

interface GalleryThumbnailProps {
  src: string;
  alt?: string;
  onClick: () => void;
  className?: string;
}

export function GalleryThumbnail({
  src,
  alt,
  onClick,
  className = "",
}: GalleryThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg border border-border transition-lift hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring ${className}`}
      aria-label={alt ?? "View image"}
    >
      <img src={src} alt={alt ?? ""} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-fade flex items-center justify-center">
        <ZoomIn className="h-6 w-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-fade" />
      </div>
    </button>
  );
}
