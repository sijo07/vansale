import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "./AppHeader";

export default function AppLayout({ role }: { role: "admin" | "user" }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Single Header for both roles */}
      <AppHeader role={role} />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
