import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Truck,
  Users,
  ArrowLeftRight,
  IndianRupee,
  AlertTriangle,
  Package,
  RefreshCw,
} from "lucide-react";

// Dummy Data
const vans = [
  {
    id: "VAN-101",
    stock: 120,
    returns: 18,
    transfers: 12,
    sales: 2300,
    driver: "Ramesh",
  },
  {
    id: "VAN-202",
    stock: 40,
    returns: 22,
    transfers: 8,
    sales: 1800,
    driver: "Suresh",
  },
  {
    id: "VAN-303",
    stock: 12,
    returns: 10,
    transfers: 15,
    sales: 3100,
    driver: "Mahesh",
  },
  {
    id: "VAN-404",
    stock: 80,
    returns: 5,
    transfers: 9,
    sales: 2900,
    driver: "Kiran",
  },
];

const monthlySales = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 650 },
  { month: "Mar", sales: 900 },
  { month: "Apr", sales: 700 },
  { month: "May", sales: 1100 },
  { month: "Jun", sales: 950 },
];

const pieData = [
  { name: "Distributed", value: 65, color: "#34d399" },
  { name: "Remaining", value: 20, color: "#f87171" },
  { name: "Pending", value: 15, color: "#facc15" },
];

export default function AdminDashboard() {
  const [selectedVan, setSelectedVan] = useState(null);
  const totalVans = vans.length;
  const totalSales = vans.reduce((a, b) => a + b.sales, 0);
  const lowStockVans = vans.filter((v) => v.stock < 50);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Overview of vans, warehouse activity & sales performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          {
            title: "Total Vans",
            value: totalVans,
            icon: Truck,
            color: "text-blue-600",
          },
          {
            title: "Total Drivers",
            value: 12,
            icon: Users,
            color: "text-green-600",
          },
          {
            title: "Total Transfers",
            value: 58,
            icon: ArrowLeftRight,
            color: "text-yellow-600",
          },
          {
            title: "Total Sales",
            value: `₹${totalSales}`,
            icon: IndianRupee,
            color: "text-red-600",
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="flex-1 shadow-lg rounded-2xl border border-gray-200"
            >
              <CardContent className="flex justify-between items-center pt-4 md:pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <h2 className="text-2xl md:text-3xl font-bold mt-1">
                    {card.value}
                  </h2>
                </div>
                <Icon className={`h-8 w-8 md:h-10 md:w-10 ${card.color}`} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {lowStockVans.length > 0 && (
          <Card className="flex-1 border-red-300 bg-red-50 shadow-lg rounded-2xl">
            <CardHeader className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-700 text-sm md:text-base">
                Low Stock Vans
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lowStockVans.map((van) => (
                <div
                  key={van.id}
                  className="flex justify-between text-sm text-red-700"
                >
                  <span>
                    {van.id} ({van.driver})
                  </span>
                  <span className="font-semibold">{van.stock} units</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col gap-4">
          <Card className="flex-1 shadow-lg rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-sm md:text-base">
                Recent Transfers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded bg-muted/30">
                <span>VAN-101 → VAN-202</span>
                <span className="font-semibold">22 items</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-muted/30">
                <span>VAN-303 → VAN-404</span>
                <span className="font-semibold">14 items</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-muted/30">
                <span>Warehouse → VAN-101</span>
                <span className="font-semibold">35 items</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="flex-1 border shadow-lg rounded-2xl p-4">
        <CardHeader>
          <CardTitle className="text-sm md:text-base">
            Select / Add Van
          </CardTitle>
        </CardHeader>

        {/* Van Selector */}
        <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          <div className="sm:w-48 w-full">
            <Select
              onValueChange={(value) =>
                setSelectedVan(vans.find((v) => v.id === value))
              }
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Choose Van ID" />
              </SelectTrigger>
              <SelectContent>
                {vans.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.id} — {v.driver}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            onClick={() =>
              alert(
                selectedVan ? `Added ${selectedVan.id}` : "Select a Van first"
              )
            }
            className="sm:w-auto w-full px-4 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            + Add Van
          </button>
        </CardContent>

        {/* Van Details Cards */}
        {selectedVan && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                title: "Stock Balance",
                value: selectedVan.stock,
                icon: Package,
                color: "text-blue-600",
              },
              {
                title: "Return Items",
                value: selectedVan.returns,
                icon: RefreshCw,
                color: "text-red-600",
              },
              {
                title: "Transfers",
                value: selectedVan.transfers,
                icon: ArrowLeftRight,
                color: "text-yellow-600",
              },
              {
                title: "Total Sales",
                value: `₹${selectedVan.sales}`,
                icon: Truck,
                color: "text-green-600",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.title}
                  className="flex-1 rounded-2xl border border-gray-200"
                >
                  <CardContent className="flex justify-between items-center pt-4 md:pt-6">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {card.title}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold mt-1">
                        {card.value}
                      </h2>
                    </div>
                    <Icon className={`h-8 w-8 md:h-10 md:w-10 ${card.color}`} />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <Card className="shadow-lg rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-sm md:text-base font-semibold">
              Monthly Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <BarChart width={500} height={300} data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#4b5563" }} />
              <YAxis tick={{ fontSize: 12, fill: "#4b5563" }} />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar
                dataKey="sales"
                radius={[8, 8, 0, 0]}
                fill="url(#salesGradient)"
              />
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </BarChart>
          </CardContent>
        </Card>

        {/* Warehouse Stock Pie Chart */}
        <Card className="shadow-lg rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-sm md:text-base font-semibold text-gray-800">
              Warehouse Stock Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <PieChart width={250} height={250}>
              <Pie
                data={pieData}
                dataKey="value"
                cx="40%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={6}
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                isAnimationActive
              >
                {pieData.map((d) => (
                  <Cell
                    key={d.name}
                    fill={d.color}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: d.color }}
                  ></span>
                  <span className="font-semibold">{d.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
