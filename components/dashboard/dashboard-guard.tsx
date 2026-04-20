"use client";

import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { hasSession } from "@/lib/auth/session";

type DashboardGuardProps = {
  children: ReactNode;
};

function subscribeToHydration() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function DashboardGuard({ children }: DashboardGuardProps) {
  const router = useRouter();
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot
  );
  const sessionAvailable = hydrated && hasSession();

  useEffect(() => {
    if (hydrated && !sessionAvailable) {
      const next = `${window.location.pathname}${window.location.search}`;
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [hydrated, router, sessionAvailable]);

  if (!sessionAvailable) {
    return (
      <div className="rounded-3xl bg-white p-6 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}
