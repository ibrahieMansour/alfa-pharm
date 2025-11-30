import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProtectedRoute, PublicRoute } from "@/components/Protected";

import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

import SignInPage from "@/pages/Auth/SignIn/SignInPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import ProductsPage from "@/pages/Products/ProductsPage";
import UsersPage from "@/pages/Users/UsersPage";
import UserDetailsPage from "@/pages/UserDetails/UserDetailsPage";
import OrdersPage from "@/pages/Orders/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetails/OrderDetailsPage";
import AdminsPage from "./pages/Admins/AdminsPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import ProfilePage from "./pages/Profile/ProfilePage";

function App() {
  const { admin } = useSelector((state) => state.auth);

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
              <Route path="/orders">
                <Route index element={<OrdersPage />} />
                <Route path=":id" element={<OrderDetailsPage />} />
              </Route>
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/users">
                <Route index element={<UsersPage />} />
                <Route path=":id" element={<UserDetailsPage />} />
              </Route>
              {admin.role === "ADMIN" && <Route path="/admins" element={<AdminsPage />} />}
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer limit={6} position="top-right" closeButton={true} autoClose={1500} theme="colored" newestOnTop />
    </>
  );
}

export default App;
