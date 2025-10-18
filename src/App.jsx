import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

import SignInPage from "@/pages/Auth/SignIn/SignInPage";
import ForgetPasswordPage from "@/pages/Auth/ForgetPassword/ForgetPasswordPage";

import ProductsPage from "@/pages/Products/ProductsPage";
import OrdersPage from "@/pages/Orders/OrdersPage";
import CustomersPage from "@/pages/Customers/CustomersPage";
import StaffPage from "@/pages/Staff/StaffPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/staff" element={<StaffPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
