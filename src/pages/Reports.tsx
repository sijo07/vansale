import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";

/* Dummy Data */
const dummyData = {
  sales: [
    {
      id: 1,
      customer: "John Doe",
      date: "2025-11-15",
      total: 5000,
      status: "Paid",
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "2025-11-14",
      total: 3200,
      status: "Pending",
    },
  ],
  outstanding: [
    { id: 1, customer: "John Doe", total: 2000, dueDate: "2025-11-20" },
    { id: 2, customer: "Jane Smith", total: 1500, dueDate: "2025-11-25" },
  ],
  receipts: [
    {
      id: 1,
      customer: "John Doe",
      saleId: 1,
      amount: 5000,
      paymentMode: "Cash",
      date: "2025-11-15",
    },
  ],
  salesReturn: [
    {
      id: 1,
      customer: "Jane Smith",
      product: "Product A",
      quantity: 2,
      date: "2025-11-14",
    },
  ],
  stock: [
    {
      id: 1,
      product: "Product A",
      sku: "SKU001",
      stockQty: 50,
      vanStockQty: 20,
    },
    {
      id: 2,
      product: "Product B",
      sku: "SKU002",
      stockQty: 30,
      vanStockQty: 15,
    },
  ],
};

function filterByDate(dataArr, startDate, endDate, dateField = "date") {
  if (!startDate && !endDate) return dataArr;
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  return dataArr.filter((item) => {
    const d = new Date(item[dateField]);
    if (start && d < start) return false;
    if (end && d > end) return false;
    return true;
  });
}

export default function Reports() {
  const [reportType, setReportType] = useState("sales");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(dummyData[reportType]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    let data = [];
    switch (reportType) {
      case "sales":
        data = filterByDate(dummyData.sales, startDate, endDate, "date");
        break;
      case "outstanding":
        data = filterByDate(
          dummyData.outstanding,
          startDate,
          endDate,
          "dueDate"
        );
        break;
      case "receipts":
        data = filterByDate(dummyData.receipts, startDate, endDate, "date");
        break;
      case "salesReturn":
        data = filterByDate(dummyData.salesReturn, startDate, endDate, "date");
        break;
      case "stock":
        data = dummyData.stock;
        break;
    }

    if (searchTerm) {
      data = data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFiltered(data);
    setCurrentPage(1);
  }, [reportType, startDate, endDate, searchTerm]);

  const headers = {
    sales: ["Invoice ID", "Customer", "Date", "Total", "Status", "Actions"],
    outstanding: ["Customer", "Outstanding", "Due Date", "Actions"],
    receipts: [
      "Receipt ID",
      "Customer",
      "Sale ID",
      "Amount",
      "Payment Mode",
      "Date",
      "Actions",
    ],
    salesReturn: ["Customer", "Product", "Quantity", "Date", "Actions"],
    stock: ["Product", "SKU", "Total Stock", "Van Stock", "Actions"],
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filtered.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [headers[reportType]],
      body: currentRows.map((r) => Object.values(r)),
    });
    doc.save(`${reportType}_page${currentPage}.pdf`);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(currentRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${reportType}_page${currentPage}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-100 to-blue-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 shadow-lg rounded-2xl p-4 sm:p-6 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-bold text-white tracking-wider uppercase text-center"
          >
            Reports
          </motion.h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap overflow-x-auto gap-2 mb-4 bg-gradient-to-r from-indigo-50 to-blue-50 p-2 rounded-2xl shadow-inner">
          {["sales", "outstanding", "receipts", "salesReturn", "stock"].map(
            (type) => (
              <button
                key={type}
                onClick={() => setReportType(type)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium capitalize transition ${
                  reportType === type
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {type.replace(/([A-Z])/g, " $1")}
              </button>
            )
          )}
        </div>

        {/* Filters + Export */}
        <div className="flex flex-col sm:flex-row gap-4 w-full items-start sm:items-end mb-4 bg-gray-50 p-4 rounded-xl border">
          <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1 flex flex-col">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 w-full"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 w-full"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <Label>Search</Label>
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 w-full"
            />
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button
              onClick={exportPDF}
              className="bg-red-500 text-white p-2 flex items-center gap-1"
            >
              <Download className="w-5 h-5" /> PDF
            </Button>
            <Button
              onClick={exportExcel}
              className="bg-green-500 text-white p-2 flex items-center gap-1"
            >
              <Download className="w-5 h-5" /> Excel
            </Button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-visible">
          <div className="grid grid-cols-8 md:grid-cols-[120px_1fr_1fr_120px_120px_120px_150px] gap-2 bg-gray-100 text-gray-700 font-semibold p-3 text-sm">
            {headers[reportType].map((h, idx) => (
              <span key={idx}>{h}</span>
            ))}
          </div>
          {currentRows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-8 md:grid-cols-[120px_1fr_1fr_120px_120px_120px_150px] gap-2 items-center p-3 border-b text-sm text-gray-800"
            >
              {Object.values(row).map((val, i) => (
                <span key={i}>
                  {typeof val === "number" && val >= 1000 ? `₹${val}` : val}
                </span>
              ))}
              <div className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  className="bg-green-500 text-white px-2"
                  onClick={() => alert(JSON.stringify(row, null, 2))}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-500 text-white px-2"
                  onClick={() => window.print()}
                >
                  Print
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {currentRows.map((row, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 space-y-2"
            >
              {Object.entries(row).map(([key, val], i) => (
                <div key={i} className="flex justify-between py-1 border-b">
                  <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span>
                    {typeof val === "number" && val >= 1000 ? `₹${val}` : val}
                  </span>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  className="bg-green-500 text-white px-2"
                  onClick={() => alert(JSON.stringify(row, null, 2))}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-500 text-white px-2"
                  onClick={() => window.print()}
                >
                  Print
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 rounded ${
                  p === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
