import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle, Clock, LogIn, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

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

const steps = [
  { number: 1, label: "Sign In" },
  { number: 2, label: "Register" },
  { number: 3, label: "Approved" },
];

export default function Register() {
  const { isAuthenticated, login, isLoggingIn } = useAuth();
  const register = useRegisterUser();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStep = !isAuthenticated ? 1 : submitted ? 3 : 2;

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

  return (
    <div className="flex flex-col" data-ocid="register.page">
      {/* Hero Banner */}
      <section className="bg-card border-b border-border py-14">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/20 mb-5">
              <UserPlus className="h-4 w-4" />
              Member Registration
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join Youth Ministry Hub
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              Become part of a community built on faith, friendship, and
              purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-muted/30 border-b border-border py-6">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-center gap-0">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center font-semibold text-sm transition-smooth ${
                      currentStep > step.number
                        ? "bg-primary text-primary-foreground"
                        : currentStep === step.number
                          ? "bg-primary/20 text-primary border-2 border-primary"
                          : "bg-muted text-muted-foreground border-2 border-border"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-xs ${currentStep >= step.number ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-16 sm:w-24 mb-5 transition-smooth ${
                      currentStep > step.number ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-lg">
          {/* Step 1: Not logged in */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border bg-card">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <LogIn className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-3">
                    Sign In First
                  </h2>
                  <p className="text-muted-foreground font-body mb-6 text-sm">
                    You need to authenticate with Internet Identity before
                    registering as a member.
                  </p>
                  <Button
                    type="button"
                    onClick={login}
                    disabled={isLoggingIn}
                    size="lg"
                    className="bg-primary text-primary-foreground font-semibold gap-2 w-full"
                    data-ocid="register.login_button"
                  >
                    <LogIn className="h-4 w-4" />
                    {isLoggingIn
                      ? "Connecting…"
                      : "Sign In with Internet Identity"}
                  </Button>
                  <a
                    href="/"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="register.back_link"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Registration form */}
          {isAuthenticated && !submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                      Your Details
                    </h2>
                    <p className="text-muted-foreground text-sm font-body">
                      Fill in your information to complete membership
                      registration.
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    data-ocid="register.form"
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="r-name">Full Name</Label>
                      <Input
                        id="r-name"
                        placeholder="e.g. Amara Osei"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
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
                      <Label htmlFor="r-email">Email Address</Label>
                      <Input
                        id="r-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
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
                      <Label htmlFor="r-phone">
                        Phone{" "}
                        <span className="text-muted-foreground text-xs">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="r-phone"
                        type="tel"
                        placeholder="+254 700 000 000"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        data-ocid="register.phone_input"
                      />
                    </div>

                    <div className="bg-muted/40 rounded-lg p-4 space-y-3 text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground">
                        Community Commitment
                      </p>
                      <ul className="space-y-1.5 list-disc list-inside">
                        <li>Respect all members and leaders</li>
                        <li>
                          Participate in community activities with an open heart
                        </li>
                        <li>
                          Keep shared content encouraging and faith-centered
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="r-terms"
                        checked={form.terms}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, terms: e.target.checked }))
                        }
                        className="mt-0.5 h-4 w-4 accent-primary"
                        data-ocid="register.terms_checkbox"
                      />
                      <Label
                        htmlFor="r-terms"
                        className="text-sm text-muted-foreground leading-snug cursor-pointer"
                      >
                        I agree to the community guidelines and terms of
                        membership.
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
                      {register.isPending
                        ? "Submitting…"
                        : "Complete Registration"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Pending approval */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-border bg-card">
                <CardContent
                  className="p-10 text-center"
                  data-ocid="register.success_state"
                >
                  <div className="mx-auto h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
                    <Clock className="h-10 w-10 text-secondary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                    You're Registered!
                  </h2>
                  <p className="text-muted-foreground font-body mb-4">
                    Your registration has been received. An admin will review
                    and approve your account within{" "}
                    <span className="text-foreground font-semibold">
                      1–2 business days
                    </span>
                    .
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    Once approved, you'll have full access to member features,
                    events, and the community.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="/profile">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-1.5"
                        data-ocid="register.view_profile_button"
                      >
                        <UserPlus className="h-4 w-4" /> View My Profile
                      </Button>
                    </a>
                    <a href="/">
                      <Button
                        type="button"
                        className="bg-primary text-primary-foreground gap-1.5"
                        data-ocid="register.go_home_button"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
