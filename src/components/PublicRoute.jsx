import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  if (access_token && refresh_token) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
