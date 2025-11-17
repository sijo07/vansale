import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const vansData = [
  {
    id: "VAN001",
    driver: "John Doe",
    phone: "9876543210",
    stockBalance: 120,
    returnStatus: "Pending",
  },
  {
    id: "VAN002",
    driver: "Michael",
    phone: "9123456780",
    stockBalance: 80,
    returnStatus: "Completed",
  },
  {
    id: "VAN003",
    driver: "David",
    phone: "9001234567",
    stockBalance: 150,
    returnStatus: "Pending",
  },
];

export default function Vans() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vans</h1>
        <p className="text-muted-foreground">
          Manage warehouse vans and stock balance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vansData.map((van) => (
          <Card
            key={van.id}
            className="shadow-sm border rounded-xl hover:shadow-md transition"
          >
            <CardContent className="p-5 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{van.id}</h2>
                <p className="text-sm text-muted-foreground">
                  Driver: {van.driver}
                </p>
                <p className="text-sm text-muted-foreground">
                  Phone: {van.phone}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-medium">Stock Balance</p>
                  <p className="text-lg font-bold">{van.stockBalance} units</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    van.returnStatus === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {van.returnStatus}
                </span>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2 flex items-center justify-center gap-2"
                onClick={() => navigate(`/admin/vans/${van.id}`)}
              >
                View Details <ArrowRight size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
