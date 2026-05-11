import { MediaPlayer } from "@/components/MediaPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSermons } from "@/hooks/useQueries";
import { formatDate } from "@/lib/utils";
import type { Sermon } from "@/types";
import {
  BookOpen,
  Download,
  Headphones,
  Play,
  Search,
  Video,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

function SermonSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Card key={n} className="border-border bg-card">
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface SermonCardProps {
  sermon: Sermon;
  index: number;
  onSelect: (s: Sermon) => void;
  isSelected: boolean;
}

function SermonCard({ sermon, index, onSelect, isSelected }: SermonCardProps) {
  const hasMedia = !!(sermon.videoBlob || sermon.audioBlob);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.08 }}
      data-ocid={`sermons.item.${index + 1}`}
    >
      <Card
        className={`border-bg-card h-full transition-lift hover:-translate-y-1 hover:shadow-elevated cursor-pointer ${
          isSelected ? "ring-2 ring-primary border-primary/30" : "border-border"
        }`}
        onClick={() => onSelect(sermon)}
      >
        <CardContent className="p-6">
          {sermon.thumbnailBlob ? (
            <img
              src={sermon.thumbnailBlob.getDirectURL()}
              alt={sermon.title}
              className="w-full h-36 object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full h-36 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
              <Play className="h-10 w-10 text-primary/50" />
            </div>
          )}
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-xs shrink-0">
              {sermon.scriptureReference}
            </Badge>
            <div className="flex gap-1">
              {sermon.videoBlob && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary border border-primary/20 rounded px-1.5 py-0.5">
                  <Video className="h-3 w-3" /> Video
                </span>
              )}
              {sermon.audioBlob && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-secondary/10 text-secondary border border-secondary/20 rounded px-1.5 py-0.5">
                  <Headphones className="h-3 w-3" /> Audio
                </span>
              )}
            </div>
          </div>
          <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-2 leading-snug">
            {sermon.title}
          </h3>
          <p className="text-sm text-secondary font-body font-medium mb-1">
            {sermon.speaker}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {formatDate(sermon.date)}
          </p>
          <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-4">
            {sermon.description}
          </p>
          <div className="flex gap-2">
            {hasMedia && (
              <Button
                type="button"
                size="sm"
                className="flex-1 bg-primary text-primary-foreground text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(sermon);
                }}
                data-ocid={`sermons.play_button.${index + 1}`}
              >
                <Play className="h-3.5 w-3.5 mr-1" /> Play
              </Button>
            )}
            {(sermon.audioBlob ?? sermon.videoBlob) && (
              <a
                href={
                  (sermon.videoBlob ?? sermon.audioBlob)?.getDirectURL() ?? ""
                }
                download
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-smooth shrink-0"
                aria-label="Download"
                data-ocid={`sermons.download_button.${index + 1}`}
              >
                <Download className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Sermons() {
  const { data: sermons = [], isLoading } = useSermons();
  const [search, setSearch] = useState("");
  const [speakerFilter, setSpeakerFilter] = useState("");
  const [selected, setSelected] = useState<Sermon | null>(null);

  const published = sermons.filter((s) => s.isPublished);
  const featured = published[0] ?? null;

  const speakers = useMemo(
    () => Array.from(new Set(published.map((s) => s.speaker))).sort(),
    [published],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return published.filter((s) => {
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.speaker.toLowerCase().includes(q) ||
        s.scriptureReference.toLowerCase().includes(q);
      const matchesSpeaker = !speakerFilter || s.speaker === speakerFilter;
      return matchesSearch && matchesSpeaker;
    });
  }, [published, search, speakerFilter]);

  return (
    <div className="flex flex-col" data-ocid="sermons.page">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-card border-b border-border"
        style={{ minHeight: 360 }}
        data-ocid="sermons.hero_section"
      >
        <img
          src="/assets/generated/sermons-hero.dim_1600x500.jpg"
          alt="Sermon stage"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card/70 via-card/50 to-card" />
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-3 bg-secondary/20 text-secondary border-secondary/30 px-4 py-1">
              Messages
            </Badge>
            <h1 className="font-display text-5xl font-bold text-foreground mb-3">
              Sermons
            </h1>
            <p className="text-lg text-muted-foreground font-body max-w-xl">
              Inspiring messages to grow your faith and deepen your walk with
              God.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured sermon */}
      {!isLoading && featured && (
        <section
          className="bg-muted/30 py-12 border-b border-border"
          data-ocid="sermons.featured_section"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-xs font-display font-semibold text-secondary uppercase tracking-widest mb-5">
              Featured Message
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <Badge variant="outline" className="mb-3 text-xs">
                  {featured.scriptureReference}
                </Badge>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-secondary font-body font-medium mb-1">
                  {featured.speaker}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {formatDate(featured.date)}
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {featured.description}
                </p>
              </div>
              <div>
                {featured.videoBlob ? (
                  <MediaPlayer
                    src={featured.videoBlob.getDirectURL()}
                    type="video"
                    title={featured.title}
                    poster={featured.thumbnailBlob?.getDirectURL()}
                  />
                ) : featured.audioBlob ? (
                  <MediaPlayer
                    src={featured.audioBlob.getDirectURL()}
                    type="audio"
                    title={featured.title}
                  />
                ) : (
                  <div className="rounded-lg border border-border bg-card aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="mx-auto h-10 w-10 text-muted-foreground opacity-40 mb-2" />
                      <p className="text-sm text-muted-foreground font-body">
                        Media coming soon
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Player overlay for selected */}
      {selected && selected.id !== featured?.id && (
        <section className="bg-muted/20 border-b border-border py-8">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-foreground">
                  {selected.title}
                </h3>
                <p className="text-sm text-secondary">{selected.speaker}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close player"
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
                data-ocid="sermons.close_player_button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {selected.videoBlob ? (
              <MediaPlayer
                src={selected.videoBlob.getDirectURL()}
                type="video"
                title={selected.title}
                poster={selected.thumbnailBlob?.getDirectURL()}
              />
            ) : selected.audioBlob ? (
              <MediaPlayer
                src={selected.audioBlob.getDirectURL()}
                type="audio"
                title={selected.title}
              />
            ) : null}
          </div>
        </section>
      )}

      {/* Search & Filter + List */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sermons, speaker, scripture…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="sermons.search_input"
              />
            </div>
            <select
              value={speakerFilter}
              onChange={(e) => setSpeakerFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring min-w-[160px]"
              data-ocid="sermons.speaker_filter"
              aria-label="Filter by speaker"
            >
              <option value="">All Speakers</option>
              {speakers.map((sp) => (
                <option key={sp} value={sp}>
                  {sp}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <SermonSkeleton />
          ) : filtered.length === 0 ? (
            <div className="text-center py-20" data-ocid="sermons.empty_state">
              <Play className="mx-auto h-14 w-14 text-muted-foreground opacity-30 mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {search || speakerFilter
                  ? "No Sermons Found"
                  : "No Sermons Yet"}
              </h3>
              <p className="text-muted-foreground font-body">
                {search || speakerFilter
                  ? "Try a different search or filter."
                  : "Check back soon for new messages!"}
              </p>
              {(search || speakerFilter) && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearch("");
                    setSpeakerFilter("");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="sermons.list"
            >
              {filtered.map((s, i) => (
                <SermonCard
                  key={s.id.toString()}
                  sermon={s}
                  index={i}
                  onSelect={setSelected}
                  isSelected={selected?.id === s.id}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
