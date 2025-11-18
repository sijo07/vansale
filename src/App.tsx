import { Suspense, lazy } from "react";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import AppLayout from "./components/layout/AppLayout";

// Lazy loaded pages
const Login = lazy(() => import("./pages/auth/login"));
const AdminSignup = lazy(() => import("./pages/admin/AdminSignup"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const UsersManagement = lazy(() => import("./pages/admin/UserManage"));
const CreateUser = lazy(() => import("./pages/admin/UserList"));
const VansPage = lazy(() => import("./pages/vans/Vans"));
const VanDetails = lazy(() => import("./pages/vans/VanDetails"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Customers = lazy(() => import("./pages/Customers"));
const NewCustomer = lazy(() => import("./pages/NewCustomer"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Sales = lazy(() => import("./pages/Sales"));
const Transfers = lazy(() => import("./pages/Transfers"));
const Orders = lazy(() => import("./pages/Orders"));
const ViewOrder = lazy(() => import("./pages/ViewOrder"));
const Stock = lazy(() => import("./pages/Stock"));
const Reports = lazy(() => import("./pages/Reports"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RadixToaster />
      <SonnerToaster />
      <BrowserRouter>
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <Routes>
            {/* TEMPORARY — Disable Auth Completely */}

            {/* Admin UI Direct Access */}
            <Route path="/admin" element={<AppLayout role="admin" />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="users/create" element={<CreateUser />} />
              <Route path="vans" element={<VansPage />} />
              <Route path="vans/:id" element={<VanDetails />} />
            </Route>

            {/* User UI Direct Access */}
            <Route path="/" element={<AppLayout role="user" />}>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customers/new" element={<NewCustomer />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="sales" element={<Sales />} />
              <Route path="transfers" element={<Transfers />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<ViewOrder />} />
              <Route path="stock" element={<Stock />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            {/* Still keep login for design/testing */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/signup" element={<AdminSignup />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
