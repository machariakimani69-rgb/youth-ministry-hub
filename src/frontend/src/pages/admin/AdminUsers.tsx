import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePendingRegistrations, useUsers } from "@/hooks/useQueries";
import { formatDate } from "@/lib/utils";
import type { UserProfile } from "@/types";
import { RegistrationStatus, UserRole } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Download, Search, UserCheck, UserX, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-destructive/10 text-destructive border-destructive/20",
  leader: "bg-secondary/10 text-secondary border-secondary/20",
  member: "bg-primary/10 text-primary border-primary/20",
  guest: "bg-muted text-muted-foreground border-border",
};

const STATUS_COLORS: Record<string, string> = {
  approved: "bg-primary/10 text-primary",
  pending: "bg-secondary/10 text-secondary",
  rejected: "bg-destructive/10 text-destructive",
};

export function AdminUsers() {
  const { data: users, isLoading } = useUsers();
  const { data: pending } = usePendingRegistrations();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [assignRoleUser, setAssignRoleUser] = useState<UserProfile | null>(
    null,
  );
  const [newRole, setNewRole] = useState<string>("member");
  const [busy, setBusy] = useState(false);

  const filtered = (users ?? []).filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  async function handleApprove(u: UserProfile) {
    if (!actor) return;
    setBusy(true);
    try {
      await actor.approveUser(u.id);
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["pendingRegistrations"] });
      toast.success(`${u.name} approved.`);
    } catch {
      toast.error("Failed to approve user.");
    } finally {
      setBusy(false);
    }
  }

  async function handleReject(u: UserProfile) {
    if (!actor) return;
    setBusy(true);
    try {
      await actor.rejectUser(u.id);
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["pendingRegistrations"] });
      toast.success(`${u.name} rejected.`);
    } catch {
      toast.error("Failed to reject user.");
    } finally {
      setBusy(false);
    }
  }

  async function handleAssignRole() {
    if (!actor || !assignRoleUser) return;
    setBusy(true);
    try {
      const roleMap: Record<string, UserRole> = {
        admin: UserRole.admin,
        leader: UserRole.leader,
        member: UserRole.member,
        guest: UserRole.guest,
      };
      await actor.assignUserRole(
        assignRoleUser.id,
        roleMap[newRole] ?? UserRole.member,
      );
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("Role updated.");
      setAssignRoleUser(null);
    } catch {
      toast.error("Failed to update role.");
    } finally {
      setBusy(false);
    }
  }

  function exportCSV() {
    if (!users) return;
    const rows = [
      ["Name", "Email", "Role", "Status", "Joined"],
      ...users.map((u) => [
        u.name,
        u.email,
        u.role,
        u.registrationStatus,
        formatDate(u.joinedAt),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "members.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported.");
  }

  return (
    <div className="space-y-6" data-ocid="admin.users">
      {/* Pending approvals */}
      {pending && pending.length > 0 && (
        <Card
          className="bg-secondary/5 border-secondary/20"
          data-ocid="admin.users.pending_section"
        >
          <CardHeader>
            <CardTitle className="font-display text-base text-secondary">
              Pending Registrations ({pending.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pending.map((u, i) => (
              <div
                key={u.id.toString()}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-card border border-border"
                data-ocid={`admin.users.pending.item.${i + 1}`}
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {u.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {u.email}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-primary border-primary/30 hover:bg-primary/10"
                    disabled={busy}
                    onClick={() => handleApprove(u)}
                    data-ocid={`admin.users.pending.approve.${i + 1}`}
                  >
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Approve
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-destructive border-destructive/30 hover:bg-destructive/10"
                    disabled={busy}
                    onClick={() => handleReject(u)}
                    data-ocid={`admin.users.pending.reject.${i + 1}`}
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Filters & search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="admin.users.search_input"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-36" data-ocid="admin.users.role_filter">
            <SelectValue placeholder="All roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="leader">Leader</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="guest">Guest</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          onClick={exportCSV}
          className="shrink-0"
          data-ocid="admin.users.export_button"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Users table */}
      <div
        className="rounded-xl border border-border overflow-hidden"
        data-ocid="admin.users.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">
                  Name
                </th>
                <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">
                  Email
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  Role
                </th>
                <th className="text-left p-3 font-semibold text-foreground hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left p-3 font-semibold text-foreground hidden lg:table-cell">
                  Joined
                </th>
                <th className="text-right p-3 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr
                      key={
                        ["sk-u-a", "sk-u-b", "sk-u-c", "sk-u-d", "sk-u-e"][i]
                      }
                    >
                      <td className="p-3">
                        <Skeleton className="h-4 w-28" />
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <Skeleton className="h-4 w-40" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-8 w-20 ml-auto" />
                      </td>
                    </tr>
                  ))
                : filtered.map((u, i) => (
                    <tr
                      key={u.id.toString()}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`admin.users.item.${i + 1}`}
                    >
                      <td className="p-3">
                        <p className="font-medium text-foreground truncate max-w-[140px]">
                          {u.name}
                        </p>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <p className="text-muted-foreground truncate max-w-[180px]">
                          {u.email}
                        </p>
                      </td>
                      <td className="p-3">
                        <Badge
                          className={`text-xs capitalize ${ROLE_COLORS[u.role] ?? ""}`}
                        >
                          {u.role}
                        </Badge>
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        <span
                          className={`text-xs rounded-full px-2 py-0.5 font-medium capitalize ${STATUS_COLORS[u.registrationStatus] ?? ""}`}
                        >
                          {u.registrationStatus}
                        </span>
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <span className="text-muted-foreground">
                          {formatDate(u.joinedAt)}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          {u.registrationStatus ===
                            RegistrationStatus.pending && (
                            <>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-8 text-primary"
                                disabled={busy}
                                onClick={() => handleApprove(u)}
                                data-ocid={`admin.users.approve.${i + 1}`}
                              >
                                <UserCheck className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-8 text-destructive"
                                disabled={busy}
                                onClick={() => handleReject(u)}
                                data-ocid={`admin.users.reject.${i + 1}`}
                              >
                                <UserX className="h-3.5 w-3.5" />
                              </Button>
                            </>
                          )}
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs"
                            onClick={() => {
                              setAssignRoleUser(u);
                              setNewRole(u.role);
                            }}
                            data-ocid={`admin.users.assign_role.${i + 1}`}
                          >
                            Role
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!isLoading && filtered.length === 0 && (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.users.empty_state"
            >
              No users match your search.
            </div>
          )}
        </div>
      </div>

      {/* Assign role dialog */}
      <Dialog
        open={!!assignRoleUser}
        onOpenChange={(o) => {
          if (!o) setAssignRoleUser(null);
        }}
      >
        <DialogContent data-ocid="admin.users.assign_role_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              Assign Role — {assignRoleUser?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Select value={newRole} onValueChange={setNewRole}>
              <SelectTrigger data-ocid="admin.users.new_role_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="leader">Leader</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="guest">Guest</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAssignRoleUser(null)}
                data-ocid="admin.users.assign_role_cancel"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAssignRole}
                disabled={busy}
                data-ocid="admin.users.assign_role_confirm"
              >
                Save Role
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
