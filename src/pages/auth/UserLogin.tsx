import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function UserLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Autofill from home login redirect
  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
    if (location.state?.password) setPassword(location.state.password);
  }, [location.state]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    // FINAL FIX — unify storage key
    const users =
      JSON.parse(localStorage.getItem("users_list")) ||
      JSON.parse(localStorage.getItem("users")) ||
      [];

    if (!Array.isArray(users)) {
      alert("User data corrupted!");
      return;
    }

    const found = users.find(
      (u: any) =>
        u.email?.trim() === email.trim() &&
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-200 to-pink-200">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">User Login</CardTitle>
        </CardHeader>

        <CardContent>
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
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
