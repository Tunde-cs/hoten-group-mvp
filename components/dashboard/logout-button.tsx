"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/auth/session";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
    >
      Logout
    </button>
  );
}