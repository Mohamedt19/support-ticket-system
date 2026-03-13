import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { apiRequest } from "../lib/api";
import type { DashboardSummary, Ticket } from "../types";

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

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiRequest<DashboardSummary>("/api/dashboard/summary"),
      apiRequest<Ticket[]>("/api/tickets"),
    ])
      .then(([summaryData, ticketsData]) => {
        setSummary(summaryData);
        setTickets(ticketsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const recentTickets = useMemo(() => tickets.slice(0, 4), [tickets]);

  const statusBreakdown = useMemo(() => {
    if (!summary) return [];
    return [
      { label: "Open", value: summary.openTickets },
      { label: "In Progress", value: summary.inProgressTickets },
      { label: "Closed", value: summary.closedTickets },
    ];
  }, [summary]);

  if (loading) {
    return <Loading text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="mt-2 text-base text-slate-400">
          Overview of ticket activity and current support workload.
        </p>
      </div>

      {summary && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Total Tickets", summary.totalTickets],
            ["Open", summary.openTickets],
            ["In Progress", summary.inProgressTickets],
            ["Closed", summary.closedTickets],
            ["High Priority", summary.highPriorityTickets],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm"
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-3 text-4xl font-bold tracking-tight text-white">
                {value}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Tickets</h2>
            <Link
              to="/tickets"
              className="text-sm font-medium text-sky-400 transition hover:text-sky-300"
            >
              View all
            </Link>
          </div>

          {recentTickets.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 px-4 py-10 text-center text-sm text-slate-400">
              No tickets yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  to={`/tickets/${ticket.id}`}
                  className="block rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-4 transition hover:bg-slate-800"
                >
                  <div className="font-medium text-white">{ticket.title}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <StatusBadge value={ticket.status} />
                    <PriorityBadge value={ticket.priority} />
                    <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
                      {ticket.category?.name || "No category"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Status Breakdown</h2>

          <div className="space-y-5">
            {statusBreakdown.map((item) => {
              const max = summary?.totalTickets || 1;
              const width = Math.max(8, Math.round((item.value / max) * 100));

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-medium text-white">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-sky-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}