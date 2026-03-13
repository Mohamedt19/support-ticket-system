import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { apiRequest } from "../lib/api";
import type { Ticket } from "../types";

function StatusBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    open: "border-red-500/20 bg-red-500/15 text-red-300",
    in_progress: "border-amber-500/20 bg-amber-500/15 text-amber-300",
    closed: "border-emerald-500/20 bg-emerald-500/15 text-emerald-300",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${styles[value] ?? "border-slate-700 bg-slate-800 text-slate-300"}`}
    >
      {value.replace("_", " ")}
    </span>
  );
}

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

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = status ? `/api/tickets?status=${status}` : "/api/tickets";
    setLoading(true);

    apiRequest<Ticket[]>(url)
      .then(setTickets)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [status]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) =>
      ticket.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tickets, search]);

  if (loading) {
    return <Loading text="Loading tickets..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Tickets</h1>
          <p className="mt-2 text-base text-slate-400">
            Manage, search, and update support tickets.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tickets..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500 sm:w-72"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
          >
            <option value="">All statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <Link
            to="/tickets/new"
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-500"
          >
            New Ticket
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="grid grid-cols-[2.2fr_1fr_1fr_1.2fr_110px] border-b border-slate-800 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          <div>Title</div>
          <div>Status</div>
          <div>Priority</div>
          <div>Category</div>
          <div>Action</div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-400">
            No tickets found.
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="grid grid-cols-[2.2fr_1fr_1fr_1.2fr_110px] items-center border-b border-slate-800 px-6 py-4 text-sm transition hover:bg-slate-800/60"
            >
              <div className="pr-4">
                <div className="font-medium text-white">{ticket.title}</div>
                <div className="mt-1 text-xs text-slate-500">#{ticket.id}</div>
              </div>
              <div>
                <StatusBadge value={ticket.status} />
              </div>
              <div>
                <PriorityBadge value={ticket.priority} />
              </div>
              <div className="text-slate-300">
                {ticket.category?.name || "No category"}
              </div>
              <div>
                <Link
                  to={`/tickets/${ticket.id}`}
                  className="text-sm font-medium text-sky-400 transition hover:text-sky-300"
                >
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}