import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Edit, PackageSearch, PlusCircle } from "lucide-react";
import AddProduct from "./AddProduct";

export default function Stock() {
  const units = ["kg", "liter", "pcs", "pack", "box"];

  // Dummy data
  const dummyProducts = [
    {
      id: 1,
      product_id: "P001",
      name: "Apple",
      category: "Fruits",
      unit: "kg",
      quantity: 50,
      price: 120,
      barcode: "123456",
      item_code: "APL-001",
      description: "Fresh red apples",
    },
    {
      id: 2,
      product_id: "P002",
      name: "Milk",
      category: "Dairy",
      unit: "liter",
      quantity: 100,
      price: 45,
      barcode: "234567",
      item_code: "MLK-002",
      description: "Fresh cow milk",
    },
    {
      id: 3,
      product_id: "P003",
      name: "Banana",
      category: "Fruits",
      unit: "kg",
      quantity: 70,
      price: 30,
      barcode: "345678",
      item_code: "BNN-003",
      description: "Yellow bananas",
    },
  ];

  const [products, setProducts] = useState<any[]>(dummyProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);

  const handleEdit = (product: any) => {
    setEditProduct(product);
  };

  const handleSaveEdit = (updatedProduct: any) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditProduct(null);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.item_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.product_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-7xl mx-auto py-6"
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 shadow-lg rounded-2xl p-4 sm:p-6 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-bold text-white tracking-wider uppercase text-center"
        >
          Stock/Products
        </motion.h1>
      </div>

      {/* ADD PRODUCT + SEARCH ROW */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, category, stock code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl shadow-md p-2 focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <Button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 w-full md:w-auto"
        >
          <PlusCircle className="w-5 h-5" /> Add Product
        </Button>
      </div>

      {/* PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products found.</p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="rounded-2xl glass-card shadow-xl hover:shadow-2xl transition-all border border-indigo-200 bg-white/60 p-3">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b rounded-t-2xl">
                  <CardTitle className="text-sm font-bold text-blue-900">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 space-y-1 text-xs text-gray-700">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {product.category}
                  </p>
                  <p>
                    <span className="font-semibold">Item Code:</span>{" "}
                    {product.item_code}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> ₹
                    {product.price}
                  </p>
                  <p>
                    <span className="font-semibold">Qty:</span>{" "}
                    {product.quantity} {product.unit}
                  </p>
                  <Button
                    className="w-full mt-1 text-xs bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="w-3 h-3 mr-1" /> Edit
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Add Product Modal */}
      {showAdd && <AddProduct onClose={() => setShowAdd(false)} />}

      {/* Edit Product Modal */}
      {editProduct && (
        <AddProduct
          onClose={() => setEditProduct(null)}
          product={editProduct}
          onSave={handleSaveEdit}
        />
      )}
    </motion.div>
  );
}
