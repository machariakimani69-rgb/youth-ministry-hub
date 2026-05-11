import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAnnouncements,
  useBlogPosts,
  useDevotionals,
  useSermons,
} from "@/hooks/useQueries";
import { formatDate } from "@/lib/utils";
import type { Announcement, BlogPost, Devotional, Sermon } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Pin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";

// ─── Blog sub-tab ─────────────────────────────────────────────────────────────
type BlogForm = { title: string; content: string; isPublished: boolean };

function BlogTab() {
  const { data: posts, isLoading } = useBlogPosts();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<BlogPost | null>(null);
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogForm>();

  function openCreate() {
    setEdit(null);
    setContent("");
    reset({ title: "", isPublished: false });
    setOpen(true);
  }

  function openEdit(p: BlogPost) {
    setEdit(p);
    setContent(p.content);
    reset({ title: p.title, isPublished: p.isPublished });
    setOpen(true);
  }

  async function onSubmit(data: BlogForm) {
    if (!actor) return;
    setBusy(true);
    try {
      if (edit) {
        await actor.updateBlogPost(
          edit.id,
          data.title,
          content,
          null,
          data.isPublished,
        );
        toast.success("Post updated.");
      } else {
        await actor.addBlogPost(data.title, content, null, data.isPublished);
        toast.success("Post created.");
      }
      qc.invalidateQueries({ queryKey: ["blogPosts"] });
      setOpen(false);
    } catch {
      toast.error("Failed to save post.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(p: BlogPost) {
    if (!actor || !confirm(`Delete "${p.title}"?`)) return;
    try {
      await actor.deleteBlogPost(p.id);
      qc.invalidateQueries({ queryKey: ["blogPosts"] });
      toast.success("Post deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  }

  return (
    <div className="space-y-4" data-ocid="admin.content.blog">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          {(posts ?? []).length} posts
        </span>
        <Button
          type="button"
          size="sm"
          onClick={openCreate}
          data-ocid="admin.content.blog.create_button"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Post
        </Button>
      </div>
      <div className="space-y-2" data-ocid="admin.content.blog.list">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={["sk-b-a", "sk-b-b", "sk-b-c"][i]}
                className="h-14 w-full rounded-lg"
              />
            ))
          : (posts ?? []).map((p, i) => (
              <div
                key={p.id.toString()}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-card border border-border"
                data-ocid={`admin.content.blog.item.${i + 1}`}
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {p.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(p.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2 items-center shrink-0">
                  <Badge
                    className={
                      p.isPublished
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {p.isPublished ? "Published" : "Draft"}
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => openEdit(p)}
                    data-ocid={`admin.content.blog.edit_button.${i + 1}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDelete(p)}
                    data-ocid={`admin.content.blog.delete_button.${i + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
        {!isLoading && (posts ?? []).length === 0 && (
          <p
            className="text-center py-8 text-muted-foreground"
            data-ocid="admin.content.blog.empty_state"
          >
            No blog posts yet.
          </p>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.content.blog.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {edit ? "Edit Post" : "New Blog Post"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                {...register("title", { required: true })}
                className={errors.title ? "border-destructive" : ""}
                data-ocid="admin.content.blog.title_input"
              />
            </div>
            <div>
              <Label>Content</Label>
              <div className="quill-dark-wrap">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="bg-background text-foreground"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="bp-pub"
                {...register("isPublished")}
                className="h-4 w-4"
              />
              <Label htmlFor="bp-pub">Publish immediately</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="admin.content.blog.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={busy}
                data-ocid="admin.content.blog.submit_button"
              >
                {edit ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Sermons sub-tab ──────────────────────────────────────────────────────────
type SermonForm = {
  title: string;
  speaker: string;
  description: string;
  scriptureReference: string;
  date: string;
};

function SermonsTab() {
  const { data: sermons, isLoading } = useSermons();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Sermon | null>(null);
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SermonForm>();

  function openCreate() {
    setEdit(null);
    setDescription("");
    reset({ title: "", speaker: "", scriptureReference: "", date: "" });
    setOpen(true);
  }

  function openEdit(s: Sermon) {
    setEdit(s);
    setDescription(s.description);
    reset({
      title: s.title,
      speaker: s.speaker,
      scriptureReference: s.scriptureReference,
      date: new Date(Number(s.date) / 1_000_000).toISOString().slice(0, 10),
    });
    setOpen(true);
  }

  async function onSubmit(data: SermonForm) {
    if (!actor) return;
    setBusy(true);
    try {
      const date = BigInt(new Date(data.date).getTime()) * 1_000_000n;
      if (edit) {
        await actor.updateSermon(
          edit.id,
          data.title,
          data.speaker,
          date,
          description,
          data.scriptureReference,
          null,
          null,
          null,
          edit.isPublished,
        );
        toast.success("Sermon updated.");
      } else {
        await actor.addSermon(
          data.title,
          data.speaker,
          date,
          description,
          data.scriptureReference,
          null,
          null,
          null,
        );
        toast.success("Sermon created.");
      }
      qc.invalidateQueries({ queryKey: ["sermons"] });
      setOpen(false);
    } catch {
      toast.error("Failed to save sermon.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(s: Sermon) {
    if (!actor || !confirm(`Delete "${s.title}"?`)) return;
    try {
      await actor.deleteSermon(s.id);
      qc.invalidateQueries({ queryKey: ["sermons"] });
      toast.success("Sermon deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  }

  return (
    <div className="space-y-4" data-ocid="admin.content.sermons">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          {(sermons ?? []).length} sermons
        </span>
        <Button
          type="button"
          size="sm"
          onClick={openCreate}
          data-ocid="admin.content.sermons.create_button"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Sermon
        </Button>
      </div>
      <div className="space-y-2" data-ocid="admin.content.sermons.list">
        {isLoading
          ? ["sk-s-1", "sk-s-2", "sk-s-3"].map((k) => (
              <Skeleton key={k} className="h-14 rounded-lg" />
            ))
          : (sermons ?? []).map((s, i) => (
              <div
                key={s.id.toString()}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-card border border-border"
                data-ocid={`admin.content.sermons.item.${i + 1}`}
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.speaker} · {formatDate(s.date)}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => openEdit(s)}
                    data-ocid={`admin.content.sermons.edit_button.${i + 1}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDelete(s)}
                    data-ocid={`admin.content.sermons.delete_button.${i + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
        {!isLoading && (sermons ?? []).length === 0 && (
          <p
            className="text-center py-8 text-muted-foreground"
            data-ocid="admin.content.sermons.empty_state"
          >
            No sermons yet.
          </p>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.content.sermons.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {edit ? "Edit Sermon" : "New Sermon"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title *</Label>
                <Input
                  {...register("title", { required: true })}
                  className={errors.title ? "border-destructive" : ""}
                  data-ocid="admin.content.sermons.title_input"
                />
              </div>
              <div>
                <Label>Speaker *</Label>
                <Input
                  {...register("speaker", { required: true })}
                  className={errors.speaker ? "border-destructive" : ""}
                  data-ocid="admin.content.sermons.speaker_input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  {...register("date")}
                  data-ocid="admin.content.sermons.date_input"
                />
              </div>
              <div>
                <Label>Scripture</Label>
                <Input
                  {...register("scriptureReference")}
                  placeholder="John 3:16"
                  data-ocid="admin.content.sermons.scripture_input"
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <div className="quill-dark-wrap">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  className="bg-background text-foreground"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="admin.content.sermons.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={busy}
                data-ocid="admin.content.sermons.submit_button"
              >
                {edit ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Devotionals sub-tab ──────────────────────────────────────────────────────
type DevotionalForm = { title: string; scripture: string; date: string };

function DevotionalsTab() {
  const { data: devs, isLoading } = useDevotionals();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Devotional | null>(null);
  const [reflection, setReflection] = useState("");
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DevotionalForm>();

  function openCreate() {
    setEdit(null);
    setReflection("");
    reset({ title: "", scripture: "", date: "" });
    setOpen(true);
  }
  function openEdit(d: Devotional) {
    setEdit(d);
    setReflection(d.reflection);
    reset({
      title: d.title,
      scripture: d.scripture,
      date: new Date(Number(d.date) / 1_000_000).toISOString().slice(0, 10),
    });
    setOpen(true);
  }
  async function onSubmit(data: DevotionalForm) {
    if (!actor) return;
    setBusy(true);
    try {
      const date = BigInt(new Date(data.date).getTime()) * 1_000_000n;
      if (edit) {
        await actor.updateDevotional(
          edit.id,
          data.title,
          data.scripture,
          reflection,
          date,
        );
        toast.success("Updated.");
      } else {
        await actor.addDevotional(data.title, data.scripture, reflection, date);
        toast.success("Created.");
      }
      qc.invalidateQueries({ queryKey: ["devotionals"] });
      setOpen(false);
    } catch {
      toast.error("Failed.");
    } finally {
      setBusy(false);
    }
  }
  async function handleDelete(d: Devotional) {
    if (!actor || !confirm(`Delete "${d.title}"?`)) return;
    try {
      await actor.deleteDevotional(d.id);
      qc.invalidateQueries({ queryKey: ["devotionals"] });
      toast.success("Deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  }

  return (
    <div className="space-y-4" data-ocid="admin.content.devotionals">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          {(devs ?? []).length} devotionals
        </span>
        <Button
          type="button"
          size="sm"
          onClick={openCreate}
          data-ocid="admin.content.devotionals.create_button"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Devotional
        </Button>
      </div>
      <div className="space-y-2" data-ocid="admin.content.devotionals.list">
        {isLoading
          ? ["sk-d-1", "sk-d-2", "sk-d-3"].map((k) => (
              <Skeleton key={k} className="h-14 rounded-lg" />
            ))
          : (devs ?? []).map((d, i) => (
              <div
                key={d.id.toString()}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-card border border-border"
                data-ocid={`admin.content.devotionals.item.${i + 1}`}
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {d.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {d.scripture} · {formatDate(d.date)}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => openEdit(d)}
                    data-ocid={`admin.content.devotionals.edit_button.${i + 1}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDelete(d)}
                    data-ocid={`admin.content.devotionals.delete_button.${i + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
        {!isLoading && (devs ?? []).length === 0 && (
          <p
            className="text-center py-8 text-muted-foreground"
            data-ocid="admin.content.devotionals.empty_state"
          >
            No devotionals yet.
          </p>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.content.devotionals.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {edit ? "Edit Devotional" : "New Devotional"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                {...register("title", { required: true })}
                className={errors.title ? "border-destructive" : ""}
                data-ocid="admin.content.devotionals.title_input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Scripture</Label>
                <Input
                  {...register("scripture")}
                  placeholder="Romans 8:28"
                  data-ocid="admin.content.devotionals.scripture_input"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  {...register("date")}
                  data-ocid="admin.content.devotionals.date_input"
                />
              </div>
            </div>
            <div>
              <Label>Reflection</Label>
              <div className="quill-dark-wrap">
                <ReactQuill
                  theme="snow"
                  value={reflection}
                  onChange={setReflection}
                  className="bg-background text-foreground"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="admin.content.devotionals.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={busy}
                data-ocid="admin.content.devotionals.submit_button"
              >
                {edit ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Announcements sub-tab ────────────────────────────────────────────────────
type AnnForm = {
  title: string;
  content: string;
  isPinned: boolean;
  publishAt: string;
};

function AnnouncementsTab() {
  const { data: anns, isLoading } = useAnnouncements();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Announcement | null>(null);
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AnnForm>();

  function openCreate() {
    setEdit(null);
    reset({
      title: "",
      content: "",
      isPinned: false,
      publishAt: new Date().toISOString().slice(0, 16),
    });
    setOpen(true);
  }
  function openEdit(a: Announcement) {
    setEdit(a);
    reset({
      title: a.title,
      content: a.content,
      isPinned: a.isPinned,
      publishAt: new Date(Number(a.publishAt) / 1_000_000)
        .toISOString()
        .slice(0, 16),
    });
    setOpen(true);
  }
  async function onSubmit(data: AnnForm) {
    if (!actor) return;
    setBusy(true);
    try {
      const publishAt = BigInt(new Date(data.publishAt).getTime()) * 1_000_000n;
      if (edit) {
        await actor.updateAnnouncement(
          edit.id,
          data.title,
          data.content,
          data.isPinned,
          publishAt,
          null,
        );
        toast.success("Updated.");
      } else {
        await actor.addAnnouncement(
          data.title,
          data.content,
          data.isPinned,
          publishAt,
          null,
        );
        toast.success("Created.");
      }
      qc.invalidateQueries({ queryKey: ["announcements"] });
      setOpen(false);
    } catch {
      toast.error("Failed.");
    } finally {
      setBusy(false);
    }
  }
  async function handleDelete(a: Announcement) {
    if (!actor || !confirm(`Delete "${a.title}"?`)) return;
    try {
      await actor.deleteAnnouncement(a.id);
      qc.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  }

  return (
    <div className="space-y-4" data-ocid="admin.content.announcements">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          {(anns ?? []).length} announcements
        </span>
        <Button
          type="button"
          size="sm"
          onClick={openCreate}
          data-ocid="admin.content.announcements.create_button"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Announcement
        </Button>
      </div>
      <div className="space-y-2" data-ocid="admin.content.announcements.list">
        {isLoading
          ? ["sk-a-1", "sk-a-2", "sk-a-3"].map((k) => (
              <Skeleton key={k} className="h-14 rounded-lg" />
            ))
          : (anns ?? []).map((a, i) => (
              <div
                key={a.id.toString()}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-card border border-border"
                data-ocid={`admin.content.announcements.item.${i + 1}`}
              >
                <div className="min-w-0 flex items-center gap-2">
                  {a.isPinned && (
                    <Pin className="h-3.5 w-3.5 text-secondary shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {a.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(a.publishAt)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => openEdit(a)}
                    data-ocid={`admin.content.announcements.edit_button.${i + 1}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDelete(a)}
                    data-ocid={`admin.content.announcements.delete_button.${i + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
        {!isLoading && (anns ?? []).length === 0 && (
          <p
            className="text-center py-8 text-muted-foreground"
            data-ocid="admin.content.announcements.empty_state"
          >
            No announcements yet.
          </p>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-lg"
          data-ocid="admin.content.announcements.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {edit ? "Edit Announcement" : "New Announcement"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                {...register("title", { required: true })}
                className={errors.title ? "border-destructive" : ""}
                data-ocid="admin.content.announcements.title_input"
              />
            </div>
            <div>
              <Label>Content *</Label>
              <Textarea
                rows={4}
                {...register("content", { required: true })}
                className={errors.content ? "border-destructive" : ""}
                data-ocid="admin.content.announcements.content_input"
              />
            </div>
            <div>
              <Label>Publish At</Label>
              <Input
                type="datetime-local"
                {...register("publishAt")}
                data-ocid="admin.content.announcements.publish_input"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ann-pin"
                {...register("isPinned")}
                className="h-4 w-4"
                data-ocid="admin.content.announcements.pinned_checkbox"
              />
              <Label htmlFor="ann-pin">Pin to top</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="admin.content.announcements.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={busy}
                data-ocid="admin.content.announcements.submit_button"
              >
                {edit ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Main ContentTab ──────────────────────────────────────────────────────────
export function AdminContent() {
  return (
    <div data-ocid="admin.content">
      <Tabs defaultValue="blog">
        <TabsList className="mb-4">
          <TabsTrigger value="blog" data-ocid="admin.content.blog_tab">
            Blog Posts
          </TabsTrigger>
          <TabsTrigger value="sermons" data-ocid="admin.content.sermons_tab">
            Sermons
          </TabsTrigger>
          <TabsTrigger
            value="devotionals"
            data-ocid="admin.content.devotionals_tab"
          >
            Devotionals
          </TabsTrigger>
          <TabsTrigger
            value="announcements"
            data-ocid="admin.content.announcements_tab"
          >
            Announcements
          </TabsTrigger>
        </TabsList>
        <TabsContent value="blog">
          <BlogTab />
        </TabsContent>
        <TabsContent value="sermons">
          <SermonsTab />
        </TabsContent>
        <TabsContent value="devotionals">
          <DevotionalsTab />
        </TabsContent>
        <TabsContent value="announcements">
          <AnnouncementsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
