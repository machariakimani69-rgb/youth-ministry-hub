import { ExternalBlob, createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMedia } from "@/hooks/useQueries";
import { MediaType } from "@/types";
import type { MediaFile } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  FileAudio,
  FileText,
  FileVideo,
  ImageIcon,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const TYPE_ICON: Record<MediaType, React.ElementType> = {
  [MediaType.image]: ImageIcon,
  [MediaType.video]: FileVideo,
  [MediaType.audio]: FileAudio,
  [MediaType.pdf]: FileText,
};

const TYPE_LABELS: Record<MediaType, string> = {
  [MediaType.image]: "Image",
  [MediaType.video]: "Video",
  [MediaType.audio]: "Audio",
  [MediaType.pdf]: "PDF",
};

export function AdminMedia() {
  const { data: media, isLoading } = useMedia();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<"all" | MediaType>("all");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = (media ?? []).filter(
    (m) => filter === "all" || m.mediaType === filter,
  );

  function detectMediaType(file: File): MediaType {
    if (file.type.startsWith("image/")) return MediaType.image;
    if (file.type.startsWith("video/")) return MediaType.video;
    if (file.type.startsWith("audio/")) return MediaType.audio;
    if (file.type === "application/pdf") return MediaType.pdf;
    return MediaType.image;
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !actor) return;
    setBusy(true);
    setUploadProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const blob = ExternalBlob.fromBytes(
        new Uint8Array(arrayBuffer),
      ).withUploadProgress((pct) => setUploadProgress(pct));
      const mediaType = detectMediaType(file);
      await actor.uploadMedia(file.name, blob, mediaType, "general", null);
      qc.invalidateQueries({ queryKey: ["media"] });
      toast.success(`${file.name} uploaded.`);
    } catch {
      toast.error("Upload failed.");
    } finally {
      setBusy(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(m: MediaFile) {
    if (!actor || !confirm(`Delete "${m.fileName}"?`)) return;
    try {
      await actor.deleteMedia(m.id);
      qc.invalidateQueries({ queryKey: ["media"] });
      toast.success("File deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  }

  return (
    <div className="space-y-6" data-ocid="admin.media">
      {/* Upload area */}
      <div
        className="border-2 border-dashed border-border rounded-xl p-8 text-center"
        data-ocid="admin.media.dropzone"
      >
        <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-3">
          Upload images, videos, audio, or PDFs
        </p>
        {uploadProgress !== null && (
          <div
            className="w-full max-w-xs mx-auto mb-3"
            data-ocid="admin.media.loading_state"
          >
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {uploadProgress}%
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*,.pdf"
          onChange={handleUpload}
          className="hidden"
          id="media-upload"
        />
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => fileInputRef.current?.click()}
          data-ocid="admin.media.upload_button"
        >
          <Upload className="h-4 w-4 mr-2" />
          {busy ? `Uploading ${uploadProgress ?? 0}%…` : "Choose File"}
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(["all", ...Object.values(MediaType)] as Array<"all" | MediaType>).map(
          (t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-ocid={`admin.media.filter.${t}`}
            >
              {t === "all" ? "All" : TYPE_LABELS[t]}
            </button>
          ),
        )}
      </div>

      {/* Media grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
        data-ocid="admin.media.list"
      >
        {isLoading
          ? [
              "sk-m-1",
              "sk-m-2",
              "sk-m-3",
              "sk-m-4",
              "sk-m-5",
              "sk-m-6",
              "sk-m-7",
              "sk-m-8",
              "sk-m-9",
              "sk-m-10",
            ].map((k) => (
              <Skeleton key={k} className="aspect-square rounded-xl" />
            ))
          : filtered.map((m, i) => {
              const Icon = TYPE_ICON[m.mediaType] ?? ImageIcon;
              const url = m.blob.getDirectURL();
              return (
                <Card
                  key={m.id.toString()}
                  className="bg-card border-border overflow-hidden group"
                  data-ocid={`admin.media.item.${i + 1}`}
                >
                  <div className="aspect-square relative bg-muted">
                    {m.mediaType === MediaType.image ? (
                      <img
                        src={url}
                        alt={m.fileName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <Icon className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {TYPE_LABELS[m.mediaType]}
                        </span>
                      </div>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(m)}
                      data-ocid={`admin.media.delete_button.${i + 1}`}
                      aria-label="Delete file"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs font-medium text-foreground truncate">
                      {m.fileName}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {m.category}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin.media.empty_state"
        >
          No media files found.
        </div>
      )}
    </div>
  );
}
