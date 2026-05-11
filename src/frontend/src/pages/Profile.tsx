import { createActor } from "@/backend";
import { PageLoader } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAuth,
  useCallerProfile,
  useSaveProfile,
  useUserRole,
} from "@/hooks/useAuth";
import { useDonations, useEvents, useSubmitRsvp } from "@/hooks/useQueries";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Donation, Event, Rsvp } from "@/types";
import { RegistrationStatus, RsvpStatus, UserRole } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Gift,
  Heart,
  LogIn,
  Moon,
  Save,
  Settings,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Register mutation ─────────────────────────────────────────────
function useRegisterUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
    }: { name: string; email: string; phone: string | null }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.registerUser(name, email, phone);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["callerProfile"] }),
  });
}

// ── Role badge helper ─────────────────────────────────────────────
function RoleBadge({ role }: { role: UserRole }) {
  const config: Record<UserRole, { label: string; className: string }> = {
    [UserRole.admin]: {
      label: "Admin",
      className: "bg-destructive/20 text-destructive border-destructive/40",
    },
    [UserRole.leader]: {
      label: "Leader",
      className: "bg-secondary/20 text-secondary border-secondary/40",
    },
    [UserRole.member]: {
      label: "Member",
      className: "bg-primary/20 text-primary border-primary/40",
    },
    [UserRole.guest]: {
      label: "Guest",
      className: "bg-muted text-muted-foreground border-border",
    },
  };
  const c = config[role] ?? config[UserRole.guest];
  return (
    <Badge
      className={`text-xs font-semibold px-2.5 py-0.5 border ${c.className}`}
    >
      {c.label}
    </Badge>
  );
}

// ── Login Gate ────────────────────────────────────────────────────
function LoginGate({ onLogin }: { onLogin: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[70vh] items-center justify-center px-4"
      data-ocid="profile.login_required"
    >
      <div className="text-center max-w-md">
        <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <User className="h-10 w-10 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          Welcome to Your Member Portal
        </h2>
        <p className="text-muted-foreground font-body mb-8">
          Sign in with Internet Identity to access your profile, track events,
          view donation history, and connect with the community.
        </p>
        <Button
          type="button"
          onClick={onLogin}
          size="lg"
          className="bg-primary text-primary-foreground gap-2 font-semibold"
          data-ocid="profile.login_button"
        >
          <LogIn className="h-4 w-4" />
          Sign In with Internet Identity
        </Button>
      </div>
    </motion.div>
  );
}

