import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  // Load users from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users_list") || "[]");
    setUsers(stored);
  }, []);

  // Save users back to localStorage
  const saveUsers = (newList: any[]) => {
    localStorage.setItem("users_list", JSON.stringify(newList));
    setUsers(newList);
  };

  const createUser = () => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    const password = Math.random().toString(36).slice(-6);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    const updated = [...users, newUser];
    saveUsers(updated);

    alert(`User created!\nTemp Password: ${password}`);

    setName("");
    setEmail("");
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold">User Management</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Create and manage users
        </p>
      </div>

      {/* Create User Form */}
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Input
              className="flex-1"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="flex-1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="sm:w-auto w-full" onClick={createUser}>
              Create User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {users.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center">
              No users found
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="border p-3 rounded-lg shadow-sm bg-white"
                >
                  <p className="font-medium text-gray-800">{u.name}</p>
                  <p className="text-sm text-muted-foreground">{u.email}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
