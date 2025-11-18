import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e: React.FormEvent) => {
    e.preventDefault();

    // Save admin details in localStorage (Frontend only)
    const adminData = {
      name,
      phone,
      email,
      password,
    };

    localStorage.setItem("admin_account", JSON.stringify(adminData));

    alert("Admin account created successfully!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-200 to-indigo-200">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Signup</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={signUp} className="space-y-4">

            {/* Admin Name */}
            <div>
              <label className="text-sm font-medium">Admin Name</label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Admin Phone */}
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Admin Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Admin Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Create Admin Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
