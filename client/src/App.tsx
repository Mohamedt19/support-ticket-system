import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import AppShell from "./components/AppShell";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketBoard from "./pages/TicketBoard";
import NewTicket from "./pages/NewTicket";
import TicketDetails from "./pages/TicketDetails";
import EditTicket from "./pages/EditTicket";
import Categories from "./pages/Categories";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/board" element={<TicketBoard />} />
        <Route path="/tickets/new" element={<NewTicket />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/tickets/:id/edit" element={<EditTicket />} />
        <Route path="/categories" element={<Categories />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="min-h-screen bg-slate-950 p-10 text-slate-100">
            Not Found
          </div>
        }
      />
    </Routes>
  );
}