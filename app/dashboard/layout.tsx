import type { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/sidebar";
import LogoutButton from "@/components/dashboard/logout-button";
import DashboardGuard from "@/components/dashboard/dashboard-guard";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <DashboardGuard>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="flex min-h-screen">
          <DashboardSidebar />

          <div className="flex min-h-screen flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">
                    Hoten Group Admin
                  </h1>
                  <p className="text-sm text-slate-600">
                    Real estate operations dashboard
                  </p>
                </div>

                <LogoutButton />
              </div>
            </header>

            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </div>
    </DashboardGuard>
  );
}