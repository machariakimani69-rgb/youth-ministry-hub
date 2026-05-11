import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useSettings, useUpdateSettings } from "@/hooks/useQueries";
import type { SystemSettings } from "@/types";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SettingsForm = {
  churchName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  welcomeMessage: string;
  aboutUs: string;
  logoUrl: string;
  primaryColor: string;
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
  twitter: string;
};

export function AdminSettings() {
  const { data: settings, isLoading } = useSettings();
  const { mutateAsync: updateSettings } = useUpdateSettings();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SettingsForm>();

  useEffect(() => {
    if (!settings) return;
    reset({
      churchName: settings.churchName,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone ?? "",
      address: settings.address ?? "",
      welcomeMessage: settings.welcomeMessage,
      aboutUs: settings.aboutUs,
      logoUrl: settings.logoUrl ?? "",
      primaryColor: settings.primaryColor,
      facebook: settings.socialLinks.facebook ?? "",
      instagram: settings.socialLinks.instagram ?? "",
      youtube: settings.socialLinks.youtube ?? "",
      whatsapp: settings.socialLinks.whatsapp ?? "",
      twitter: settings.socialLinks.twitter ?? "",
    });
  }, [settings, reset]);

  async function onSubmit(data: SettingsForm) {
    if (!settings) return;
    const updated: SystemSettings = {
      ...settings,
      churchName: data.churchName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone || undefined,
      address: data.address || undefined,
      welcomeMessage: data.welcomeMessage,
      aboutUs: data.aboutUs,
      logoUrl: data.logoUrl || undefined,
      primaryColor: data.primaryColor,
      socialLinks: {
        facebook: data.facebook || undefined,
        instagram: data.instagram || undefined,
        youtube: data.youtube || undefined,
        whatsapp: data.whatsapp || undefined,
        twitter: data.twitter || undefined,
      },
    };
    try {
      await updateSettings(updated);
      toast.success("Settings saved successfully.");
    } catch {
      toast.error("Failed to save settings.");
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="admin.settings.loading_state">
        {[
          "sk-set-1",
          "sk-set-2",
          "sk-set-3",
          "sk-set-4",
          "sk-set-5",
          "sk-set-6",
        ].map((k) => (
          <Skeleton key={k} className="h-10 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-2xl"
      data-ocid="admin.settings"
    >
      {/* Church Info */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-foreground border-b border-border pb-2">
          Church Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="s-name">Church Name *</Label>
            <Input
              id="s-name"
              {...register("churchName", { required: true })}
              data-ocid="admin.settings.church_name_input"
            />
          </div>
          <div>
            <Label htmlFor="s-logo">Logo URL</Label>
            <Input
              id="s-logo"
              {...register("logoUrl")}
              placeholder="https://…"
              data-ocid="admin.settings.logo_input"
            />
          </div>
          <div>
            <Label htmlFor="s-email">Contact Email *</Label>
            <Input
              id="s-email"
              type="email"
              {...register("contactEmail", { required: true })}
              data-ocid="admin.settings.email_input"
            />
          </div>
          <div>
            <Label htmlFor="s-phone">Phone</Label>
            <Input
              id="s-phone"
              {...register("contactPhone")}
              placeholder="+1 (555) 000-0000"
              data-ocid="admin.settings.phone_input"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="s-addr">Address</Label>
            <Input
              id="s-addr"
              {...register("address")}
              placeholder="123 Main St, City, Country"
              data-ocid="admin.settings.address_input"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="s-color">Primary Color</Label>
            <Input
              id="s-color"
              {...register("primaryColor")}
              placeholder="#1a3a6b"
              data-ocid="admin.settings.color_input"
            />
          </div>
        </div>
      </div>

      {/* Messaging */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-foreground border-b border-border pb-2">
          Content
        </h3>
        <div>
          <Label htmlFor="s-welcome">Welcome Message</Label>
          <Textarea
            id="s-welcome"
            rows={2}
            {...register("welcomeMessage")}
            data-ocid="admin.settings.welcome_input"
          />
        </div>
        <div>
          <Label htmlFor="s-about">About Us</Label>
          <Textarea
            id="s-about"
            rows={4}
            {...register("aboutUs")}
            data-ocid="admin.settings.about_input"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-foreground border-b border-border pb-2">
          Social Media Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="s-fb">Facebook URL</Label>
            <Input
              id="s-fb"
              {...register("facebook")}
              placeholder="https://facebook.com/…"
              data-ocid="admin.settings.facebook_input"
            />
          </div>
          <div>
            <Label htmlFor="s-ig">Instagram URL</Label>
            <Input
              id="s-ig"
              {...register("instagram")}
              placeholder="https://instagram.com/…"
              data-ocid="admin.settings.instagram_input"
            />
          </div>
          <div>
            <Label htmlFor="s-yt">YouTube URL</Label>
            <Input
              id="s-yt"
              {...register("youtube")}
              placeholder="https://youtube.com/…"
              data-ocid="admin.settings.youtube_input"
            />
          </div>
          <div>
            <Label htmlFor="s-wa">WhatsApp Number</Label>
            <Input
              id="s-wa"
              {...register("whatsapp")}
              placeholder="+1234567890"
              data-ocid="admin.settings.whatsapp_input"
            />
          </div>
          <div>
            <Label htmlFor="s-tw">Twitter/X URL</Label>
            <Input
              id="s-tw"
              {...register("twitter")}
              placeholder="https://twitter.com/…"
              data-ocid="admin.settings.twitter_input"
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          data-ocid="admin.settings.save_button"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? "Saving…" : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
