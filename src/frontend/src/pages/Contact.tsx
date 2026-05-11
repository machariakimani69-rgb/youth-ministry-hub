import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useQueries";
import { useSettings } from "@/hooks/useQueries";
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SUBJECTS = [
  "General Inquiry",
  "Event Information",
  "Prayer Request",
  "Volunteering",
  "Membership",
  "Donations",
  "Other",
];

const DEFAULT_PHONE = "+254 700 000 000";
const DEFAULT_EMAIL = "info@anchoryouth.org";
const DEFAULT_ADDRESS = "123 Faith Avenue, Nairobi, Kenya";
const WHATSAPP_NUMBER = "254700000000";

function SocialIcon({
  href,
  label,
  icon: Icon,
  ocid,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  ocid: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-smooth"
      data-ocid={ocid}
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

export default function Contact() {
  const { data: settings } = useSettings();
  const submitContact = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const phone = settings?.contactPhone ?? DEFAULT_PHONE;
  const email = settings?.contactEmail ?? DEFAULT_EMAIL;
  const address = settings?.address ?? DEFAULT_ADDRESS;
  const social = settings?.socialLinks;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Anchor%20Youth!`;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContact.mutateAsync(data);
      setSubmitted(true);
      reset();
      setSelectedSubject("");
      toast.success("Message sent!", {
        description: "We'll get back to you within 24–48 hours.",
      });
    } catch {
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen" data-ocid="contact.page">
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
              Reach Out
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Contact Us
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl">
              We'd love to hear from you. Whether you have a question, need
              prayer, or want to get involved — reach out anytime.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quick Info */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-base">
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 group"
                    data-ocid="contact.phone.link"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-display">
                        Phone
                      </p>
                      <p className="text-sm font-display font-medium text-foreground group-hover:text-primary transition-colors">
                        {phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 group"
                    data-ocid="contact.email.link"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-display">
                        Email
                      </p>
                      <p className="text-sm font-display font-medium text-foreground group-hover:text-primary transition-colors break-all">
                        {email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-display">
                        Address
                      </p>
                      <p className="text-sm font-display font-medium text-foreground">
                        {address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.whatsapp.button"
              >
                <Card className="border-border bg-card hover:shadow-subtle transition-smooth group cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">
                        Chat on WhatsApp
                      </p>
                      <p className="text-xs text-muted-foreground font-body">
                        Quick responses during office hours
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              {/* Map Placeholder */}
              <Card className="border-border bg-card overflow-hidden">
                <div className="h-48 bg-muted/40 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.07%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60" />
                  <div className="text-center relative z-10">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-display text-muted-foreground">
                      {address}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline mt-1 block"
                      data-ocid="contact.map.link"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              {social && (
                <div>
                  <p className="text-xs text-muted-foreground font-display uppercase tracking-widest mb-3">
                    Follow Us
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {social.facebook && (
                      <SocialIcon
                        href={social.facebook}
                        label="Facebook"
                        icon={Facebook}
                        ocid="contact.facebook.link"
                      />
                    )}
                    {social.instagram && (
                      <SocialIcon
                        href={social.instagram}
                        label="Instagram"
                        icon={Instagram}
                        ocid="contact.instagram.link"
                      />
                    )}
                    {social.twitter && (
                      <SocialIcon
                        href={social.twitter}
                        label="Twitter"
                        icon={Twitter}
                        ocid="contact.twitter.link"
                      />
                    )}
                    {social.youtube && (
                      <SocialIcon
                        href={social.youtube}
                        label="YouTube"
                        icon={Youtube}
                        ocid="contact.youtube.link"
                      />
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-display text-lg">
                    Send a Message
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
                        className="text-center py-12"
                        data-ocid="contact.success_state"
                      >
                        <CheckCircle2 className="mx-auto h-14 w-14 text-secondary mb-4" />
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-muted-foreground font-body text-sm max-w-xs mx-auto">
                          Thank you for reaching out. We'll respond within 24–48
                          hours.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-6 font-display"
                          onClick={() => setSubmitted(false)}
                          data-ocid="contact.send_another.button"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                        data-ocid="contact.form"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="contact-name"
                              className="font-display text-sm"
                            >
                              Full Name{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="contact-name"
                              placeholder="Your full name"
                              {...register("name", {
                                required: "Name is required",
                              })}
                              data-ocid="contact.name.input"
                            />
                            {errors.name && (
                              <p
                                className="text-xs text-destructive"
                                data-ocid="contact.name.field_error"
                              >
                                {errors.name.message}
                              </p>
                            )}
                          </div>

                          {/* Email */}
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="contact-email"
                              className="font-display text-sm"
                            >
                              Email Address{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="contact-email"
                              type="email"
                              placeholder="your@email.com"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Enter a valid email address",
                                },
                              })}
                              data-ocid="contact.email.input"
                            />
                            {errors.email && (
                              <p
                                className="text-xs text-destructive"
                                data-ocid="contact.email.field_error"
                              >
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Subject */}
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="contact-subject"
                            className="font-display text-sm"
                          >
                            Subject <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={selectedSubject}
                            onValueChange={(v) => {
                              setSelectedSubject(v);
                              setValue("subject", v);
                            }}
                          >
                            <SelectTrigger
                              id="contact-subject"
                              data-ocid="contact.subject.select"
                            >
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {SUBJECTS.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.subject && (
                            <p
                              className="text-xs text-destructive"
                              data-ocid="contact.subject.field_error"
                            >
                              {errors.subject.message}
                            </p>
                          )}
                        </div>

                        {/* Message */}
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="contact-message"
                            className="font-display text-sm"
                          >
                            Message <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="contact-message"
                            placeholder="Tell us how we can help…"
                            rows={6}
                            className="resize-none"
                            {...register("message", {
                              required: "Message is required",
                              minLength: {
                                value: 20,
                                message:
                                  "Please provide more detail (min 20 characters).",
                              },
                            })}
                            data-ocid="contact.message.textarea"
                          />
                          {errors.message && (
                            <p
                              className="text-xs text-destructive"
                              data-ocid="contact.message.field_error"
                            >
                              {errors.message.message}
                            </p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full font-display"
                          disabled={isSubmitting}
                          data-ocid="contact.submit_button"
                        >
                          {isSubmitting ? "Sending…" : "Send Message"}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
