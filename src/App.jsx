import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

import SignInPage from "@/pages/Auth/SignIn/SignInPage";
import ForgetPasswordPage from "@/pages/Auth/ForgetPassword/ForgetPasswordPage";

import Products from "@/pages/Products/Products";
import Orders from "@/pages/Orders/Orders";
import Customers from "@/pages/Customers/Customers";
import Staff from "@/pages/Staff/Staff";
import NotFound from "@/pages/NotFound/NotFound";

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
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/staff" element={<Staff />} />
          </Route>

          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
