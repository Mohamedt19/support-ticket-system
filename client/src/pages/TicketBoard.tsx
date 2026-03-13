import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { apiRequest } from "../lib/api";
import type { Ticket } from "../types";

function PriorityBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    high: "border-red-500/20 bg-red-500/15 text-red-300",
    medium: "border-amber-500/20 bg-amber-500/15 text-amber-300",
    low: "border-sky-500/20 bg-sky-500/15 text-sky-300",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${styles[value] ?? "border-slate-700 bg-slate-800 text-slate-300"}`}
    >
      {value}
    </span>
  );
}

export default function TicketBoard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest<Ticket[]>("/api/tickets")
      .then(setTickets)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns = useMemo(() => {
    return {
      open: tickets.filter((ticket) => ticket.status === "open"),
      in_progress: tickets.filter((ticket) => ticket.status === "in_progress"),
      closed: tickets.filter((ticket) => ticket.status === "closed"),
    };
  }, [tickets]);

  const columnMeta = [
    { key: "open", title: "Open" },
    { key: "in_progress", title: "In Progress" },
    { key: "closed", title: "Closed" },
  ] as const;

  if (loading) {
    return <Loading text="Loading board..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Board</h1>
          <p className="mt-2 text-base text-slate-400">
            Kanban view of ticket workflow across statuses.
          </p>
        </div>

        <Link
          to="/tickets/new"
          className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-500"
        >
          New Ticket
        </Link>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {columnMeta.map((column) => {
          const items = columns[column.key];

          return (
            <section
              key={column.key}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                  {column.title}
                </h2>
                <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-400">
                  {items.length}
                </span>
              </div>

              <div className="space-y-3">
                {items.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-700 px-4 py-8 text-center text-sm text-slate-500">
                    No tickets
                  </div>
                ) : (
                  items.map((ticket) => (
                    <Link
                      key={ticket.id}
                      to={`/tickets/${ticket.id}`}
                      className="block rounded-xl border border-slate-800 bg-slate-950/70 p-4 transition hover:bg-slate-800"
                    >
                      <div className="font-medium text-white">{ticket.title}</div>
                      <div className="mt-2 text-xs text-slate-500">#{ticket.id}</div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <PriorityBadge value={ticket.priority} />
                        <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
                          {ticket.category?.name || "No category"}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}