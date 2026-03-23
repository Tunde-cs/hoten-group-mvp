"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasSession } from "@/lib/auth/session";

type DashboardGuardProps = {
  children: ReactNode;
};

export default function DashboardGuard({ children }: DashboardGuardProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!hasSession()) {
      const next = `${window.location.pathname}${window.location.search}`;
      router.replace(`/login?next=${encodeURIComponent(next)}`);
      return;
    }

    setChecked(true);
  }, [router]);

  if (!checked) {
    return (
      <div className="rounded-3xl bg-white p-6 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}