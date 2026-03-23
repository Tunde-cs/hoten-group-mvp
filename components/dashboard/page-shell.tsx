import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function PageShell({
  title,
  description,
  action,
  children,
}: PageShellProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          </div>

          {action ? <div>{action}</div> : null}
        </div>
      </div>

      {children}
    </section>
  );
}