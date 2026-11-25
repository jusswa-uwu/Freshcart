import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, MapPin } from "lucide-react";

const peso = (n: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    n,
  );

/* ---------- Mock data (replace with API / cart state) ---------- */
const basket = [
  {
    id: 1,
    name: "Farm-fresh tomatoes",
    detail: "0.5 kg · ₱120.00/kg",
    total: 60,
    image: "/images/tomatoes.jpg",
  },
  {
    id: 2,
    name: "Sweet Lakatan bananas",
    detail: "1 kg · ₱95.00/kg",
    total: 95,
    image: "/images/bananas.jpg",
  },
  {
    id: 3,
    name: "Creamy Hass avocado",
    detail: "0.5 kg · ₱280.00/kg",
    total: 140,
    image: "/images/avocado.jpg",
  },
  {
    id: 4,
    name: "Free-range brown eggs",
    detail: "1 pack · 6 pieces",
    total: 105,
    image: "/images/eggs.jpg",
  },
];

const slots = [
  { id: "am", label: "10:00 AM – 12:00 PM", full: false },
  { id: "pm1", label: "1:00 PM – 3:00 PM", full: false },
  { id: "pm2", label: "4:00 PM – 6:00 PM", full: true },
];

const DELIVERY_FEE = 49;

/* ---------- Small building blocks ---------- */
function Card({
  step,
  title,
  aside,
  children,
}: {
  step: number;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-xl font-semibold">
          <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
            {step}
          </span>
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function MapPreview() {
  // Static placeholder. Swap for <MapContainer> from react-leaflet when the API is ready.
  return (
    <div className="relative h-32 overflow-hidden rounded-lg bg-white">
      <div className="absolute inset-0 grid grid-cols-[1fr_2fr_2fr_2fr_1fr] gap-1 p-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="rounded-sm bg-[#e3eddc]" />
        ))}
      </div>
      <span className="absolute left-4 top-3 text-[10px] text-muted">
        Maginhawa Street
      </span>
      <span className="absolute right-12 top-1/2 text-[10px] text-muted">
        Teachers Village East
      </span>
      <MapPin
        size={46}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70%] fill-brand text-brand"
      />
      <button className="absolute bottom-2 right-3 rounded-md bg-white px-3 py-1 text-xs font-semibold text-brand shadow-sm">
        Edit pin on map
      </button>
    </div>
  );
}

