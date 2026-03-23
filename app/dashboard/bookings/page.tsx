"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/data-table";
import PageShell from "@/components/dashboard/page-shell";
import { Booking, getBookings } from "@/lib/api/bookings";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  return (
    <PageShell
      title="Bookings"
      description="Inspection bookings coming from your FastAPI backend."
      action={
        <div className="inline-flex rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
          Total: {bookings.length}
        </div>
      }
    >
      {loading ? (
        <div className="rounded-3xl bg-white p-6 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
          Loading bookings...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : (
        <DataTable
          rows={bookings}
          emptyMessage="No bookings found yet."
          columns={[
            {
              key: "name",
              header: "Name",
              render: (booking) => (
                <span className="font-semibold text-slate-900">
                  {booking.full_name}
                </span>
              ),
            },
            {
              key: "email",
              header: "Email",
              render: (booking) => booking.email,
            },
            {
              key: "address",
              header: "Address",
              render: (booking) => booking.property_address,
            },
            {
              key: "date",
              header: "Date",
              render: (booking) => booking.preferred_date,
            },
            {
              key: "time",
              header: "Time",
              render: (booking) => booking.preferred_time,
            },
            {
              key: "status",
              header: "Status",
              render: (booking) => (
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  {booking.status}
                </span>
              ),
            },
          ]}
        />
      )}
    </PageShell>
  );
}