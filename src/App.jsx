import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getAdminProfile } from "@/features/auth/authThunks";

import { ProtectedRoute, PublicRoute } from "@/components/Protected";

import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

import SignInPage from "@/pages/Auth/SignIn/SignInPage";

import ProductsPage from "@/pages/Products/ProductsPage";
import OrdersPage from "@/pages/Orders/OrdersPage";
import UsersPage from "@/pages/Users/UsersPage";
import UserDetailsPage from "@/pages/UserDetails/UserDetailsPage";
import StaffPage from "@/pages/Staff/StaffPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      dispatch(getAdminProfile());
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes (only when logged out) */}
          {/* <Route element={<PublicRoute />}> */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignInPage />} />
          </Route>
          {/* </Route> */}

          {/* Protected routes (only when logged in) */}
          {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<DashboardLayout />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/users">
              <Route index element={<UsersPage />} />
              <Route path=":id" element={<UserDetailsPage />} />
            </Route>
            <Route path="/staff" element={<StaffPage />} />
          </Route>
          {/* </Route> */}

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
