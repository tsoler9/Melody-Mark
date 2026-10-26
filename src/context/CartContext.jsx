import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "../data/products.js";

const STORAGE_KEY = "mm-cart";
const PROMO_CODE = "MELODY10";
const PROMO_RATE = 0.1;
const TAX_RATE = 0.11;

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((x) => x && getProduct(x.id)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load);
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
  }, [items]);

  const add = useCallback((id, variant, qty) => {
    const key = `${id}-${variant}`;
    setItems((cur) =>
      cur.some((x) => x.key === key)
        ? cur.map((x) => (x.key === key ? { ...x, qty: x.qty + qty } : x))
        : [...cur, { key, id, variant, qty }]
    );
  }, []);

  const changeQty = useCallback((key, delta) => {
    setItems((cur) => cur.map((x) => (x.key === key ? { ...x, qty: Math.max(1, x.qty + delta) } : x)));
  }, []);

  const remove = useCallback((key) => setItems((cur) => cur.filter((x) => x.key !== key)), []);

  const clear = useCallback(() => {
    setItems([]);
    setPromoApplied(false);
  }, []);

  // Returns true when the code is valid.
  const applyPromo = useCallback((code) => {
    const ok = code.trim().toUpperCase() === PROMO_CODE;
    setPromoApplied(ok);
    return ok;
  }, []);

  const value = useMemo(() => {
    const count = items.reduce((a, x) => a + x.qty, 0);
    const subtotal = items.reduce((a, x) => a + getProduct(x.id).price * x.qty, 0);
    const discount = promoApplied ? subtotal * PROMO_RATE : 0;
    const tax = (subtotal - discount) * TAX_RATE;
    const total = subtotal - discount + tax;
    return { items, count, subtotal, discount, tax, total, promoApplied, promoCode: PROMO_CODE, add, changeQty, remove, clear, applyPromo };
  }, [items, promoApplied, add, changeQty, remove, clear, applyPromo]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
