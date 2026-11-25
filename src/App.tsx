import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CheckoutLayout from "./components/CheckoutLayout";
import CheckoutPage from "./pages/CheckoutPage";

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
    </Routes>
  );
}
