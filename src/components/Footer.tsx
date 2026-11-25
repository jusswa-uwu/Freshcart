import type { ReactNode } from "react";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-white/70">{children}</ul>
    </div>
  );
}

export default function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="bg-[#f1f1ea] text-sm text-muted">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-12">
          <span>© 2026 FreshCart. A fresher way to fill your day.</span>
          <span className="flex gap-6">
            <a href="#">Need a hand? Contact support</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-24 bg-brand-deep text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-bold">FreshCart</p>
          <p className="mt-3 text-sm text-white/80">
            A fresher way to fill your day.
          </p>
          <p className="mt-1 text-xs text-white/60">
            Your neighbourhood supermarket, online.
          </p>
        </div>

        <FooterColumn title="Shop">
          <li>Fresh produce</li>
          <li>Pantry essentials</li>
          <li>Household</li>
        </FooterColumn>

        <FooterColumn title="Here to help">
          <li>Delivery information</li>
          <li>Order &amp; payment help</li>
          <li>Contact us</li>
        </FooterColumn>

        <FooterColumn title="Secure checkout">
          <li>Cards &amp; e-wallets</li>
          <li className="flex gap-4 font-semibold text-white">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>GCash</span>
          </li>
          <li className="text-xs text-white/50">
            Payments powered by PayMongo
          </li>
        </FooterColumn>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-2 border-t border-white/10 px-6 py-6 text-xs text-white/60">
        <span>© 2026 FreshCart. All rights reserved.</span>
        <span className="flex gap-4">
          <a href="#">Privacy policy</a>
          <a href="#">Terms &amp; conditions</a>
        </span>
      </div>
    </footer>
  );
}
