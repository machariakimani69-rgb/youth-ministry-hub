import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useContacts } from "@/hooks/useQueries";
import { formatDate } from "@/lib/utils";
import type { ContactMessage } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCheck, Mail, MailOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminMessages() {
  const { data: contacts, isLoading } = useContacts();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  async function markRead(m: ContactMessage) {
    if (!actor || m.isRead) return;
    try {
      await actor.markContactRead(m.id);
      qc.invalidateQueries({ queryKey: ["contacts"] });
      if (selected?.id === m.id) setSelected({ ...m, isRead: true });
    } catch {
      toast.error("Failed to mark as read.");
    }
  }

  const unread = (contacts ?? []).filter((c) => !c.isRead).length;

  return (
    <div className="space-y-4" data-ocid="admin.messages">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">
          Contact Inbox
        </h2>
        {unread > 0 && (
          <Badge className="bg-secondary/10 text-secondary border-secondary/20">
            {unread} unread
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Message list */}
        <div className="space-y-2" data-ocid="admin.messages.list">
          {isLoading
            ? ["sk-msg-1", "sk-msg-2", "sk-msg-3", "sk-msg-4", "sk-msg-5"].map(
                (k) => <Skeleton key={k} className="h-20 rounded-xl" />,
              )
            : (contacts ?? []).map((m, i) => (
                <button
                  key={m.id.toString()}
                  type="button"
                  onClick={() => {
                    setSelected(m);
                    markRead(m);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    selected?.id === m.id
                      ? "border-primary bg-primary/5"
                      : m.isRead
                        ? "border-border bg-card hover:bg-muted/20"
                        : "border-secondary/30 bg-secondary/5 hover:bg-secondary/10"
                  }`}
                  data-ocid={`admin.messages.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {m.isRead ? (
                        <MailOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : (
                        <Mail className="h-4 w-4 text-secondary shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p
                          className={`text-sm truncate ${m.isRead ? "text-foreground" : "font-semibold text-foreground"}`}
                        >
                          {m.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {m.subject}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDate(m.createdAt, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </button>
              ))}
          {!isLoading && (contacts ?? []).length === 0 && (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.messages.empty_state"
            >
              No messages yet.
            </div>
          )}
        </div>

        {/* Message detail */}
        {selected ? (
          <div
            className="rounded-xl border border-border bg-card p-6 space-y-4"
            data-ocid="admin.messages.detail_panel"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-foreground">
                  {selected.subject}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selected.name} &lt;{selected.email}&gt;
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(selected.createdAt)}
                </p>
              </div>
              {!selected.isRead && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => markRead(selected)}
                  data-ocid="admin.messages.mark_read_button"
                >
                  <CheckCheck className="h-3.5 w-3.5 mr-1" />
                  Mark Read
                </Button>
              )}
            </div>
            <div className="p-4 rounded-lg bg-muted/30 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {selected.message}
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl border border-dashed border-border flex items-center justify-center p-12 text-muted-foreground"
            data-ocid="admin.messages.no_selection"
          >
            <div className="text-center">
              <MailOpen className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Select a message to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
