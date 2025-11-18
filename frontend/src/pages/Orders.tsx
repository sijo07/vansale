import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const dummyOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    van: "Van-01",
    date: "2025-11-15",
    price: 1200.5,
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    van: "Van-02",
    date: "2025-11-14",
    price: 850,
    payment: "Paid",
    status: "Shipped",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    van: "Van-01",
    date: "2025-11-13",
    price: 450.75,
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    van: "Van-03",
    date: "2025-11-12",
    price: 700,
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "ORD-005",
    customer: "Bob Green",
    van: "Van-02",
    date: "2025-11-11",
    price: 950,
    payment: "Paid",
    status: "Shipped",
  },
  {
    id: "ORD-006",
    customer: "Carol White",
    van: "Van-01",
    date: "2025-11-10",
    price: 1200,
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "ORD-007",
    customer: "John Doe",
    van: "Van-01",
    date: "2025-11-15",
    price: 1200.5,
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "ORD-008",
    customer: "Jane Smith",
    van: "Van-02",
    date: "2025-11-14",
    price: 850,
    payment: "Paid",
    status: "Shipped",
  },
  {
    id: "ORD-009",
    customer: "Mike Johnson",
    van: "Van-01",
    date: "2025-11-13",
    price: 450.75,
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "ORD-010",
    customer: "Alice Brown",
    van: "Van-03",
    date: "2025-11-12",
    price: 700,
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "ORD-011",
    customer: "Bob Green",
    van: "Van-02",
    date: "2025-11-11",
    price: 950,
    payment: "Paid",
    status: "Shipped",
  },
  {
    id: "ORD-012",
    customer: "Carol White",
    van: "Van-01",
    date: "2025-11-10",
    price: 1200,
    payment: "Paid",
    status: "Delivered",
  },
];

export default function Orders() {
  const [orders] = useState(dummyOrders);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Filter orders by search
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.van.toLowerCase().includes(search.toLowerCase()) ||
      order.payment.toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-100 to-blue-200 py-6">
      <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 shadow-lg rounded-2xl p-4 sm:p-6 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider uppercase text-center">
            Orders
          </h1>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Input
            placeholder="Search by ID, Customer, Van, Status, Payment"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 rounded-xl border border-gray-300 bg-white shadow-sm"
          />
        </div>

        {/* Desktop + Tablet Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-visible">
          {/* Table Header */}
          <div className="grid grid-cols-8 md:grid-cols-[120px_1fr_1fr_120px_120px_120px_120px_150px] gap-2 bg-gray-100 text-gray-700 font-semibold p-3 text-sm">
            <span>Product ID</span>
            <span>Customer</span>
            <span>Van</span>
            <span>Date</span>
            <span>Price</span>
            <span>Payment</span>
            <span>Status</span>
            <span>View</span>
          </div>

          {/* Table Rows */}
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-8 md:grid-cols-[120px_1fr_1fr_120px_120px_120px_120px_150px] gap-2 items-center p-3 border-b text-sm text-gray-800"
            >
              <span>{order.id}</span>
              <span>{order.customer}</span>
              <span>{order.van}</span>
              <span>{order.date}</span>
              <span>₹{order.price.toFixed(2)}</span>
              <span>{order.payment}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold text-center ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
              <div className="flex justify-center">
                <Button
                  size="sm"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Order
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md p-4 space-y-2"
            >
              {[
                ["Product ID", order.id],
                ["Customer", order.customer],
                ["Van", order.van],
                ["Date", order.date],
                ["Price", `₹${order.price.toFixed(2)}`],
                ["Payment", order.payment],
                ["Status", order.status],
              ].map(([key, val], i) => (
                <div key={i} className="flex justify-between py-1 border-b">
                  <span className="font-semibold">{key}</span>
                  <span
                    className={
                      key === "Status"
                        ? `px-2 py-1 rounded-full text-xs font-semibold ${
                            val === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : val === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`
                        : ""
                    }
                  >
                    {val}
                  </span>
                </div>
              ))}
              <div className="flex justify-center mt-2">
                <Button
                  size="sm"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
