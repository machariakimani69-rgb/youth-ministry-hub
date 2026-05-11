import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useDonations, useTotalDonations } from "@/hooks/useQueries";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  Heart,
  Lock,
  RefreshCw,
  Share2,
  Shield,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PRESET_AMOUNTS = [500n, 1000n, 2500n, 5000n, 10000n] as const;

const CATEGORIES = [
  {
    value: "general",
    label: "General Fund",
    description: "Supports all ministry operations",
  },
  {
    value: "youth",
    label: "Youth Programs",
    description: "Camps, retreats & weekly programs",
  },
  {
    value: "missions",
    label: "Missions",
    description: "Local & global outreach",
  },
  {
    value: "building",
    label: "Building Fund",
    description: "Facility maintenance & expansion",
  },
] as const;

const IMPACT_STATS = [
  { label: "Youth Programs", percent: 70, color: "bg-primary" },
  { label: "Missions", percent: 20, color: "bg-secondary" },
  { label: "Operations", percent: 10, color: "bg-accent" },
];

type DonationCategory = "general" | "youth" | "missions" | "building";
type DonationFrequency = "one-time" | "monthly";

interface DonationForm {
  name: string;
  email: string;
  message: string;
  anonymous: boolean;
  category: DonationCategory;
  customAmount: string;
}

function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <Lock className="h-3.5 w-3.5 text-primary" />
        SSL Encrypted
      </span>
      <span className="flex items-center gap-1.5">
        <Shield className="h-3.5 w-3.5 text-primary" />
        Powered by Stripe
      </span>
      <span className="flex items-center gap-1.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
        Tax-Deductible
      </span>
    </div>
  );
}

function ImpactSection() {
  return (
    <Card className="bg-card border-border" data-ocid="donate.impact_card">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-display font-bold text-foreground text-lg">
          How Donations Are Used
        </h3>
        <div className="space-y-3">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-foreground font-medium">
                  {stat.label}
                </span>
                <span className="text-muted-foreground">{stat.percent}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${stat.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Your donation may be tax-deductible. Consult a tax advisor for
          details.
        </p>
      </CardContent>
    </Card>
  );
}

function RecentDonationsFeed() {
  const { data: donations, isLoading } = useDonations();
  const recent = (donations ?? []).slice(0, 5);

  return (
    <Card className="bg-card border-border" data-ocid="donate.recent_feed">
      <CardContent className="p-6 space-y-3">
        <h3 className="font-display font-bold text-foreground text-lg">
          Recent Supporters
        </h3>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-10 w-full" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div
            className="text-center py-4"
            data-ocid="donate.recent_feed.empty_state"
          >
            <Heart className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Be the first to give!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((d, i) => (
              <div
                key={d.id.toString()}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
                data-ocid={`donate.recent_feed.item.${i + 1}`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {d.donorName || "Anonymous"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(d.createdAt)}
                  </p>
                </div>
                <Badge variant="secondary" className="ml-3 shrink-0">
                  {formatCurrency(d.amountCents)}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SuccessState({ amount }: { amount: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex min-h-[70vh] items-center justify-center px-4"
      data-ocid="donate.success_state"
    >
      <div className="text-center max-w-md w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </motion.div>
        <h2 className="font-display text-3xl font-bold text-foreground mb-2">
          Thank You!
        </h2>
        <p className="text-muted-foreground font-body mb-1">
          Your gift{amount ? ` of ${amount}` : ""} has been received.
        </p>
        <p className="text-sm text-muted-foreground mb-8 font-body italic">
          “Give, and it will be given to you.” — Luke 6:38
        </p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: Heart, label: "Pray", desc: "Lift up the ministry" },
            { icon: Share2, label: "Share", desc: "Invite others to give" },
            {
              icon: CheckCircle2,
              label: "Connect",
              desc: "Join a small group",
            },
          ].map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="rounded-lg bg-card border border-border p-3 text-center"
            >
              <Icon className="mx-auto h-5 w-5 text-primary mb-1" />
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          A receipt has been sent to your email. Your donation may be
          tax-deductible.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            window.location.href = "/donate";
          }}
          data-ocid="donate.success_give_again_button"
        >
          Give Again
        </Button>
      </div>
    </motion.div>
  );
}

function CancelledState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-[70vh] items-center justify-center px-4"
      data-ocid="donate.error_state"
    >
      <div className="text-center max-w-md w-full">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Donation Cancelled
        </h2>
        <p className="text-muted-foreground font-body mb-6">
          No charges were made. Your generosity means a lot — whenever you’re
          ready.
        </p>
        <Button
          type="button"
          onClick={onRetry}
          className="gap-2"
          data-ocid="donate.retry_button"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </motion.div>
  );
}

