import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useEvents } from "@/hooks/useQueries";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  Download,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EventForm = {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  capacity: string;
  imageUrl: string;
};

export function AdminEvents() {
  const { data: events, isLoading } = useEvents();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Event | null>(null);
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventForm>();

  function openCreate() {
    setEditTarget(null);
    reset({
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      capacity: "",
      imageUrl: "",
    });
    setDialogOpen(true);
  }

  function openEdit(e: Event) {
    setEditTarget(e);
    reset({
      title: e.title,
      description: e.description,
      location: e.location,
      startDate: new Date(Number(e.startDate) / 1_000_000)
        .toISOString()
        .slice(0, 16),
      endDate: new Date(Number(e.endDate) / 1_000_000)
        .toISOString()
        .slice(0, 16),
      capacity: e.capacity ? e.capacity.toString() : "",
      imageUrl: e.imageUrl ?? "",
    });
    setDialogOpen(true);
  }

  async function onSubmit(data: EventForm) {
    if (!actor) return;
    setBusy(true);
    try {
      const start = BigInt(new Date(data.startDate).getTime()) * 1_000_000n;
      const end = BigInt(new Date(data.endDate).getTime()) * 1_000_000n;
      const cap = data.capacity ? BigInt(data.capacity) : null;
      const img = data.imageUrl || null;
      if (editTarget) {
        await actor.updateEvent(
          editTarget.id,
          data.title,
          data.description,
          data.location,
          start,
          end,
          cap,
          img,
          editTarget.isPublished,
        );
        toast.success("Event updated.");
      } else {
        await actor.createEvent(
          data.title,
          data.description,
          data.location,
          start,
          end,
          cap,
          img,
        );
        toast.success("Event created.");
      }
      qc.invalidateQueries({ queryKey: ["events"] });
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save event.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(e: Event) {
    if (!actor) return;
    if (!confirm(`Delete "${e.title}"?`)) return;
    try {
      await actor.deleteEvent(e.id);
      qc.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted.");
    } catch {
      toast.error("Failed to delete event.");
    }
  }

  function exportAttendees() {
    toast.info("RSVP export would be available with RSVP data loaded.");
  }

  return (
    <div className="space-y-6" data-ocid="admin.events">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-lg font-bold text-foreground">
          Events
        </h2>
        <Button
          type="button"
          onClick={openCreate}
          data-ocid="admin.events.create_button"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        data-ocid="admin.events.list"
      >
        {isLoading
          ? [
              "sk-ev-1",
              "sk-ev-2",
              "sk-ev-3",
              "sk-ev-4",
              "sk-ev-5",
              "sk-ev-6",
            ].map((k) => (
              <Card key={k} className="bg-card border-border">
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          : (events ?? []).map((e, i) => (
              <Card
                key={e.id.toString()}
                className="bg-card border-border"
                data-ocid={`admin.events.item.${i + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-display font-semibold text-foreground truncate">
                      {e.title}
                    </h3>
                    <span
                      className={`text-xs rounded-full px-2 py-0.5 shrink-0 font-medium ${e.isPublished ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                    >
                      {e.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      {formatDate(e.startDate)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{e.location}</span>
                    </div>
                    {e.capacity && (
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        Capacity: {e.capacity.toString()}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => openEdit(e)}
                      data-ocid={`admin.events.edit_button.${i + 1}`}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={exportAttendees}
                      data-ocid={`admin.events.export_button.${i + 1}`}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive/30 hover:bg-destructive/10 text-xs"
                      onClick={() => handleDelete(e)}
                      data-ocid={`admin.events.delete_button.${i + 1}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {!isLoading && (events ?? []).length === 0 && (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin.events.empty_state"
        >
          No events yet. Create your first event!
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.events.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editTarget ? "Edit Event" : "Create Event"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="ev-title">Title *</Label>
              <Input
                id="ev-title"
                {...register("title", { required: true })}
                className={errors.title ? "border-destructive" : ""}
                data-ocid="admin.events.title_input"
              />
            </div>
            <div>
              <Label htmlFor="ev-desc">Description</Label>
              <Textarea
                id="ev-desc"
                rows={3}
                {...register("description")}
                data-ocid="admin.events.description_input"
              />
            </div>
            <div>
              <Label htmlFor="ev-loc">Location *</Label>
              <Input
                id="ev-loc"
                {...register("location", { required: true })}
                className={errors.location ? "border-destructive" : ""}
                data-ocid="admin.events.location_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ev-start">Start Date *</Label>
                <Input
                  id="ev-start"
                  type="datetime-local"
                  {...register("startDate", { required: true })}
                  className={errors.startDate ? "border-destructive" : ""}
                  data-ocid="admin.events.start_input"
                />
              </div>
              <div>
                <Label htmlFor="ev-end">End Date *</Label>
                <Input
                  id="ev-end"
                  type="datetime-local"
                  {...register("endDate", { required: true })}
                  className={errors.endDate ? "border-destructive" : ""}
                  data-ocid="admin.events.end_input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ev-cap">Capacity</Label>
                <Input
                  id="ev-cap"
                  type="number"
                  min="1"
                  {...register("capacity")}
                  data-ocid="admin.events.capacity_input"
                />
              </div>
              <div>
                <Label htmlFor="ev-img">Image URL</Label>
                <Input
                  id="ev-img"
                  {...register("imageUrl")}
                  placeholder="https://…"
                  data-ocid="admin.events.image_input"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin.events.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={busy}
                data-ocid="admin.events.submit_button"
              >
                {editTarget ? "Save Changes" : "Create Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
