"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/bookings", label: "Bookings" },
  { href: "/dashboard/messages", label: "Messages" },
  { href: "/dashboard/properties", label: "Properties" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/payments", label: "Payments" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white lg:flex lg:flex-col">
      <div className="border-b border-slate-800 px-6 py-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Hoten Group
        </h2>
        <p className="mt-1 text-sm text-slate-400">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}