export default function Donate() {
  const { actor } = useActor(createActor);
  const { data: totalCents, isLoading: totalLoading } = useTotalDonations();

  const search = useSearch({ strict: false }) as Record<string, string>;
  const isSuccess = search.success === "1";
  const isCancelled = search.cancelled === "1";
  const successAmount = decodeURIComponent(search.amount ?? "");

  const [selectedAmount, setSelectedAmount] = useState<bigint>(2500n);
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonationForm>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      anonymous: false,
      category: "general",
      customAmount: "",
    },
  });

  const customAmount = watch("customAmount");
  const anonymous = watch("anonymous");
  const category = watch("category");

  const effectiveAmount = customAmount
    ? BigInt(Math.max(1, Math.round(Number.parseFloat(customAmount) * 100)))
    : selectedAmount;

  const onSubmit = async (data: DonationForm) => {
    if (!actor) {
      toast.error("Please wait while we connect.");
      return;
    }
    setSubmitting(true);
    try {
      const msgParts: string[] = [];
      if (data.message) msgParts.push(data.message);
      const catLabel = CATEGORIES.find((c) => c.value === data.category)?.label;
      if (data.category !== "general" && catLabel)
        msgParts.push(`Category: ${catLabel}`);
      if (frequency === "monthly") msgParts.push("Recurring: Monthly");

      const url = await actor.createDonationCheckout(
        anonymous ? "Anonymous" : data.name,
        data.email,
        effectiveAmount,
        "USD",
        msgParts.length > 0 ? msgParts.join(" | ") : null,
        `${window.location.origin}/donate?success=1&amount=${encodeURIComponent(formatCurrency(effectiveAmount))}`,
        `${window.location.origin}/donate?cancelled=1`,
      );
      window.location.href = url;
    } catch {
      toast.error("Unable to start checkout. Please try again.");
      setSubmitting(false);
    }
  };

  if (isSuccess) return <SuccessState amount={successAmount} />;
  if (isCancelled)
    return (
      <CancelledState
        onRetry={() => {
          window.location.href = "/donate";
        }}
      />
    );

  return (
    <div className="flex flex-col" data-ocid="donate.page">
      {/* Hero */}
      <section className="relative bg-card border-b border-border overflow-hidden py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(var(--primary)) 0%, transparent 60%), radial-gradient(circle at 70% 50%, oklch(var(--secondary)) 0%, transparent 60%)",
          }}
        />
        <div className="relative container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20">
              <Heart className="h-7 w-7 text-secondary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Support Our Ministry
            </h1>
            <p className="font-body italic text-muted-foreground text-lg mb-2 leading-relaxed">
              “Each of you should give what you have decided in your heart to
              give, not reluctantly or under compulsion, for God loves a
              cheerful giver.”
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              — 2 Corinthians 9:7
            </p>
            <div className="inline-flex flex-col items-center gap-1 rounded-xl bg-primary/10 border border-primary/20 px-6 py-3">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                Total Raised
              </span>
              {totalLoading ? (
                <Skeleton className="h-8 w-28" />
              ) : (
                <span
                  className="font-display text-2xl font-bold text-foreground"
                  data-ocid="donate.total_raised"
                >
                  {formatCurrency(totalCents ?? 0n)}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-card border-border shadow-elevated">
                  <CardContent className="p-6 md:p-8">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                      data-ocid="donate.form"
                    >
                      {/* Frequency */}
                      <div className="space-y-2">
                        <Label className="font-display font-semibold text-base">
                          Giving Frequency
                        </Label>
                        <Tabs
                          value={frequency}
                          onValueChange={(v) =>
                            setFrequency(v as DonationFrequency)
                          }
                        >
                          <TabsList
                            className="w-full"
                            data-ocid="donate.frequency_tab"
                          >
                            <TabsTrigger
                              value="one-time"
                              className="flex-1"
                              data-ocid="donate.one_time_tab"
                            >
                              One-time
                            </TabsTrigger>
                            <TabsTrigger
                              value="monthly"
                              className="flex-1"
                              data-ocid="donate.monthly_tab"
                            >
                              Monthly
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>

                      {/* Amount */}
                      <div className="space-y-3">
                        <Label className="font-display font-semibold text-base">
                          Select Amount
                        </Label>
                        <div className="grid grid-cols-5 gap-2">
                          {PRESET_AMOUNTS.map((a) => {
                            const isActive =
                              selectedAmount === a && !customAmount;
                            return (
                              <Button
                                key={a.toString()}
                                type="button"
                                variant={isActive ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  setSelectedAmount(a);
                                  setValue("customAmount", "");
                                }}
                                className="text-xs px-1 transition-smooth"
                                data-ocid={`donate.amount_button.${a}`}
                              >
                                {formatCurrency(a)}
                              </Button>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground shrink-0">
                            Custom $
                          </span>
                          <Input
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="Other amount"
                            className="flex-1"
                            {...register("customAmount", {
                              validate: (v) =>
                                !v ||
                                (Number.parseFloat(v) >= 1 &&
                                  Number.isFinite(Number.parseFloat(v))) ||
                                "Enter a valid amount ($1 minimum)",
                            })}
                            data-ocid="donate.custom_amount_input"
                          />
                        </div>
                        {errors.customAmount && (
                          <p
                            className="text-xs text-destructive"
                            data-ocid="donate.amount.field_error"
                          >
                            {errors.customAmount.message}
                          </p>
                        )}
                        {effectiveAmount > 0n && (
                          <div className="text-sm font-semibold text-primary">
                            Giving: {formatCurrency(effectiveAmount)}
                            {frequency === "monthly" ? "/mo" : ""}
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Category */}
                      <div className="space-y-3">
                        <Label className="font-display font-semibold text-base">
                          Giving Category
                        </Label>
                        <RadioGroup
                          value={category}
                          onValueChange={(v) =>
                            setValue("category", v as DonationCategory)
                          }
                          className="space-y-2"
                          data-ocid="donate.category_radio"
                        >
                          {CATEGORIES.map((cat) => (
                            <div
                              key={cat.value}
                              className={`flex items-start gap-3 rounded-lg border p-3 transition-smooth cursor-pointer ${
                                category === cat.value
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/40"
                              }`}
                              data-ocid={`donate.category.${cat.value}`}
                            >
                              <RadioGroupItem
                                value={cat.value}
                                id={`cat-${cat.value}`}
                                className="mt-0.5"
                              />
                              <Label
                                htmlFor={`cat-${cat.value}`}
                                className="cursor-pointer flex-1"
                              >
                                <span className="font-semibold text-foreground block">
                                  {cat.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {cat.description}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <Separator />

                      {/* Donor info */}
                      <div className="space-y-4">
                        <Label className="font-display font-semibold text-base">
                          Your Information
                        </Label>
                        <div className="space-y-1.5">
                          <Label htmlFor="donate-name">Full Name *</Label>
                          <Input
                            id="donate-name"
                            placeholder="Jane Doe"
                            {...register("name", {
                              required: !anonymous ? "Name is required" : false,
                            })}
                            data-ocid="donate.name_input"
                          />
                          {errors.name && (
                            <p
                              className="text-xs text-destructive"
                              data-ocid="donate.name.field_error"
                            >
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="donate-email">Email Address *</Label>
                          <Input
                            id="donate-email"
                            type="email"
                            placeholder="jane@example.com"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: "Enter a valid email address",
                              },
                            })}
                            data-ocid="donate.email_input"
                          />
                          {errors.email && (
                            <p
                              className="text-xs text-destructive"
                              data-ocid="donate.email.field_error"
                            >
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="donate-message">
                            Message / Prayer Request (optional)
                          </Label>
                          <Textarea
                            id="donate-message"
                            placeholder="Designate your gift or share a prayer request…"
                            rows={3}
                            {...register("message")}
                            data-ocid="donate.message_input"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="donate-anon"
                            checked={anonymous}
                            onCheckedChange={(checked) =>
                              setValue("anonymous", checked === true)
                            }
                            data-ocid="donate.anonymous_checkbox"
                          />
                          <Label
                            htmlFor="donate-anon"
                            className="cursor-pointer text-sm text-muted-foreground"
                          >
                            Keep my name anonymous in public listings
                          </Label>
                        </div>
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display font-bold text-base gap-2 transition-smooth"
                        disabled={submitting || !actor}
                        data-ocid="donate.submit_button"
                      >
                        <Heart className="h-4 w-4" />
                        {submitting
                          ? "Redirecting to secure checkout…"
                          : `Give ${formatCurrency(effectiveAmount)}${
                              frequency === "monthly" ? "/mo" : ""
                            }`}
                      </Button>

                      <TrustBadges />
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <ImpactSection />
                <RecentDonationsFeed />
                <Card className="bg-muted/30 border-border">
                  <CardContent className="p-4 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground block mb-1">
                        Privacy &amp; Security
                      </span>
                      Your payment is processed securely by Stripe. We never
                      store your card details. Your information is protected and
                      will never be sold.
                    </p>
                    <div className="flex gap-3 text-xs text-primary">
                      <a
                        href="/privacy"
                        className="hover:underline"
                        data-ocid="donate.privacy_policy_link"
                      >
                        Privacy Policy
                      </a>
                      <span className="text-muted-foreground">·</span>
                      <a
                        href="/contact"
                        className="hover:underline"
                        data-ocid="donate.contact_link"
                      >
                        Contact Us
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
