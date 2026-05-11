import { PageLoader } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useAuth";
import { AdminContent } from "@/pages/admin/AdminContent";
import { AdminDonations } from "@/pages/admin/AdminDonations";
import { AdminEvents } from "@/pages/admin/AdminEvents";
import { AdminMedia } from "@/pages/admin/AdminMedia";
import { AdminMessages } from "@/pages/admin/AdminMessages";
import { AdminOverview } from "@/pages/admin/AdminOverview";
import { AdminSettings } from "@/pages/admin/AdminSettings";
import { AdminUsers } from "@/pages/admin/AdminUsers";
import {
  BookOpen,
  Calendar,
  DollarSign,
  Home,
  Image,
  LayoutDashboard,
  LogIn,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

type TabId =
  | "overview"
  | "users"
  | "events"
  | "content"
  | "media"
  | "donations"
  | "messages"
  | "settings";

const NAV_ITEMS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "events", label: "Events", icon: Calendar },
  { id: "content", label: "Content", icon: BookOpen },
  { id: "media", label: "Media", icon: Image },
  { id: "donations", label: "Donations", icon: DollarSign },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Admin() {
  const { isAuthenticated, login, isInitializing } = useAuth();
  const { role, isAdmin, isLeader, actorReady } = useUserRole();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Loading state
  if (isInitializing || (isAuthenticated && !actorReady)) {
    return <PageLoader />;
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div
        className="flex min-h-[80vh] items-center justify-center bg-background"
        data-ocid="admin.login_required"
      >
        <div className="text-center max-w-sm px-4 space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Admin Access Required
          </h2>
          <p className="text-muted-foreground font-body">
            Sign in with your account to access the administration dashboard.
          </p>
          <Button onClick={login} size="lg" data-ocid="admin.login_button">
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  // Insufficient role
  if (!isAdmin && !isLeader) {
    return (
      <div
        className="flex min-h-[80vh] items-center justify-center bg-background"
        data-ocid="admin.access_denied"
      >
        <div className="text-center max-w-sm px-4 space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-destructive/10">
              <Shield className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Access Denied
          </h2>
          <p className="text-muted-foreground font-body">
            You don&apos;t have permission to view the admin dashboard. Please
            contact an administrator if you believe this is a mistake.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
            data-ocid="admin.home_link"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]" data-ocid="admin.page">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        data-ocid="admin.sidebar"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-border h-16">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-foreground">
              Admin Panel
            </span>
          </div>
          <button
            type="button"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-4 py-3 border-b border-border">
          <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
            <Shield className="h-3 w-3 mr-1" />
            {roleLabel}
          </Badge>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
                data-ocid={`admin.nav.${item.id}_tab`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : ""}`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-border">
          <a
            href="/"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            Back to Website
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="lg:hidden h-9 w-9 p-0"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              data-ocid="admin.sidebar_toggle"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-display font-bold text-foreground">
              {NAV_ITEMS.find((n) => n.id === activeTab)?.label ?? "Dashboard"}
            </h1>
          </div>
          <Badge className="bg-secondary/10 text-secondary border-secondary/20 hidden sm:flex">
            Christ Youth Ministry
          </Badge>
        </header>

        {/* Tab content */}
        <main className="flex-1 p-4 lg:p-6 bg-background overflow-y-auto">
          {activeTab === "overview" && <AdminOverview />}
          {activeTab === "users" && <AdminUsers />}
          {activeTab === "events" && <AdminEvents />}
          {activeTab === "content" && <AdminContent />}
          {activeTab === "media" && <AdminMedia />}
          {activeTab === "donations" && <AdminDonations />}
          {activeTab === "messages" && <AdminMessages />}
          {activeTab === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
