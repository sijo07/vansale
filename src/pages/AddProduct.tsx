import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AddProduct({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    product_id: "",
    name: "",
    category: "Fruits",
    unit: "pcs",
    quantity: 0,
    price: 0,
    barcode: "",
    item_code: "",
    description: "",
  });

  const [categories, setCategories] = useState([
    "Fruits",
    "Dairy",
    "Grocery",
    "Other",
  ]);
  const [units, setUnits] = useState(["kg", "liter", "pcs", "pack", "box"]);

  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showUnitInput, setShowUnitInput] = useState(false);
  const [tempCategory, setTempCategory] = useState("");
  const [tempUnit, setTempUnit] = useState("");

  const addCategory = () => {
    if (tempCategory && !categories.includes(tempCategory)) {
      setCategories([...categories, tempCategory]);
      setForm({ ...form, category: tempCategory });
      setTempCategory("");
    }
    setShowCategoryInput(false);
  };

  const addUnit = () => {
    if (tempUnit && !units.includes(tempUnit)) {
      setUnits([...units, tempUnit]);
      setForm({ ...form, unit: tempUnit });
      setTempUnit("");
    }
    setShowUnitInput(false);
  };

  const handleAddProduct = async () => {
    if (!form.name || !form.product_id || !form.item_code) {
      toast.error("Please fill required fields: Product ID, Name, Item Code");
      return;
    }

    try {
      const { error } = await supabase.from("products").insert([form]);
      if (error) throw error;

      toast.success("Product added successfully!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to add product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2">
      <Card className="w-full max-w-xl rounded-2xl shadow-xl p-6 relative overflow-hidden">
        <CardHeader className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl font-bold">Add Product</CardTitle>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-500 text-lg"
          >
            ✕
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Product ID
              </Label>
              <Input
                value={form.product_id}
                onChange={(e) =>
                  setForm({ ...form, product_id: e.target.value })
                }
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span>Category</span>
                <PlusCircle
                  className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowCategoryInput(!showCategoryInput)}
                />
              </Label>
              {showCategoryInput ? (
                <div className="flex gap-1 mt-1">
                  <Input
                    value={tempCategory}
                    onChange={(e) => setTempCategory(e.target.value)}
                    placeholder="New category"
                    className="flex-1 text-sm"
                  />
                  <Button className="w-16 text-sm" onClick={addCategory}>
                    Add
                  </Button>
                </div>
              ) : (
                <Select
                  value={form.category}
                  onValueChange={(val) => setForm({ ...form, category: val })}
                >
                  <SelectTrigger className="mt-1 text-sm">
                    {form.category}
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Unit */}
            <div>
              <Label className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span>Unit</span>
                <PlusCircle
                  className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowUnitInput(!showUnitInput)}
                />
              </Label>
              {showUnitInput ? (
                <div className="flex gap-1 mt-1">
                  <Input
                    value={tempUnit}
                    onChange={(e) => setTempUnit(e.target.value)}
                    placeholder="New unit"
                    className="flex-1 text-sm"
                  />
                  <Button className="w-16 text-sm" onClick={addUnit}>
                    Add
                  </Button>
                </div>
              ) : (
                <Select
                  value={form.unit}
                  onValueChange={(val) => setForm({ ...form, unit: val })}
                >
                  <SelectTrigger className="mt-1 text-sm">
                    {form.unit}
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Quantity
              </Label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: Number(e.target.value) })
                }
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Price</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                className="mt-1 text-sm"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Barcode
              </Label>
              <Input
                value={form.barcode}
                onChange={(e) => setForm({ ...form, barcode: e.target.value })}
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Item Code
              </Label>
              <Input
                value={form.item_code}
                onChange={(e) =>
                  setForm({ ...form, item_code: e.target.value })
                }
                className="mt-1 text-sm"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <Label className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="mt-1 text-sm"
              />
            </div>
          </div>

          <Button
            className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow hover:shadow-lg text-sm"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
