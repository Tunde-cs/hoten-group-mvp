import PageShell from "@/components/dashboard/page-shell";

export default function SettingsPage() {
  return (
    <PageShell
      title="Settings"
      description="Business settings and admin configuration will live here."
    >
      <div className="rounded-3xl bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
        This section is scaffolded and ready for settings integration.
      </div>
    </PageShell>
  );
}