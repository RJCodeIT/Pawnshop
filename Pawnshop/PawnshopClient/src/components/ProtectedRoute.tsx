import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { employee, isAuthenticated } = useAuth();
  const location = useLocation(); 

  if (!isAuthenticated) {
    return <Navigate to="/pawnshop/login" state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(employee?.role ?? "")) {
    return <Navigate to="/pawnshop/dashboard" replace />;
  }

  return <>{children}</>;
}
