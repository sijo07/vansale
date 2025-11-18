import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const vans = ["Van 001", "Van 002", "Van 003", "Van 004", "Van 005"];
const products = [
  { id: 1, name: "Coca Cola 500ml", available: 120 },
  { id: 2, name: "Pepsi 500ml", available: 95 },
  { id: 3, name: "Lays Chips", available: 150 },
  { id: 4, name: "Dairy Milk", available: 80 },
  { id: 5, name: "Bread Pack", available: 45 },
];
const transferHistory = [
  {
    id: 1,
    from: "Van 001",
    to: "Van 003",
    items: 45,
    date: "2025-01-10",
    status: "Completed",
  },
  {
    id: 2,
    from: "Van 002",
    to: "Van 001",
    items: 32,
    date: "2025-01-09",
    status: "Completed",
  },
  {
    id: 3,
    from: "Van 003",
    to: "Van 004",
    items: 28,
    date: "2025-01-08",
    status: "Pending",
  },
];

const VanTransfer = () => {
  const { toast } = useToast();
  const [sourceVan, setSourceVan] = useState("");
  const [targetVan, setTargetVan] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: number]: number;
  }>({});

  const handleQuantityChange = (productId: number, delta: number) => {
    setSelectedProducts((prev) => {
      const current = prev[productId] || 0;
      const newValue = Math.max(0, current + delta);
      return { ...prev, [productId]: newValue };
    });
  };

  const totalItems = Object.values(selectedProducts).reduce(
    (sum, qty) => sum + qty,
    0
  );

  const handleSubmit = () => {
    if (!sourceVan || !targetVan) {
      toast({
        title: "Error",
        description: "Please select both source and target vans",
        variant: "destructive",
      });
      return;
    }
    if (totalItems === 0) {
      toast({
        title: "Error",
        description: "Please select at least one product",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Transfer Initiated",
      description: `Successfully transferred ${totalItems} items from ${sourceVan} to ${targetVan}`,
    });
    setSelectedProducts({});
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-100 via-indigo-100 to-blue-200 min-h-screen">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl primary-gradient text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 sm:w-64 sm:h-64 sm:-mr-32 sm:-mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 sm:w-48 sm:h-48 sm:-ml-24 sm:-mb-24"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Van-to-Van Transfer
          </h1>
          <p className="mt-2 text-sm sm:text-lg opacity-90">
            Transfer inventory between vans seamlessly
          </p>
        </div>
      </div>

      {/* Transfer Form & Summary */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <Card className="flex-1 glass-card shadow-2xl hover-lift">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
            <CardTitle className="text-xl text-teal-900">
              New Transfer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vans Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="source">Source Van</Label>
                <Select value={sourceVan} onValueChange={setSourceVan}>
                  <SelectTrigger id="source">
                    <SelectValue placeholder="Select source van" />
                  </SelectTrigger>
                  <SelectContent>
                    {vans.map((van) => (
                      <SelectItem key={van} value={van}>
                        {van}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target Van</Label>
                <Select value={targetVan} onValueChange={setTargetVan}>
                  <SelectTrigger id="target">
                    <SelectValue placeholder="Select target van" />
                  </SelectTrigger>
                  <SelectContent>
                    {vans
                      .filter((v) => v !== sourceVan)
                      .map((van) => (
                        <SelectItem key={van} value={van}>
                          {van}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-teal-800 text-sm sm:text-base">
                Select Products
              </h3>
              <div className="space-y-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 border-2 border-teal-200 rounded-xl hover:bg-teal-50 hover:border-teal-400 hover:shadow-lg transition-all bg-white"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Available: {product.available}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={!selectedProducts[product.id]}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={selectedProducts[product.id] || 0}
                        onChange={(e) =>
                          setSelectedProducts((prev) => ({
                            ...prev,
                            [product.id]: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-16 sm:w-20 text-center"
                        min={0}
                        max={product.available}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        disabled={
                          (selectedProducts[product.id] || 0) >=
                          product.available
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="flex-1 glass-card shadow-2xl hover-lift">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-xl text-blue-900">
              Transfer Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl space-y-3 border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">From:</span>
                <span className="font-semibold">
                  {sourceVan || "Not selected"}
                </span>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">To:</span>
                <span className="font-semibold">
                  {targetVan || "Not selected"}
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-2 border-blue-300 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-700 font-medium">Total Items:</span>
                <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {totalItems}
                </span>
              </div>
            </div>
            <Button
              className="w-full primary-gradient text-white shadow-xl hover:shadow-2xl hover-lift text-lg py-4 sm:py-6"
              onClick={handleSubmit}
            >
              Confirm Transfer
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transfer History */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-orange-900">Transfer History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {transferHistory.map((transfer) => (
            <Card
              key={transfer.id}
              className="glass-card shadow-lg hover:shadow-xl transition-all"
            >
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
                <CardTitle className="text-lg text-orange-900 font-semibold">
                  Transfer #{transfer.id.toString().padStart(4, "0")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">From:</span>
                  <span className="font-medium">{transfer.from}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">To:</span>
                  <span className="font-medium">{transfer.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Items:</span>
                  <span className="font-medium">{transfer.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="font-medium">{transfer.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge
                    variant={
                      transfer.status === "Completed" ? "default" : "secondary"
                    }
                  >
                    {transfer.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VanTransfer;
