import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CheckoutLayout from "./components/CheckoutLayout";
import AuthLayout from "./components/AuthLayout";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* Add more pages here later, e.g. <Route path="cart" element={<CartPage />} /> */}
      </Route>

      <Route element={<CheckoutLayout />}>
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>

      {/* Sign in and create account: split-screen layout */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
