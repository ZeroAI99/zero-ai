/**
 * ZERO AI — Admin Dashboard
 * Protected route for owner to manage waitlist entries
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useState } from "react";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663342337625/biHYpnWi4gbAo4jVFbvk4g/zero-ai-logo-new_0acbc76c.webp";

type WaitlistStatus = "pending" | "approved" | "rejected";

const STATUS_COLORS: Record<WaitlistStatus, string> = {
  pending: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  approved: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  rejected: "text-red-400 border-red-400/30 bg-red-400/5",
};

const ROLE_LABELS: Record<string, string> = {
  founder: "Founder",
  operator: "Operator",
  creator: "Creator",
  builder: "Builder",
  other: "Other",
};

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<WaitlistStatus | "all">("all");
  const [search, setSearch] = useState("");

  const { data: waitlistData, isLoading, refetch } = trpc.waitlist.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: countData } = trpc.waitlist.count.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const updateStatus = trpc.waitlist.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[oklch(0.075_0.008_265)] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[oklch(0.76_0.18_155)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[oklch(0.075_0.008_265)] flex flex-col items-center justify-center gap-4">
        <p className="text-[oklch(0.55_0.01_265)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          &gt; Access restricted. Authentication required.
        </p>
        <a
          href={getLoginUrl()}
          className="px-6 py-2 border border-[oklch(0.76_0.18_155/0.5)] text-[oklch(0.76_0.18_155)] text-sm hover:bg-[oklch(0.76_0.18_155/0.08)] transition-all"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          [ LOGIN ]
        </a>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[oklch(0.075_0.008_265)] flex items-center justify-center">
        <p className="text-red-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          &gt; 403 — Forbidden. Admin access only.
        </p>
      </div>
    );
  }

  const entries = waitlistData?.entries ?? [];
  const filtered = entries.filter((e) => {
    const matchFilter = filter === "all" || e.status === filter;
    const matchSearch =
      search === "" ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      (e.name ?? "").toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[oklch(0.075_0.008_265)] text-[oklch(0.93_0.005_265)]">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/">
            <img src={LOGO} alt="Zero AI" className="w-8 h-8 object-contain" />
          </a>
          <div>
            <span
              className="text-xs text-[oklch(0.45_0.008_265)] block"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              ADMIN DASHBOARD
            </span>
            <span
              className="text-sm font-semibold text-[oklch(0.93_0.005_265)]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Waitlist Management
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs text-[oklch(0.45_0.008_265)]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {user?.name ?? user?.email}
          </span>
          <a
            href="/"
            className="text-xs px-3 py-1.5 border border-white/[0.1] text-[oklch(0.55_0.01_265)] hover:text-[oklch(0.76_0.18_155)] hover:border-[oklch(0.76_0.18_155/0.3)] transition-all"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            ← Back to Site
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: countData?.total ?? 0, color: "text-[oklch(0.93_0.005_265)]" },
            { label: "Pending", value: countData?.pending ?? 0, color: "text-yellow-400" },
            { label: "Approved", value: countData?.approved ?? 0, color: "text-emerald-400" },
            { label: "Rejected", value: countData?.rejected ?? 0, color: "text-red-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-white/[0.06] bg-white/[0.02] rounded-sm p-4"
            >
              <p
                className="text-xs text-[oklch(0.45_0.008_265)] mb-1 tracking-widest uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {stat.label}
              </p>
              <p
                className={`text-3xl font-bold ${stat.color}`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-sm px-4 py-2 text-sm text-[oklch(0.85_0.005_265)] placeholder-[oklch(0.35_0.006_265)] outline-none focus:border-[oklch(0.76_0.18_155/0.4)] transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          <div className="flex gap-2">
            {(["all", "pending", "approved", "rejected"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 text-xs border rounded-sm transition-all capitalize ${
                  filter === s
                    ? "border-[oklch(0.76_0.18_155/0.5)] bg-[oklch(0.76_0.18_155/0.08)] text-[oklch(0.76_0.18_155)]"
                    : "border-white/[0.08] text-[oklch(0.45_0.008_265)] hover:border-white/[0.15]"
                }`}
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[oklch(0.76_0.18_155)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-white/[0.06] rounded-sm">
            <p
              className="text-[oklch(0.35_0.006_265)]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              &gt; No entries found.
            </p>
          </div>
        ) : (
          <div className="border border-white/[0.06] rounded-sm overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              {["#", "Name / Email", "Role", "Message", "Status", "Date", "Actions"].map((h, i) => (
                <div
                  key={h}
                  className={`text-xs text-[oklch(0.35_0.006_265)] tracking-widest uppercase ${
                    i === 0 ? "col-span-1" :
                    i === 1 ? "col-span-3" :
                    i === 2 ? "col-span-1" :
                    i === 3 ? "col-span-3" :
                    i === 4 ? "col-span-1" :
                    i === 5 ? "col-span-1" :
                    "col-span-2"
                  }`}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Table rows */}
            {filtered.map((entry, idx) => (
              <div
                key={entry.id}
                className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors items-start"
              >
                {/* # */}
                <div className="col-span-1">
                  <span
                    className="text-xs text-[oklch(0.35_0.006_265)]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {idx + 1}
                  </span>
                </div>

                {/* Name / Email */}
                <div className="col-span-3 min-w-0">
                  <p
                    className="text-sm font-medium text-[oklch(0.85_0.005_265)] truncate"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {entry.name ?? "—"}
                  </p>
                  <p
                    className="text-xs text-[oklch(0.45_0.008_265)] truncate"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {entry.email}
                  </p>
                </div>

                {/* Role */}
                <div className="col-span-1">
                  <span
                    className="text-xs px-2 py-0.5 border border-white/[0.1] text-[oklch(0.55_0.01_265)] rounded-sm"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {ROLE_LABELS[entry.role ?? "other"] ?? entry.role}
                  </span>
                </div>

                {/* Message */}
                <div className="col-span-3">
                  <p
                    className="text-xs text-[oklch(0.45_0.008_265)] leading-relaxed line-clamp-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {entry.message ?? "—"}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span
                    className={`text-xs px-2 py-0.5 border rounded-sm capitalize ${STATUS_COLORS[entry.status as WaitlistStatus] ?? STATUS_COLORS.pending}`}
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {entry.status}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-1">
                  <span
                    className="text-xs text-[oklch(0.35_0.006_265)]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {new Date(entry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex gap-1.5">
                  {entry.status !== "approved" && (
                    <button
                      onClick={() => updateStatus.mutate({ id: entry.id, status: "approved" })}
                      disabled={updateStatus.isPending}
                      className="text-xs px-2 py-1 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 transition-all rounded-sm disabled:opacity-50"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      ✓
                    </button>
                  )}
                  {entry.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus.mutate({ id: entry.id, status: "rejected" })}
                      disabled={updateStatus.isPending}
                      className="text-xs px-2 py-1 border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-all rounded-sm disabled:opacity-50"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      ✗
                    </button>
                  )}
                  {entry.status !== "pending" && (
                    <button
                      onClick={() => updateStatus.mutate({ id: entry.id, status: "pending" })}
                      disabled={updateStatus.isPending}
                      className="text-xs px-2 py-1 border border-white/[0.1] text-[oklch(0.45_0.008_265)] hover:border-white/[0.2] transition-all rounded-sm disabled:opacity-50"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      ↺
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <p
          className="text-xs text-[oklch(0.3_0.006_265)] mt-6 text-center"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Showing {filtered.length} of {entries.length} entries
        </p>
      </div>
    </div>
  );
}
