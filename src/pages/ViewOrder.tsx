import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const dummyOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2025-11-15",
    status: "Pending",
    total: 1200.5,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2025-11-14",
    status: "Shipped",
    total: 850,
  },
  // ...other orders
];

export default function ViewOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = dummyOrders.find((o) => o.id === id);

  if (!order) return <p className="text-center mt-10">Order not found!</p>;

  const handleDelete = () => {
    alert(`Deleted order ${order.id}`);
  };

  const handleEdit = () => {
    navigate(`/orders/edit/${order.id}`);
  };

  const handleReceipt = () => {
    alert(`Viewing receipt for ${order.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-100 to-blue-200 py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-blue-700">Order Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>ID:</div>
          <div>{order.id}</div>

          <div>Customer:</div>
          <div>{order.customer}</div>

          <div>Date:</div>
          <div>{order.date}</div>

          <div>Status:</div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              order.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {order.status}
          </div>

          <div>Total:</div>
          <div>₹{order.total.toFixed(2)}</div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={handleReceipt}>Receipt</Button>
          <Button onClick={handleEdit}>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
