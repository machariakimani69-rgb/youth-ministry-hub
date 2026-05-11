import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDonations, useTotalDonations } from "@/hooks/useQueries";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import { useState } from "react";

export function AdminDonations() {
  const { data: donations, isLoading } = useDonations();
  const { data: total } = useTotalDonations();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = (donations ?? []).filter((d) => {
    const ts = Number(d.createdAt) / 1_000_000;
    if (fromDate && ts < new Date(fromDate).getTime()) return false;
    if (toDate && ts > new Date(toDate).getTime() + 86_400_000) return false;
    return true;
  });

  const filteredTotal = filtered.reduce(
    (sum, d) => sum + Number(d.amountCents),
    0,
  );

  return (
    <div className="space-y-6" data-ocid="admin.donations">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card
          className="bg-card border-border"
          data-ocid="admin.donations.total_card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Raised (All Time)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-bold text-accent">
              {total !== undefined ? (
                formatCurrency(total)
              ) : (
                <Skeleton className="h-9 w-32" />
              )}
            </p>
          </CardContent>
        </Card>
        <Card
          className="bg-card border-border"
          data-ocid="admin.donations.filtered_total_card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Filtered Period Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-bold text-primary">
              {formatCurrency(filteredTotal)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Date filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <span className="text-sm text-muted-foreground shrink-0">
          Filter by date:
        </span>
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-auto"
          data-ocid="admin.donations.from_date_input"
        />
        <span className="text-muted-foreground">to</span>
        <Input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-auto"
          data-ocid="admin.donations.to_date_input"
        />
      </div>

      {/* Donations table */}
      <div
        className="rounded-xl border border-border overflow-hidden"
        data-ocid="admin.donations.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">
                  Donor
                </th>
                <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">
                  Email
                </th>
                <th className="text-right p-3 font-semibold text-foreground">
                  Amount
                </th>
                <th className="text-left p-3 font-semibold text-foreground hidden sm:table-cell">
                  Date
                </th>
                <th className="text-left p-3 font-semibold text-foreground hidden lg:table-cell">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading
                ? [
                    "sk-don-1",
                    "sk-don-2",
                    "sk-don-3",
                    "sk-don-4",
                    "sk-don-5",
                  ].map((k) => (
                    <tr key={k}>
                      <td className="p-3">
                        <Skeleton className="h-4 w-28" />
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <Skeleton className="h-4 w-40" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <Skeleton className="h-4 w-32" />
                      </td>
                    </tr>
                  ))
                : filtered.map((d, i) => (
                    <tr
                      key={d.id.toString()}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`admin.donations.item.${i + 1}`}
                    >
                      <td className="p-3 font-medium text-foreground">
                        {d.donorName}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        {d.donorEmail}
                      </td>
                      <td className="p-3 text-right font-bold text-accent">
                        {formatCurrency(d.amountCents, d.currency)}
                      </td>
                      <td className="p-3 text-muted-foreground hidden sm:table-cell">
                        {formatDate(d.createdAt)}
                      </td>
                      <td className="p-3 text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">
                        {d.message ?? "—"}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!isLoading && filtered.length === 0 && (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.donations.empty_state"
            >
              No donations in this period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
