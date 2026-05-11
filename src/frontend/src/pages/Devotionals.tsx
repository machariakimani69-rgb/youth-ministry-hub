import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDevotionals } from "@/hooks/useQueries";
import { formatDate } from "@/lib/utils";
import type { Devotional } from "@/types";
import { BookOpen, ChevronRight, Quote, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function DevotionalSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((n) => (
        <Card key={n} className="border-border bg-card">
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/5" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface DevotionalDetailProps {
  devotional: Devotional;
  onBack: () => void;
}

function DevotionalDetail({ devotional, onBack }: DevotionalDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 max-w-3xl py-12"
      data-ocid="devotionals.detail"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-display font-medium"
        data-ocid="devotionals.back_button"
      >
        ← Back to Devotionals
      </button>

      <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-elevated">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Sun className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {formatDate(devotional.date)}
            </p>
            <h1 className="font-display font-bold text-foreground text-xl">
              {devotional.title}
            </h1>
          </div>
        </div>

        <blockquote className="border-l-4 border-secondary/60 pl-6 mb-8">
          <div className="flex gap-2 mb-2">
            <Quote className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <p className="font-display font-semibold text-foreground text-lg leading-snug">
              {devotional.scripture}
            </p>
          </div>
          <p className="text-xs text-muted-foreground pl-7">
            Scripture Reference
          </p>
        </blockquote>

        <div className="space-y-4">
          {devotional.reflection.split("\n").map((para, i) =>
            para.trim() ? (
              <p
                key={`ref-${i + 1}`}
                className="font-body text-foreground/85 leading-relaxed"
              >
                {para}
              </p>
            ) : null,
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
          <p className="text-xs text-muted-foreground">Share this devotional</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBack}
            data-ocid="devotionals.close_detail_button"
          >
            Back to List
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Devotionals() {
  const { data: devotionals = [], isLoading } = useDevotionals();
  const [selected, setSelected] = useState<Devotional | null>(null);

  const sorted = [...devotionals].sort((a, b) => Number(b.date - a.date));
  const todayDevotional = sorted[0] ?? null;
  const pastDevotionals = sorted.slice(1);

  if (selected) {
    return (
      <div className="bg-background min-h-screen" data-ocid="devotionals.page">
        <DevotionalDetail
          devotional={selected}
          onBack={() => setSelected(null)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col" data-ocid="devotionals.page">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-card border-b border-border"
        style={{ minHeight: 340 }}
        data-ocid="devotionals.hero_section"
      >
        <img
          src="/assets/generated/devotionals-hero.dim_1600x500.jpg"
          alt="Morning devotional"
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
              Daily Word
            </Badge>
            <h1 className="font-display text-5xl font-bold text-foreground mb-3">
              Daily Devotionals
            </h1>
            <p className="text-lg text-muted-foreground font-body max-w-xl">
              Start each day with Scripture, reflection, and prayer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Today's Featured Devotional */}
      {!isLoading && todayDevotional && (
        <section
          className="bg-gradient-to-br from-secondary/10 via-background to-primary/10 py-14 border-b border-border"
          data-ocid="devotionals.featured_section"
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Sun className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-display font-semibold text-secondary uppercase tracking-widest">
                  Today
                </p>
                <p className="text-sm text-muted-foreground">{TODAY}</p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-card rounded-2xl border border-border shadow-elevated p-8"
            >
              <blockquote className="border-l-4 border-secondary/60 pl-6 mb-6">
                <div className="flex gap-2">
                  <Quote className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <p className="font-display font-bold text-foreground text-xl leading-snug">
                    {todayDevotional.scripture}
                  </p>
                </div>
              </blockquote>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                {todayDevotional.title}
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed line-clamp-4 mb-6">
                {todayDevotional.reflection}
              </p>
              <Button
                type="button"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => setSelected(todayDevotional)}
                data-ocid="devotionals.read_today_button"
              >
                Read Full Devotional <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Past Devotionals */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {pastDevotionals.length > 0 && (
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Past Devotionals
            </h2>
          )}

          {isLoading ? (
            <DevotionalSkeleton />
          ) : sorted.length === 0 ? (
            <div
              className="text-center py-20 rounded-2xl border border-dashed border-border"
              data-ocid="devotionals.empty_state"
            >
              <BookOpen className="mx-auto h-14 w-14 text-muted-foreground opacity-30 mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                New Devotionals Coming Soon
              </h3>
              <p className="text-muted-foreground font-body">
                Daily devotionals will be added regularly. Check back tomorrow!
              </p>
            </div>
          ) : (
            <div className="space-y-4" data-ocid="devotionals.list">
              {pastDevotionals.map((d, i) => (
                <motion.div
                  key={d.id.toString()}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  data-ocid={`devotionals.item.${i + 1}`}
                >
                  <Card className="border-border bg-card transition-smooth hover:shadow-md cursor-pointer group">
                    <button
                      type="button"
                      className="w-full text-left"
                      onClick={() => setSelected(d)}
                      aria-label={`Read devotional: ${d.title}`}
                    >
                      <CardContent className="p-5">
                        <div className="flex gap-4 items-start">
                          <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <BookOpen className="h-5 w-5 text-secondary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                  {d.title}
                                </h3>
                                <p className="text-xs font-body text-secondary mt-0.5 truncate">
                                  {d.scripture}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground shrink-0">
                                {formatDate(d.date)}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2 leading-relaxed">
                              {d.reflection}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
                        </div>
                      </CardContent>
                    </button>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