/* ---------- Page ---------- */
export default function CheckoutPage() {
  const days = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
          key: d.toDateString(),
          date: d,
          dow: d.toLocaleDateString("en-PH", { weekday: "short" }),
          day: d.getDate(),
          sub:
            i === 0
              ? "Today"
              : i === 1
                ? "Tomorrow"
                : d.toLocaleDateString("en-PH", { month: "long" }),
        };
      }),
    [],
  );

  const [dayIdx, setDayIdx] = useState(1);
  const [slotId, setSlotId] = useState("am");
  const [payment, setPayment] = useState<"card" | "ewallet">("card");
  const [substitution, setSubstitution] = useState("replace");

  const subtotal = basket.reduce((sum, i) => sum + i.total, 0);
  const total = subtotal + DELIVERY_FEE;
  const chosenDay = days[dayIdx];
  const chosenSlot = slots.find((s) => s.id === slotId)!;

  function placeOrder() {
    // TODO: POST /api/orders with this payload, then redirect to PayMongo checkout.
    console.log({
      items: basket,
      deliveryDate: chosenDay.date,
      slot: slotId,
      payment,
      substitution,
      total,
    });
  }

  return (
    <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-8">
      {/* Breadcrumb + title + stepper */}
      <nav className="text-xs text-muted" aria-label="Breadcrumb">
        Shop &nbsp;/&nbsp; Your cart &nbsp;/&nbsp;{" "}
        <span className="text-ink">Checkout</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            One step closer to fresh.
          </h1>
          <p className="mt-2 text-muted">
            Choose when and where. We’ll handle the groceries.
          </p>
        </div>
        <ol className="flex items-center gap-4 text-sm">
          <li className="flex items-center gap-1 font-semibold text-brand">
            <Check size={14} /> Cart
          </li>
          <span className="h-px w-16 bg-line" />
          <li className="font-semibold text-brand">2 Checkout</li>
          <span className="h-px w-16 bg-line" />
          <li className="text-muted">3 Confirmation</li>
        </ol>
      </div>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_447px]">
        {/* ---------- Left column ---------- */}
        <div className="space-y-6">
          <Card
            step={1}
            title="Delivery address"
            aside={
              <a href="#" className="text-sm font-semibold text-brand">
                Change address
              </a>
            }
          >
            <MapPreview />
            <div className="mt-4 flex items-end justify-between gap-4">
              <div className="text-sm">
                <p className="font-semibold">Home · Alex Reyes</p>
                <p className="mt-1 text-muted">
                  24 Maginhawa Street, Teachers Village East, Quezon City
                </p>
                <p className="mt-1 text-muted">0917 123 4567</p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-md bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">
                <Check size={12} /> Within delivery area
              </span>
            </div>
          </Card>

          <Card
            step={2}
            title="Delivery schedule"
            aside={
              <span className="text-sm font-semibold text-brand">
                {chosenDay.date.toLocaleDateString("en-PH", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            }
          >
            <div className="grid grid-cols-5 gap-3">
              {days.map((d, i) => (
                <button
                  key={d.key}
                  onClick={() => setDayIdx(i)}
                  aria-pressed={dayIdx === i}
                  className={`rounded-lg border py-4 text-center ${
                    dayIdx === i
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-[#f7f7f3] hover:border-brand"
                  }`}
                >
                  <span className="block text-xs opacity-70">{d.dow}</span>
                  <span className="block text-2xl font-semibold">{d.day}</span>
                  <span className="block text-[10px] opacity-70">{d.sub}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {slots.map((s) => (
                <label
                  key={s.id}
                  className={`rounded-lg border p-4 text-sm ${
                    s.full
                      ? "cursor-not-allowed border-transparent bg-[#f0f0ec] text-muted"
                      : "cursor-pointer border-line has-[:checked]:border-2 has-[:checked]:border-brand has-[:checked]:bg-brand-soft"
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <input
                      type="radio"
                      name="slot"
                      className="accent-brand"
                      checked={slotId === s.id}
                      disabled={s.full}
                      onChange={() => setSlotId(s.id)}
                    />
                    {s.label}
                  </span>
                  <span className="mt-1 block pl-6 text-[11px] text-muted">
                    {s.full ? "Fully booked" : "Available"}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">
              All times are Philippine Standard Time (PHT). Slots are subject to
              availability.
            </p>
          </Card>

          <Card
            step={3}
            title="Payment method"
            aside={
              <span className="text-xs font-semibold text-brand">
                Secure via PayMongo
              </span>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  id: "card",
                  title: "Credit / debit card",
                  sub: "Visa · Mastercard",
                },
                { id: "ewallet", title: "E-wallet", sub: "GCash · Maya" },
              ].map((m) => (
                <label
                  key={m.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-line p-5 has-[:checked]:border-2 has-[:checked]:border-brand has-[:checked]:bg-brand-soft"
                >
                  <input
                    type="radio"
                    name="payment"
                    className="accent-brand"
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id as "card" | "ewallet")}
                  />
                  <span>
                    <span className="block font-semibold">{m.title}</span>
                    <span className="mt-1 block text-xs text-muted">
                      {m.sub}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">
              You’ll continue to a secure payment page. Your card details are
              never stored by FreshCart.
            </p>
          </Card>

          <div className="flex items-start gap-4 rounded-xl bg-brand-soft px-5 py-4">
            <Check size={16} className="mt-1 text-brand" />
            <div className="text-sm">
              <p className="font-semibold">We’ll keep you in the loop</p>
              <p className="mt-1 text-muted">
                SMS updates when your order is confirmed, out for delivery, and
                delivered.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Right column ---------- */}
        <aside className="space-y-4">
          <section className="rounded-2xl border border-line bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your basket</h2>
              <a href="/cart" className="text-xs font-semibold text-brand">
                Edit cart
              </a>
            </div>

            <ul className="space-y-4">
              {basket.map((i) => (
                <li key={i.id} className="flex items-center gap-4">
                  <img
                    src={i.image}
                    alt=""
                    className="size-16 rounded-lg bg-cream object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{i.name}</p>
                    <p className="mt-1 text-xs text-muted">{i.detail}</p>
                  </div>
                  <span className="text-sm font-semibold">{peso(i.total)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg bg-[#f4f4ec] p-4">
              <p className="text-xs font-semibold text-brand">
                A note on weight-priced items
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Produce is weighed during picking. Your final total may vary
                slightly; any adjustment will be confirmed.
              </p>
            </div>

            <label className="mt-6 block text-xs font-semibold" htmlFor="sub">
              If an item is unavailable
            </label>
            <div className="relative mt-2">
              <select
                id="sub"
                value={substitution}
                onChange={(e) => setSubstitution(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-line bg-white px-3 text-xs"
              >
                <option value="replace">Replace with a similar item</option>
                <option value="remove">Remove it from my order</option>
                <option value="contact">Contact me first</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-muted">
                <dt>Subtotal · {basket.length} items</dt>
                <dd className="font-semibold text-ink">{peso(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>Delivery fee</dt>
                <dd className="font-semibold text-ink">{peso(DELIVERY_FEE)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-5">
                <dt className="text-lg font-semibold">Estimated total</dt>
                <dd className="text-3xl font-bold">{peso(total)}</dd>
              </div>
            </dl>

            <button
              onClick={placeOrder}
              className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-deep"
            >
              Place order · {peso(total)} <ArrowRight size={16} />
            </button>
            <p className="mt-5 text-center text-[11px] leading-relaxed text-muted">
              By placing your order, you agree to our Terms &amp; Conditions and
              Privacy Policy. Payment is completed securely.
            </p>
          </section>

          <section className="rounded-2xl bg-brand-soft p-5">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-brand">
              YOUR DELIVERY
            </p>
            <p className="mt-2 font-semibold">
              {chosenDay.sub === "Today" || chosenDay.sub === "Tomorrow"
                ? `${chosenDay.sub}, `
                : ""}
              {chosenDay.date.toLocaleDateString("en-PH", {
                weekday: "short",
                day: "numeric",
                month: "long",
              })}
            </p>
            <p className="mt-2 text-xs text-muted">
              {chosenSlot.label} · Home, Quezon City
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
