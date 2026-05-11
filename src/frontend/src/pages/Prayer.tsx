import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { usePrayerRequests, useSubmitPrayerRequest } from "@/hooks/useQueries";
import { formatDateShort } from "@/lib/utils";
import type { PrayerRequest } from "@/types";
import { PrayerPrivacy, PrayerStatus } from "@/types";
import {
  CheckCircle2,
  Heart,
  Lock,
  ShieldCheck,
  Sparkles,
  UserX,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PrayerFormData {
  name: string;
  content: string;
  privacy: PrayerPrivacy;
  anonymous: boolean;
}

const PRIVACY_OPTIONS = [
  {
    value: PrayerPrivacy.public_,
    label: "Public",
    desc: "Visible to everyone",
    icon: Heart,
  },
  {
    value: PrayerPrivacy.membersOnly,
    label: "Members Only",
    desc: "Visible to registered members",
    icon: ShieldCheck,
  },
  {
    value: PrayerPrivacy.private_,
    label: "Private",
    desc: "Only visible to leaders",
    icon: Lock,
  },
];

function PrayerSkeleton() {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-5 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-1/4" />
      </CardContent>
    </Card>
  );
}

function PrayerCard({ prayer }: { prayer: PrayerRequest }) {
  const isAnswered = prayer.status === PrayerStatus.answered;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={`border-border bg-card hover:shadow-subtle transition-smooth ${
          isAnswered ? "border-l-4 border-l-secondary" : ""
        }`}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              {isAnswered ? (
                <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
              ) : (
                <Heart className="h-4 w-4 text-primary flex-shrink-0" />
              )}
              <span className="font-display font-semibold text-foreground text-sm">
                {prayer.submitterName}
              </span>
            </div>
            <span className="text-xs text-muted-foreground font-body flex-shrink-0">
              {formatDateShort(prayer.createdAt)}
            </span>
          </div>
          <p className="text-sm text-foreground/80 font-body leading-relaxed">
            {prayer.content}
          </p>
          {isAnswered && (
            <Badge variant="secondary" className="mt-3 text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Answered
            </Badge>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Prayer() {
  const { data: requests = [], isLoading } = usePrayerRequests();
  const submitMutation = useSubmitPrayerRequest();
  const [submitted, setSubmitted] = useState(false);

  const activeRequests = requests.filter(
    (r) =>
      r.status === PrayerStatus.active && r.privacy === PrayerPrivacy.public_,
  );
  const answeredRequests = requests.filter(
    (r) =>
      r.status === PrayerStatus.answered && r.privacy === PrayerPrivacy.public_,
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PrayerFormData>({
    defaultValues: {
      name: "",
      content: "",
      privacy: PrayerPrivacy.public_,
      anonymous: false,
    },
  });

  const isAnonymous = watch("anonymous");
  const selectedPrivacy = watch("privacy");

  const onSubmit = async (data: PrayerFormData) => {
    try {
      const name = data.anonymous ? "Anonymous" : data.name;
      await submitMutation.mutateAsync({
        name,
        content: data.content,
        privacy: data.privacy,
      });
      setSubmitted(true);
      reset();
      toast.success("Prayer request submitted", {
        description: "We're lifting your request up in prayer.",
      });
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      toast.error("Failed to submit prayer request", {
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen" data-ocid="prayer.page">
      {/* Hero */}
      <section className="bg-card border-b border-border py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 font-display text-xs uppercase tracking-widest"
            >
              Prayer Wall
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Prayer Requests
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl">
              Share your heart with us. We pray together as a community, lifting
              one another in faith.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Submit Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-border bg-card sticky top-6">
                  <CardHeader>
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-secondary" />
                      Submit a Prayer Request
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center py-8"
                          data-ocid="prayer.success_state"
                        >
                          <CheckCircle2 className="mx-auto h-12 w-12 text-secondary mb-3" />
                          <p className="font-display font-semibold text-foreground mb-1">
                            Prayer Received
                          </p>
                          <p className="text-sm text-muted-foreground font-body">
                            We're lifting your request up in faith.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-5"
                          data-ocid="prayer.form"
                        >
                          {/* Anonymous toggle */}
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                            <input
                              type="checkbox"
                              id="prayer-anonymous"
                              checked={isAnonymous}
                              onChange={() =>
                                setValue("anonymous", !isAnonymous)
                              }
                              className="h-5 w-5 rounded border-input accent-primary cursor-pointer"
                              data-ocid="prayer.anonymous.checkbox"
                            />
                            <label
                              htmlFor="prayer-anonymous"
                              className="cursor-pointer"
                            >
                              <p className="text-sm font-display font-medium text-foreground flex items-center gap-1">
                                <UserX className="h-3.5 w-3.5" /> Submit
                                Anonymously
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Your name won't be shown publicly
                              </p>
                            </label>
                          </div>

                          {/* Name */}
                          {!isAnonymous && (
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="prayer-name"
                                className="font-display text-sm"
                              >
                                Your Name
                              </Label>
                              <Input
                                id="prayer-name"
                                placeholder="Enter your name"
                                {...register("name", {
                                  required: !isAnonymous
                                    ? "Name is required"
                                    : false,
                                })}
                                data-ocid="prayer.name.input"
                              />
                              {errors.name && (
                                <p
                                  className="text-xs text-destructive"
                                  data-ocid="prayer.name.field_error"
                                >
                                  {errors.name.message}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Request text */}
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="prayer-content"
                              className="font-display text-sm"
                            >
                              Prayer Request
                            </Label>
                            <Textarea
                              id="prayer-content"
                              placeholder="Share your prayer request here…"
                              rows={5}
                              className="resize-none"
                              {...register("content", {
                                required: "Please share your request.",
                                minLength: {
                                  value: 10,
                                  message: "Please provide more detail.",
                                },
                              })}
                              data-ocid="prayer.content.textarea"
                            />
                            {errors.content && (
                              <p
                                className="text-xs text-destructive"
                                data-ocid="prayer.content.field_error"
                              >
                                {errors.content.message}
                              </p>
                            )}
                          </div>

                          {/* Privacy */}
                          <div className="space-y-2">
                            <Label className="font-display text-sm">
                              Privacy
                            </Label>
                            <RadioGroup
                              value={selectedPrivacy as string}
                              onValueChange={(v) =>
                                setValue("privacy", v as PrayerPrivacy)
                              }
                              className="space-y-2"
                              data-ocid="prayer.privacy.radio"
                            >
                              {PRIVACY_OPTIONS.map((opt) => {
                                const Icon = opt.icon;
                                return (
                                  <label
                                    key={opt.label}
                                    htmlFor={`privacy-${opt.label}`}
                                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth ${
                                      selectedPrivacy === opt.value
                                        ? "border-primary bg-primary/5"
                                        : "border-border bg-background hover:border-primary/40"
                                    }`}
                                  >
                                    <RadioGroupItem
                                      id={`privacy-${opt.label}`}
                                      value={opt.value as string}
                                      className="sr-only"
                                    />
                                    <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <div>
                                      <p className="text-sm font-display font-medium text-foreground">
                                        {opt.label}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {opt.desc}
                                      </p>
                                    </div>
                                  </label>
                                );
                              })}
                            </RadioGroup>
                          </div>

                          <Button
                            type="submit"
                            className="w-full font-display"
                            disabled={isSubmitting}
                            data-ocid="prayer.submit_button"
                          >
                            {isSubmitting
                              ? "Submitting…"
                              : "Submit Prayer Request"}
                          </Button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Prayer Lists */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Tabs defaultValue="active" data-ocid="prayer.tabs">
                  <TabsList className="w-full grid grid-cols-2 mb-6">
                    <TabsTrigger value="active" data-ocid="prayer.active.tab">
                      Active Requests
                      {activeRequests.length > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {activeRequests.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="answered"
                      data-ocid="prayer.answered.tab"
                    >
                      Answered Prayers
                      {answeredRequests.length > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {answeredRequests.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="active">
                    {isLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((n) => (
                          <PrayerSkeleton key={n} />
                        ))}
                      </div>
                    ) : activeRequests.length === 0 ? (
                      <div
                        className="text-center py-16"
                        data-ocid="prayer.active.empty_state"
                      >
                        <Heart className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                          No Active Requests
                        </h3>
                        <p className="text-muted-foreground font-body text-sm max-w-xs mx-auto">
                          Be the first to share a prayer request with our
                          community.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {activeRequests.map((req) => (
                          <PrayerCard key={req.id.toString()} prayer={req} />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="answered">
                    {isLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((n) => (
                          <PrayerSkeleton key={n} />
                        ))}
                      </div>
                    ) : answeredRequests.length === 0 ? (
                      <div
                        className="text-center py-16"
                        data-ocid="prayer.answered.empty_state"
                      >
                        <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                          Answered Prayers Coming
                        </h3>
                        <p className="text-muted-foreground font-body text-sm max-w-xs mx-auto">
                          This section celebrates prayers that God has answered.
                          Stay faithful!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {answeredRequests.map((req) => (
                          <PrayerCard key={req.id.toString()} prayer={req} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
