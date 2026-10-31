import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DICT } from "../i18n.js";
import { getProduct } from "../data/products.js";

const KEY = "mm-account";
const Ctx = createContext(null);
export const useAccount = () => useContext(Ctx);

const today = () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// Order total = items + 11% tax, shipping free.
const withTax = (items) => Math.round(items.reduce((a, i) => a + getProduct(i.id).price * i.qty, 0) * 1.11 * 100) / 100;

// Sample data taken from the design, so every screen has something to show.
const ADDR = [
  { id: "a1", name: "Pedro Dela Cruz", label: "Personal", street: "Di Makita St.", city: "Olongapo City, Zambales", phone: "09123456789", def: true },
  { id: "a2", name: "Pedro Dela Cruz", label: "Work", street: "Nakita Na St.", city: "Olongapo City, Zambales", phone: "09123456789" },
];
const mk = (id, date, status, ids, pay, note) => {
  const items = ids.map((i) => ({ id: i, qty: 1 }));
  return { id, date, status, items, total: withTax(items), addr: { name: ADDR[0].name, city: ADDR[0].city }, pay, note };
};
const SEED = {
  profile: { first: "Pedro", last: "Dela Cruz", email: "EmailAddress@gmail.com", phone: "09123456789" },
  addresses: ADDR,
  sel: "a1",
  prefs: { orderUpd: true, promos: false },
  orders: [
    mk("MM-1048", "Oct 26, 2026", "shipped", [1, 2, 7], "Cash on delivery", "Arriving Nov 2 – Nov 6, 2026"),
    mk("MM-1031", "Oct 19, 2026", "inspected", [5], "GCash", "Play-testing in our workshop"),
    mk("MM-0987", "Sep 30, 2026", "delivered", [6, 8], "Cash on delivery", "Delivered Oct 4, 2026"),
    mk("MM-0952", "Sep 12, 2026", "cancelled", [4], "Credit / debit card", "Cancelled Sep 12, 2026"),
  ],
};

function load() {
  try {
    const r = JSON.parse(localStorage.getItem(KEY));
    if (r && r.profile && Array.isArray(r.orders) && Array.isArray(r.addresses)) return { ...SEED, ...r, prefs: { ...SEED.prefs, ...r.prefs } };
  } catch { /* fall through to seed */ }
  return SEED;
}

export function AccountProvider({ children }) {
  const [s, setS] = useState(load);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage unavailable */ } }, [s]);

  const t = useCallback((k) => DICT.en[k] ?? k, []);

  const value = useMemo(() => ({
    ...s, t,
    setProfile: (profile) => setS((c) => ({ ...c, profile })),
    setPref: (k, v) => setS((c) => ({ ...c, prefs: { ...c.prefs, [k]: v } })),
    setSel: (sel) => setS((c) => ({ ...c, sel })),
    saveAddr: (a) => setS((c) => {
      const list = a.id
        ? c.addresses.map((x) => (x.id === a.id ? { ...x, ...a } : x))
        : [...c.addresses, { ...a, id: "a" + Date.now(), def: !c.addresses.length }];
      return { ...c, addresses: list, sel: list.some((x) => x.id === c.sel) ? c.sel : list[0]?.id ?? null };
    }),
    removeAddr: (id) => setS((c) => {
      let list = c.addresses.filter((x) => x.id !== id);
      if (list.length && !list.some((x) => x.def)) list = list.map((x, i) => ({ ...x, def: i === 0 }));
      return { ...c, addresses: list, sel: list.some((x) => x.id === c.sel) ? c.sel : list[0]?.id ?? null };
    }),
    placeOrder: (items, a, total) => {
      const id = "MM-" + (Math.max(1000, ...s.orders.map((o) => +o.id.slice(3))) + 1);
      const order = { id, date: today(), status: "inspected", items, total, addr: { name: a.name, city: a.city }, pay: "Cash on delivery", note: "Play-testing in our workshop" };
      setS((c) => ({ ...c, orders: [order, ...c.orders] }));
      return id;
    },
    cancelOrder: (id) => setS((c) => ({ ...c, orders: c.orders.map((o) => (o.id === id ? { ...o, status: "cancelled", note: "Cancelled " + today() } : o)) })),
  }), [s, t]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
