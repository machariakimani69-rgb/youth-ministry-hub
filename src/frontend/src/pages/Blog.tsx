import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/hooks/useQueries";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";
import { ArrowLeft, BookOpen, CalendarDays, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Card key={n} className="border-border bg-card overflow-hidden">
          <Skeleton className="h-44 w-full rounded-none" />
          <CardContent className="p-5 space-y-3">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-28 rounded-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface PostCardProps {
  post: BlogPost;
  index: number;
  onSelect: (p: BlogPost) => void;
}

function PostCard({ post, index, onSelect }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.09 }}
      data-ocid={`blog.item.${index + 1}`}
    >
      <Card className="border-border bg-card h-full overflow-hidden transition-lift hover:-translate-y-1 hover:shadow-elevated cursor-pointer group">
        <button
          type="button"
          className="w-full text-left"
          onClick={() => onSelect(post)}
          aria-label={`Read ${post.title}`}
        >
          {post.featuredImageBlob ? (
            <img
              src={post.featuredImageBlob.getDirectURL()}
              alt={post.title}
              className="w-full h-44 object-cover group-hover:scale-105 transition-smooth"
            />
          ) : (
            <div className="w-full h-44 bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-smooth">
              <BookOpen className="h-10 w-10 text-primary/30" />
            </div>
          )}
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(post.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {readingTime(post.content)} min read
              </span>
            </div>
            <h3 className="font-display font-bold text-foreground mb-2 line-clamp-2 leading-snug text-lg group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground font-body line-clamp-3 leading-relaxed mb-4">
              {post.content.slice(0, 200)}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-display font-semibold text-primary hover:underline">
              Read More →
            </span>
          </CardContent>
        </button>
      </Card>
    </motion.div>
  );
}

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

function PostDetail({ post, onBack }: PostDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 max-w-3xl py-12"
      data-ocid="blog.post_detail"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-display font-medium"
        data-ocid="blog.back_button"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </button>

      {post.featuredImageBlob && (
        <img
          src={post.featuredImageBlob.getDirectURL()}
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
        />
      )}

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Badge className="bg-primary/10 text-primary border-primary/20">
          Blog Post
        </Badge>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          {formatDate(post.createdAt)}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {readingTime(post.content)} min read
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          Ministry Team
        </span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        {post.title}
      </h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none font-body leading-relaxed text-foreground/90">
        {post.content.split("\n").map((para, i) =>
          para.trim() ? (
            <p
              key={`para-${i + 1}`}
              className="mb-4 text-muted-foreground leading-relaxed"
            >
              {para}
            </p>
          ) : null,
        )}
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          data-ocid="blog.back_to_list_button"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
        </Button>
      </div>
    </motion.div>
  );
}

export default function Blog() {
  const { data: posts = [], isLoading } = useBlogPosts();
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const published = posts.filter((p) => p.isPublished);
  const featured = published[0] ?? null;
  const rest = published.slice(1);

  if (selected) {
    return (
      <div className="bg-background min-h-screen" data-ocid="blog.page">
        <PostDetail post={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col" data-ocid="blog.page">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-card border-b border-border"
        style={{ minHeight: 340 }}
        data-ocid="blog.hero_section"
      >
        <img
          src="/assets/generated/blog-hero.dim_1600x500.jpg"
          alt="Blog community"
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
              Stories & Reflections
            </Badge>
            <h1 className="font-display text-5xl font-bold text-foreground mb-3">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground font-body max-w-xl">
              Stories, reflections, and insights from our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {!isLoading && featured && (
        <section
          className="bg-muted/30 py-12 border-b border-border"
          data-ocid="blog.featured_section"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-xs font-display font-semibold text-secondary uppercase tracking-widest mb-5">
              Featured Post
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {featured.featuredImageBlob ? (
                <img
                  src={featured.featuredImageBlob.getDirectURL()}
                  alt={featured.title}
                  className="w-full h-56 object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-56 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary/30" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(featured.createdAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {readingTime(featured.content)} min read
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3 leading-tight">
                  {featured.title}
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-5 line-clamp-4">
                  {featured.content.slice(0, 300)}
                </p>
                <Button
                  type="button"
                  onClick={() => setSelected(featured)}
                  className="bg-primary text-primary-foreground"
                  data-ocid="blog.featured_read_more_button"
                >
                  Read Full Post
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <BlogSkeleton />
          ) : published.length === 0 ? (
            <div className="text-center py-20" data-ocid="blog.empty_state">
              <BookOpen className="mx-auto h-14 w-14 text-muted-foreground opacity-30 mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Our First Post is Coming Soon!
              </h3>
              <p className="text-muted-foreground font-body">
                Stay tuned for stories, reflections, and community updates.
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="blog.list"
            >
              {rest.map((p, i) => (
                <PostCard
                  key={p.id.toString()}
                  post={p}
                  index={i}
                  onSelect={setSelected}
                />
              ))}
              {published.length === 1 && (
                <PostCard
                  key={featured!.id.toString()}
                  post={featured!}
                  index={0}
                  onSelect={setSelected}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
