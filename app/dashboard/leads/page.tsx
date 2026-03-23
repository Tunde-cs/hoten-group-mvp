"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/data-table";
import PageShell from "@/components/dashboard/page-shell";
import { getLeads, Lead } from "@/lib/api/leads";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLeads() {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load leads.");
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, []);

  return (
    <PageShell
      title="Leads"
      description="Seller leads coming from your backend."
      action={
        <div className="inline-flex rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
          Total: {leads.length}
        </div>
      }
    >
      {loading ? (
        <div className="rounded-3xl bg-white p-6 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
          Loading leads...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : (
        <DataTable
          rows={leads}
          emptyMessage="No leads found yet."
          columns={[
            {
              key: "name",
              header: "Name",
              render: (lead) => (
                <span className="font-semibold text-slate-900">
                  {lead.full_name}
                </span>
              ),
            },
            { key: "email", header: "Email", render: (lead) => lead.email },
            { key: "phone", header: "Phone", render: (lead) => lead.phone || "-" },
            {
              key: "address",
              header: "Address",
              render: (lead) => lead.address || "-",
            },
            {
              key: "status",
              header: "Status",
              render: (lead) => (
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                  {lead.status}
                </span>
              ),
            },
          ]}
        />
      )}
    </PageShell>
  );
}