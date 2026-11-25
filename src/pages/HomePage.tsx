import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { LayoutContext } from "../components/Layout";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Leaf,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { categories, products, type Product } from "../data/Mock";

const peso = (n: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    n,
  );

const perks = [
  {
    icon: Leaf,
    title: "Freshness, first",
    text: "Carefully picked, every order",
  },
  {
    icon: CalendarDays,
    title: "Your time, your delivery",
    text: "Choose a slot that suits you",
  },
  {
    icon: ShieldCheck,
    title: "Safe & secure payments",
    text: "Cards and e-wallets accepted",
  },
  {
    icon: Truck,
    title: "Updates along the way",
    text: "Order status, straight to your phone",
  },
];

const steps = [
  {
    title: "Fill your basket",
    text: "Explore fresh produce, pantry favourites, and everyday essentials. Shop by piece or by kilo.",
  },
  {
    title: "Make it your delivery",
    text: "Pin your address, check your delivery area, and choose a time slot that fits your day.",
  },
  {
    title: "Sit back. We’ll text you.",
    text: "Pay securely online and get SMS updates from order confirmation to your doorstep.",
  },
];

function SectionHead({
  title,
  sub,
  link,
}: {
  title: string;
  sub?: string;
  link: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
      <a
        href="#"
        className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand"
      >
        {link} <ArrowRight size={14} />
      </a>
    </div>
  );
}

function ProductCard({ p, onAdd }: { p: Product; onAdd: () => void }) {
  return (
    <article className="rounded-2xl border border-line p-4">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-cream">
        <img
          src={p.image}
          alt={p.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="mt-4 text-[11px] font-semibold tracking-wide text-brand">
        {p.inStock ? "IN STOCK" : "OUT OF STOCK"}
      </p>
      <h3 className="mt-1 font-semibold">{p.name}</h3>
      <p className="mt-1 text-xs text-muted">{p.unitLabel}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold">{peso(p.price)}</span>
        <button
          onClick={onAdd}
          disabled={!p.inStock}
          aria-label={`Add ${p.name} to cart`}
          className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand hover:bg-brand hover:text-white disabled:opacity-40"
        >
          <Plus size={18} />
        </button>
      </div>
    </article>
  );
}

function DeliveryCard() {
  const days = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return {
          key: d.toISOString(),
          dow: d.toLocaleDateString("en-PH", { weekday: "short" }),
          day: d.getDate(),
        };
      }),
    [],
  );
  const [selected, setSelected] = useState(0);

  return (
    <div className="rounded-xl bg-white p-6 text-ink">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Your next delivery</h3>
        <span className="flex items-center gap-1 text-xs font-medium text-brand">
          <Check size={12} /> Available
        </span>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-3">
        {days.map((d, i) => (
          <button
            key={d.key}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
            className={`rounded-lg py-3 text-center ${
              selected === i
                ? "bg-brand text-white"
                : "bg-[#f3f4f1] hover:bg-brand-soft"
            }`}
          >
            <span className="block text-[11px] opacity-70">{d.dow}</span>
            <span className="block text-2xl font-semibold">{d.day}</span>
          </button>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted">
        <span className="text-ink">10:00 AM – 12:00 PM</span> &nbsp;·&nbsp; Your
        morning, sorted.
      </p>
    </div>
  );
}

export default function HomePage() {
  const { addToCart } = useOutletContext<LayoutContext>();

  return (
    <main className="mx-auto max-w-[1280px] space-y-20 px-6 pb-8">
      {/* Hero */}
      <section className="grid overflow-hidden rounded-3xl bg-cream md:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-brand">
            FRESH PICKS. ZERO QUEUES.
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Good food.
            <br />
            Great days.
          </h1>
          <p className="mt-6 max-w-sm text-lg text-muted">
            Your everyday essentials, picked with care. Delivered fresh, at a
            time that works for you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#picks"
              className="flex h-12 items-center gap-3 rounded-lg bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-deep"
            >
              Shop fresh groceries <ArrowRight size={16} />
            </a>
            <a href="#picks" className="text-xs font-medium text-brand">
              Explore this week’s picks
            </a>
          </div>
        </div>
        <img
          src="/images/hero.jpg"
          alt="Paper bag of fresh vegetables and fruit"
          className="h-72 w-full object-cover md:h-full"
        />
      </section>

      {/* Perks */}
      <section className="-mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon
              size={26}
              className="mt-0.5 shrink-0 text-brand"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-1 text-xs text-muted">{text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section>
        <SectionHead
          title="Aisles of good things"
          link="Browse all categories"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map(({ name, tagline, icon: Icon, bg }) => (
            <a key={name} href="#" className="group text-center">
              <div
                className={`grid h-20 place-items-center rounded-xl ${bg} text-ink/70 transition group-hover:text-brand`}
              >
                <Icon size={30} strokeWidth={1.25} />
              </div>
              <p className="mt-3 text-sm font-semibold">{name}</p>
              <p className="text-xs text-muted">{tagline}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="picks">
        <SectionHead
          title="Fresh picks for your week"
          sub="Good ingredients. Everyday prices. A little something for every basket."
          link="Shop all products"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={addToCart} />
          ))}
        </div>
      </section>

      {/* Delivery banner */}
      <section className="grid items-center gap-8 rounded-3xl bg-brand p-8 text-white md:grid-cols-2 md:p-10">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-lime">
            MADE FOR REAL LIFE
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Fresh groceries. Right on time.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
            Plan ahead, skip the queue, and make room for your day. Pick a
            delivery slot at checkout. We’ll take care of the rest.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lime"
          >
            Find your delivery slot <ArrowRight size={14} />
          </a>
        </div>
        <DeliveryCard />
      </section>

      {/* How it works */}
      <section>
        <h2 className="mb-8 text-3xl font-semibold tracking-tight">
          From our aisles to your doorstep
        </h2>
        <ol className="grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="grid size-10 place-items-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
