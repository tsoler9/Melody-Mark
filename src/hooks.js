import { useEffect, useState } from "react";
import { getProduct } from "./data/products.js";

/* ---------- Hash routing: #home, #shop, #about, #cart, #product-<id> ---------- */
function parse(hash) {
  const h = hash.replace(/^#/, "");
  const m = /^product-(\d+)$/.exec(h);
  if (m) return getProduct(+m[1]) ? { name: "product", id: +m[1] } : { name: "shop" };
  return ["home", "shop", "about", "cart"].includes(h) ? { name: h } : { name: "home" };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parse(location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parse(location.hash));
    addEventListener("hashchange", onChange);
    return () => removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export const navigate = (hash) => { location.hash = hash; };

/* ---------- Theme: follows the OS until the user toggles it ---------- */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("mm-theme"); } catch { return null; }
  });

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => {
    const current = theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("mm-theme", next); } catch { /* storage unavailable */ }
  };
  return toggle;
}

/* ---------- Shop filters (kept above the router so they survive navigation) ---------- */
const INITIAL = { group: 0, category: "Guitar", query: "", min: "", max: "", sort: "pop", open: [0] };

export function useShopFilters() {
  const [f, setF] = useState(INITIAL);
  return {
    ...f,
    toggleGroup: (i) => setF((s) => ({ ...s, open: s.open.includes(i) ? s.open.filter((x) => x !== i) : [...s.open, i], group: i, category: null, query: "" })),
    pickCategory: (i, c) => setF((s) => ({ ...s, group: i, category: c, query: "" })),
    setMin: (min) => setF((s) => ({ ...s, min })),
    setMax: (max) => setF((s) => ({ ...s, max })),
    setSort: (sort) => setF((s) => ({ ...s, sort })),
    search: (query) => setF((s) => ({ ...s, query })),
    reset: () => setF((s) => ({ ...s, min: "", max: "", sort: "pop", query: "" })),
  };
}
