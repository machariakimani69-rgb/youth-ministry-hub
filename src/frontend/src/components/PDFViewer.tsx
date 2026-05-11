import { Button } from "@/components/ui/button";
import {
  Download,
  ExternalLink,
  FileText,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState } from "react";

interface PDFViewerProps {
  src: string;
  title?: string;
  className?: string;
}

export function PDFViewer({ src, title, className = "" }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);

  const increaseZoom = () => setZoom((z) => Math.min(z + 25, 200));
  const decreaseZoom = () => setZoom((z) => Math.max(z - 25, 50));

  return (
    <div
      className={`flex flex-col rounded-lg border border-border overflow-hidden bg-card ${className}`}
      data-ocid="pdf_viewer"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-muted/40 border-b border-border">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
          {title && (
            <span className="text-sm font-medium text-foreground truncate">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={decreaseZoom}
            aria-label="Zoom out"
            data-ocid="pdf_viewer.zoom_out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs text-muted-foreground w-12 text-center">
            {zoom}%
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={increaseZoom}
            aria-label="Zoom in"
            data-ocid="pdf_viewer.zoom_in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <a
            href={src}
            download
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Download PDF"
            data-ocid="pdf_viewer.download_button"
          >
            <Download className="h-3.5 w-3.5" />
          </a>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Open in new tab"
            data-ocid="pdf_viewer.open_button"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      {/* Iframe viewer */}
      <div className="flex-1 overflow-hidden" style={{ minHeight: "500px" }}>
        <iframe
          src={`${src}#zoom=${zoom}`}
          title={title ?? "PDF Document"}
          className="w-full h-full border-0"
          style={{ minHeight: "500px" }}
        />
      </div>
    </div>
  );
}
