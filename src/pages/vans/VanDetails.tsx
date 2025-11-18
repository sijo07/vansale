import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VanDetails() {
  const { id } = useParams();

  // Dummy data (replace with supabase later)
  const van = {
    id,
    driver: "Ramesh Kumar",
    phone: "9876543210",
    route: "Coimbatore → Pollachi",
    status: "Active",
  };

  const stock = [
    { id: 1, product: "Sunflower Oil 1L", qty: 120 },
    { id: 2, product: "Rice Bag 25KG", qty: 40 },
    { id: 3, product: "Atta 10KG", qty: 60 },
  ];

  const sales = [
    { id: 1, customer: "Arun Stores", amount: 4200, date: "2025-11-03" },
    { id: 2, customer: "Selva Mart", amount: 2300, date: "2025-11-05" },
  ];

  const transfers = [
    { id: 1, from: "Van-1", to: "Van-3", product: "Rice Bag 25KG", qty: 10 },
    { id: 2, from: "Van-1", to: "Warehouse", product: "Oil 1L", qty: 25 },
  ];

  const returns = [
    { id: 1, product: "Atta 10KG", qty: 5, date: "2025-11-10" },
    { id: 2, product: "Sunflower Oil 1L", qty: 3, date: "2025-11-08" },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Van Details</h1>
      <p className="text-muted-foreground">
        Overview of stock, sales, transfers & returns for Van #{id}
      </p>

      {/* Van Info */}
      <Card>
        <CardHeader>
          <CardTitle>Van Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Van ID:</strong> {van.id}
          </p>
          <p>
            <strong>Driver:</strong> {van.driver}
          </p>
          <p>
            <strong>Phone:</strong> {van.phone}
          </p>
          <p>
            <strong>Route:</strong> {van.route}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-green-600">{van.status}</span>
          </p>
        </CardContent>
      </Card>

      {/* Stock */}
      <Card>
        <CardHeader>
          <CardTitle>Current Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stock.map((item) => (
              <div
                key={item.id}
                className="flex justify-between p-3 border rounded"
              >
                <span>{item.product}</span>
                <span className="font-semibold">{item.qty} pcs</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <Button>Return Stock</Button>
            <Button variant="secondary">Transfer Stock</Button>
          </div>
        </CardContent>
      </Card>

      {/* Sales */}
      <Card>
        <CardHeader>
          <CardTitle>Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sales.map((sale) => (
              <div
                key={sale.id}
                className="flex justify-between p-3 border rounded"
              >
                <div>
                  <p className="font-medium">{sale.customer}</p>
                  <p className="text-xs text-muted-foreground">{sale.date}</p>
                </div>
                <span className="font-semibold">₹{sale.amount}</span>
              </div>
            ))}
          </div>

          <Button className="mt-4">Add Sale</Button>
        </CardContent>
      </Card>

      {/* Transfers */}
      <Card>
        <CardHeader>
          <CardTitle>Transfers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transfers.map((t) => (
              <div key={t.id} className="p-3 border rounded">
                <p className="font-medium">
                  {t.product} – {t.qty} pcs
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.from} → {t.to}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Returns */}
      <Card>
        <CardHeader>
          <CardTitle>Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {returns.map((r) => (
              <div
                key={r.id}
                className="flex justify-between p-3 border rounded"
              >
                <div>
                  <p className="font-medium">{r.product}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <span className="font-semibold">{r.qty} pcs</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
