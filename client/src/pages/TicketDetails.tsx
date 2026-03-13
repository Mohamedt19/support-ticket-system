import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { apiRequest } from "../lib/api";
import type { Ticket, TicketStatus } from "../types";

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

export default function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comment, setComment] = useState("");

  async function loadTicket() {
    if (!id) return;
    const data = await apiRequest<Ticket>(`/api/tickets/${id}`);
    setTicket(data);
  }

  useEffect(() => {
    loadTicket().catch(console.error);
  }, [id]);

  async function handleDelete() {
    if (!id) return;
    await apiRequest(`/api/tickets/${id}`, { method: "DELETE" });
    navigate("/tickets");
  }

  async function handleStatusChange(status: TicketStatus) {
    if (!id) return;
    await apiRequest<Ticket>(`/api/tickets/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await loadTicket();
  }

  async function handleCommentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id || !comment.trim()) return;

    await apiRequest(`/api/tickets/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: comment }),
    });

    setComment("");
    await loadTicket();
  }

  if (!ticket) {
    return <Loading text="Loading ticket..." />;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {ticket.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                {ticket.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to={`/tickets/${id}/edit`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
              >
                Edit Ticket
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge value={ticket.status} />
            <PriorityBadge value={ticket.priority} />
            <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
              {ticket.category?.name || "No category"}
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Comments</h2>
            <span className="text-sm text-slate-500">
              {ticket.comments?.length || 0} total
            </span>
          </div>

          {ticket.comments && ticket.comments.length > 0 ? (
            <div className="space-y-3">
              {ticket.comments.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-medium text-white">{c.user.name}</div>
                    <div className="text-xs text-slate-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-3 text-sm leading-7 text-slate-300">
                    {c.content}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-700 px-4 py-8 text-center text-sm text-slate-500">
              No comments yet.
            </div>
          )}

          <form onSubmit={handleCommentSubmit} className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Add Comment
            </label>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-500"
              >
                Add
              </button>
            </div>
          </form>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white">Ticket Metadata</h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Status
              </div>
              <div className="mt-2">
                <StatusBadge value={ticket.status} />
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Priority
              </div>
              <div className="mt-2">
                <PriorityBadge value={ticket.priority} />
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Category
              </div>
              <div className="mt-2 text-sm text-slate-200">
                {ticket.category?.name || "No category"}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Ticket ID
              </div>
              <div className="mt-2 text-sm text-slate-200">#{ticket.id}</div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white">Quick Actions</h2>

          <div className="mt-5 grid gap-3">
            <button
              onClick={() => handleStatusChange("open")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Mark Open
            </button>
            <button
              onClick={() => handleStatusChange("in_progress")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Mark In Progress
            </button>
            <button
              onClick={() => handleStatusChange("closed")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Mark Closed
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}