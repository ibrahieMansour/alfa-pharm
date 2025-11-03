import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

import SignInPage from "@/pages/Auth/SignIn/SignInPage";

import ProductsPage from "@/pages/Products/ProductsPage";
import OrdersPage from "@/pages/Orders/OrdersPage";
import CustomersPage from "@/pages/Customers/CustomersPage";
import UserDetailsPage from "@/pages/UserDetails/UserDetailsPage";
import StaffPage from "@/pages/Staff/StaffPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const checkTokens = () => {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      if (!access_token || !refresh_token) {
        localStorage.clear();
        window.location.href = "/";
      }
    };

    // check every load and listen for changes
    window.addEventListener("storage", checkTokens);

    return () => {
      window.removeEventListener("storage", checkTokens);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes (only when logged out) */}
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/signin" element={<SignInPage />} />
            </Route>
          </Route>

          {/* Protected routes (only when logged in) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/customers">
                <Route index element={<CustomersPage />} />
                <Route path=":id" element={<UserDetailsPage />} />
              </Route>
              <Route path="/staff" element={<StaffPage />} />
            </Route>
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
