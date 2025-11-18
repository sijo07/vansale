import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { motion } from "framer-motion";

const productsList = [
  { id: 1, name: "Apple", price: 50, stock: 100, description: "Fresh apples" },
  { id: 2, name: "Milk", price: 20, stock: 50, description: "Dairy milk 1L" },
  { id: 3, name: "Banana", price: 10, stock: 200, description: "Ripe bananas" },
  {
    id: 4,
    name: "Bread",
    price: 30,
    stock: 80,
    description: "Whole wheat bread",
  },
  { id: 5, name: "Eggs", price: 5, stock: 300, description: "Fresh eggs" },
  {
    id: 6,
    name: "Cheese",
    price: 60,
    stock: 40,
    description: "Cheddar cheese",
  },
];

const customersList = [
  { id: 1, name: "ABC Store" },
  { id: 2, name: "XYZ Mart" },
  { id: 3, name: "Super Shop" },
];

const Sales = () => {
  const [mode, setMode] = useState<"sale" | "return">("sale");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [cart, setCart] = useState<
    { productId: number; name: string; qty: number; price: number }[]
  >([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  const addToCart = (product: { id: number; name: string; price: number }) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.productId === product.id);
      if (exists) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            qty: 1,
            price: product.price,
          },
        ];
      }
    });
  };

  const updateCartItem = (
    productId: number,
    field: "qty" | "price",
    value: number
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, [field]: value } : item
      )
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const discount = subtotal * 0.1;
  const tax = (subtotal - discount) * 0.05;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 shadow-lg rounded-2xl p-6 flex justify-center">
        {/* Tabs as heading */}
        <div className="flex gap-4">
          {["sale", "return"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as "sale" | "return")}
              className={`px-6 py-3 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 ${
                mode === m
                  ? "bg-white text-indigo-600 shadow-lg transform scale-105"
                  : "bg-white/30 text-white hover:bg-white/50 hover:text-indigo-100"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Product Cards / Return Form */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {mode === "sale" &&
            productsList.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-xl transition p-2"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-2 text-center space-y-1">
                  <p className="font-bold text-sm">{product.name}</p>
                  <p className="text-xs">Price: ₹{product.price}</p>
                  <p className="text-xs">Stock: {product.stock}</p>
                  <p className="text-gray-500 text-xs truncate">
                    {product.description}
                  </p>
                  <Button className="w-full bg-blue-500 text-white text-xs py-1">
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}

          {mode === "return" && (
            <Card className="shadow-lg rounded-xl col-span-3">
              <CardHeader className="bg-white/20 border-b backdrop-blur-sm">
                <CardTitle>Process Return</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Return form content here...</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Invoice */}
        <div>
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="bg-white/20 border-b backdrop-blur-sm">
              <CardTitle>Invoice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={selectedCustomer}
                onValueChange={setSelectedCustomer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  {customersList.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-gray-500 py-4"
                      >
                        No products added
                      </TableCell>
                    </TableRow>
                  ) : (
                    cart.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <input
                            type="number"
                            min={1}
                            value={item.qty}
                            onChange={(e) =>
                              updateCartItem(
                                item.productId,
                                "qty",
                                Number(e.target.value)
                              )
                            }
                            className="w-14 border rounded-xl p-1 text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            min={0}
                            value={item.price}
                            onChange={(e) =>
                              updateCartItem(
                                item.productId,
                                "price",
                                Number(e.target.value)
                              )
                            }
                            className="w-20 border rounded-xl p-1 text-sm"
                          />
                        </TableCell>
                        <TableCell>₹{item.qty * item.price}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {cart.length > 0 && (
                <div className="space-y-2 text-right mt-2">
                  <p>Subtotal: ₹{subtotal}</p>
                  <p>Discount (10%): ₹{discount}</p>
                  <p>Tax (5%): ₹{tax}</p>
                  <p className="font-bold text-lg">Total: ₹{total}</p>

                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="credit">Store Credit</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="w-full bg-green-500 text-white py-2 rounded-xl mt-2">
                    Checkout
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sales;
