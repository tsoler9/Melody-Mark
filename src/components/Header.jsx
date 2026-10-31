import { useEffect, useRef, useState } from "react";
import Prefs from "./Prefs.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAccount } from "../context/AccountContext.jsx";
import { navigate } from "../hooks.js";

const LINKS = ["home", "shop", "about"];

export default function Header({ route, query, onSearch }) {
  const { count } = useCart();
  const { t } = useAccount();
  const [draft, setDraft] = useState(query);
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => setDraft(query), [query]);
  useEffect(() => setOpen(false), [route.name]);
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === "Escape" || (e.type === "mousedown" && !box.current?.contains(e.target))) setOpen(false); };
    addEventListener("mousedown", h);
    addEventListener("keydown", h);
    return () => { removeEventListener("mousedown", h); removeEventListener("keydown", h); };
  }, [open]);

  const onKeyDown = (e) => {
    if (e.key !== "Enter") return;
    onSearch(draft.trim());
    navigate("shop");
  };

  return (
    <header>
      <a className="logo" href="#home"><i>MM</i>Melody Mark</a>
      <nav>
        {LINKS.map((r) => (
          <a key={r} href={`#${r}`} className={route.name === r || (route.name === "product" && r === "shop") ? "on" : ""}>{t(r)}</a>
        ))}
      </nav>
      <div className="sr">
        🔍
        <input placeholder={t("search")} aria-label={t("search")} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={onKeyDown} />
      </div>
      <button className={"ic" + (route.name === "cart" ? " on" : "")} aria-label={t("myCart")} onClick={() => navigate("cart")}>🛒<em>{count}</em></button>
      <button className={"ic" + (route.name === "profile" || route.name === "orders" ? " on" : "")} aria-label={t("myProfile")} onClick={() => navigate("profile")}>👤</button>
      <div className="pw" ref={box}>
        <button className={"ic" + (open ? " on" : "")} aria-label={t("prefs")} aria-expanded={open} onClick={() => setOpen((o) => !o)}>⚙</button>
        {open && <Prefs close={() => setOpen(false)} />}
      </div>
    </header>
  );
}
