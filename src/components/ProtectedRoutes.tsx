// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const UserProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  if (loading) return <div />; // or spinner
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export const AdminProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  if (loading) return <div />;
  // check user.user_metadata.role or profiles table
  const role = (user?.user_metadata as any)?.role;
  if (!user || role !== "admin") return <Navigate to="/admin/login" replace />;
  return children;
};
