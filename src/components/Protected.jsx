import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export function PublicRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to="/products" replace /> : <Outlet />;
}

export function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
