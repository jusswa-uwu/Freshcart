import {
  ChevronDown,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

const navLinks = [
  "Fresh produce",
  "Meat & seafood",
  "Dairy & eggs",
  "Pantry",
  "Household",
];

interface HeaderProps {
  cartCount?: number;
  /** When set, shows the user's name instead of "Sign in". */
  userName?: string;
  /** Text under "Deliver to". */
  deliverTo?: string;
  /** Hide the category nav (used on checkout). */
  hideNav?: boolean;
}

export default function Header({
  cartCount = 0,
  userName,
  deliverTo = "Set your location",
  hideNav = false,
}: HeaderProps) {
  return (
    <header>
      {/* Announcement bar */}
      <div className="bg-brand px-4 py-2 text-center text-xs text-white">
        A little fresher. A lot easier. &nbsp;•&nbsp; Groceries delivered on
        your schedule.
      </div>

      {/* Main bar */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 py-5">
          <a href="/" className="flex items-center gap-2 text-brand">
            <ShoppingCart size={28} />
            <span className="text-2xl font-bold tracking-tight">FreshCart</span>
          </a>

          <label className="hidden h-12 flex-1 items-center gap-3 rounded-lg bg-[#f3f4f1] px-4 text-muted md:flex">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search for fresh groceries..."
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
            />
          </label>

          <button className="hidden items-center gap-2 text-left lg:flex">
            <MapPin size={20} className="text-brand" />
            <span className="leading-tight">
              <span className="block text-[11px] text-muted">Deliver to</span>
              <span className="flex items-center gap-1 text-sm font-semibold">
                {deliverTo} <ChevronDown size={14} />
              </span>
            </span>
          </button>

          <a
            href={userName ? "/account" : "/login"}
            className="ml-auto flex items-center gap-2 text-sm font-semibold md:ml-0"
          >
            <User size={20} /> {userName ?? "Sign in"}
          </a>

          <a
            href="/cart"
            className="flex h-12 items-center gap-3 rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-deep"
          >
            <ShoppingCart size={20} /> Cart{" "}
            <span className="font-bold">{cartCount}</span>
          </a>
        </div>
      </div>

      {/* Category nav */}
      {!hideNav && (
        <nav className="mx-auto flex max-w-[1280px] items-center gap-8 overflow-x-auto px-6 py-4 text-sm">
          <button className="flex shrink-0 items-center gap-2 font-semibold text-brand">
            <Menu size={18} /> All categories <ChevronDown size={14} />
          </button>
          {navLinks.map((link) => (
            <a key={link} href="#" className="shrink-0 hover:text-brand">
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
