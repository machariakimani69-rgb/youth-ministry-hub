import { Slider } from "@/components/ui/slider";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

interface MediaPlayerProps {
  src: string;
  type: "video" | "audio";
  title?: string;
  poster?: string;
  className?: string;
}

export function MediaPlayer({
  src,
  type,
  title,
  poster,
  className = "",
}: MediaPlayerProps) {
  const mediaRef = useRef<HTMLVideoElement & HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    if (!mediaRef.current) return;
    if (playing) {
      mediaRef.current.pause();
    } else {
      mediaRef.current.play();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (!mediaRef.current) return;
    setProgress(
      (mediaRef.current.currentTime / mediaRef.current.duration) * 100,
    );
  };

  const onLoadedMetadata = () => {
    if (!mediaRef.current) return;
    setDuration(mediaRef.current.duration);
  };

  const handleSeek = (value: number[]) => {
    if (!mediaRef.current || !duration) return;
    mediaRef.current.currentTime = (value[0] / 100) * duration;
    setProgress(value[0]);
  };

  const toggleMute = () => {
    if (!mediaRef.current) return;
    mediaRef.current.muted = !muted;
    setMuted(!muted);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`rounded-lg overflow-hidden bg-card border border-border ${className}`}
      data-ocid="media_player"
    >
      {type === "video" ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={src}
          poster={poster}
          className="w-full aspect-video object-cover"
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => setPlaying(false)}
        >
          <track kind="captions" />
        </video>
      ) : (
        <audio
          ref={mediaRef as React.RefObject<HTMLAudioElement>}
          src={src}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => setPlaying(false)}
        >
          <track kind="captions" />
        </audio>
      )}
      {type === "audio" && (
        <div className="flex items-center justify-center bg-muted/40 aspect-[3/1] px-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <Volume2 className="h-10 w-10 text-primary opacity-60" />
            {title && (
              <p className="font-display text-sm font-semibold text-foreground truncate max-w-xs">
                {title}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center gap-3 px-4 py-3 bg-card">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
          data-ocid="media_player.play_button"
        >
          {playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </button>
        <span className="text-xs text-muted-foreground font-mono w-10 text-right">
          {formatTime((progress / 100) * duration)}
        </span>
        <Slider
          value={[progress]}
          min={0}
          max={100}
          step={0.1}
          onValueChange={handleSeek}
          className="flex-1"
          aria-label="Seek"
        />
        <span className="text-xs text-muted-foreground font-mono w-10">
          {formatTime(duration)}
        </span>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="media_player.mute_button"
        >
          {muted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>
        {type === "video" && (
          <button
            type="button"
            onClick={() =>
              (mediaRef.current as HTMLVideoElement)?.requestFullscreen?.()
            }
            aria-label="Fullscreen"
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="media_player.fullscreen_button"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
