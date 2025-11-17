import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const customers = [
  { id: 1, name: "ABC Store", invoices: 3 },
  { id: 2, name: "XYZ Mart", invoices: 2 },
  { id: 3, name: "Super Shop", invoices: 5 },
];

const invoices = [
  {
    id: "INV-001",
    date: "2025-01-10",
    items: [
      { id: 1, name: "Coca Cola 500ml", qty: 24, price: 20 },
      { id: 2, name: "Lays Chips", qty: 12, price: 10 },
    ],
  },
  {
    id: "INV-002",
    date: "2025-01-08",
    items: [
      { id: 3, name: "Pepsi 500ml", qty: 24, price: 20 },
      { id: 4, name: "Dairy Milk", qty: 20, price: 30 },
    ],
  },
];

const SalesReturn = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [returnItems, setReturnItems] = useState<{
    [key: number]: { checked: boolean; qty: number };
  }>({});
  const [returnReason, setReturnReason] = useState("");
  const [refundMode, setRefundMode] = useState("");

  const currentInvoice = invoices.find((inv) => inv.id === selectedInvoice);

  const handleItemCheck = (itemId: number, checked: boolean) => {
    setReturnItems((prev) => ({
      ...prev,
      [itemId]: { checked, qty: checked ? 1 : 0 },
    }));
  };

  const handleQtyChange = (itemId: number, qty: number) => {
    setReturnItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], qty },
    }));
  };

  const totalRefund =
    currentInvoice?.items.reduce((sum, item) => {
      const returnInfo = returnItems[item.id];
      if (returnInfo?.checked) {
        return sum + item.price * returnInfo.qty;
      }
      return sum;
    }, 0) || 0;

  const handleSubmit = () => {
    if (!selectedCustomer || !selectedInvoice) {
      toast({
        title: "Error",
        description: "Please select customer and invoice",
        variant: "destructive",
      });
      return;
    }
    if (!returnReason) {
      toast({
        title: "Error",
        description: "Please provide a return reason",
        variant: "destructive",
      });
      return;
    }
    if (totalRefund === 0) {
      toast({
        title: "Error",
        description: "Please select at least one item to return",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Return Processed",
      description: `Successfully processed return of ₹${totalRefund}`,
    });
    setReturnItems({});
    setReturnReason("");
    setRefundMode("");
    setSelectedCustomer("");
    setSelectedInvoice("");
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 min-h-screen">
      {/* Header */}
      <div className="p-8 rounded-2xl from-blue-500 to-indigo-600 bg-gradient-to-r text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Sales Return</h1>
          <p className="mt-2 text-lg opacity-90">
            Process customer returns and refunds efficiently
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Return Form */}
        <Card className="lg:col-span-2 glass-card shadow-lg hover:shadow-xl hover-lift">
          <CardHeader className="bg-white/20 border-b backdrop-blur-sm">
            <CardTitle className="text-xl text-blue-800">
              Return Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customer">Select Customer</Label>
                <Select
                  value={selectedCustomer}
                  onValueChange={setSelectedCustomer}
                >
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Choose customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem
                        key={customer.id}
                        value={customer.id.toString()}
                      >
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoice">Select Invoice</Label>
                <Select
                  value={selectedInvoice}
                  onValueChange={setSelectedInvoice}
                  disabled={!selectedCustomer}
                >
                  <SelectTrigger id="invoice">
                    <SelectValue placeholder="Choose invoice" />
                  </SelectTrigger>
                  <SelectContent>
                    {invoices.map((invoice) => (
                      <SelectItem key={invoice.id} value={invoice.id}>
                        {invoice.id} - {invoice.date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Invoice Items */}
            {currentInvoice && (
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-700">Invoice Items</h3>
                <Table className="rounded-xl overflow-hidden bg-white shadow-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Original Qty</TableHead>
                      <TableHead>Return Qty</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentInvoice.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={returnItems[item.id]?.checked || false}
                            onCheckedChange={(checked) =>
                              handleItemCheck(item.id, checked as boolean)
                            }
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.qty}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min={0}
                            max={item.qty}
                            value={returnItems[item.id]?.qty || 0}
                            onChange={(e) =>
                              handleQtyChange(
                                item.id,
                                parseInt(e.target.value) || 0
                              )
                            }
                            disabled={!returnItems[item.id]?.checked}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>₹{item.price}</TableCell>
                        <TableCell className="font-semibold">
                          ₹{(returnItems[item.id]?.qty || 0) * item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Reason & Refund */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Return Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason for return..."
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  rows={3}
                  className="bg-white/70 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="refund">Refund Mode</Label>
                <Select value={refundMode} onValueChange={setRefundMode}>
                  <SelectTrigger id="refund">
                    <SelectValue placeholder="Select refund mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit">Store Credit</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="glass-card shadow-lg hover:shadow-xl hover-lift">
          <CardHeader className="bg-white/20 border-b backdrop-blur-sm">
            <CardTitle className="text-xl text-blue-800">
              Return Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 bg-blue-50 rounded-xl space-y-3 border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Customer:</span>
                <span className="font-semibold">
                  {customers.find((c) => c.id.toString() === selectedCustomer)
                    ?.name || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Invoice:</span>
                <span className="font-semibold">
                  {selectedInvoice || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Refund Mode:
                </span>
                <span className="font-semibold capitalize">
                  {refundMode || "N/A"}
                </span>
              </div>
            </div>

            <div className="p-6 border rounded-xl bg-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-700 font-medium">Total Refund:</span>
                <span className="text-3xl font-bold text-blue-800">
                  ₹{totalRefund}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl text-lg py-5"
              onClick={handleSubmit}
            >
              Process Return
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesReturn;
