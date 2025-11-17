import { useState, useEffect } from "react";
import { DollarSign, RotateCcw, Truck, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Dummy Data (can be fetched dynamically from Supabase)
const dailySalesData = [
  { day: "Mon", sales: 12500 },
  { day: "Tue", sales: 15200 },
  { day: "Wed", sales: 13800 },
  { day: "Thu", sales: 17400 },
  { day: "Fri", sales: 19200 },
  { day: "Sat", sales: 22100 },
  { day: "Sun", sales: 16800 },
];

const productData = [
  { name: "Beverages", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Snacks", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Dairy", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Frozen", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Others", value: 5, color: "hsl(var(--chart-5))" },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [totalSales, setTotalSales] = useState(124500);
  const [totalReturns, setTotalReturns] = useState(8250);
  const [activeVans, setActiveVans] = useState(12);
  const [pendingTransfers, setPendingTransfers] = useState(5);
  const [salesData, setSalesData] = useState(dailySalesData);
  const [productDistribution, setProductDistribution] = useState(productData);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: sales, error: salesError } = await supabase
        .from("sales")
        .select("*");
      if (salesError) throw salesError;
      if (sales) {
        const total = sales.reduce(
          (sum, s) => sum + s.quantity * s.unit_price,
          0
        );
        setTotalSales(total);

        const daily = [...dailySalesData].map((d, idx) => ({
          ...d,
          sales: sales[idx]?.quantity * sales[idx]?.unit_price || d.sales,
        }));
        setSalesData(daily);
      }

      const { data: returns, error: returnsError } = await supabase
        .from("returns")
        .select("*");
      if (returnsError) throw returnsError;
      if (returns) {
        const totalR = returns.reduce((sum, r) => sum + r.amount, 0);
        setTotalReturns(totalR);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch data",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSync = () => {
    toast({
      title: "Syncing Data...",
      description: "Fetching latest dashboard data",
    });
    fetchDashboardData();
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-2xl primary-gradient text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-white/10 rounded-full -mr-20 -mt-20 md:-mr-32 md:-mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full -ml-16 -mb-16 md:-ml-24 md:-mb-24"></div>
        <div className="relative z-10 flex-1">
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-base md:text-lg opacity-90">
            Welcome back! Here's your sales overview.
          </p>
        </div>
        <Button
          className="bg-white text-primary hover:bg-white/90 shadow-xl hover-lift z-10 px-6 md:px-8 py-3 md:py-6 text-base md:text-lg w-full md:w-auto"
          onClick={handleSync}
        >
          Sync Data
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Sales"
          value={`₹${totalSales.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: "12.5% from last week", isPositive: true }}
          iconBgColor="primary-gradient"
        />
        <StatCard
          title="Total Returns"
          value={`₹${totalReturns.toLocaleString()}`}
          icon={RotateCcw}
          trend={{ value: "3.2% from last week", isPositive: false }}
          iconBgColor="accent-gradient"
        />
        <StatCard
          title="Active Vans"
          value={activeVans.toString()}
          icon={Truck}
          iconBgColor="secondary-gradient"
        />
        <StatCard
          title="Pending Transfers"
          value={pendingTransfers.toString()}
          icon={Package}
          iconBgColor="bg-warning"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="lg:col-span-2 glass-card shadow-2xl hover-lift min-h-[300px]">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-xl text-blue-900">
              Daily Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="sales"
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card shadow-2xl hover-lift min-h-[300px]">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
            <CardTitle className="text-xl text-teal-900">
              Product Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
