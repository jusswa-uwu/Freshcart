import { Link, Outlet } from "react-router-dom";
import { Check, ShoppingCart } from "lucide-react";

const perks = [
  "Fresh groceries, carefully picked",
  "Choose a delivery slot that suits your day",
  "Pay securely with cards and e-wallets",
  "SMS updates from basket to doorstep",
];

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel (desktop) */}
      <aside className="relative hidden overflow-hidden bg-brand p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 size-80 rounded-full bg-white/5"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-16 size-96 rounded-full bg-white/5"
        />

        <Link to="/" className="relative flex items-center gap-2">
          <ShoppingCart size={28} />
          <span className="text-2xl font-bold tracking-tight">FreshCart</span>
        </Link>

        <div className="relative">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-lime">
            FRESH PICKS. ZERO QUEUES.
          </p>
          <p className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
            Good food.
            <br />
            Great days.
          </p>
          <ul className="mt-10 space-y-4">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-3 text-sm text-white/85"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/15">
                  <Check size={14} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/60">
          © 2026 FreshCart. A fresher way to fill your day.
        </p>
      </aside>

      {/* Form panel */}
      <div className="flex flex-col bg-[#fafaf7]">
        <div className="flex items-center justify-between px-6 py-5 lg:hidden">
          <Link to="/" className="flex items-center gap-2 text-brand">
            <ShoppingCart size={24} />
            <span className="text-xl font-bold tracking-tight">FreshCart</span>
          </Link>
        </div>
        <main className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
