import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

interface Customer {
  id: string;
  customer_code: string;
  name: string;
  phone: string | null;
  email: string | null;
  city: string | null;
  outstanding_balance: number;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Customer>>({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      toast.error("Failed to load customers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (customer: Customer) => {
    setEditingId(customer.id);
    setEditFormData({ ...customer });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const { error } = await supabase
        .from("customers")
        .update(editFormData)
        .eq("id", id);

      if (error) throw error;

      toast.success("Customer updated successfully!");
      setEditingId(null);
      setEditFormData({});
      fetchCustomers();
    } catch (error) {
      toast.error("Failed to update customer");
      console.error(error);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customer_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div className="space-y-10 max-w-7xl mx-auto py-8 px-4">
      {/* Page Header */}
      <div className="p-8 rounded-3xl primary-gradient text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Clients</h1>
          <p className="mt-2 text-lg opacity-90">
            Manage your customer database efficiently
          </p>
        </div>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl glass-card shadow-lg"
          />
        </div>
        <Link to="/customers/new">
          <Button className="rounded-xl px-5 py-3 primary-gradient text-white hover-lift shadow-xl flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add Customer
          </Button>
        </Link>
      </div>

      {/* Customers Grid */}
      {loading ? (
        <p className="text-center text-gray-600 text-lg py-8">
          Loading customers...
        </p>
      ) : filteredCustomers.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="text-center py-8 text-gray-600">
            {searchTerm
              ? "No customers found matching your search"
              : "No customers yet. Add your first customer to get started."}
          </CardContent>
        </Card>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCustomers.map((customer) => (
            <motion.div
              key={customer.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex"
            >
              <Card className="flex-1 flex flex-col rounded-2xl glass-card shadow-xl hover:shadow-2xl transition-all border border-white/30 backdrop-blur-lg min-h-[300px]">
                <CardContent className="p-6 flex flex-col flex-1 justify-between">
                  {editingId === customer.id ? (
                    <div className="space-y-3 flex-1">
                      <Input
                        value={editFormData.name}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            name: e.target.value,
                          })
                        }
                        className="rounded-xl bg-white/60"
                        placeholder="Customer Name"
                      />
                      <Input
                        value={editFormData.customer_code}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            customer_code: e.target.value,
                          })
                        }
                        className="rounded-xl bg-white/60"
                        placeholder="Customer Code"
                      />
                      <Input
                        value={editFormData.phone || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            phone: e.target.value,
                          })
                        }
                        className="rounded-xl bg-white/60"
                        placeholder="Phone"
                      />
                      <Input
                        value={editFormData.email || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            email: e.target.value,
                          })
                        }
                        className="rounded-xl bg-white/60"
                        placeholder="Email"
                      />
                      <Input
                        value={editFormData.city || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            city: e.target.value,
                          })
                        }
                        className="rounded-xl bg-white/60"
                        placeholder="City"
                      />
                      <Input
                        type="number"
                        value={editFormData.outstanding_balance || 0}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            outstanding_balance: Number(e.target.value),
                          })
                        }
                        className="rounded-xl bg-white/60"
                        placeholder="Outstanding"
                      />

                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          size="sm"
                          className="rounded-xl bg-green-600 text-white hover:bg-green-700"
                          onClick={() => handleSaveEdit(customer.id)}
                        >
                          <Check className="h-4 w-4" /> Save
                        </Button>
                        <Button
                          size="sm"
                          className="rounded-xl bg-gray-300 text-gray-900 hover:bg-gray-400"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {customer.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {customer.customer_code}
                        </p>

                        <div className="flex flex-col gap-1 text-gray-700 text-sm mt-2">
                          {customer.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {customer.phone}
                            </div>
                          )}
                          {customer.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              {customer.email}
                            </div>
                          )}
                          {customer.city && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              {customer.city}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 mt-4 border-t border-white/40 flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">
                          Outstanding: ₹
                          {Number(
                            customer.outstanding_balance || 0
                          ).toLocaleString()}
                        </p>
                        <Button
                          size="sm"
                          className="rounded-xl primary-gradient text-white hover-lift shadow-lg"
                          onClick={() => handleEditClick(customer)}
                        >
                          <Edit2 className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
