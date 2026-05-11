import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useTestimonials } from "@/hooks/useQueries";
import { formatDate } from "@/lib/utils";
import type { Testimonial } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Heart, Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function TestimonialSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((n) => (
        <Card key={n} className="border-border bg-card">
          <CardContent className="p-5 space-y-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/5" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  variant?: "featured" | "standard";
}

function TestimonialCard({
  testimonial,
  index,
  variant = "standard",
}: TestimonialCardProps) {
  const isFeatured = variant === "featured";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={
        isFeatured
          ? `testimonials.featured.item.${index + 1}`
          : `testimonials.item.${index + 1}`
      }
    >
      <Card
        className={`h-full border-border ${
          isFeatured
            ? "bg-gradient-to-br from-primary/5 to-secondary/5 border-secondary/20"
            : "bg-card"
        }`}
      >
        <CardContent className="p-6">
          {isFeatured && (
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="h-4 w-4 fill-secondary text-secondary"
                />
              ))}
            </div>
          )}
          <div className="flex gap-2 mb-4">
            <Quote className="h-5 w-5 text-secondary/60 shrink-0 mt-0.5" />
            <p
              className={`font-body italic leading-relaxed ${
                isFeatured ? "text-foreground" : "text-foreground/80"
              } ${isFeatured ? "" : "line-clamp-5"}`}
            >
              {testimonial.content}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4">
            {testimonial.photoBlob ? (
              <img
                src={testimonial.photoBlob.getDirectURL()}
                alt={testimonial.authorName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-primary text-sm">
                  {testimonial.authorName.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-foreground text-sm truncate">
                {testimonial.authorName}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(testimonial.createdAt)}
              </p>
            </div>
            {isFeatured && (
              <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs shrink-0">
                Featured
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Testimonials() {
  const { data: testimonials = [], isLoading, refetch } = useTestimonials();
  const { actor } = useActor(createActor);
  const [form, setForm] = useState({ authorName: "", content: "" });
  const [submitting, setSubmitting] = useState(false);

  const approved = testimonials.filter((t) => t.isApproved);
  const featured = approved.filter((t) => t.isFeatured);
  const rest = approved.filter((t) => !t.isFeatured);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !form.authorName || !form.content) return;
    setSubmitting(true);
    try {
      await actor.submitTestimonial(form.authorName, form.content, null);
      toast.success("Testimonial submitted! It will appear after review.");
      setForm({ authorName: "", content: "" });
      refetch();
    } catch {
      toast.error("Failed to submit testimonial. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col" data-ocid="testimonials.page">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-card border-b border-border"
        style={{ minHeight: 340 }}
        data-ocid="testimonials.hero_section"
      >
        <img
          src="/assets/generated/testimonials-hero.dim_1600x500.jpg"
          alt="Community celebration"
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
              God's Faithfulness
            </Badge>
            <h1 className="font-display text-5xl font-bold text-foreground mb-3">
              Testimonials
            </h1>
            <p className="text-lg text-muted-foreground font-body max-w-xl">
              Hear how God is moving in the lives of our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonials */}
      {!isLoading && featured.length > 0 && (
        <section
          className="bg-muted/30 py-14 border-b border-border"
          data-ocid="testimonials.featured_section"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Featured Stories
                </h2>
                <p className="text-sm text-muted-foreground">
                  Lives transformed by God's grace
                </p>
              </div>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="testimonials.featured.list"
            >
              {featured.map((t, i) => (
                <TestimonialCard
                  key={t.id.toString()}
                  testimonial={t}
                  index={i}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Testimonials list */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Community Stories
              </h2>
              {isLoading ? (
                <TestimonialSkeleton />
              ) : rest.length === 0 && featured.length === 0 ? (
                <div
                  className="text-center py-16 rounded-2xl border border-dashed border-border"
                  data-ocid="testimonials.empty_state"
                >
                  <Star className="mx-auto h-14 w-14 text-muted-foreground opacity-30 mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Be the First to Share!
                  </h3>
                  <p className="text-muted-foreground font-body max-w-xs mx-auto">
                    Your story of God's faithfulness can inspire others. Share
                    your testimony today.
                  </p>
                </div>
              ) : (
                <div className="space-y-4" data-ocid="testimonials.list">
                  {rest.map((t, i) => (
                    <TestimonialCard
                      key={t.id.toString()}
                      testimonial={t}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit form */}
            <div className="lg:col-span-1">
              <div
                className="rounded-2xl border border-border bg-card p-6 sticky top-24 shadow-elevated"
                data-ocid="testimonials.form"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-secondary" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Share Your Story
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground font-body mb-5">
                  Has God moved in your life? Your testimony can encourage
                  others in their faith journey.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="test-name">Your Name</Label>
                    <Input
                      id="test-name"
                      placeholder="Jane Doe"
                      value={form.authorName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, authorName: e.target.value }))
                      }
                      required
                      data-ocid="testimonials.name_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="test-content">Your Testimony</Label>
                    <Textarea
                      id="test-content"
                      placeholder="Share how God has moved in your life…"
                      value={form.content}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, content: e.target.value }))
                      }
                      required
                      rows={6}
                      data-ocid="testimonials.content_input"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground"
                    disabled={submitting || !actor}
                    data-ocid="testimonials.submit_button"
                  >
                    {submitting ? "Submitting…" : "Share Testimony"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Your testimony will be reviewed before publishing.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
