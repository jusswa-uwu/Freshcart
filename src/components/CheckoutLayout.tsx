import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/** Layout for checkout: no category nav, minimal footer, soft page background. */
export default function CheckoutLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf7]">
      {/* TODO: read name, address and cart count from your auth / cart state */}
      <Header
        userName="Alex"
        deliverTo="Home, Quezon City"
        cartCount={4}
        hideNav
      />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer minimal />
    </div>
  );
}
