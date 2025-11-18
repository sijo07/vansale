import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function AppHeader({ role }: { role: "admin" | "user" }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    if (role === "admin") {
      const admin = JSON.parse(localStorage.getItem("admin_account") || "{}");
      setUser({
        name: admin.name || "Admin",
        email: admin.email || "admin@example.com",
      });
    } else {
      const u = JSON.parse(localStorage.getItem("current_user") || "{}");
      setUser({ name: u.name || "User", email: u.email || "user@example.com" });
    }
  }, [role]);

  const logout = () => {
    localStorage.removeItem(`${role}_token`);
    localStorage.removeItem("current_user");
    navigate("/login");
  };

  const userLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/stock", label: "Stock" },
    { to: "/sales", label: "Sales" },
    { to: "/transfers", label: "Transfers" },
    { to: "/orders", label: "Orders" },
    { to: "/reports", label: "Reports" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/vans", label: "Vans" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* LOGO */}
        <h1 className="text-xl font-bold text-indigo-600 cursor-pointer uppercase flex items-center gap-2">
          TPoz
          <span className="text-sm text-gray-500 font-normal">
            {role === "admin" ? "Admin" : "User"}
          </span>
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium ${
                isActive(link.to)
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-all duration-200 shadow-sm"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-lg">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl p-4 animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-lg">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <hr className="my-3 border-gray-200" />
                <button
                  onClick={logout}
                  className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MODERN MOBILE MENU */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex justify-end">
          <div className="w-72 h-full bg-white/95 backdrop-blur-md shadow-2xl p-6 flex flex-col justify-between animate-slide-in-right relative">
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              <X size={28} />
            </button>

            <div className="space-y-6 mt-10">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block font-medium text-lg py-2 px-3 rounded-lg transition-all duration-200 ${
                    isActive(link.to)
                      ? "bg-indigo-100 text-indigo-600"
                      : "hover:bg-indigo-50 hover:text-indigo-600 text-gray-800"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* USER INFO */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-lg">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
