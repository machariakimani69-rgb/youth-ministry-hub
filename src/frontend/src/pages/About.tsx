import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeadership } from "@/hooks/useQueries";
import { BookOpen, Heart, Lightbulb, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const MISSION =
  "To empower young people with faith, purpose, and community — raising a generation that loves God, serves others, and impacts the world.";

const VISION =
  "A generation fully alive in Christ — bold in faith, rich in love, and transforming every corner of the earth.";

const VALUES = [
  {
    key: "faith",
    icon: Star,
    title: "Faith",
    desc: "Rooted in Scripture, alive in practice — we build our lives on the unchanging Word of God.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    key: "community",
    icon: Users,
    title: "Community",
    desc: "Belonging without borders or conditions — everyone has a place at the table.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "service",
    icon: Heart,
    title: "Service",
    desc: "Loving our neighbours through action — faith without works is incomplete.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    key: "growth",
    icon: Lightbulb,
    title: "Growth",
    desc: "Lifelong discipleship and spiritual formation — we never stop learning and becoming.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    key: "worship",
    icon: BookOpen,
    title: "Worship",
    desc: "Encountering God in spirit and truth — worship shapes who we are and who we become.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const TIMELINE = [
  { year: "2010", event: "Founded as a small Bible study of 12 young people." },
  { year: "2013", event: "First annual youth summer camp with 80 attendees." },
  {
    year: "2016",
    event: "Launched community service arm — 500+ volunteer hours.",
  },
  { year: "2019", event: "Expanded to include worship band and media team." },
  {
    year: "2022",
    event: "Online ministry launched, reaching youth across 15 countries.",
  },
  {
    year: "2024",
    event: "200+ active members and growing strong in God's grace.",
  },
];

function LeadershipSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Card key={n} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex gap-4 items-start">
              <Skeleton className="h-16 w-16 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function About() {
  const { data: leaders = [], isLoading } = useLeadership();
  const activeLeaders = leaders
    .filter((l) => l.isActive)
    .sort((a, b) => Number(a.displayOrder - b.displayOrder))
    .slice(0, 6);

  return (
    <div className="flex flex-col" data-ocid="about.page">
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden bg-card border-b border-border"
        data-ocid="about.hero_section"
        style={{ minHeight: 420 }}
      >
        <img
          src="/assets/generated/about-hero.dim_1600x600.jpg"
          alt="Youth ministry community"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card/60 via-card/40 to-card/90" />
        <div className="relative container mx-auto px-4 py-20 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30 px-4 py-1">
              Our Story
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              About <span className="text-secondary">Our Ministry</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {MISSION}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/30 py-16" data-ocid="about.mission_section">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl border border-secondary/20 bg-card p-8 shadow-elevated"
            >
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <Star className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Our Mission
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                {MISSION}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-2xl border border-primary/20 bg-card p-8 shadow-elevated"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Our Vision
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                {VISION}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-background py-16" data-ocid="about.values_section">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-3 bg-accent/20 text-accent border-accent/30 px-4 py-1">
              What We Stand For
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`about.values.item.${i + 1}`}
              >
                <Card className="border-border bg-card h-full transition-lift hover:-translate-y-1 hover:shadow-md">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`h-12 w-12 rounded-full ${v.bg} flex items-center justify-center mx-auto mb-4`}
                    >
                      <v.icon className={`h-6 w-6 ${v.color}`} />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      {v.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Church History Timeline */}
      <section className="bg-muted/30 py-16" data-ocid="about.history_section">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-3 bg-secondary/20 text-secondary border-secondary/30 px-4 py-1">
              Our Journey
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Our History
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  data-ocid={`about.timeline.item.${i + 1}`}
                >
                  <div className="relative flex-shrink-0 h-16 w-16 rounded-full bg-secondary flex items-center justify-center shadow-elevated z-10">
                    <span className="font-display font-bold text-xs text-secondary-foreground text-center leading-tight">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1 bg-card border border-border rounded-xl p-4 mt-3">
                    <p className="font-body text-foreground leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section
        className="bg-background py-16"
        data-ocid="about.leadership_section"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30 px-4 py-1">
              Meet the Team
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Our Leadership
            </h2>
            <p className="text-muted-foreground font-body mt-2 max-w-xl mx-auto">
              Dedicated servants who lead by example and shepherd our community
              with love.
            </p>
          </motion.div>

          {isLoading ? (
            <LeadershipSkeleton />
          ) : activeLeaders.length === 0 ? (
            <div
              className="text-center py-16 rounded-2xl border border-dashed border-border"
              data-ocid="about.leadership.empty_state"
            >
              <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Leadership Profiles Coming Soon
              </h3>
              <p className="text-muted-foreground font-body">
                Our team is excited to meet you!
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="about.leadership.list"
            >
              {activeLeaders.map((l, i) => (
                <motion.div
                  key={l.id.toString()}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  data-ocid={`about.leadership.item.${i + 1}`}
                >
                  <Card className="border-border bg-card h-full overflow-hidden transition-lift hover:-translate-y-1 hover:shadow-elevated">
                    <CardContent className="p-0">
                      {l.photoBlob ? (
                        <img
                          src={l.photoBlob.getDirectURL()}
                          alt={l.name}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="font-display font-bold text-5xl text-primary/40">
                            {l.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-display font-bold text-foreground text-lg">
                          {l.name}
                        </h3>
                        <p className="text-sm text-secondary font-body font-medium mb-3">
                          {l.title}
                        </p>
                        <p className="text-sm text-muted-foreground font-body line-clamp-3 leading-relaxed">
                          {l.bio}
                        </p>
                      </div>
                    </CardContent>
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