// ── Registration Form ─────────────────────────────────────────────
function RegistrationForm() {
  const register = useRegisterUser();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "A valid email is required.";
    if (!form.terms) e.terms = "You must accept the terms to continue.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await register.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
      });
      setSubmitted(true);
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
        data-ocid="profile.pending_state"
      >
        <div className="mx-auto h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
          <Clock className="h-10 w-10 text-secondary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          Registration Submitted!
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-4">
          Your membership request has been received. An admin will review and
          approve your account within{" "}
          <span className="text-foreground font-semibold">
            1–2 business days
          </span>
          .
        </p>
        <p className="text-sm text-muted-foreground">
          Check back soon or contact us if you have questions.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
          Join the Community
        </h2>
        <p className="text-muted-foreground font-body text-sm">
          Complete your registration to become a member.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        data-ocid="register.form"
      >
        <div className="space-y-1.5">
          <Label htmlFor="reg-name">Full Name</Label>
          <Input
            id="reg-name"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            data-ocid="register.name_input"
          />
          {errors.name && (
            <p
              className="text-destructive text-xs"
              data-ocid="register.name_error"
            >
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-email">Email Address</Label>
          <Input
            id="reg-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            data-ocid="register.email_input"
          />
          {errors.email && (
            <p
              className="text-destructive text-xs"
              data-ocid="register.email_error"
            >
              {errors.email}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-phone">
            Phone Number{" "}
            <span className="text-muted-foreground text-xs">(optional)</span>
          </Label>
          <Input
            id="reg-phone"
            type="tel"
            placeholder="+254 700 000 000"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            data-ocid="register.phone_input"
          />
        </div>
        <div className="flex items-start gap-3 pt-1">
          <input
            type="checkbox"
            id="reg-terms"
            checked={form.terms}
            onChange={(e) =>
              setForm((f) => ({ ...f, terms: e.target.checked }))
            }
            className="mt-0.5 h-4 w-4 accent-primary"
            data-ocid="register.terms_checkbox"
          />
          <Label
            htmlFor="reg-terms"
            className="text-sm text-muted-foreground leading-snug cursor-pointer"
          >
            I agree to the community guidelines and terms of membership for
            Anchor Youth Ministry.
          </Label>
        </div>
        {errors.terms && (
          <p
            className="text-destructive text-xs"
            data-ocid="register.terms_error"
          >
            {errors.terms}
          </p>
        )}
        <Button
          type="submit"
          disabled={register.isPending}
          className="w-full bg-primary text-primary-foreground font-semibold"
          data-ocid="register.submit_button"
        >
          {register.isPending ? "Registering…" : "Complete Registration"}
        </Button>
      </form>
    </motion.div>
  );
}

// ── Pending Approval View ─────────────────────────────────────────
function PendingApproval({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-10"
      data-ocid="profile.pending_approval"
    >
      <div className="mx-auto h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
        <Clock className="h-10 w-10 text-secondary" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Pending Approval
      </h2>
      <p className="text-muted-foreground font-body max-w-md mx-auto mb-2">
        Hello, <span className="text-foreground font-semibold">{name}</span>!
        Your account is pending admin approval.
      </p>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        Estimated wait time:{" "}
        <span className="text-foreground">1–2 business days</span>. You'll have
        full access once approved. Contact us if you need help.
      </p>
      <div className="mt-8 inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-5 py-2 text-sm text-secondary">
        <Clock className="h-4 w-4" />
        Awaiting Admin Review
      </div>
    </motion.div>
  );
}

// ── Profile Tab ───────────────────────────────────────────────────
function ProfileTab() {
  const { data: profile } = useCallerProfile();
  const saveProfile = useSaveProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  if (!profile) return null;

  const startEdit = () => {
    setForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
    });
    setEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveProfile.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
      });
      toast.success("Profile saved!");
      setEditing(false);
    } catch {
      toast.error("Failed to save profile.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar + identity */}
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-3xl shrink-0">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold text-foreground truncate">
            {profile.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <RoleBadge role={profile.role} />
            <Badge variant="outline" className="text-xs">
              {profile.registrationStatus}
            </Badge>
          </div>
          <p className="text-muted-foreground text-xs mt-1.5">
            Member since {formatDate(profile.joinedAt)}
          </p>
        </div>
      </div>

      <Separator />

      {editing ? (
        <form
          onSubmit={handleSave}
          className="space-y-4"
          data-ocid="profile.edit_form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="pt-name">Full Name</Label>
              <Input
                id="pt-name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
                data-ocid="profile.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pt-email">Email Address</Label>
              <Input
                id="pt-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
                data-ocid="profile.email_input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pt-phone">
              Phone{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Input
              id="pt-phone"
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              data-ocid="profile.phone_input"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              type="submit"
              disabled={saveProfile.isPending}
              className="bg-primary text-primary-foreground gap-1.5"
              data-ocid="profile.save_button"
            >
              <Save className="h-4 w-4" />
              {saveProfile.isPending ? "Saving…" : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditing(false)}
              data-ocid="profile.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-0.5">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                Email
              </p>
              <p className="text-foreground font-body">{profile.email}</p>
            </div>
            {profile.phone && (
              <div className="space-y-0.5">
                <p className="text-muted-foreground text-xs uppercase tracking-wide">
                  Phone
                </p>
                <p className="text-foreground font-body">{profile.phone}</p>
              </div>
            )}
            <div className="space-y-0.5">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                Role
              </p>
              <p className="text-foreground font-body capitalize">
                {profile.role}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-muted-foreground text-xs uppercase tracking-wide">
                Member Since
              </p>
              <p className="text-foreground font-body">
                {formatDate(profile.joinedAt)}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={startEdit}
            className="gap-1.5"
            data-ocid="profile.edit_button"
          >
            <User className="h-4 w-4" /> Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Events Tab ────────────────────────────────────────────────────
function EventsTab() {
  const { data: events = [], isLoading } = useEvents();
  const submitRsvp = useSubmitRsvp();

  const cancelRsvp = async (eventId: bigint) => {
    try {
      await submitRsvp.mutateAsync({ eventId, status: RsvpStatus.notGoing });
      toast.success("RSVP cancelled.");
    } catch {
      toast.error("Could not cancel RSVP.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="profile.events_loading">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-20 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  const upcomingEvents = events.filter(
    (e: Event) => Number(e.endDate) / 1_000_000 > Date.now(),
  );

  if (!upcomingEvents.length) {
    return (
      <div className="text-center py-10" data-ocid="profile.events_empty_state">
        <Calendar className="mx-auto h-10 w-10 text-muted-foreground opacity-40 mb-3" />
        <p className="text-muted-foreground font-body">
          No upcoming events found.
        </p>
        <a
          href="/events"
          className="text-primary text-sm mt-2 inline-block hover:underline"
        >
          Browse Events →
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-ocid="profile.events_list">
      {upcomingEvents.map((event: Event, idx: number) => (
        <motion.div
          key={event.id.toString()}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.06 }}
          className="flex items-start gap-4 p-4 rounded-lg bg-muted/40 border border-border"
          data-ocid={`profile.event_item.${idx + 1}`}
        >
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-foreground text-sm truncate">
              {event.title}
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">
              {formatDate(event.startDate)} · {event.location}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => cancelRsvp(event.id)}
            className="text-destructive hover:text-destructive shrink-0 gap-1"
            data-ocid={`profile.cancel_rsvp.${idx + 1}`}
          >
            <X className="h-3.5 w-3.5" /> Cancel
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

// ── Donations Tab ─────────────────────────────────────────────────
function DonationsTab() {
  const { data: donations = [], isLoading } = useDonations();

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="profile.donations_loading">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-16 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!donations.length) {
    return (
      <div
        className="text-center py-10"
        data-ocid="profile.donations_empty_state"
      >
        <Gift className="mx-auto h-10 w-10 text-muted-foreground opacity-40 mb-3" />
        <p className="text-muted-foreground font-body">
          No donation history yet.
        </p>
        <a
          href="/donate"
          className="text-primary text-sm mt-2 inline-block hover:underline"
        >
          Make a Donation →
        </a>
      </div>
    );
  }

  const total = donations.reduce(
    (sum: bigint, d: Donation) => sum + d.amountCents,
    0n,
  );

  return (
    <div className="space-y-4" data-ocid="profile.donations_list">
      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10 border border-secondary/30">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-secondary" />
          <span className="text-sm font-semibold text-foreground">
            Total Contributions
          </span>
        </div>
        <span className="font-display text-lg font-bold text-secondary">
          {formatCurrency(total)}
        </span>
      </div>
      <div className="space-y-2">
        {donations.map((d: Donation, idx: number) => (
          <motion.div
            key={d.id.toString()}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="flex items-center gap-4 p-4 rounded-lg bg-muted/40 border border-border"
            data-ocid={`profile.donation_item.${idx + 1}`}
          >
            <div className="h-9 w-9 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <Check className="h-4 w-4 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-sm font-semibold">
                {formatCurrency(d.amountCents, d.currency)}
              </p>
              {d.message && (
                <p className="text-muted-foreground text-xs truncate">
                  {d.message}
                </p>
              )}
            </div>
            <p className="text-muted-foreground text-xs shrink-0">
              {formatDate(d.createdAt)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────────────────
function SettingsTab() {
  const [prefs, setPrefs] = useState({
    eventReminders: true,
    newsletter: true,
    darkMode: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    toast.success("Preference updated.");
  };

  const items = [
    {
      key: "eventReminders" as const,
      icon: Bell,
      label: "Event Reminders",
      description: "Get notified about upcoming events and schedule changes.",
      ocid: "profile.event_reminders_toggle",
    },
    {
      key: "newsletter" as const,
      icon: BookOpen,
      label: "Newsletter",
      description:
        "Receive weekly devotionals, announcements, and community news.",
      ocid: "profile.newsletter_toggle",
    },
    {
      key: "darkMode" as const,
      icon: Moon,
      label: "Dark Mode",
      description: "Use dark theme for a comfortable viewing experience.",
      ocid: "profile.dark_mode_toggle",
    },
  ];

  return (
    <div className="space-y-3" data-ocid="profile.settings_panel">
      {items.map(({ key, icon: Icon, label, description, ocid }) => (
        <div
          key={key}
          className="flex items-center justify-between p-4 rounded-lg bg-muted/40 border border-border"
        >
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">{label}</p>
              <p className="text-muted-foreground text-xs mt-0.5">
                {description}
              </p>
            </div>
          </div>
          <Switch
            checked={prefs[key]}
            onCheckedChange={() => toggle(key)}
            data-ocid={ocid}
          />
        </div>
      ))}
    </div>
  );
}

// ── Main Profile Page ─────────────────────────────────────────────
export default function Profile() {
  const { isAuthenticated, login } = useAuth();
  const { data: profile, isLoading } = useCallerProfile();
  const { role } = useUserRole();

  if (!isAuthenticated) return <LoginGate onLogin={login} />;
  if (isLoading) return <PageLoader />;

  const isNotRegistered = !profile;
  const isPending = profile?.registrationStatus === RegistrationStatus.pending;
  const isApproved =
    profile?.registrationStatus === RegistrationStatus.approved;

  return (
    <div className="flex flex-col" data-ocid="profile.page">
      {/* Hero Header */}
      <section className="bg-card border-b border-border py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-2xl shrink-0">
                {profile ? (
                  profile.name.charAt(0).toUpperCase()
                ) : (
                  <User className="h-7 w-7" />
                )}
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {profile ? profile.name : "Member Portal"}
                </h1>
                {profile && (
                  <div className="flex items-center gap-2 mt-1">
                    <RoleBadge role={role} />
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className="text-muted-foreground text-xs capitalize">
                      {profile.registrationStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {isNotRegistered && (
            <Card className="border-border bg-card max-w-lg mx-auto">
              <CardContent className="p-8">
                <RegistrationForm />
              </CardContent>
            </Card>
          )}

          {isPending && profile && (
            <Card className="border-border bg-card max-w-lg mx-auto">
              <CardContent className="p-8">
                <PendingApproval name={profile.name} />
              </CardContent>
            </Card>
          )}

          {isApproved && profile && (
            <Tabs defaultValue="profile" className="w-full">
              <TabsList
                className="mb-6 bg-muted/50 p-1 rounded-xl gap-1"
                data-ocid="profile.tabs"
              >
                <TabsTrigger
                  value="profile"
                  className="gap-1.5"
                  data-ocid="profile.tab.profile"
                >
                  <User className="h-4 w-4" /> Profile
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="gap-1.5"
                  data-ocid="profile.tab.events"
                >
                  <Calendar className="h-4 w-4" /> My Events
                </TabsTrigger>
                <TabsTrigger
                  value="donations"
                  className="gap-1.5"
                  data-ocid="profile.tab.donations"
                >
                  <Heart className="h-4 w-4" /> Donations
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="gap-1.5"
                  data-ocid="profile.tab.settings"
                >
                  <Settings className="h-4 w-4" /> Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="profile"
                data-ocid="profile.tab_panel.profile"
              >
                <Card className="border-border bg-card">
                  <CardHeader className="pb-0 px-6 pt-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      My Profile
                    </h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ProfileTab />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events" data-ocid="profile.tab_panel.events">
                <Card className="border-border bg-card">
                  <CardHeader className="pb-0 px-6 pt-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      My RSVPs
                    </h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <EventsTab />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="donations"
                data-ocid="profile.tab_panel.donations"
              >
                <Card className="border-border bg-card">
                  <CardHeader className="pb-0 px-6 pt-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Donation History
                    </h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <DonationsTab />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="settings"
                data-ocid="profile.tab_panel.settings"
              >
                <Card className="border-border bg-card">
                  <CardHeader className="pb-0 px-6 pt-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Preferences
                    </h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <SettingsTab />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </div>
  );
}
