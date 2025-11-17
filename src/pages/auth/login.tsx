import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    // ------------------------
    // ADMIN LOGIN
    // ------------------------
    if (role === "admin") {
      const admin = JSON.parse(localStorage.getItem("admin_account") || "{}");

      if (admin.email === email && admin.password === password) {
        localStorage.setItem("admin_token", "logged_in");
        navigate("/admin/dashboard");
      } else {
        alert("Invalid admin credentials");
      }
      return;
    }

    // ------------------------
    // USER LOGIN
    // ------------------------
    const users = JSON.parse(localStorage.getItem("users_list") || "[]");

    const found = users.find(
      (u: any) =>
        String(u.email).trim() === String(email).trim() &&
        String(u.password).trim() === String(password).trim()
    );

    if (found) {
      localStorage.setItem("user_token", "logged_in");
      localStorage.setItem("current_user", JSON.stringify(found));
      navigate("/");
    } else {
      alert("Invalid user credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-200 to-indigo-200">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>

        <CardContent>
          {/* ROLE SWITCH TABS */}
          <div className="flex items-center justify-center mb-6">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                role === "user" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                role === "admin" ? "bg-indigo-500 text-white" : "bg-white"
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button className="w-full" type="submit">
              Login as {role === "admin" ? "Admin" : "User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
