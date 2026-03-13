import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const navLink =
  "rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white";
const activeNavLink =
  "rounded-xl bg-slate-800 px-3 py-2 text-sm font-medium text-white";

function pageTitle(pathname: string) {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/tickets/new")) return "Create Ticket";
  if (pathname.startsWith("/tickets/") && pathname.endsWith("/edit")) {
    return "Edit Ticket";
  }
  if (pathname.startsWith("/tickets/")) return "Ticket Details";
  if (pathname.startsWith("/tickets")) return "Tickets";
  if (pathname.startsWith("/board")) return "Board";
  if (pathname.startsWith("/categories")) return "Categories";
  return "Support Ticket System";
}

export default function AppShell() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="hidden w-64 border-r border-slate-800 bg-slate-900 lg:block">
        <div className="flex h-full flex-col p-6">
          <div className="mb-8">
            <div className="text-lg font-semibold text-white">
              Support Ticket System
            </div>
            <div className="mt-1 text-sm text-slate-400">
              Support workflow management
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? activeNavLink : navLink)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tickets"
              className={({ isActive }) => (isActive ? activeNavLink : navLink)}
            >
              Tickets
            </NavLink>
            <NavLink
              to="/board"
              className={({ isActive }) => (isActive ? activeNavLink : navLink)}
            >
              Board
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) => (isActive ? activeNavLink : navLink)}
            >
              Categories
            </NavLink>
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="text-sm font-medium text-white">Mohamed</div>
            <div className="mt-1 text-xs text-slate-400">Authenticated user</div>
            <button
              onClick={handleLogout}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-lg font-semibold text-white">
                {pageTitle(location.pathname)}
              </div>
              <div className="mt-1 text-sm text-slate-400">
              Ticket tracking and issue management
              </div>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <div className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">
                Internal tool
              </div>
              
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}