import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

function PublicRoute() {
  // const accessToken = localStorage.getItem("accessToken");

  const { accessToken } = useSelector((state) => state.auth);

  // if user already logged in → redirect to dashboard
  if (accessToken) {
    return <Navigate to="/products" replace />;
  }

  // otherwise → allow access to signin/forget-password
  return <Outlet />;
}

export default PublicRoute;
