import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersManagement() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [vanDetails, setVanDetails] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Load users
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users_list") || "[]");
    setUsers(stored);
  }, []);

  const saveUsers = (list: any[]) => {
    localStorage.setItem("users_list", JSON.stringify(list));
    setUsers(list);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setVanDetails("");
    setPassword("");
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (!name || !email || !phone) {
      alert("Name, Email & Phone required.");
      return;
    }

    const vanId = "VAN-" + Math.floor(100000 + Math.random() * 900000);

    if (editId) {
      const updated = users.map((u) =>
        u.id === editId
          ? { ...u, name, phone, email, address, vanDetails, password }
          : u
      );
      saveUsers(updated);
      alert("User updated");
    } else {
      const user = {
        id: Date.now(),
        name,
        phone,
        email,
        address,
        vanDetails,
        vanId,
        password: password || Math.random().toString(36).slice(-6),
      };
      saveUsers([...users, user]);
      alert(`User Created!\nUser Password: ${user.password}`);
    }

    resetForm();
  };

  const deleteUser = (id: number) => {
    if (!confirm("Delete this user?")) return;
    saveUsers(users.filter((u) => u.id !== id));
  };

  const editUser = (u: any) => {
    setEditId(u.id);
    setName(u.name);
    setPhone(u.phone);
    setEmail(u.email);
    setAddress(u.address);
    setVanDetails(u.vanDetails);
    setPassword(u.password);
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button onClick={() => setShowModal(true)}>+ Add User</Button>
      </div>

      {/* USERS LIST */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {users.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center">
              No users found
            </p>
          ) : (
            users.map((u) => (
              <div
                key={u.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-muted-foreground">{u.email}</p>
                  <p className="text-sm">📞 {u.phone}</p>
                  <p className="text-sm">🚐 Van: {u.vanDetails}</p>
                  <p className="text-sm text-blue-600 font-medium">
                    Van ID: {u.vanId}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editUser(u)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{editId ? "Edit User" : "Create User"}</CardTitle>
              <Button variant="ghost" onClick={resetForm}>
                ✕
              </Button>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                placeholder="Van Details"
                value={vanDetails}
                onChange={(e) => setVanDetails(e.target.value)}
              />
              <Input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="col-span-1 md:col-span-2 flex gap-3">
                <Button onClick={handleSubmit} className="w-full">
                  {editId ? "Update User" : "Create User"}
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
