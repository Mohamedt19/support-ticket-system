import { useEffect, useState, type FormEvent } from "react";
import Loading from "../components/Loading";
import { apiRequest } from "../lib/api";
import type { Category } from "../types";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    try {
      setLoading(true);
      const data = await apiRequest<Category[]>("/api/categories");
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const newCategory = await apiRequest<Category>("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      setCategories((prev) => [...prev, newCategory]);
      setName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category");
    }
  }

  if (loading) {
    return <Loading text="Loading categories..." />;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Categories
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage ticket categories used across support workflows.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              New Category
            </label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-500"
          >
            Add Category
          </button>
        </form>

        {error && (
          <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Category List</h2>
          <span className="text-sm text-slate-500">{categories.length} total</span>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 px-4 py-8 text-center text-sm text-slate-500">
            No categories yet.
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-4"
              >
                <div className="font-medium text-white">{cat.name}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}