import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAnalytics,
  useDonations,
  useEvents,
  useUsers,
} from "@/hooks/useQueries";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Activity,
  CalendarDays,
  DollarSign,
  Eye,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function AdminOverview() {
  const { data: analytics, isLoading } = useAnalytics();
  const { data: events } = useEvents();
  const { data: users } = useUsers();
  const { data: donations } = useDonations();

  const statCards = analytics
    ? [
        {
          icon: Users,
          label: "Total Members",
          value: analytics.totalMembers.toString(),
          sub: `${analytics.totalUsers} registered users`,
          color: "text-primary",
          bg: "bg-primary/10",
        },
        {
          icon: CalendarDays,
          label: "Events",
          value: analytics.totalEvents.toString(),
          sub: "All time events",
          color: "text-secondary",
          bg: "bg-secondary/10",
        },
        {
          icon: DollarSign,
          label: "Total Raised",
          value: formatCurrency(analytics.totalDonationAmountCents),
          sub: `${analytics.totalDonations} donations`,
          color: "text-accent",
          bg: "bg-accent/10",
        },
        {
          icon: Eye,
          label: "Page Views",
          value: analytics.totalPageViews.toString(),
          sub: "All time views",
          color: "text-muted-foreground",
          bg: "bg-muted",
        },
      ]
    : [];

  // Build recent events chart data from real events (last 6)
  const eventChartData = events
    ? events
        .slice(0, 8)
        .reverse()
        .map((e) => ({
          name: e.title.slice(0, 12),
          rsvps: 0,
        }))
    : [];

  // Build donation chart from real donations
  const donationChartData = donations
    ? donations
        .slice(0, 8)
        .reverse()
        .map((d) => ({
          name: formatDate(d.createdAt, { month: "short", day: "numeric" }),
          amount: Number(d.amountCents) / 100,
        }))
    : [];

  const recentUsers = users ? users.slice(0, 5) : [];
  const recentEvents = events ? events.slice(0, 5) : [];

  return (
    <div className="space-y-8" data-ocid="admin.overview">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={["sk-stat-a", "sk-stat-b", "sk-stat-c", "sk-stat-d"][i]}
                className="bg-card border-border"
              >
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))
          : statCards.map((s, i) => (
              <Card
                key={s.label}
                className="bg-card border-border"
                data-ocid={`admin.overview.stat.${i + 1}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${s.bg}`}>
                      <s.icon className={`h-5 w-5 ${s.color}`} />
                    </div>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className={`text-2xl font-display font-bold ${s.color}`}>
                    {s.value}
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          className="bg-card border-border"
          data-ocid="admin.overview.donations_chart"
        >
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-accent" />
              Recent Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {donationChartData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                No donation data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={donationChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                    formatter={(v: number) => [`$${v.toFixed(2)}`, "Amount"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card
          className="bg-card border-border"
          data-ocid="admin.overview.events_chart"
        >
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eventChartData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                No events yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={eventChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Bar
                    dataKey="rsvps"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          className="bg-card border-border"
          data-ocid="admin.overview.recent_users"
        >
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Recent Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No members yet</p>
            ) : (
              recentUsers.map((u) => (
                <div
                  key={u.id.toString()}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {u.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {u.email}
                    </p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium capitalize ml-2 shrink-0">
                    {u.role}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card
          className="bg-card border-border"
          data-ocid="admin.overview.recent_events"
        >
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-secondary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events yet</p>
            ) : (
              recentEvents.map((e) => (
                <div
                  key={e.id.toString()}
                  className="flex items-start gap-3 py-2 border-b border-border last:border-0"
                >
                  <div className="shrink-0 bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded-md text-center">
                    {formatDate(e.startDate, {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {e.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {e.location}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
