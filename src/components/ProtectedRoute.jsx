import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

function ProtectedRoute() {
  // const accessToken = localStorage.getItem("accessToken");
  // const refreshToken = localStorage.getItem("refreshToken");

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  if (!accessToken || !refreshToken) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
