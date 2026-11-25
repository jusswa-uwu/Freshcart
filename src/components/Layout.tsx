import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export interface LayoutContext {
  addToCart: () => void;
}

export default function Layout() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={cartCount} />
      <div className="flex-1">
        {/* The current page renders here */}
        <Outlet
          context={
            {
              addToCart: () => setCartCount((c) => c + 1),
            } satisfies LayoutContext
          }
        />
      </div>
      <Footer />
    </div>
  );
}
