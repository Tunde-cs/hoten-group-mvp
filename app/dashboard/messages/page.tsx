"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/data-table";
import PageShell from "@/components/dashboard/page-shell";
import { getMessages, Message } from "@/lib/api/messages";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load messages."
        );
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, []);

  return (
    <PageShell
      title="Messages"
      description="Contact messages coming from your backend."
      action={
        <div className="inline-flex rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
          Total: {messages.length}
        </div>
      }
    >
      {loading ? (
        <div className="rounded-3xl bg-white p-6 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
          Loading messages...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : (
        <DataTable
          rows={messages}
          emptyMessage="No messages found yet."
          columns={[
            {
              key: "name",
              header: "Name",
              render: (message) => (
                <span className="font-semibold text-slate-900">
                  {message.full_name}
                </span>
              ),
            },
            {
              key: "email",
              header: "Email",
              render: (message) => message.email,
            },
            {
              key: "subject",
              header: "Subject",
              render: (message) => message.subject || "-",
            },
            {
              key: "message",
              header: "Message",
              render: (message) => (
                <span className="line-clamp-2">{message.message}</span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (message) => (
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                  {message.status}
                </span>
              ),
            },
          ]}
        />
      )}
    </PageShell>
  );
}