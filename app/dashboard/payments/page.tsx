import PageShell from "@/components/dashboard/page-shell";

export default function PaymentsPage() {
  return (
    <PageShell
      title="Payments"
      description="Stripe and payment operations will be connected here."
    >
      <div className="rounded-3xl bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
        This section is scaffolded and ready for payment integration.
      </div>
    </PageShell>
  );
}