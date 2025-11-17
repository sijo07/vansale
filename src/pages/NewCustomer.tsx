import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NewCustomer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_code: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const generateCustomerCode = async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("customer_code")
        .order("id", { ascending: false })
        .limit(1);

      if (error) return console.error(error);

      let newCodeNumber = 1;
      if (data && data.length > 0) {
        const lastCode = data[0].customer_code;
        const num = parseInt(lastCode.split("-")[1]);
        newCodeNumber = num + 1;
      }

      setFormData((prev) => ({
        ...prev,
        customer_code: `CUST-${String(newCodeNumber).padStart(3, "0")}`,
      }));
    };

    generateCustomerCode();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("customers").insert({
        customer_code: formData.customer_code,
        name: formData.name,
        phone: formData.phone || null,
        email: formData.email || null,
        address: formData.address || null,
        city: formData.city || null,
        state: formData.state || null,
      });

      if (error) throw error;

      toast.success("Customer created successfully");
      navigate("/customers");
    } catch (error: any) {
      toast.error(error.message || "Failed to create customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 sticky top-0 primary-gradient text-white backdrop-blur-xl rounded-2xl p-4 shadow-xl z-10 border border-white/20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover-lift bg-white/20"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>

        <div>
          <h2 className="text-3xl font-bold drop-shadow-sm">New Customer</h2>
          <p className="opacity-80 text-sm">
            Fill in the details to add a new customer
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="glass-card hover-lift shadow-2xl rounded-3xl border border-white/20">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-white/30 rounded-t-3xl">
          <CardTitle className="text-2xl font-bold text-blue-900">
            Customer Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Customer Code */}
              <div className="space-y-2">
                <Label htmlFor="customer_code">Customer Code</Label>
                <Input
                  id="customer_code"
                  value={formData.customer_code}
                  readOnly
                  className="rounded-xl bg-gray-100 cursor-not-allowed text-gray-700 shadow-md"
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md"
                />
              </div>

              {/* Address */}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={3}
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md"
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md"
                />
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-start pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="primary-gradient hover-lift rounded-xl px-6 py-4 shadow-lg text-white"
              >
                {loading ? "Creating..." : "Create Customer"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="rounded-xl px-6 py-4 border-gray-300 text-gray-700 hover:bg-gray-50 shadow-md hover-lift"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
