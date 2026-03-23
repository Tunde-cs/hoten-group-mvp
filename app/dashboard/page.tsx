"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/dashboard/page-shell";
import StatCard from "@/components/dashboard/stat-card";
import {
  DashboardSummary,
  getDashboardSummary,
} from "@/lib/api/dashboard";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  return (
    <PageShell
      title="Overview"
      description="Live summary from your FastAPI backend."
    >
      {loading ? (
        <div className="rounded-3xl bg-white p-6 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
          Loading dashboard...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : summary ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Leads" value={summary.total_leads} />
          <StatCard label="Total Bookings" value={summary.total_bookings} />
          <StatCard label="Total Messages" value={summary.total_messages} />
          <StatCard label="Pending Tasks" value={summary.pending_tasks} />
        </div>
      ) : null}
    </PageShell>
  );
}