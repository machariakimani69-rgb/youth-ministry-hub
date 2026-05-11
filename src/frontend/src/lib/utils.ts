import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(
  timestamp: bigint | number | Date,
  opts?: Intl.DateTimeFormatOptions,
): string {
  let date: Date;
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (typeof timestamp === "bigint") {
    date = new Date(Number(timestamp) / 1_000_000);
  } else {
    date = new Date(timestamp);
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  });
}

export function formatDateShort(timestamp: bigint | number | Date): string {
  return formatDate(timestamp, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(timestamp: bigint | number | Date): string {
  let date: Date;
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (typeof timestamp === "bigint") {
    date = new Date(Number(timestamp) / 1_000_000);
  } else {
    date = new Date(timestamp);
  }
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(
  cents: bigint | number,
  currency = "USD",
): string {
  const amount = typeof cents === "bigint" ? Number(cents) : cents;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

export function timestampToDate(ts: bigint): Date {
  return new Date(Number(ts) / 1_000_000);
}

export function dateToTimestamp(date: Date): bigint {
  return BigInt(date.getTime() * 1_000_000);
}

export function nowTimestamp(): bigint {
  return dateToTimestamp(new Date());
}
